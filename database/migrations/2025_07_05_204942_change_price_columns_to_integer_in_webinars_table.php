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
            // Ubah tipe kolom menjadi BIGINT untuk menyimpan harga sebagai integer
            // Angka 20 berarti bisa menampung hingga 20 digit, unsigned berarti tidak bisa negatif.
            $table->bigInteger('price')->unsigned()->nullable()->change();
            $table->bigInteger('original_price')->unsigned()->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('webinars', function (Blueprint $table) {
            // Perintah untuk mengembalikan jika migrasi di-rollback (opsional tapi baik)
            $table->decimal('price', 15, 2)->nullable()->change();
            $table->decimal('original_price', 15, 2)->nullable()->change();
        });
    }
};
