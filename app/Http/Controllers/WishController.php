<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wish;
use Illuminate\Support\Facades\Redirect;

class WishController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'guest_id' => 'nullable|exists:guests,id',
            'name' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        Wish::create($validated);

        return Redirect::back()->with('success', 'Ucapan Anda berhasil dikirim.');
    }
}
