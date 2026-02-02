<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\InvitationController;
use App\Http\Controllers\RsvpController;
use App\Http\Controllers\WishController;
use App\Http\Controllers\Admin\GuestController as AdminGuestController;
use App\Http\Controllers\Admin\RsvpController as AdminRsvpController;
use App\Http\Controllers\Admin\WishController as AdminWishController;

// Public routes
Route::get('/', [InvitationController::class, 'index'])->name('invitation.index');
Route::get('/{slug}', [InvitationController::class, 'show'])->name('invitation.show');
Route::post('/rsvp', [RsvpController::class, 'store'])->name('rsvp.store');
Route::post('/wishes', [WishController::class, 'store'])->name('wishes.store');

// Admin routes
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('admin/dashboard'))->name('dashboard');

    // Guest Management
    Route::get('/guests', [AdminGuestController::class, 'index'])->name('guests.index');
    Route::post('/guests', [AdminGuestController::class, 'store'])->name('guests.store');
    Route::put('/guests/{guest}', [AdminGuestController::class, 'update'])->name('guests.update');
    Route::delete('/guests/{guest}', [AdminGuestController::class, 'destroy'])->name('guests.destroy');
    Route::get('/guests/{guest}/link', [AdminGuestController::class, 'generateLink'])->name('guests.link');

    // RSVP Management
    Route::get('/rsvps', [AdminRsvpController::class, 'index'])->name('rsvps.index');
    Route::delete('/rsvps/{rsvp}', [AdminRsvpController::class, 'destroy'])->name('rsvps.destroy');

    // Wishes Management
    Route::get('/wishes', [AdminWishController::class, 'index'])->name('wishes.index');
    Route::delete('/wishes/{wish}', [AdminWishController::class, 'destroy'])->name('wishes.destroy');

    // Invitation Management
    Route::resource('invitations', \App\Http\Controllers\Admin\InvitationController::class);
    Route::post('/invitations/{invitation}/sections', [\App\Http\Controllers\Admin\InvitationSectionController::class, 'store'])->name('invitations.sections.store');
    Route::put('/invitations/{invitation}/sections/{section}', [\App\Http\Controllers\Admin\InvitationSectionController::class, 'update'])->name('invitations.sections.update');
    Route::delete('/invitations/{invitation}/sections/{section}', [\App\Http\Controllers\Admin\InvitationSectionController::class, 'destroy'])->name('invitations.sections.destroy');

    // Gallery & Section image uploads
    Route::post('/invitations/{invitation}/gallery/upload', [\App\Http\Controllers\Admin\MediaController::class, 'upload'])->name('invitations.gallery.upload');
    Route::delete('/invitations/{invitation}/gallery/delete', [\App\Http\Controllers\Admin\MediaController::class, 'destroy'])->name('invitations.gallery.destroy');

    // Invited Families
    Route::post('/invited-families', [\App\Http\Controllers\Admin\InvitedFamilyController::class, 'store'])->name('invited-families.store');
    Route::put('/invited-families/{invitedFamily}', [\App\Http\Controllers\Admin\InvitedFamilyController::class, 'update'])->name('invited-families.update');
    Route::delete('/invited-families/{invitedFamily}', [\App\Http\Controllers\Admin\InvitedFamilyController::class, 'destroy'])->name('invited-families.destroy');
    Route::post('/invited-families/reorder', [\App\Http\Controllers\Admin\InvitedFamilyController::class, 'reorder'])->name('invited-families.reorder');
});

require __DIR__ . '/auth.php';
