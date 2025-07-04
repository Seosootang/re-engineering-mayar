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
        Schema::table('webinars', function (Blueprint $table) {
            // Add a nullable column to store the speaker's image path
            $table->string('speaker_image_path')->nullable()->after('speaker_description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('webinars', function (Blueprint $table) {
            // Drop the column if the migration is rolled back
            $table->dropColumn('speaker_image_path');
        });
    }
};
