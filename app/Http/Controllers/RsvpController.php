<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rsvp;
use App\Models\Guest;

class RsvpController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'guest_id' => 'nullable|exists:guests,id',
            'name' => 'required|string|max:255',
            'status' => 'required|in:attending,declined,maybe',
            'pax_confirmed' => 'required|integer|min:1',
        ]);

        if (!empty($validated['guest_id'])) {
            $guest = Guest::find($validated['guest_id']);
            if ($validated['pax_confirmed'] > $guest->pax) {
                 return back()->withErrors(['pax_confirmed' => 'Jumlah tamu melebihi kuota undangan.']);
            }
        }

        Rsvp::create($validated);

        return back()->with('success', 'Terima kasih atas konfirmasi kehadiran Anda.');
    }
}
