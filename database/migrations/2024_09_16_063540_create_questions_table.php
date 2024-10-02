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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->year('year');
            $table->string('file_path');
            $table->unsignedBigInteger('semester_id');
            $table->unsignedBigInteger('faculty_id');
            $table->unsignedBigInteger('subject_id');
            $table->timestamps();

            $table->foreign('semester_id')->references('id')->on('semesters');
            $table->foreign('faculty_id')->references('id')->on('faculties');
            $table->foreign('subject_id')->references('id')->on('subjects');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
