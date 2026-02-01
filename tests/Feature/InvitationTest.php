<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Guest;
use App\Models\Wish;

class InvitationTest extends TestCase
{
    use RefreshDatabase;

    public function test_invitation_screen_can_be_rendered()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }

    public function test_guest_can_rsvp_attending()
    {
        $guest = Guest::create([
            'name' => 'John Doe',
            'slug' => 'john-doe',
            'pax' => 2,
        ]);

        $response = $this->post('/rsvp', [
            'guest_id' => $guest->id,
            'name' => 'John Doe',
            'status' => 'attending',
            'pax_confirmed' => 1,
        ]);

        $response->assertSessionHas('success');
        $this->assertDatabaseHas('rsvps', [
            'guest_id' => $guest->id,
            'status' => 'attending',
            'pax_confirmed' => 1,
        ]);
    }

    public function test_guest_cannot_rsvp_with_excess_pax()
    {
        $guest = Guest::create([
            'name' => 'John Doe',
            'slug' => 'john-doe',
            'pax' => 1,
        ]);

        $response = $this->post('/rsvp', [
            'guest_id' => $guest->id,
            'name' => 'John Doe',
            'status' => 'attending',
            'pax_confirmed' => 5,
        ]);

        $response->assertSessionHasErrors(['pax_confirmed']);
    }

    public function test_guest_can_send_wish()
    {
        $response = $this->post('/wishes', [
            'name' => 'Jane Doe',
            'message' => 'Happy Wedding!',
        ]);

        $response->assertSessionHas('success');
        $this->assertDatabaseHas('wishes', [
            'name' => 'Jane Doe',
            'message' => 'Happy Wedding!',
        ]);
    }
}
