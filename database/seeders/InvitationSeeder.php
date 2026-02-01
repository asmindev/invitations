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
            'groom_full_name' => 'Marcell Bramantyo Henderson',
            'groom_father' => 'Erik Cahyo',
            'groom_mother' => 'Puspita',
            'bride_name' => 'Lisa',
            'bride_full_name' => 'Lisa Jesslyne Hadid Anderson',
            'bride_father' => 'Santoso',
            'bride_mother' => 'Angeline',
            'wedding_date' => '2024-12-28',
            'wedding_time' => '14:00',
            'hashtag' => '#PromDateToLifeMate',
            'opening_text' => 'بِسْــــــــــــــــــمِ اللهِ الرَّحْمَنِ الرَّحِيْمِ

Assalamualaikum Warahmatullahi Wabarakatuh

With the blessing and mercy from Allah SWT, We cordially invite you to the wedding of:',
            'closing_text' => 'Thank you for being part of our special day. Your presence means the world to us.',
            'is_active' => true,
        ]);

        // 1. Quote Section
        InvitationSection::create([
            'invitation_id' => $invitation->id,
            'section_type' => 'quote',
            'section_data' => [
                'text' => 'And among His Signs is this, that He created for you mates from among yourselves, that ye may dwell in tranquility with them, and He has put love and mercy between your hearts. Verily in that are Signs for those who reflect.',
                'reference' => 'QS. Ar-Rum : 21',
            ],
            'order' => 0,
            'is_visible' => true,
        ]);

        // 2. Couple Section
        InvitationSection::create([
            'invitation_id' => $invitation->id,
            'section_type' => 'couple',
            'section_data' => [
                'title' => 'The Wedding Of',
                'opening_text' => $invitation->opening_text,
                'groom' => [
                    'name' => $invitation->groom_full_name,
                    'parents' => 'The Son of Mr. ' . $invitation->groom_father . ' & Mrs. ' . $invitation->groom_mother,
                    'instagram' => '@marcellbram',
                    'photo' => 'https://img.katsudoto.id/9zwUwEzMtPWsc2Tp2tIS8-64L9AfAh5hWDRALYzu2BY/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2NvdXBsZS90aHVtYl9sZ18xODU5ODdfMTY5MTEzOTQyOV8xMjAwXzEyMDAuanBlZw.webp',
                ],
                'bride' => [
                    'name' => $invitation->bride_full_name,
                    'parents' => 'The Daughter of Mr. ' . $invitation->bride_father . ' & Mrs. ' . $invitation->bride_mother,
                    'instagram' => '@lisajesslyne',
                    'photo' => 'https://img.katsudoto.id/EOwu2bpvfw_UYlmwF6xFgDpdb9nFdkXonzoziChcXqY/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2NvdXBsZS90aHVtYl9sZ18xODU5ODhfMTY5MTEzOTQ1N18xMjAwXzEyMDAuanBlZw.webp',
                ],
            ],
            'order' => 1,
            'is_visible' => true,
        ]);

        // 3. Save the Date Section
        InvitationSection::create([
            'invitation_id' => $invitation->id,
            'section_type' => 'save_date',
            'section_data' => [
                'title' => 'Save The Date',
                'date' => $invitation->wedding_date,
                'time' => $invitation->wedding_time,
                'venue' => [
                    'name' => 'The Ritz-Carlton Jakarta',
                    'address' => 'Mega Kuningan, Jakarta Selatan',
                    'google_maps_url' => 'https://maps.google.com/?q=-6.2253,106.8286',
                ],
            ],
            'order' => 2,
            'is_visible' => true,
        ]);

        // 4. Rundown Section
        InvitationSection::create([
            'invitation_id' => $invitation->id,
            'section_type' => 'rundown',
            'section_data' => [
                'events' => [
                    [
                        'title' => 'Akad Nikah',
                        'agendas' => [
                            ['time' => '09:00 AM', 'text' => 'Guest Arrival'],
                            ['time' => '09:30 AM', 'text' => 'Akad Ceremony'],
                            ['time' => '10:00 AM', 'text' => 'Photo Session'],
                        ],
                    ],
                    [
                        'title' => 'Resepsi',
                        'agendas' => [
                            ['time' => '11:00 AM', 'text' => 'Grand Entrance'],
                            ['time' => '11:15 AM', 'text' => 'Cut the Cake & Speeches'],
                            ['time' => '11:30 AM', 'text' => 'Photo Session'],
                            ['time' => '12:30 PM', 'text' => 'First Dance Bride & Groom'],
                            ['time' => '1:00 PM', 'text' => 'Games & Entertainment'],
                            ['time' => '1:30 PM', 'text' => 'Grand Exit'],
                        ],
                    ],
                ],
            ],
            'order' => 3,
            'is_visible' => true,
        ]);

        // 5. RSVP Section
        InvitationSection::create([
            'invitation_id' => $invitation->id,
            'section_type' => 'rsvp',
            'section_data' => [
                'title' => 'RSVP',
                'description' => 'Please confirm your attendance by filling out the form below.',
                'deadline' => '2024-12-20',
            ],
            'order' => 4,
            'is_visible' => true,
        ]);

        // 6. Gallery Section
        InvitationSection::create([
            'invitation_id' => $invitation->id,
            'section_type' => 'gallery',
            'section_data' => [
                'title' => 'Portraits of Us',
                'images' => [
                    [
                        'url' => 'https://img.katsudoto.id/vCLU5kOojq8g9rbSWX49l3KLhCvLVA5jt4GAGgyWQjU/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2dhbGxlcnkvdGh1bWJfbGdfMTg1OTg5XzE2OTExMzk1MjZfMTYwMF8xNjAwLmpwZWc.webp',
                        'alt' => 'Couple Portrait 1',
                    ],
                    [
                        'url' => 'https://img.katsudoto.id/oOhZ3mRDIx1SCaJeFQNv3JXo3PZbU9tYX8cBed_NXrA/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2dhbGxlcnkvdGh1bWJfbGdfMTg1OTkwXzE2OTExMzk1MjdfMTYwMF8xNjAwLmpwZWc.webp',
                        'alt' => 'Couple Portrait 2',
                    ],
                    [
                        'url' => 'https://img.katsudoto.id/bSJb4eNZzFBvojTZGvPfgtEeWbFUnA0TzP3xBpXm_D4/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2dhbGxlcnkvdGh1bWJfbGdfMTg1OTkxXzE2OTExMzk1MjdfMTYwMF8xNjAwLmpwZWc.webp',
                        'alt' => 'Couple Portrait 3',
                    ],
                    [
                        'url' => 'https://img.katsudoto.id/ruJDoeeXOOSvCJR2dfBF49h3zEgayYgpIXAo0aJmSbU/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L2dhbGxlcnkvdGh1bWJfbGdfMTg1OTkyXzE2OTExMzk1MjhfMTYwMF8xNjAwLmpwZWc.webp',
                        'alt' => 'Couple Portrait 4',
                    ],
                ],
            ],
            'order' => 5,
            'is_visible' => true,
        ]);

        // 7. Love Story Section
        InvitationSection::create([
            'invitation_id' => $invitation->id,
            'section_type' => 'love_story',
            'section_data' => [
                'title' => 'Our Story',
                'stories' => [
                    [
                        'title' => 'First Date',
                        'caption' => 'Marcell and Lisa\'s love story is nothing but adorable! It is the simple things in life that keeps the sparkles flying. "We met in college through mutual friends. Our first date was watching movies and eating at a cozy cafe."',
                        'image' => 'https://img.katsudoto.id/dat_96IPWtzIGo76E62GxTVTdNu2jJXRr1A9uNa1ins/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L3N0b3J5L3RodW1iX2xnXzE4NTk3N18xNjkxMTM5MTg0XzE2MDBfMTYwMC5qcGVn.webp',
                    ],
                    [
                        'title' => 'We\'re Forever',
                        'caption' => '"What we are looking forward to the most, besides getting to spend the rest of our lives together, is having everyone that we truly care about together, all in a place that is so beautiful itself."',
                        'image' => 'https://img.katsudoto.id/JxPjyj-ciaX3jIDpatPtuk00bc7OzgIHoJv62MfYXbw/rs:auto:1080:0:1/g:no/ar:1/q:90/aHR0cHM6Ly9tZWRpYS5rYXRzdWRvdG8uaWQvbWVkaWEvcHVibGljLzcwLzE4Nzg3L3N0b3J5L3RodW1iX2xnXzE4NTk3OF8xNjkxMTM5MjEzXzE2MDBfMTYwMC5qcGVn.webp',
                    ],
                ],
            ],
            'order' => 6,
            'is_visible' => true,
        ]);

        // 8. Wedding Gift Section
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
            'order' => 7,
            'is_visible' => true,
        ]);

        // 9. Protocol Section
        InvitationSection::create([
            'invitation_id' => $invitation->id,
            'section_type' => 'protocol',
            'section_data' => [
                'title' => 'Health Protocol',
                'description' => 'For the safety and comfort of all guests, we kindly ask you to follow these health protocols:',
                'protocols' => [
                    [
                        'icon' => 'mask',
                        'title' => 'Wear Mask',
                        'description' => 'Please wear a mask during the event',
                    ],
                    [
                        'icon' => 'hand-wash',
                        'title' => 'Wash Hands',
                        'description' => 'Sanitize your hands regularly',
                    ],
                    [
                        'icon' => 'temperature',
                        'title' => 'Check Temperature',
                        'description' => 'Temperature check at entrance',
                    ],
                    [
                        'icon' => 'distance',
                        'title' => 'Keep Distance',
                        'description' => 'Maintain physical distancing',
                    ],
                ],
            ],
            'order' => 8,
            'is_visible' => true,
        ]);

        // 10. Footer Section
        InvitationSection::create([
            'invitation_id' => $invitation->id,
            'section_type' => 'footer',
            'section_data' => [
                'closing_text' => $invitation->closing_text,
                'couple_names' => $invitation->groom_name . ' & ' . $invitation->bride_name,
                'hashtag' => $invitation->hashtag,
                'credits' => 'Made with ❤️ by Katsudoto',
            ],
            'order' => 9,
            'is_visible' => true,
        ]);

        $this->command->info('✅ Sample invitation created: ' . $invitation->slug);
        $this->command->info('📧 Groom: ' . $invitation->groom_name);
        $this->command->info('👰 Bride: ' . $invitation->bride_name);
        $this->command->info('📅 Date: ' . $invitation->wedding_date->format('F d, Y'));
        $this->command->info('🔗 URL: /' . $invitation->slug);
        $this->command->info('📦 Sections created: 10');
    }
}
