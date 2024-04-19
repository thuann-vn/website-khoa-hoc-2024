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
        Schema::table('offline_courses', function (Blueprint $table) {
            //
            $table->unsignedBigInteger('online_course_id')->nullable()->after('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('offline_courses', function (Blueprint $table) {
            //
            $table->dropColumn('online_course_id');
        });
    }
};
