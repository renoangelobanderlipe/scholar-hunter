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
            'username' => fake()->word(),
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

        for($i = 1; $i<=150; $i++)
        {
            $id_no = null;
            if(rand(1,0) === 1) {
                $id_no = fake()->numerify('221-####-2');

                while(User::where('id_no', $id_no)->exists()) {
                    $id_no = fake()->numerify('221-####-2');
                }
            }

            $username = fake()->word();
            while(User::where('username', $username)->exists())  {
                $username = fake()->word();
            }

            $email = fake()->unique()->safeEmail();
            while(User::where('email', $email)->exists()) {
                $email = fake()->unique()->safeEmail();
            }

            $contact_no = fake()->numerify('09#########');
            while(User::where('contact_no', $contact_no)->exists()) {
                $contact_no = fake()->numerify('09#########');
            }

            $seed_middlename = rand(1,0);
        

            User::factory()->create([
                'id_no' => $id_no,
                'firstname' => fake()->firstName(),
                'middlename' => $seed_middlename === 1 ? fake()->lastName() : '',
                'lastname' => fake()->lastName(),
                'address' => fake()->address(),
                'username' => $username,
                'contact_no' => $contact_no,
                'email' => $email,
                'course' => $id_no !== null ? DataHelper::getCourses()[rand(0,12)] : '',
                'course_type' => $id_no !== null ? DataHelper::getCourseTypes()[0] : '',
                'role' => $id_no !== null ? 'student' : 'foundation',
                'status' => 1,
                'email_verified_at' => now(),
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                'remember_token' => Str::random(10),
            ]);
        }
        
    }
}
