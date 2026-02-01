<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Rsvp;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RsvpController extends Controller
{
    public function index(Request $request)
    {
        $rsvps = Rsvp::query()
            ->with('guest:id,name,pax')
            ->when($request->search, fn($q, $search) =>
                $q->where('name', 'like', "%{$search}%")
            )
            ->when($request->status, fn($q, $status) =>
                $q->where('status', $status)
            )
            ->latest()
            ->paginate(20)
            ->withQueryString();

        $stats = [
            'total' => Rsvp::count(),
            'attending' => Rsvp::where('status', 'attending')->count(),
            'not_attending' => Rsvp::where('status', 'not_attending')->count(),
            'total_pax' => Rsvp::where('status', 'attending')->sum('pax_confirmed'),
        ];

        return Inertia::render('admin/rsvps/index', [
            'rsvps' => $rsvps,
            'stats' => $stats,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function destroy(Rsvp $rsvp)
    {
        $rsvp->delete();

        return redirect()->back()->with('success', 'RSVP deleted successfully.');
    }
}
