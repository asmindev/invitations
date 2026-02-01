<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;

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
     * Accessor to transform gallery image paths to full URLs
     */
    protected function getSectionDataAttribute($value)
    {
        $data = is_string($value) ? json_decode($value, true) : $value;

        if (!$data) {
            return $data;
        }

        // Transform gallery image paths to full URLs
        if ($this->section_type === self::TYPE_GALLERY && isset($data['images'])) {
            $data['images'] = array_map(function ($image) {
                if (isset($image['path']) && !str_starts_with($image['path'], 'http')) {
                    $image['url'] = Storage::disk('public')->url($image['path']);
                } elseif (isset($image['url']) && !str_starts_with($image['url'], 'http')) {
                    $image['url'] = Storage::disk('public')->url($image['url']);
                }
                return $image;
            }, $data['images']);
        }

        // Transform save_date image path to full URL
        if ($this->section_type === self::TYPE_SAVE_DATE && isset($data['image_path'])) {
            $data['image_url'] = Storage::disk('public')->url($data['image_path']);
        } elseif ($this->section_type === self::TYPE_SAVE_DATE && isset($data['image_url']) && !str_starts_with($data['image_url'], 'http')) {
            $data['image_url'] = Storage::disk('public')->url($data['image_url']);
        }

        return $data;
    }

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
    const TYPE_FOOTER = 'footer';

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
