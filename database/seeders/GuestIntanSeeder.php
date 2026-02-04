<?php

namespace Database\Seeders;

use App\Models\Guest;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class GuestIntanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $baseUrl = config('app.url');

        // UMU BUTON
        $umuButon = [
            'Nur Rahma Andini' => 'Kekasih',
            'Isnawati, S. Pd' => 'Patner',
            'Wulan Riski yanti, S. P' => 'Patner',
            'Rabiahtul Adawiyah, S. P' => 'Kekasih',
            'Fifit urmayani, S. P' => 'Kekasih',
            'WA Rosni, S. Pd' => 'Sasta',
            'Munawati, S. P' => 'Kekasih',
            'Sitti ilwan, S.pd' => 'kekasih',
            'Muliawati, S. P' => 'Patner',
            'PUTRI' => 'partner',
            'Waode Hasria, S. Pd' => 'Partner',
            'Harni Sumatan' => 'Ji Changwook',
            'Waode niati' => 'Partner',
            'Sapna' => 'Patner',
            'Reski Nur Aprilia Yeni' => 'Patner',
            'La Ode Abdul Hengki, S.T' => 'Partner',
            'Midin' => 'Patner',
        ];

        // Letting SMP 2014
        $lettingSmp2014 = [
            'Abil' => 'Partner',
            'Sindi Adrianti, A.md.kes' => 'Patner',
            'Ayu Rahmawati' => 'Patner',
            'Yulita, S.pd' => 'Patner',
            'Adrian marfin' => 'Patner',
            'Firmansyah' => 'Patner',
            'Darpin' => 'Patner',
            'Sulfat' => 'Patner',
            'Vera' => 'Patner',
            'Sintiya' => 'Patner',
            'Muh Isra' => 'Ibu',
            'Lili' => 'suami',
            'Waldi' => 'Ibu',
            'Kahar khaulan Ma\'mur' => 'Partner',
            'Briptu Basar Maulidin' => 'Partner',
            'Taslim B' => 'Partner',
            'Felin Sepriana, S.E' => 'Partner',
            'Sukmawati Passi, S.kep., Ns' => 'Partner',
            'Hairol Anuar' => 'Partner',
            'Wahyu ningsih hajiji, S.pd' => 'Ayang',
            'Wa ode Sunarli, S.IP.' => 'partner',
            'ALUMNI SMPN 5 BAUBAU 2014' => null, // Group invitation
        ];

        $guestList = [];

        // Process UMU BUTON guests
        foreach ($umuButon as $name => $companion) {
            $guestList[] = [
                'name' => $name,
                'companion' => $companion,
                'group' => 'UMU BUTON',
            ];
        }

        // Process Letting SMP 2014 guests
        foreach ($lettingSmp2014 as $name => $companion) {
            $guestList[] = [
                'name' => $name,
                'companion' => $companion,
                'group' => 'Letting SMP 2014',
            ];
        }

        // Create guests and collect URLs by group
        $this->command->info('Creating guests and generating invitation URLs...');
        $this->command->newLine();

        $urlsByGroup = [
            'UMU BUTON' => [],
            'Letting SMP 2014' => [],
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
                'pax' => $guestData['companion'] ? 2 : 1, // 2 if has companion, 1 if solo
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
