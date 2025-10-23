<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pet>
 */
class PetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $pet_names = [
            "Max",
            "Bella",
            "Charlie",
            "Lucy",
            "Cooper",
            "Daisy",
            "Rocky",
            "Luna",
            "Bear",
            "Bailey",
            "Duke",
            "Zoe",
            "Oliver",
            "Penny",
            "Tucker",
            "Coco",
            "Bentley",
            "Sadie",
            "Winston",
            "Molly",
            "Leo",
            "Sophie",
            "Gus",
            "Ruby",
            "Jack",
            "Chloe",
            "Apollo",
            "Stella",
            "Milo",
            "Piper",
            "Zeus",
            "Harley",
            "Thor",
            "Hazel",
            "Louie",
            "Mia",
            "Koda",
            "Ginger",
            "Jasper",
            "Shadow",
            "Buddy",
            "Maggie",
            "Toby",
            "Dixie",
            "Jax",
            "Lola",
            "Prince",
            "Abby",
            "Moose",
            "Nala",
            "Bandit",
            "Riley",
            "Sam",
            "Willow",
            "Oscar",
            "Maya",
            "Teddy",
            "Rosie",
            "Simba",
            "Lily",
            "Frankie",
            "Skylar",
            "Finn",
            "Pepper",
            "Chewie",
            "Nova",
            "Bruce",
            "Raven",
            "Otis",
            "Athena",
            "Ace",
            "Jasmine",
            "Remy",
            "Jade",
            "Ziggy",
            "Zara",
            "Hank",
            "Cleo",
            "Marley",
            "Winnie"
        ];

        $dogs_breeds = [
            "Labrador Retriever",
            "French Bulldog",
            "German Shepherd",
            "Golden Retriever",
            "Poodle",
            "Beagle",
            "Rottweiler",
            "Boxer",
            "Dachshund",
            "Siberian Husky"
        ];

        $cats_breeds = [
            "Domestic Shorthair",
            "American Shorthair",
            "Maine Coon",
            "Ragdoll",
            "Persian",
            "Siamese",
            "Bengal",
            "British Shorthair",
            "Sphynx",
            "Abyssinian"
        ];

        $parrots_breeds = [
            "Budgerigar",
            "Cockatiel",
            "African Grey Parrot",
            "Amazon Parrot",
            "Macaw",
            "Cockatoo",
            "Conure",
            "Lovebird",
            "Quaker Parrot",
            "Indian Ringneck Parakeet"
        ];

        $pigs_breeds = [
            "Pot-Bellied Pig",    
            "KuneKune",            
            "Juliana Pig",         
            "American Mini Pig",   
            "Göttingen Mini Pig",
        ];

        $kind = fake()->randomElement(array('Dog', 'Cat', 'Pig', 'Parrot'));

        switch ($kind) {
            case 'Dog':
                $breed = fake()->randomElement($dogs_breeds);
                break;
            case 'Cat':
                $breed = fake()->randomElement($cats_breeds);
                break;
            case 'Pig':
                $breed = fake()->randomElement($pigs_breeds);
                break;
            case 'Parrot':
                $breed = fake()->randomElement($parrots_breeds);
                break;
        }

        return [
            'name'          => fake()->randomElement($pet_names),
            'kind'          => $kind,
            'weight'        => fake()->numerify('#.#'),
            'age'           => fake()->numerify('#'),
            'breed'         => $breed,
            'location'      => fake()->city(),
            'description'   => fake()->sentence(8)
        ];
    }
}
