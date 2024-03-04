<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatusEnum;
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
        $course = \App\Models\Course::with(['teacher','category', 'sections', 'sections.chapters', 'sections.chapters.lessons'])->whereSlug($slug)->first();
        return Inertia::render('Courses/Detail', [
            'course' => $course
        ]);
    }

    public function checkout(Request $request)
    {
        $slug = $request->slug;
        $courseSectionId = $request->course_section_id;
        $course = \App\Models\Course::whereSlug($slug)->first();
        $courseSection = !empty($courseSectionId) ? \App\Models\CourseSection::with(['chapters', 'chapters.lessons'])->whereId($courseSectionId)->first() : null;
        return Inertia::render('Courses/Checkout', [
            'course' => $course,
            'courseSection' => $courseSection
        ]);
    }

    public function checkoutStore(Request $request)
    {
        \Validator::validate($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'course_id' => 'required',
        ]);
        $course = \App\Models\Course::whereId($request->course_id)->first();
        $courseSection = !empty($request->course_section_id) ? \App\Models\CourseSection::whereId($request->course_section_id)->first() : null;
        $order = \App\Models\Order::create([
            'total_price' =>  !empty($courseSection->price) ? $courseSection->price : $course->price,
            'status' => OrderStatusEnum::Pending,
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'course_id' => $course->id,
            'course_section_id' => $courseSection?->id,
            'payment_status' => 'pending',
            'user_id' => auth()->check() ? auth()->id() : null,
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
}
