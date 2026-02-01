<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    protected $fillable = ['name', 'slug', 'phone', 'pax'];

    public function rsvps()
    {
        return $this->hasMany(Rsvp::class);
    }

    public function wishes()
    {
        return $this->hasMany(Wish::class);
    }
}
