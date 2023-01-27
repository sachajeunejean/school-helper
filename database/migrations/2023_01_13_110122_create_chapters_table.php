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
        Schema::create('chapters', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('formatted_title');
            $table->string('description');
            $table->mediumText('content');
            $table->bigInteger('id_previous')->unsigned()->nullable();
            $table->bigInteger('id_next')->unsigned()->nullable();
            $table->timestamps();
        });

        /*DB::table('chapters')->insert([
            'title' => 'Introduction',
            'formatted_title' => 'introduction',
            'description' => 'The Introduction Chapter',
            'content' => '<h2>1.1 Introduction to web development</h2>',
            'created_at' => date('Y-m-d H:i:s')
        ]);

        DB::table('chapters')->insert([
            'title' => 'HTML',
            'formatted_title' => 'html',
            'description' => 'Learning HTML',
            'content' => '<h2>2.1 Introduction to HTML</h2>',
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
        Schema::dropIfExists('chapters');
    }
};
