<?php

namespace App\Observers;

use App\Enums\OrderStatusEnum;
use App\Models\Order;
use App\Models\User;
use App\Models\UserCourse;
use Illuminate\Support\Facades\Log;

class OrderObserver
{
    /**
     * Handle the Order "created" event.
     */
    public function created(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "updated" event.
     */
    public function updated(Order $order): void
    {
        //
        if($order->status == OrderStatusEnum::Completed && $order->getOriginal('status') != OrderStatusEnum::Completed) {
            //If user is not set
            $user = $order->user;
            if(empty($order->user)) {
                //Create a new user
                $user = User::where('email', $order->email)->first();
                if(empty($user)) {
                    $user = new User([
                        'email' => $order->email,
                        'name' => $order->name,
                        'phone' => $order->phone,
                        'password' => bcrypt($order->phone),
                        'type' => 'student'
                    ]);
                    $user->save();
                }

                $order->user_id = $user->id;
                $order->save();
            }

            //IF master course
            if($order->master_course_id) {
                foreach ($order->masterCourse->courses as $course) {
                    if(UserCourse::where('user_id', $user->id)->where('course_id', $course->id)->exists())
                        continue;
                    $enrolledCourse = new UserCourse([
                        'user_id' => $user->id,
                        'course_id' => $course->id
                    ]);
                    $enrolledCourse->save();
                }
            }else if(!UserCourse::where('user_id', $user->id)->where('course_id', $order->course_id)->count()){
                //Assign the user to the course
                $enrolledCourse = new UserCourse([
                    'user_id' => $user->id,
                    'course_id' => $order->course_id,
                    'course_section_id' => $order->course_section_id,
                ]);
                $enrolledCourse->save();
            }
        }
    }

    /**
     * Handle the Order "deleted" event.
     */
    public function deleted(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "restored" event.
     */
    public function restored(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "force deleted" event.
     */
    public function forceDeleted(Order $order): void
    {
        //
    }
}
