<?php

namespace Database\Seeders;

use App\Models\Invitation;
use App\Models\InvitedFamily;
use Illuminate\Database\Seeder;

class InvitedFamilySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the first active invitation
        $invitation = Invitation::first();

        if (!$invitation) {
            $this->command->warn('No invitation found. Please create an invitation first.');
            return;
        }

        // Data keluarga dari gambar "Turut Mengundang"
        $families = [
            // Kolom kiri
            'Kel. Eko. S.Ip',
            'Kel. La Niru. S.Pd',
            'Kel. Hasrin Insal Saleh. S.Sos',
            'Kel. La Ode Mukmin. S.E',
            'Kel. Rahim',
            'Kel. Asri',
            'Kel. Nasrudin. A.Md.Komp',

            // Kolom kanan
            'Kel. La Ode Mazadu',
            'Kel. La Ode Yasin Mazadu',
            'Kel. Myr. Purn. CPM Laadu',
            'Kel. Ukman',
            'Kel. Laa\'u',
            'Kel. La Ambo',
            'Kel. Basirun',
        ];

        foreach ($families as $index => $familyName) {
            InvitedFamily::create([
                'invitation_id' => $invitation->id,
                'family_name' => $familyName,
                'order' => $index + 1,
            ]);
        }

        $this->command->info('Successfully seeded ' . count($families) . ' invited families.');
    }
}
