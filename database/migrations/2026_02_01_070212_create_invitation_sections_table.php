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
        Schema::create('invitation_sections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invitation_id')->constrained()->onDelete('cascade');
            $table->enum('section_type', [
                'couple',
                'save_date',
                'quote',
                'agenda',
                'rundown',
                'rsvp',
                'gallery',
                'video_gallery',
                'love_story',
                'live_streaming',
                'instagram_filter',
                'wedding_gift',
                'protocol',
                'wedding_wish',
                'notes',
                'footnote'
            ]);
            $table->json('section_data');
            $table->integer('order')->default(0);
            $table->boolean('is_visible')->default(true);
            $table->timestamps();

            $table->index(['invitation_id', 'section_type']);
            $table->index('order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invitation_sections');
    }
};
