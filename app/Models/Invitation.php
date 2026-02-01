<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Invitation extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'groom_name',
        'groom_full_name',
        'groom_father',
        'groom_mother',
        'bride_name',
        'bride_full_name',
        'bride_father',
        'bride_mother',
        'groom_instagram',
        'groom_photo',
        'bride_instagram',
        'bride_photo',
        'cover_photo',
        'primary_pane_photo',
        'couple_title',
        'couple_introduction',
        'wedding_date',
        'wedding_time',
        'hashtag',
        'cover_image',
        'opening_text',
        'closing_text',
        'audio_url',
        'is_active',
    ];

    protected $casts = [
        'wedding_date' => 'date',
        'is_active' => 'boolean',
    ];

    /**
     * Get all sections for this invitation
     */
    public function sections()
    {
        return $this->hasMany(InvitationSection::class)->orderBy('order');
    }

    /**
     * Get a specific section by type
     */
    public function getSection(string $type)
    {
        return $this->sections()->where('section_type', $type)->first();
    }

    /**
     * Get visible sections only
     */
    public function visibleSections()
    {
        return $this->hasMany(InvitationSection::class)
            ->where('is_visible', true)
            ->orderBy('order');
    }

    /**
     * Scope to get active invitations
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to find by slug
     */
    public function scopeBySlug($query, string $slug)
    {
        return $query->where('slug', $slug);
    }

    /**
     * Auto-generate slug from couple names if not provided
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($invitation) {
            if (empty($invitation->slug)) {
                $invitation->slug = \Str::slug($invitation->groom_name . '-' . $invitation->bride_name);
            }
        });
    }
    /**
     * Get the groom's photo URL.
     */
    protected function groomPhoto(): \Illuminate\Database\Eloquent\Casts\Attribute
    {
        return \Illuminate\Database\Eloquent\Casts\Attribute::make(
            get: fn($value) => $value ? url('storage/' . $value) : null,
        );
    }

    /**
     * Get the bride's photo URL.
     */
    protected function bridePhoto(): \Illuminate\Database\Eloquent\Casts\Attribute
    {
        return \Illuminate\Database\Eloquent\Casts\Attribute::make(
            get: fn($value) => $value ? url('storage/' . $value) : null,
        );
    }

    /**
     * Get the cover photo URL.
     */
    protected function coverPhoto(): \Illuminate\Database\Eloquent\Casts\Attribute
    {
        return \Illuminate\Database\Eloquent\Casts\Attribute::make(
            get: fn($value) => $value ? url('storage/' . $value) : null,
        );
    }

    /**
     * Get the primary pane photo URL.
     */
    protected function primaryPanePhoto(): \Illuminate\Database\Eloquent\Casts\Attribute
    {
        return \Illuminate\Database\Eloquent\Casts\Attribute::make(
            get: fn($value) => $value ? url('storage/' . $value) : null,
        );
    }
}
