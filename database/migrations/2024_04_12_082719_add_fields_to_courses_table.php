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
        Schema::table('courses', function (Blueprint $table) {
            //
            $table->decimal('old_price', 15, 0)->nullable();
            $table->decimal('old_one_on_one_price', 15, 0)->nullable();
            $table->date('sale_start')->nullable();
            $table->date('sale_end')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            //
            $table->dropColumn('old_price');
            $table->dropColumn('old_one_on_one_price');
            $table->dropColumn('sale_start');
            $table->dropColumn('sale_end');
        });
    }
};
