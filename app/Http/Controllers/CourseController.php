<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatusEnum;
use App\Models\CourseLesson;
use App\Settings\SiteSettings;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $slug = $request->slug;
        if($slug){
            $category = \App\Models\CourseCategory::whereSlug($slug)->first();
            $courses = \App\Models\Course::with(['teacher','category'])->whereCourseCategoryId($category->id)->whereIsActive(true)->get();
            return Inertia::render('Courses/Index', [
                'category' => $category,
                'courses' => $courses
            ]);
        }

        $courses = \App\Models\Course::with(['teacher','category'])->whereIsActive(true)->get();
        return Inertia::render('Courses/Index', [
            'courses' => $courses
        ]);
    }

    public function detail(Request $request)
    {
        $slug = $request->slug;
        $course = \App\Models\Course::with(['teacher','category', 'sections', 'sections.chapters', 'sections.chapters.lessons', 'sections.lessons'])->whereSlug($slug)->firstOrFail();

        //Demo video
        $demoLesson = $course->lessons->where('is_trial', true)->first();


        //Site settings
        $appSettings = app(SiteSettings::class);
        SEOTools::setTitle($course->name);
        SEOTools::setDescription(strip_tags($course->description));
        SEOMeta::setKeywords($appSettings->seo_keywords);
        SEOMeta::setTitle($course->name);
        SEOMeta::setDescription(strip_tags($course->description));
        SEOTools::opengraph()->setUrl(url()->current());
        SEOTools::setCanonical(url()->current());
        SEOTools::opengraph()->addProperty('type', 'website');

        return Inertia::render('Courses/Detail', [
            'course' => $course,
            'demoLesson' => $demoLesson
        ]);
    }

    public function teacherDetail(Request $request)
    {
        $id = $request->id;
        $teacher = \App\Models\Teacher::with('courses')->whereId($id)->first();
        $includeCourses = $teacher->courses()
            ->with(['teacher','category'])
            ->whereIsActive(true)
            ->get();

        //Site settings
        $appSettings = app(SiteSettings::class);
        SEOTools::setTitle($teacher->name);
        SEOTools::setDescription(strip_tags($teacher->bio));
        SEOTools::opengraph()->setUrl(url()->current());
        SEOTools::setCanonical(url()->current());
        SEOTools::opengraph()->addProperty('type', 'website');
        SEOMeta::setKeywords($appSettings->seo_keywords);
        SEOMeta::setTitle($teacher->name);
        SEOMeta::setDescription(strip_tags($teacher->bio));

        return Inertia::render('Teacher/Detail', compact('teacher', 'includeCourses'));
    }

    public function masterCourseDetail(Request $request)
    {
        $slug = $request->slug;
        $course = \App\Models\MasterCourse::with('courses')->whereSlug($slug)->first();
        $includeCourses =$course->courses()
            ->with(['teacher','category'])
            ->whereIsActive(true)
            ->get();


        //Site settings
        $appSettings = app(SiteSettings::class);
        SEOTools::setTitle($course->name);
        SEOTools::setDescription(strip_tags($course->description));
        SEOTools::opengraph()->setUrl(url()->current());
        SEOTools::setCanonical(url()->current());
        SEOTools::opengraph()->addProperty('type', 'website');
        SEOMeta::setKeywords($appSettings->seo_keywords);
        SEOMeta::setTitle($course->name);
        SEOMeta::setDescription(strip_tags($course->description));
        return Inertia::render('Courses/MasterCourse', [
            'course' => $course,
            'includeCourses' => $includeCourses
        ]);
    }

    public function checkout(Request $request)
    {
        $slug = $request->slug;
        $type = $request->type;
        $courseSectionId = $request->course_section_id;
        $course = \App\Models\Course::whereSlug($slug)->first();
        $courseSection = !empty($courseSectionId) ? \App\Models\CourseSection::with(['chapters', 'chapters.lessons'])->whereId($courseSectionId)->first() : null;
        return Inertia::render('Courses/Checkout', [
            'course' => $course,
            'courseSection' => $courseSection,
            'type' => $type
        ]);
    }

    public function checkoutStore(Request $request)
    {
        \Validator::validate($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'zalo' => 'required_if:is_zalo_same_phone,false',
            'course_id' => 'required',
        ], [
            'zalo.required_if' => 'Vui lòng nhập Zalo',
            'phone.required' => 'Vui lòng nhập số điện thoại',
            'email.required' => 'Vui lòng nhập email',
            'email.email' => 'Email không hợp lệ',
            'name.required' => 'Vui lòng nhập họ tên',
        ]);
        $course = \App\Models\Course::whereId($request->course_id)->first();
        $type  =$request->type ?? 'default';
        $order = \App\Models\Order::create([
            'total_price' =>  $type == 'one-on-one' ? $course->one_on_one_price : $course->price,
            'status' => OrderStatusEnum::Pending,
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'zalo' => $request->is_zalo_same_phone ? $request->phone : $request->zalo,
            'course_id' => $course->id,
            'course_section_id' => null,
            'payment_status' => 'pending',
            'user_id' => auth()->check() ? auth()->id() : null,
            'type' => $request->type ?? 'default', // 'course' or 'section
            'discount' => 0,
            'notes' => $request->notes,
        ]);

        session()->put('order_id', $order->id);

        return redirect()->route('courses-checkout-success', ['slug' => $course->slug]);
    }

    public function checkoutSuccess()
    {
        $orderId = session()->get('order_id');
        $order = \App\Models\Order::whereId($orderId)->firstOrFail();
        $course = \App\Models\Course::whereId($order->course_id)->first();
        $courseSection = !empty($order->course_section_id) ? \App\Models\CourseSection::whereId($order->course_section_id)->first() : null;
        return Inertia::render('Courses/CheckoutSuccess', [
            'order' => $order,
            'course' => $course,
            'courseSection' => $courseSection
        ]);
    }


    public function masterCheckout(Request $request)
    {
        $slug = $request->slug;
        $type = $request->type;
        $course = \App\Models\MasterCourse::whereSlug($slug)->first();
        return Inertia::render('Courses/MasterCourseCheckout', [
            'course' => $course,
            'type' => $type
        ]);
    }

    public function masterCheckoutStore(Request $request)
    {
        \Validator::validate($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'course_id' => 'required',
        ]);
        $course = \App\Models\MasterCourse::whereId($request->course_id)->first();
        $type  =$request->type ?? 'default';
        $order = \App\Models\Order::create([
            'total_price' =>  $type == 'one-on-one' ? $course->one_on_one_price : $course->price,
            'status' => OrderStatusEnum::Pending,
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'master_course_id' => $course->id,
            'course_id' => null,
            'course_section_id' => null,
            'payment_status' => 'pending',
            'user_id' => auth()->check() ? auth()->id() : null,
            'type' => $request->type ?? 'default', // 'course' or 'section
            'discount' => 0,
            'notes' => $request->notes,
        ]);

        session()->put('order_id', $order->id);

        return redirect()->route('master-class-checkout-success', ['slug' => $course->slug]);
    }

    public function masterCheckoutSuccess()
    {
        $orderId = session()->get('order_id');
        $order = \App\Models\Order::whereId($orderId)->firstOrFail();
        $course = \App\Models\MasterCourse::whereId($order->master_course_id)->first();
        return Inertia::render('Courses/MasterCourseCheckoutSuccess', [
            'order' => $order,
            'course' => $course
        ]);
    }

    public function offlineIndex(Request $request)
    {
        $courses = \App\Models\OfflineCourse::with(['teacher','onlineCourse'])->get();
        return Inertia::render('Courses/Index', [
            'courses' => $courses
        ]);
    }
    public function offlineCourseDetail(Request $request)
    {
        $slug = $request->slug;
        $course = \App\Models\OfflineCourse::with(['teacher', 'onlineCourse'])->whereSlug($slug)->first();

        //Site settings
        $appSettings = app(SiteSettings::class);
        SEOTools::setTitle($course->name);
        SEOTools::setDescription(strip_tags($course->description));
        SEOTools::opengraph()->setUrl(url()->current());
        SEOTools::setCanonical(url()->current());
        SEOTools::opengraph()->addProperty('type', 'website');
        SEOMeta::setKeywords($appSettings->seo_keywords);
        SEOMeta::setTitle($course->name);
        SEOMeta::setDescription(strip_tags($course->description));
        return Inertia::render('Courses/OfflineCourse', [
            'course' => $course
        ]);
    }

    public function offlineCheckout(Request $request)
    {
        $slug = $request->slug;
        $type = $request->type;
        $course = \App\Models\OfflineCourse::whereSlug($slug)->first();
        $courseSection = !empty($courseSectionId) ? \App\Models\CourseSection::with(['chapters', 'chapters.lessons'])->whereId($courseSectionId)->first() : null;
        return Inertia::render('Courses/OfflineCourseCheckout', [
            'course' => $course,
            'courseSection' => $courseSection,
            'type' => $type
        ]);
    }

    public function offlineCheckoutStore(Request $request)
    {
        \Validator::validate($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'zalo' => 'required_if:is_zalo_same_phone,false',
            'course_id' => 'required',
        ], [
            'zalo.required_if' => 'Vui lòng nhập Zalo',
            'phone.required' => 'Vui lòng nhập số điện thoại',
            'email.required' => 'Vui lòng nhập email',
            'email.email' => 'Email không hợp lệ',
            'name.required' => 'Vui lòng nhập họ tên',
        ]);
        $course = \App\Models\OfflineCourse::findOrFail($request->course_id);
        $type  =$request->type ?? 'default';
        $order = \App\Models\Order::create([
            'total_price' =>  $type == 'one-on-one' ? $course->one_on_one_price : $course->price,
            'status' => OrderStatusEnum::Pending,
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'zalo' => $request->is_zalo_same_phone ? $request->phone : $request->zalo,
            'offline_course_id' => $course->id,
            'course_section_id' => null,
            'payment_status' => 'pending',
            'user_id' => auth()->check() ? auth()->id() : null,
            'type' => $request->type ?? 'default', // 'course' or 'section
            'discount' => 0,
            'notes' => $request->notes,
        ]);

        session()->put('order_id', $order->id);

        return redirect()->route('offline-courses-checkout-success', ['slug' => $course->slug]);
    }

    public function offlineCheckoutSuccess()
    {
        $orderId = session()->get('order_id');
        $order = \App\Models\Order::whereId($orderId)->firstOrFail();
        $course = \App\Models\OfflineCourse::whereId($order->offline_course_id)->first();
        $courseSection = !empty($order->course_section_id) ? \App\Models\CourseSection::whereId($order->course_section_id)->first() : null;
        return Inertia::render('Courses/OfflineCourseCheckoutSuccess', [
            'order' => $order,
            'course' => $course,
            'courseSection' => $courseSection
        ]);
    }
}
