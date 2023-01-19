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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->string('formatted_title')->unique();
            $table->text('description');
            $table->string('category');
            $table->string('status')->default('pending');
            $table->string('preview_image');
            $table->integer('rating')->default('0');
            $table->timestamps();
        });

        /*DB::table('courses')->insert([
            'title' => 'Web Development',
            'formatted_title' => 'web-development',
            'description' => 'a course about web development',
            'category' => 'computer_science',
            'preview_image' => 'informatique_0.jpg',
            'created_at' => date('Y-m-d H:i:s')
        ]);*/
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('courses');
    }
};
