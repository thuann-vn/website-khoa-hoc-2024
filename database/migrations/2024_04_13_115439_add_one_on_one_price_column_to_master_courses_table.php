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
        Schema::table('master_courses', function (Blueprint $table) {
            //
            $table->decimal('one_on_one_price', 15, 0)->default(0)->after('price');
            $table->decimal('old_one_on_one_price', 15,0)->default(0)->after('one_on_one_price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('master_courses', function (Blueprint $table) {
            //
            $table->dropColumn('one_on_one_price');
            $table->dropColumn('old_one_on_one_price');
        });
    }
};
