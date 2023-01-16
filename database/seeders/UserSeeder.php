<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

use App\Models\User;
use App\Helpers\DataHelper;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create([
            'id_no' => '',
            'firstname' => 'Admin',
            'middlename' => '',
            'lastname' => 'Admin',
            'address' => 'Catbangen, City of San Fernando, La Union',
            'username' => DataHelper::getUsernames()[rand(0,499)],
            'contact_no' => fake()->numerify('09#########'),
            'email' => 'admin@scholarhunter.com',
            'course' => '',
            'course_type' => '',
            'role' => 'admin',
            'status' => 1,
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ]);   
        User::factory(100)->create();
    }
}
