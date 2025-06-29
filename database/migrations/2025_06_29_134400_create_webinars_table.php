<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('webinars', function (Blueprint $table) {
            $table->id();
            // Informasi Dasar
            $table->string('title');
            $table->enum('payment_type', ['paid', 'free', 'pay_what_you_want'])->default('free');
            $table->decimal('price', 15, 2)->nullable();
            $table->decimal('original_price', 15, 2)->nullable();
            $table->text('description');

            // Jadwal & Media
            $table->string('webinar_link');
            $table->timestamp('start_datetime');
            $table->timestamp('end_datetime')->nullable();
            $table->string('cover_image_path')->nullable();
            $table->text('instructions')->nullable();

            // Logistik & Penjualan
            $table->text('terms_and_conditions')->nullable();
            $table->timestamp('sales_start_datetime')->nullable();
            $table->timestamp('registration_close_datetime')->nullable();
            $table->unsignedInteger('max_participants')->nullable();
            $table->string('redirect_url')->nullable();

            // Afiliasi
            $table->boolean('is_affiliatable')->default(false);
            $table->decimal('affiliate_commission_percentage', 5, 2)->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('webinars');
    }
};