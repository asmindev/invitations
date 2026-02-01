<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wish extends Model
{
    protected $fillable = ['guest_id', 'name', 'message'];

    public function guest()
    {
        return $this->belongsTo(Guest::class);
    }
}
