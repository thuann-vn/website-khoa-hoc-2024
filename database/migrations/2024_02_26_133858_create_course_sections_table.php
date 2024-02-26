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
        Schema::create('course_sections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('video_url')->nullable();
            $table->string('image_url')->nullable();
            $table->integer('position');
            $table->boolean('is_active')->default(true);
            $table->text('description')->nullable();
            $table->integer('duration');
            $table->integer('discount')->default(0);
            $table->integer('price');
            $table->boolean('locked')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_sections');
    }
};
