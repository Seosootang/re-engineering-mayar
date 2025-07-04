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
            // Add speaker_name column after the title column
            $table->string('speaker_name')->after('title');
            // Add nullable speaker_description column after speaker_name
            $table->string('speaker_description')->nullable()->after('speaker_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('webinars', function (Blueprint $table) {
            // Drop the columns if the migration is rolled back
            $table->dropColumn(['speaker_name', 'speaker_description']);
        });
    }
};
