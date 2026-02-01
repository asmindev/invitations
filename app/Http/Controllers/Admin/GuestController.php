<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Guest;
use App\Models\Rsvp;
use App\Models\Wish;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class GuestController extends Controller
{
    public function index(Request $request)
    {
        $guests = Guest::query()
            ->with(['rsvps' => fn($q) => $q->latest()->take(1)])
            ->withCount(['rsvps', 'wishes'])
            ->when($request->search, fn($q, $search) =>
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
            )
            ->orderBy('name')
            ->paginate(15)
            ->withQueryString();

        $stats = [
            'total_guests' => Guest::count(),
            'total_rsvps' => Rsvp::count(),
            'attending' => Rsvp::where('status', 'attending')->count(),
            'not_attending' => Rsvp::where('status', 'not_attending')->count(),
            'total_pax' => Rsvp::where('status', 'attending')->sum('pax_confirmed'),
            'total_wishes' => Wish::count(),
        ];

        return Inertia::render('admin/guests/index', [
            'guests' => $guests,
            'stats' => $stats,
            'filters' => $request->only('search'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'pax' => 'required|integer|min:1|max:10',
        ]);

        $validated['slug'] = Str::slug($validated['name']) . '-' . Str::random(6);

        Guest::create($validated);

        return redirect()->back()->with('success', 'Guest created successfully.');
    }

    public function update(Request $request, Guest $guest)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'pax' => 'required|integer|min:1|max:10',
        ]);

        $guest->update($validated);

        return redirect()->back()->with('success', 'Guest updated successfully.');
    }

    public function destroy(Guest $guest)
    {
        $guest->delete();

        return redirect()->back()->with('success', 'Guest deleted successfully.');
    }

    public function generateLink(Guest $guest)
    {
        $baseUrl = config('app.url');
        $link = "{$baseUrl}/{$guest->slug}";

        return response()->json([
            'link' => $link,
            'guest' => $guest,
        ]);
    }
}
