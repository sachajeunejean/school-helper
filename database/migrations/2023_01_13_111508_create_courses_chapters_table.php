<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses_chapters', function (Blueprint $table) {
            $table->id();

            $table->bigInteger('id_course')->unsigned();
            $table->foreign('id_course')
                ->references('id')
                ->on('courses')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->bigInteger('id_chapter')->unsigned();
            $table->foreign('id_chapter')
                ->references('id')
                ->on('chapters')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });

        /*DB::table('courses_chapters')->insert([
            'id_course' => 1,
            'id_chapter' => 1
        ]);

        DB::table('courses_chapters')->insert([
            'id_course' => 1,
            'id_chapter' => 2
        ]);*/
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('courses_chapters');
    }
};
