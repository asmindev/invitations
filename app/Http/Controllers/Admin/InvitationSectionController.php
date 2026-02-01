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
            'section_data' => 'sometimes|array',
            'order' => 'integer',
            'is_visible' => 'boolean',
        ]);

        // Handle file uploads for love_story section
        $sectionData = $validated['section_data'] ?? [];

        if ($validated['section_type'] === 'love_story' && $request->hasFile('story_images')) {
            $storyImages = $request->file('story_images');

            foreach ($storyImages as $index => $image) {
                if ($image) {
                    $path = $image->store('photos/stories', 'public');
                    if (isset($sectionData['stories'][$index])) {
                        $sectionData['stories'][$index]['image'] = $path;
                    }
                }
            }
        }

        $section = $invitation->sections()->updateOrCreate(
            ['section_type' => $validated['section_type']],
            [
                'section_data' => $sectionData,
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
     * Update existing section by type
     */
    public function update(Request $request, Invitation $invitation, string $type)
    {
        $validated = $request->validate([
            'section_data' => 'sometimes|array',
            'order' => 'sometimes|integer',
            'is_visible' => 'sometimes|boolean',
        ]);

        // Extract section_data from request if it exists
        $sectionData = $request->input('section_data', $request->all());

        // Find or create section by type
        $section = $invitation->sections()->updateOrCreate(
            ['section_type' => $type],
            [
                'section_data' => $sectionData,
                'order' => $validated['order'] ?? 0,
                'is_visible' => $validated['is_visible'] ?? true,
            ]
        );

        return redirect()
            ->route('admin.invitations.edit', $invitation)
            ->with('success', ucfirst(str_replace('_', ' ', $type)).' section updated successfully!');
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
