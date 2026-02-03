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

        // Load the first active invitation with sections
        $invitation = Invitation::with(['visibleSections', 'invitedFamilies'])
            ->active()
            ->first();

        if (!$invitation) {
            return Inertia::render('HelgaTemplate', [
                'guest' => $guest,
                'wishes' => $wishes
            ])->rootView('helga');
        }

        // Group sections by type for easy access in React
        $sectionsData = [];
        foreach ($invitation->visibleSections as $section) {
            $sectionsData[$section->section_type] = $section->section_data;
        }

        // Ensure consistency by injecting invitation fields into couple section
        $sectionsData['couple'] = array_merge($sectionsData['couple'] ?? [], [
            'title' => $invitation->couple_title ?? 'The Wedding Of',
            'opening_text' => $invitation->couple_introduction ?? 'Assalamualaikum...',
            'groom' => [
                'name' => $invitation->groom_full_name,
                'parents' => "Putra sulung dari Bapak {$invitation->groom_father} & Ibu {$invitation->groom_mother}",
                'instagram' => $invitation->groom_instagram,
                'photo' => $invitation->groom_photo,
            ],
            'bride' => [
                'name' => $invitation->bride_full_name,
                'parents' => "Putri Bungsu dari Bapak {$invitation->bride_father} & Ibu {$invitation->bride_mother}",
                'instagram' => $invitation->bride_instagram,
                'photo' => $invitation->bride_photo,
            ],
        ]);

        return Inertia::render('HelgaTemplate', [
            'guest' => $guest,
            'wishes' => $wishes,
            'invitation' => [
                'slug' => $invitation->slug,
                'groom_name' => $invitation->groom_name,
                'groom_full_name' => $invitation->groom_full_name,
                'groom_father' => $invitation->groom_father,
                'groom_mother' => $invitation->groom_mother,
                'groom_instagram' => $invitation->groom_instagram,
                'groom_photo' => $invitation->groom_photo,
                'bride_name' => $invitation->bride_name,
                'bride_full_name' => $invitation->bride_full_name,
                'bride_father' => $invitation->bride_father,
                'bride_mother' => $invitation->bride_mother,
                'bride_instagram' => $invitation->bride_instagram,
                'bride_photo' => $invitation->bride_photo,
                'cover_photo' => $invitation->cover_photo,
                'primary_pane_photo' => $invitation->primary_pane_photo,
                'couple_title' => $invitation->couple_title,
                'couple_introduction' => $invitation->couple_introduction,
                'wedding_date' => $invitation->wedding_date->format('Y-m-d'),
                'wedding_time' => $invitation->wedding_time,
                'hashtag' => $invitation->hashtag,
                'opening_text' => $invitation->opening_text,
                'closing_text' => $invitation->closing_text,
                'audio_url' => $invitation->audio_url,
            ],
            'sections' => $sectionsData,
            'invited_families' => $invitation->invitedFamilies,
        ])->rootView('helga');
    }

    public function show(string $slug)
    {
        // Check if it's a guest slug or invitation slug
        $guest = Guest::where('slug', $slug)->first();

        // Load invitation regardless of whether it's a guest or invitation slug
        $invitation = null;

        if ($guest) {
            // Guest-based flow - load the first active invitation
            $invitation = Invitation::with(['visibleSections', 'invitedFamilies'])
                ->active()
                ->first();
        } else {
            // Invitation slug flow
            $invitation = Invitation::with(['visibleSections', 'invitedFamilies'])
                ->active()
                ->bySlug($slug)
                ->firstOrFail();
        }

        if (!$invitation) {
            abort(404, 'No active invitation found');
        }

        $wishes = Wish::with('guest')->latest()->limit(50)->get();

        // Group sections by type for easy access in React
        $sectionsData = [];
        foreach ($invitation->visibleSections as $section) {
            $sectionsData[$section->section_type] = $section->section_data;
        }

        // Ensure consistency by injecting invitation fields into couple section
        $sectionsData['couple'] = array_merge($sectionsData['couple'] ?? [], [
            'title' => $invitation->couple_title ?? 'The Wedding Of',
            'opening_text' => $invitation->couple_introduction ?? 'Assalamualaikum...',
            'groom' => [
                'name' => $invitation->groom_full_name,
                'parents' => "Putra sulung dari Bapak {$invitation->groom_father} & Ibu {$invitation->groom_mother}",
                'instagram' => $invitation->groom_instagram,
                'photo' => $invitation->groom_photo,
            ],
            'bride' => [
                'name' => $invitation->bride_full_name,
                'parents' => "Putri Bungsu dari Bapak {$invitation->bride_father} & Ibu {$invitation->bride_mother}",
                'instagram' => $invitation->bride_instagram,
                'photo' => $invitation->bride_photo,
            ],
        ]);

        return Inertia::render('HelgaTemplate', [
            'guest' => $guest,
            'wishes' => $wishes,
            'invitation' => [
                'slug' => $invitation->slug,
                'groom_name' => $invitation->groom_name,
                'groom_full_name' => $invitation->groom_full_name,
                'groom_father' => $invitation->groom_father,
                'groom_mother' => $invitation->groom_mother,
                'groom_instagram' => $invitation->groom_instagram,
                'groom_photo' => $invitation->groom_photo,
                'bride_name' => $invitation->bride_name,
                'bride_full_name' => $invitation->bride_full_name,
                'bride_father' => $invitation->bride_father,
                'bride_mother' => $invitation->bride_mother,
                'bride_instagram' => $invitation->bride_instagram,
                'bride_photo' => $invitation->bride_photo,
                'cover_photo' => $invitation->cover_photo,
                'primary_pane_photo' => $invitation->primary_pane_photo,
                'couple_title' => $invitation->couple_title,
                'couple_introduction' => $invitation->couple_introduction,
                'wedding_date' => $invitation->wedding_date->format('Y-m-d'),
                'wedding_time' => $invitation->wedding_time,
                'hashtag' => $invitation->hashtag,
                'opening_text' => $invitation->opening_text,
                'closing_text' => $invitation->closing_text,
                'audio_url' => $invitation->audio_url,
            ],
            'sections' => $sectionsData,
            'invited_families' => $invitation->invitedFamilies,
        ])->rootView('helga');
    }
}
