<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    /**
     * Upload an image for a specific section
     */
    public function upload(Request $request, Invitation $invitation)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB max
            'folder' => 'nullable|string',
        ]);

        $folder = $request->input('folder', 'gallery');
        $file = $request->file('image');
        $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();

        // Store in public/{folder}/{invitation_id}/
        $path = $file->storeAs(
            "{$folder}/{$invitation->id}",
            $filename,
            'public'
        );

        return response()->json([
            'success' => true,
            'path' => $path,
            'url' => Storage::disk('public')->url($path),
        ]);
    }

    /**
     * Delete an image
     */
    public function destroy(Request $request, Invitation $invitation)
    {
        $request->validate([
            'path' => 'required|string',
        ]);

        $path = $request->input('path');

        // Security check: ensure path is inside public Disk
        if (!Storage::disk('public')->exists($path)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        Storage::disk('public')->delete($path);

        return response()->json(['success' => true]);
    }
}
