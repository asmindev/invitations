<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Guest;
use App\Models\Wish;
use App\Models\Invitation;

class InvitationController extends Controller
{
    public function index(Request $request)
    {
        $guest = null;
        if ($request->has('to')) {
            $guest = Guest::where('slug', $request->to)->first();
        }

        $wishes = Wish::with('guest')->latest()->limit(50)->get();

        return Inertia::render('HelgaTemplate', [
            'guest' => $guest,
            'wishes' => $wishes
        ])->rootView('helga');
    }

    public function show(string $slug)
    {
        // Check if it's a guest slug or invitation slug
        $guest = Guest::where('slug', $slug)->first();

        if ($guest) {
            // Original guest-based flow
            $wishes = Wish::with('guest')->latest()->limit(50)->get();

            return Inertia::render('HelgaTemplate', [
                'guest' => $guest,
                'wishes' => $wishes
            ])->rootView('helga');
        }

        // New: CMS-based invitation flow
        $invitation = Invitation::with(['visibleSections'])
            ->active()
            ->bySlug($slug)
            ->firstOrFail();

        // Group sections by type for easy access in React
        $sectionsData = [];
        foreach ($invitation->visibleSections as $section) {
            $sectionsData[$section->section_type] = $section->section_data;
        }

        return Inertia::render('HelgaTemplate', [
            'invitation' => [
                'slug' => $invitation->slug,
                'groom_name' => $invitation->groom_name,
                'groom_full_name' => $invitation->groom_full_name,
                'bride_name' => $invitation->bride_name,
                'bride_full_name' => $invitation->bride_full_name,
                'wedding_date' => $invitation->wedding_date->format('Y-m-d'),
                'wedding_time' => $invitation->wedding_time,
                'hashtag' => $invitation->hashtag,
            ],
            'sections' => $sectionsData,
        ])->rootView('helga');
    }
}
