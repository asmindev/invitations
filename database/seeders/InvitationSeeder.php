<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Invitation;
use App\Models\InvitationSection;

class InvitationSeeder extends Seeder
{
    public function run(): void
    {
        $invitation = Invitation::create([
            'slug' => 'marcell-lisa',
            'groom_name' => 'Marcell',
            'groom_full_name' => 'Marcell Henderson',
            'groom_father' => 'Robert Henderson',
            'groom_mother' => 'Maria Henderson',
            'bride_name' => 'Lisa',
            'bride_full_name' => 'Lisa Anderson',
            'bride_father' => 'David Anderson',
            'bride_mother' => 'Sarah Anderson',
            'wedding_date' => '2024-01-28',
            'wedding_time' => '14:00',
            'hashtag' => '#PromDateToLifeMate',
            'opening_text' => 'With joyful hearts, we invite you to celebrate our wedding',
            'closing_text' => 'Thank you for being part of our special day',
            'is_active' => true,
        ]);

        // Rundown Section
        InvitationSection::create([
            'invitation_id' => $invitation->id,
            'section_type' => 'rundown',
            'section_data' => [
                'events' => [
                    [
                        'title' => 'Resepsi',
                        'agendas' => [
                            ['time' => '11:00 AM', 'text' => 'Grand Entrance'],
                            ['time' => '11:15 AM', 'text' => 'Cut the cake & Speeches'],
                            ['time' => '11:30 AM', 'text' => 'Photo Session'],
                            ['time' => '12:30 PM', 'text' => 'First Dance Bride & Groom'],
                            ['time' => '1:00 PM', 'text' => 'Games'],
                            ['time' => '1:30 PM', 'text' => 'Grand Exit'],
                        ],
                    ],
                ],
            ],
            'order' => 1,
            'is_visible' => true,
        ]);

        // Gallery Section
        InvitationSection::create([
            'invitation_id' => $invitation->id,
            'section_type' => 'gallery',
            'section_data' => [
                'title' => 'Portraits of Us',
                'images' => [
                    [
                        'url' => 'https://img.katsudoto.id/vCLU5kOojq8g9rbSWX49l3KLhCvLVA5jt4GAGgyWQjU/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2dhbGxlcnkvdGh1bWJfbGdfMTg1OTg5XzE2OTExMzk1MjZfMTYwMF8xNjAwLmpwZWc.webp',
                        'alt' => 'Couple Photo 1',
                    ],
                    [
                        'url' => 'https://img.katsudoto.id/oOhZ3mRDIx1SCaJeFQNv3JXo3PZbU9tYX8cBed_NXrA/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2dhbGxlcnkvdGh1bWJfbGdfMTg1OTkwXzE2OTExMzk1MjdfMTYwMF8xNjAwLmpwZWc.webp',
                        'alt' => 'Couple Photo 2',
                    ],
                ],
            ],
            'order' => 2,
            'is_visible' => true,
        ]);

        // Love Story Section
        InvitationSection::create([
            'invitation_id' => $invitation->id,
            'section_type' => 'love_story',
            'section_data' => [
                'title' => 'Our Story',
                'stories' => [
                    [
                        'title' => 'First Date',
                        'caption' => 'Marcell and Lisa\'s love story is nothing but adorable! It is the simple things in life that keeps the sparkles flying.',
                        'image' => 'https://img.katsudoto.id/dat_96IPWtzIGo76E62GxTVTdNu2jJXRr1A9uNa1ins/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L3N0b3J5L3RodW1iX2xnXzE4NTk3N18xNjkxMTM5MTg0XzE2MDBfMTYwMC5qcGVn.webp',
                    ],
                    [
                        'title' => 'We\'re Forever',
                        'caption' => 'What we are looking forward to the most, besides getting to spend the rest of our lives together, is having everyone that we truly care about together.',
                        'image' => 'https://img.katsudoto.id/JxPjyj-ciaX3jIDpatPtuk00bc7OzgIHoJv62MfYXbw/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L3N0b3J5L3RodW1iX2xnXzE4NTk3OF8xNjkxMTM5MjEzXzE2MDBfMTYwMC5qcGVn.webp',
                    ],
                ],
            ],
            'order' => 3,
            'is_visible' => true,
        ]);

        // Wedding Gift Section
        InvitationSection::create([
            'invitation_id' => $invitation->id,
            'section_type' => 'wedding_gift',
            'section_data' => [
                'title' => 'Wedding Gift',
                'description' => 'Your blessing and coming to our wedding are enough for us. However, if you want to give a gift we provide a Digital Envelope to make it easier for you. Thank you!',
                'banks' => [
                    [
                        'name' => 'BANK BCA (014)',
                        'account_number' => '8375180797',
                        'account_name' => 'Marcell Henderson',
                    ],
                    [
                        'name' => 'BANK MANDIRI (008)',
                        'account_number' => '1234567890',
                        'account_name' => 'Lisa Anderson',
                    ],
                ],
            ],
            'order' => 4,
            'is_visible' => true,
        ]);

        $this->command->info('✅ Sample invitation created: ' . $invitation->slug);
        $this->command->info('📧 Groom: ' . $invitation->groom_name);
        $this->command->info('👰 Bride: ' . $invitation->bride_name);
        $this->command->info('📅 Date: ' . $invitation->wedding_date->format('F d, Y'));
        $this->command->info('🔗 URL: /' . $invitation->slug);
    }
}
