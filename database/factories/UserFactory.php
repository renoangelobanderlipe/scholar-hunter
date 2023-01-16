<?php

namespace Database\Factories;

use App\Helpers\DataHelper;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $id_no = null;
        if(rand(1,0) === 1) {
            $id_no = fake()->numerify('221-####-2');

            while(User::where('id_no', $id_no)->exists()) {
                $id_no = fake()->numerify('221-####-2');
            }
        }

        $username = DataHelper::getUsernames()[rand(0,499)];
        while(User::where('username', $username)->exists())  {
            $username = DataHelper::getUsernames()[rand(0,499)];
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
        

        return [
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
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
