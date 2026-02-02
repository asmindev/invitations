<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    protected $fillable = ['name', 'companion', 'slug', 'phone', 'pax'];

    /**
     * Get the full display name with companion if exists
     * Returns "Name & Companion" or just "Name"
     */
    protected function displayName(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->companion
                ? "{$this->name} & {$this->companion}"
                : $this->name
        );
    }

    public function rsvps()
    {
        return $this->hasMany(Rsvp::class);
    }

    public function wishes()
    {
        return $this->hasMany(Wish::class);
    }
}
