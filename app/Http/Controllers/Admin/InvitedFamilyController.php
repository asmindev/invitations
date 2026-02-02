<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\InvitedFamily;
use Illuminate\Http\Request;

class InvitedFamilyController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'invitation_id' => 'required|exists:invitations,id',
            'family_name' => 'required|string|max:255',
            'order' => 'nullable|integer',
        ]);

        $family = InvitedFamily::create($validated);

        return back()->with('success', 'Family added successfully');
    }

    public function update(Request $request, InvitedFamily $invitedFamily)
    {
        $validated = $request->validate([
            'family_name' => 'required|string|max:255',
            'order' => 'nullable|integer',
        ]);

        $invitedFamily->update($validated);

        return back()->with('success', 'Family updated successfully');
    }

    public function destroy(InvitedFamily $invitedFamily)
    {
        $invitedFamily->delete();

        return back()->with('success', 'Family deleted successfully');
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'families' => 'required|array',
            'families.*.id' => 'required|exists:invited_families,id',
            'families.*.order' => 'required|integer',
        ]);

        foreach ($request->families as $family) {
            InvitedFamily::where('id', $family['id'])->update(['order' => $family['order']]);
        }

        return back()->with('success', 'Order updated successfully');
    }
}
