<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
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

        DB::statement('SET SESSION sql_require_primary_key=0');

        
        Schema::create('users', function (Blueprint $table) {
            $table->id()->primary();
            $table->string('username')->unique();
            $table->string('lastname');
            $table->string('firstname');
            $table->char('gender');
            $table->string('email')->unique();
            $table->char('role');
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        DB::table('users')->insert([
            'username' => 'admin',
            'lastname' => 'admin',
            'firstname' => 'admin',
            'gender' => 'm',
            'email' => 'admin@school-helper.com',
            'role' => 'm',
            'password' => hash::make('pass1234'),
        ]);

        DB::table('users')->insert([
            'username' => 'learner',
            'lastname' => 'learner',
            'firstname' => 'learner',
            'gender' => 'm',
            'email' => 'learner@school-helper.com',
            'role' => 'l',
            'password' => hash::make('pass1234'),
        ]);

        DB::table('users')->insert([
            'username' => 'teacher',
            'lastname' => 'teacher',
            'firstname' => 'teacher',
            'gender' => 'm',
            'email' => 'teacher@school-helper.com',
            'role' => 't',
            'password' => hash::make('pass1234'),
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
