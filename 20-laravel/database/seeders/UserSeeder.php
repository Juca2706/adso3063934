<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ORM -> Eloquent
        $user = new User;
        $user->document = 75000001;
        $user->fullname = 'Juan Camilo Hernandez';
        $user->gender = 'Male';
        $user->birthdate = '2006-01-27';
        $user->phone = '3134520832';
        $user->email = 'juvid@gmail.com';
        $user->password = bcrypt('admin2727');
        $user->role = 'Administrador';
        $user->save();


        // Insert -> Array
        DB::table('users')->insert([
            'document' => 75000002,
            'fullname' => 'Milo Gil',
            'gender' => 'Male',
            'birthdate' => '2006-01-28',
            'phone' => '3134520833',
            'email' => 'milo@gmail.com',
            'password' => Hash::make('milo0606'),
            'created_at' => now()
        ]);
    }
}
