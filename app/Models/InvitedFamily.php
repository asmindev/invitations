<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class InvitedFamily extends Model
{
    use HasFactory;

    protected $fillable = [
        'invitation_id',
        'family_name',
        'order',
    ];

    public function invitation()
    {
        return $this->belongsTo(Invitation::class);
    }
}
