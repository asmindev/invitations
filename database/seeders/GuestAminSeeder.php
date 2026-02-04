<?php

namespace Database\Seeders;

use App\Models\Guest;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class GuestAminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $baseUrl = config('app.url');

        // Teman Amin
        $temanAmin = [
            'Muhammad Miftahudin' => 'ibu',
            'Muhammad Sahidin Ali' => 'istri',
            'Laode Muhammad Hidayat' => 'partner',
            'Bang Adi' => 'istri',
            'Bang Hardi Belawan' => null,
            'Tesar Susanto' => 'istri',
            'Kapten adek Lubis' => 'istri',
            'Bang hary Setiyadi' => 'istri',
            'Bang Lika Sindu' => 'istri',
            'Bass Bejo' => 'istri',
            'Bang Alfa' => 'istri',
            'Ms Ani Listiani' => null,
            'Bro Taufik' => null,
            'Bro Rendi' => 'istri',
            'Bro nada' => 'istri',
            'Bro Romi' => 'istri',
            'All kru GD.Proteus' => null,
            'Mas Risky' => 'istri',
            'Bass Jefri' => 'partner',
            'Pa koki Ts 29' => 'istri',
            'Pa seken Agus' => 'pasangan',
            'Kapten Rully' => 'istri',
            'Nurmila, S.Pd' => 'Patner',
            'Nurmala, S.Pd' => 'Patner',
            'Safarul, S.Pd' => 'Patner',
            'Amelia, S.Geo' => 'Patner',
            'Ahmad Givar Dhani, S.T' => 'Patner',
            'Sri Lestari Rajab, A.Md. Keb' => 'Patner',
            'Suci Damar Wulan, S.E' => 'Patner',
            'Muh Harmadin S.P' => 'Ibu',
            'Muh. Iman Faisal' => 'Ibu',
            'Arukun, S.Si' => 'Patner',
            'Amrin Ajira, S.Sos, M.Sos' => 'Patner',
            'Husna, S.Ikom' => 'Patner',
            'Junita Renoat, S.I.Kom' => 'Patner',
            'Asti Munawarty, S.KM' => 'Patner',
            'Komang Resky Pratiwi, S.Pd' => 'Patner',
            'Alumni SMAN 5 Baubau 2017' => null,
            'Bas jeje Yansen Sebayang' => 'istri',
            'Chip usman Harahap' => 'istri',
            'Bro Jamal' => 'istri',
            'Bas Taufik' => 'istri',
            'Bang Iwan' => 'istri',
            'Iskandar' => 'partner',
            'Elfida Safitri' => 'partner',
            'Adnan' => 'istri',
            'Wahyudi' => 'kekasih',
            'Hasan' => 'kekasih',
            'Binsar Andi' => 'partner',
            'Bro Irsyad' => 'pasangan',
            'Alumni SMK N 4 BB angkatan 2014' => null,
        ];

        $guestList = [];

        foreach ($temanAmin as $name => $companion) {
            $guestList[] = [
                'name' => $name,
                'companion' => $companion,
                'group' => 'Teman Amin',
            ];
        }

        // Create guests and collect URLs
        $this->command->info('Creating guests and generating invitation URLs for GuestAminSeeder...');
        $this->command->newLine();

        $urlsByGroup = [
            'Teman Amin' => [],
        ];

        foreach ($guestList as $index => $guestData) {
            // Generate unique slug
            $baseSlug = Str::slug($guestData['name']);
            $slug = $baseSlug;
            $counter = 1;

            // Check if slug exists and make it unique
            while (Guest::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $counter;
                $counter++;
            }

            // Create guest
            $guest = Guest::create([
                'name' => $guestData['name'],
                'companion' => $guestData['companion'],
                'slug' => $slug,
                'pax' => $guestData['companion'] ? 2 : 1,
            ]);

            // Generate invitation URL
            $invitationUrl = $baseUrl . '?to=' . $slug;

            // Store URL by group
            $displayName = $guestData['companion']
                ? "{$guestData['name']} & {$guestData['companion']}"
                : $guestData['name'];

            $urlsByGroup[$guestData['group']][] = [
                'name' => $displayName,
                'url' => $invitationUrl,
            ];
        }

        // Display URLs grouped by category
        foreach ($urlsByGroup as $groupName => $guests) {
            $this->command->info("═══════════════════════════════════════════════════");
            $this->command->info("  📋 {$groupName} (" . count($guests) . " guests)");
            $this->command->info("═══════════════════════════════════════════════════");
            $this->command->newLine();

            foreach ($guests as $guest) {
                $this->command->line("  ✓ {$guest['name']}");
                $this->command->line("    {$guest['url']}");
                $this->command->newLine();
            }
        }

        $totalGuests = count($guestList);
        $this->command->info("Successfully created {$totalGuests} guests with unique invitation URLs.");
    }
}
