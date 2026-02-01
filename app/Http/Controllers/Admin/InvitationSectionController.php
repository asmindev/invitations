<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\InvitationSection;
use Illuminate\Http\Request;

class InvitationSectionController extends Controller
{
    /**
     * Update or create a section
     */
    public function store(Request $request, Invitation $invitation)
    {
        $validated = $request->validate([
            'section_type' => 'required|string',
            'section_data' => 'required|array',
            'order' => 'integer',
            'is_visible' => 'boolean',
        ]);

        $section = $invitation->sections()->updateOrCreate(
            ['section_type' => $validated['section_type']],
            [
                'section_data' => $validated['section_data'],
                'order' => $validated['order'] ?? 0,
                'is_visible' => $validated['is_visible'] ?? true,
            ]
        );

        return response()->json([
            'success' => true,
            'section' => $section,
        ]);
    }

    /**
     * Update existing section
     */
    public function update(Request $request, Invitation $invitation, InvitationSection $section)
    {
        $validated = $request->validate([
            'section_data' => 'sometimes|array',
            'order' => 'sometimes|integer',
            'is_visible' => 'sometimes|boolean',
        ]);

        $section->update($validated);

        return response()->json([
            'success' => true,
            'section' => $section,
        ]);
    }

    /**
     * Delete a section
     */
    public function destroy(Invitation $invitation, InvitationSection $section)
    {
        $section->delete();

        return response()->json([
            'success' => true,
            'message' => 'Section deleted successfully',
        ]);
    }
}
