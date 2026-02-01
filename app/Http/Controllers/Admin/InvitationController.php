<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\InvitationSection;
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
            'wedding_date' => 'required|date',
            'wedding_time' => 'nullable|date_format:H:i',
            'hashtag' => 'nullable|string|max:255',
            'opening_text' => 'nullable|string',
            'closing_text' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

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

        return Inertia::render('admin/invitations/Edit', [
            'invitation' => $invitation,
            'sections' => $invitation->sections->groupBy('section_type'),
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
            'wedding_date' => 'required|date',
            'wedding_time' => 'nullable|date_format:H:i',
            'hashtag' => 'nullable|string|max:255',
            'opening_text' => 'nullable|string',
            'closing_text' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

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
