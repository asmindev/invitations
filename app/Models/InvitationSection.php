<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class InvitationSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'invitation_id',
        'section_type',
        'section_data',
        'order',
        'is_visible',
    ];

    protected $casts = [
        'section_data' => 'array',
        'is_visible' => 'boolean',
    ];

    /**
     * Section type constants
     */
    const TYPE_COUPLE = 'couple';
    const TYPE_SAVE_DATE = 'save_date';
    const TYPE_QUOTE = 'quote';
    const TYPE_AGENDA = 'agenda';
    const TYPE_RUNDOWN = 'rundown';
    const TYPE_RSVP = 'rsvp';
    const TYPE_GALLERY = 'gallery';
    const TYPE_VIDEO_GALLERY = 'video_gallery';
    const TYPE_LOVE_STORY = 'love_story';
    const TYPE_LIVE_STREAMING = 'live_streaming';
    const TYPE_INSTAGRAM_FILTER = 'instagram_filter';
    const TYPE_WEDDING_GIFT = 'wedding_gift';
    const TYPE_PROTOCOL = 'protocol';
    const TYPE_WEDDING_WISH = 'wedding_wish';
    const TYPE_NOTES = 'notes';
    const TYPE_FOOTNOTE = 'footnote';

    /**
     * Get the invitation that owns this section
     */
    public function invitation()
    {
        return $this->belongsTo(Invitation::class);
    }

    /**
     * Scope to filter by section type
     */
    public function scopeOfType($query, string $type)
    {
        return $query->where('section_type', $type);
    }

    /**
     * Scope to get only visible sections
     */
    public function scopeVisible($query)
    {
        return $query->where('is_visible', true);
    }
}
