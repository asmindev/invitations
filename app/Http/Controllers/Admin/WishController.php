<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Wish;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WishController extends Controller
{
    public function index(Request $request)
    {
        $wishes = Wish::query()
            ->with('guest:id,name')
            ->when($request->search, fn($q, $search) =>
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%")
            )
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('admin/wishes/index', [
            'wishes' => $wishes,
            'filters' => $request->only('search'),
        ]);
    }

    public function destroy(Wish $wish)
    {
        $wish->delete();

        return redirect()->back()->with('success', 'Wish deleted successfully.');
    }
}
