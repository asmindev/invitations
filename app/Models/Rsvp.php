<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rsvp extends Model
{
    protected $fillable = ['guest_id', 'name', 'pax_confirmed', 'status'];

    public function guest()
    {
        return $this->belongsTo(Guest::class);
    }
}
