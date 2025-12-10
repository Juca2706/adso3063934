<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Pet;
use App\Models\Adoption;
use Illuminate\Support\Facades\Auth;

class CustomerController extends Controller
{
    // My Profile
    public function myprofile()
    {
        $user = User::find(Auth::user()->id);
        //dd($user->toArray());
        return view('customer.myprofile')->with('user', $user);
    }

    public function updatemyprofile(Request $request)
    {
        // dd($request->all());
        $validation = $request->validate([
            'document'  => ['required', 'numeric', 'unique:' . User::class . ',document,' . $request->id],
            'fullname'  => ['required', 'string'],
            'gender'    => ['required'],
            'birthdate' => ['required', 'date'],
            'phone'     => ['required'],
            'email'     => ['required', 'lowercase', 'email', 'unique:' . User::class . ',email,' . $request->id],
        ]);
        if ($validation) {
            //dd($request->all());
            if ($request->hasFile('photo')) {
                $photo = time() . '.' . $request->photo->extension();
                $request->photo->move(public_path('images'), $photo);
                if ($request->originphoto != 'no-photo.png') {
                    unlink(public_path('images/') . $request->originphoto);
                }
            } else {
                $photo = $request->originphoto;
            }
        }

        $user = User::find($request->id);
        $user->document  = $request->document;
        $user->fullname  = $request->fullname;
        $user->gender    = $request->gender;
        $user->birthdate = $request->birthdate;
        $user->photo     = $photo;
        $user->phone     = $request->phone;
        $user->email     = $request->email;
        $user->save();

        if ($user->save()) {
            return redirect('dashboard')->with('message', 'My profile was successfully edited!');
        }
    }


    // My Adoptions
    public function myadoptions()
    {
        $adopts = Adoption::where('user_id', Auth::user()->id)->orderBy('id', 'DESC')->get();
        //dd($adopts->toArray());
        return view('customer.myadoptions')->with('adopts', $adopts);
    }

    public function showadoption(Request $request)
    {
        $adopt = Adoption::find($request->id);
        //dd($adopt->toArray());
        return view('customer.showadoption')->with('adopt', $adopt);
    }


    // Make Adoption 
    public function listpets()
    {
        $pets = Pet::where('status', 0)->orderBy('id', 'DESC')->paginate(20);
        return view('customer.makeadoption')->with('pets', $pets);
    }

    public function confirmadoption(Request $request)
    {
        $pet = Pet::find($request->id);
        //dd($pet->toArray());
        return view('customer.confirmadoption')->with('pet', $pet);
    }

    public function makeadoption(Request $request)
    {
        // Buscar mascota por id
        $pet = Pet::find($request->id);
        if (!$pet) {
            return back()->with('error', 'Pet not found.');
        }

        // Valida que el estatus no este adoptado
        if ($pet->status == 1) {
            return back()->with('error', 'Sorry, this pet has already been adopted.');
        }


        // Valida que la mascota no este inactiv
        if ($pet->active != 1) {
            return back()->with('error', 'This pet is not available for adoption.');
        }

        // Marcar la mascota como adoptada y la desactiva
        $pet->status = 1;
        $pet->active = 0;
        $pet->save();

        // Registrar la adopción relacionada con el usuario autenticado
        $adoption = new Adoption();
        $adoption->user_id = Auth::id();
        $adoption->pet_id  = $pet->id;
        $adoption->save();

        // Redirigir a la lista de mis adopciones con mensaje
        return redirect()->action([CustomerController::class, 'myadoptions'])
            ->with('message', ' ¡Thank you for adopting!');
    }


    // Search
    public function search(Request $request)
    {
        $pets = Pet::kinds($request->q)->orderBy('id', 'DESC')->paginate(20);
        return view('customer.search')->with('pets', $pets);
    }
}
