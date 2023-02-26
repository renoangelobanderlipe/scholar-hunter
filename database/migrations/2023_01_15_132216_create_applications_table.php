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
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->string('user_id')->index();
            $table->string('scholarship_id')->index();
            $table->string('status')->index()->nullable();
            $table->integer('foundation_id')->index();
            $table->integer('file_id')->index();
            $table->string('file_name')->index();
            $table->string('file_location')->index();
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
        Schema::dropIfExists('applications');
    }
};
