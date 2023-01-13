<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
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
        Schema::create('courses_comments', function (Blueprint $table) {
            $table->id();

            $table->bigInteger('id_course')->unsigned();
            $table->foreign('id_course')
                ->references('id')
                ->on('courses')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->bigInteger('id_user')->unsigned();
            $table->foreign('id_user')
                ->references('id')
                ->on('users')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->bigInteger('id_feedback')->unsigned();
            $table->foreign('id_feedback')
                ->references('id')
                ->on('feedbacks')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('courses_comments');
    }
};
