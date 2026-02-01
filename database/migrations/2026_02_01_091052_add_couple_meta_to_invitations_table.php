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
        Schema::table('invitations', function (Blueprint $table) {
            $table->string('groom_instagram')->nullable()->after('groom_mother');
            $table->string('groom_photo')->nullable()->after('groom_instagram');
            $table->string('bride_instagram')->nullable()->after('bride_mother');
            $table->string('bride_photo')->nullable()->after('bride_instagram');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invitations', function (Blueprint $table) {
            $table->dropColumn(['groom_instagram', 'groom_photo', 'bride_instagram', 'bride_photo']);
        });
    }
};
