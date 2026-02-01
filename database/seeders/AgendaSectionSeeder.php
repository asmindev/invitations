<?php

namespace Database\Seeders;

use App\Models\Invitation;
use App\Models\InvitationSection;
use Illuminate\Database\Seeder;

class AgendaSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all invitations
        $invitations = Invitation::all();

        foreach ($invitations as $invitation) {
            // Check if agenda section already exists
            $exists = InvitationSection::where('invitation_id', $invitation->id)
                ->where('section_type', 'agenda')
                ->exists();

            if (!$exists) {
                InvitationSection::create([
                    'invitation_id' => $invitation->id,
                    'section_type' => 'agenda',
                    'order' => 5,
                    'is_visible' => true,
                    'section_data' => [
                        'title' => "It's The Day",
                        'activities' => [
                            [
                                'icon_type' => 1,
                                'title' => 'Akad Nikah',
                                'time' => '09:00 - 10:00',
                                'venue' => [
                                    'name' => 'Four Points by Sheraton Bali, Kuta',
                                    'address' => 'Jl. Benesari, Banjar Pengabetan, Kec. Kuta, Kabupaten Badung, Bali 80361, Indonesia',
                                    'city' => 'Kabupaten Badung',
                                    'google_maps_url' => 'https://maps.google.com/?cid=6985520270396942070',
                                ],
                            ],
                            [
                                'icon_type' => 2,
                                'title' => 'Resepsi',
                                'time' => '11:00 - 17:00',
                                'venue' => [
                                    'name' => 'Four Points by Sheraton Bali, Kuta',
                                    'address' => 'Jl. Benesari, Banjar Pengabetan, Kec. Kuta, Kabupaten Badung, Bali 80361, Indonesia',
                                    'city' => 'Kabupaten Badung',
                                    'google_maps_url' => 'https://maps.google.com/?cid=6985520270396942070',
                                ],
                            ],
                        ],
                        'dress_codes' => [
                            [
                                'gender' => 'men',
                                'type' => 'ethnic',
                                'colors' => ['#E14444', '#D11414', '#F10303'],
                            ],
                            [
                                'gender' => 'women',
                                'type' => 'ethnic',
                                'colors' => ['#E14444', '#D11414', '#F10303'],
                            ],
                        ],
                    ],
                ]);
            }
        }
    }
}
