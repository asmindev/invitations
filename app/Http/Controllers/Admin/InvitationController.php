<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvitationController extends Controller
{
    /**
     * Display a listing of invitations
     */
    public function index()
    {
        $invitations = Invitation::withCount('sections')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('admin/invitations/Index', [
            'invitations' => $invitations,
        ]);
    }

    /**
     * Show the form for creating a new invitation
     */
    public function create()
    {
        return Inertia::render('admin/invitations/Create');
    }

    /**
     * Store a newly created invitation
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'slug' => 'nullable|string|unique:invitations',
            'groom_name' => 'required|string|max:255',
            'groom_full_name' => 'nullable|string|max:255',
            'groom_father' => 'nullable|string|max:255',
            'groom_mother' => 'nullable|string|max:255',
            'bride_name' => 'required|string|max:255',
            'bride_full_name' => 'nullable|string|max:255',
            'bride_father' => 'nullable|string|max:255',
            'bride_mother' => 'nullable|string|max:255',
            'groom_instagram' => 'nullable|string|max:255',
            'groom_photo' => 'nullable|image|max:2048',
            'bride_instagram' => 'nullable|string|max:255',
            'bride_photo' => 'nullable|image|max:2048',
            'cover_photo' => 'nullable|image|max:2048',
            'primary_pane_photo' => 'nullable|image|max:2048',
            'couple_title' => 'nullable|string|max:255',
            'couple_introduction' => 'nullable|string',
            'wedding_date' => 'required|date',
            'wedding_time' => ['nullable', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/'],
            'hashtag' => 'nullable|string|max:255',
            'opening_text' => 'nullable|string',
            'closing_text' => 'nullable|string',
            'audio_url' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('groom_photo')) {
            $validated['groom_photo'] = $request->file('groom_photo')->store('photos', 'public');
        }

        if ($request->hasFile('bride_photo')) {
            $validated['bride_photo'] = $request->file('bride_photo')->store('photos', 'public');
        }

        if ($request->hasFile('cover_photo')) {
            $validated['cover_photo'] = $request->file('cover_photo')->store('photos', 'public');
        }

        if ($request->hasFile('primary_pane_photo')) {
            $validated['primary_pane_photo'] = $request->file('primary_pane_photo')->store('photos', 'public');
        }

        $invitation = Invitation::create($validated);

        return redirect()
            ->route('admin.invitations.edit', $invitation)
            ->with('success', 'Invitation created successfully!');
    }

    /**
     * Show the form for editing an invitation
     */
    public function edit(Invitation $invitation)
    {
        $invitation->load('sections');

        // Transform sections into associative array by type with section_data
        $sections = $invitation->sections->groupBy('section_type')->map(function ($sectionGroup) {
            // Get the first section of this type and return its section_data
            return $sectionGroup->first()->section_data ?? [];
        });

        return Inertia::render('admin/invitations/Edit', [
            'invitation' => $invitation,
            'sections' => $sections,
        ]);
    }

    /**
     * Update the specified invitation
     */
    public function update(Request $request, Invitation $invitation)
    {
        $validated = $request->validate([
            'slug' => 'nullable|string|unique:invitations,slug,' . $invitation->id,
            'groom_name' => 'required|string|max:255',
            'groom_full_name' => 'nullable|string|max:255',
            'groom_father' => 'nullable|string|max:255',
            'groom_mother' => 'nullable|string|max:255',
            'bride_name' => 'required|string|max:255',
            'bride_full_name' => 'nullable|string|max:255',
            'bride_father' => 'nullable|string|max:255',
            'bride_mother' => 'nullable|string|max:255',
            'groom_instagram' => 'nullable|string|max:255',
            'groom_photo' => 'nullable|image|max:2048',
            'bride_instagram' => 'nullable|string|max:255',
            'bride_photo' => 'nullable|image|max:2048',
            'cover_photo' => 'nullable|image|max:2048',
            'primary_pane_photo' => 'nullable|image|max:2048',
            'couple_title' => 'nullable|string|max:255',
            'couple_introduction' => 'nullable|string',
            'wedding_date' => 'required|date',
            'wedding_time' => ['nullable', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/'],
            'hashtag' => 'nullable|string|max:255',
            'opening_text' => 'nullable|string',
            'closing_text' => 'nullable|string',
            'audio_url' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('groom_photo')) {
            $validated['groom_photo'] = $request->file('groom_photo')->store('photos', 'public');
        } else {
            unset($validated['groom_photo']);
        }

        if ($request->hasFile('bride_photo')) {
            $validated['bride_photo'] = $request->file('bride_photo')->store('photos', 'public');
        } else {
            unset($validated['bride_photo']);
        }

        if ($request->hasFile('cover_photo')) {
            $validated['cover_photo'] = $request->file('cover_photo')->store('photos', 'public');
        } else {
            unset($validated['cover_photo']);
        }

        if ($request->hasFile('primary_pane_photo')) {
            $validated['primary_pane_photo'] = $request->file('primary_pane_photo')->store('photos', 'public');
        } else {
            unset($validated['primary_pane_photo']);
        }

        $invitation->update($validated);

        return redirect()
            ->route('admin.invitations.edit', $invitation)
            ->with('success', 'Invitation updated successfully!');
    }

    /**
     * Remove the specified invitation
     */
    public function destroy(Invitation $invitation)
    {
        $invitation->delete();

        return redirect()
            ->route('admin.invitations.index')
            ->with('success', 'Invitation deleted successfully!');
    }
}
