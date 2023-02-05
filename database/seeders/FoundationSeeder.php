<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Foundation;
use App\Models\User;

use App\Helpers\DataHelper;

class FoundationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach(DataHelper::getFoundationNames() as $foundation_name) {
            Foundation::factory()->create([
                'name' => $foundation_name,
                'description' => fake()->catchPhrase(),
                'address' => fake()->address,
                'contact_no' => fake()->numerify('09#########'),
                'email' => fake()->unique()->safeEmail(),
                'type' => rand(1,0) === 1 ? 'public' : 'private',
            ]);
        }

        $user_ids = User::where('role', 'foundation')->pluck('id');
        $foundations = Foundation::all();

        foreach($foundations as $i => $foundation) {
            $foundation->users()->sync($user_ids[$i]);
        }
    }
}