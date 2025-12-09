<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\AdoptionController;
use App\Http\Controllers\CustomerController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::group(['middleware' => 'admin'],  function () {
        Route::resources([
            'users'        => UserController::class,
            'pets'       => PetController::class,
        ]);

        // /==============================================================
        // SECCION USERS
        // ==============================================================/
        // Search Users
        Route::post('search/users', [UserController::class, 'search']);

        // Export Users PDF 
        Route::get('export/users/pdf', [UserController::class, 'pdf']);
        // Export Users EXCEL
        Route::get('export/users/excel', [UserController::class, 'excel']);

        // Import Users 
        Route::post('import/users', [UserController::class, 'import']);

        // /==============================================================
        // SECCION PETS
        // ==============================================================/
        // Search Pets
        Route::post('search/pets', [PetController::class, 'search']);

        // Export Pets PDF 
        Route::get('export/pets/pdf', [PetController::class, 'pdf']);
        // Export Pets EXCEL
        Route::get('export/pets/excel', [PetController::class, 'excel']);

        // Import Pets
        Route::post('import/pets', [PetController::class, 'import']);

        // /==============================================================
        // SECCION ADOPTIONS
        // ==============================================================/
        // Adoption 
        Route::get('adoptions', [AdoptionController::class, 'index']);
        Route::get('adoptions/{id}', [AdoptionController::class, 'show']);

        // Search Adoptions
        Route::post('search/adoptions', [AdoptionController::class, 'search']);

        // Export Adoptions PDF 
        Route::get('export/adoptions/pdf', [AdoptionController::class, 'pdf']);
        // Export Adoptions EXCEL
        Route::get('export/adoptions/excel', [AdoptionController::class, 'excel']);
    });

    // /==============================================================
    // SECCION CUSTOMER
    // ==============================================================/
    // My profile
    Route::get('myprofile/', [CustomerController::class, 'myprofile']);
    Route::put('myprofile/{id}', [CustomerController::class, 'updatemyprofile']);

    // My Adoptions
    Route::get('myadoptions/', [CustomerController::class, 'myadoptions']);
    Route::get('myadoptions/{id}', [CustomerController::class, 'showadoption']);

    // Make Adoption
    Route::get('makeadoption/', [CustomerController::class, 'listpets']);
    Route::get('makeadoption/{id}', [CustomerController::class, 'confirmadoption']);
    Route::post('makeadoption/{id}', [CustomerController::class, 'makeadoption']);
    Route::post('search/makeadoption', [CustomerController::class, 'search']);
});

Route::get('/', function () {
    // return "This is a entry point 👋";
    return view('welcome');
});

Route::get('hello', function () {
    return "<h1>Hello folks, Have a nice day 😃</h1>";
});

Route::get('hello/{name}', function () {
    return "<h1>Hello: " . request()->name . " </h1>";
});

Route::get('show/pets', function () {
    $pets = App\Models\Pet::all();
    dd($pets->toArray()); // Dump & Die 
});

Route::get('show/pet/{id}', function () {
    $pet = App\Models\Pet::find(request()->id);
    dd($pet->toArray()); // Dump & Die 
});

Route::get('challenge', function () {
    $users = App\Models\User::take(20)->get();

    // 🎨 Estilos de la tabla
    $html = '
    <style>
        body {
            font-family: "Segoe UI", Roboto, Arial, sans-serif;
            background-color: #121212;
            color: #e0e0e0;
            padding: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        h2 {
            text-align: center;
            color: #00c6ff;
            margin-bottom: 25px;
            font-weight: 600;
            letter-spacing: 1px;
            text-shadow: 0 0 10px rgba(0, 198, 255, 0.3);
        }

        table {
            border-collapse: collapse;
            width: 90%;
            max-width: 1000px;
            background-color: #1e1e1e;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 0 25px rgba(0,0,0,0.5);
        }

        thead {
            background: linear-gradient(90deg, #00c6ff, #0072ff);
            color: white;
        }

        th, td {
            padding: 14px 18px;
            text-align: center;
            border-bottom: 1px solid #2c2c2c;
        }

        tr:last-child td {
            border-bottom: none;
        }

        tr:nth-child(even) {
            background-color: #181818;
        }

        tr:hover {
            background-color: #242424;
            transition: background 0.3s ease;
        }

        img {
            border-radius: 50%;
            width: 65px;
            height: 65px;
            object-fit: cover;
            border: 2px solid #00c6ff;
            box-shadow: 0 0 10px rgba(0, 198, 255, 0.4);
            background-color: #FFFFFF;
        }

        th {
            font-weight: 600;
            letter-spacing: 0.5px;
        }

        td {
            font-size: 15px;
        }

        /* Efecto sutil al pasar sobre la tabla */
        table:hover {
            box-shadow: 0 0 35px rgba(0, 198, 255, 0.2);
            transition: box-shadow 0.4s ease;
        }
    </style>
    ';


    $html .= '<h2>👥 Primeros 20 usuarios</h2>';

    $html .= '<table border="1">';
    $html .= '<thead><tr>';
    $html .= '<th>ID</th>';
    $html .= '<th>Image</th>';
    $html .= '<th>Name</th>';
    $html .= '<th>Birthdate</th>';
    $html .= '<th>Created</th>';
    $html .= '</tr></thead>';

    $html .= '<tbody>';
    foreach ($users as $user) {
        $html .= '<tr>';
        $html .= '<td>' . $user->id . '</td>';
        $html .= '<th><img src="' . asset("images/" . $user->photo) . '" width="70px"></th>';
        $html .= '<td>' . $user->fullname . '</td>';
        $html .= '<td>' . Carbon\Carbon::parse($user->birthdate)->age . ' years old ' . '</td>';
        $html .= '<td>' . $user->created_at->diffforhumans() . '</td>';
        $html .= '</tr>';
    }
    $html .= '</tbody></table>';

    return $html;
});

Route::get('view/pets', function () {
    $pets = App\Models\Pet::all();
    return view('view-pets')->with('pets', $pets);
});

Route::get('show/pet/{id}', function () {
    $pet = App\Models\Pet::find(request()->id);
    return view('show-pet')->with('pet', $pet);
});

require __DIR__ . '/auth.php';
