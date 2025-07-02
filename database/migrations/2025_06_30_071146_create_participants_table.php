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
        Schema::create('participants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('webinar_id')->constrained()->onDelete('cascade');
            $table->foreignId('invoice_webinar_id')->nullable()->constrained('invoice_webinars')->onDelete('cascade');
            $table->timestamp('registered_at')->useCurrent();
            $table->timestamps();

            $table->unique(['user_id', 'webinar_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participants');
    }
};
