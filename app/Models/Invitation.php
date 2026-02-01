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
        'wedding_date',
        'wedding_time',
        'hashtag',
        'cover_image',
        'opening_text',
        'closing_text',
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
}
