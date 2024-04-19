<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('offline_courses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('description')->nullable();
            $table->text('content')->nullable();
            $table->string('image')->nullable();
            $table->decimal('price', 15, 0)->default(0);
            $table->decimal('old_price', 15, 0)->default(0);
            $table->date('start_date')->nullable();
            $table->string('time')->nullable();
            $table->string('period_time')->nullable();
            $table->string('type')->nullable();
            $table->integer('teacher_id');
            $table->string('address')->nullable();
            $table->boolean('has_online')->default(false);
            $table->text('prepare')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offline_courses');
    }
};
