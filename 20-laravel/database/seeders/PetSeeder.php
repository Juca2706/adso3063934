<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Pet;

class PetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pet = new Pet;
        $pet->name = 'Firulais';
        $pet->kind = 'Dog';
        $pet->weight = 7.6;
        $pet->age = 2;
        $pet->breed = 'French Bulldog';
        $pet->location = 'Paris';
        $pet->description = 'Esta bello bello';
        $pet->save();

        $pet = new Pet;
        $pet->name = 'El Terry';
        $pet->kind = 'Dog';
        $pet->weight = 18.6;
        $pet->age = 1;
        $pet->breed = 'Akita Inu';
        $pet->location = 'Bordo CAUCA';
        $pet->description = 'Es muy jugueton';
        $pet->save();

        $pet = new Pet;
        $pet->name = 'Maswell';
        $pet->kind = 'Cat';
        $pet->weight = 6.5;
        $pet->age = 4;
        $pet->breed = 'Scottish Fold';
        $pet->location = 'Manizales, Caldas';
        $pet->description = 'Esta muy agogo y facherito';
        $pet->save();

        $pet = new Pet;
        $pet->name = 'Chencho Corleone';
        $pet->kind = 'Mini Pig';
        $pet->weight = 6.9;
        $pet->age = 5;
        $pet->breed = 'Mini Pig';
        $pet->location = 'Medellin, Antioquia';
        $pet->description = 'Es muy gloton y dormillon';
        $pet->save();
    }
}
