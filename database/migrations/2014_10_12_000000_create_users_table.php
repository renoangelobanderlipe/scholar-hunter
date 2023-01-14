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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('firstname')->index();
            $table->string('middlename')->index();
            $table->string('lastname')->index();
            $table->string('address')->index();
            $table->string('username')->index();
            $table->string('email')->index()->unique();
            $table->string('course')->index();
            $table->string('degree')->index();
            $table->string('type')->index();
            $table->string('password')->index();
            $table->string('role')->index()->default('user');
            $table->boolean('status')->index()->default('0');
            $table->rememberToken();
            $table->timestamp('email_verified_at')->nullable();
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
        Schema::dropIfExists('users');
    }
};
