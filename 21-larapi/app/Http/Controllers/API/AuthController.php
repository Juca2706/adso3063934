<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate(['email' => 'required|email', 'password' => 'required']);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = Str::random(80);

        // Usamos asignación directa para evitar problemas de $fillable
        $user->remember_token = $token;
        $user->save();

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'document' => $user->document,
                'fullname' => $user->fullname,
                'gender' => $user->gender,
                'birthdate' => $user->birthdate,
                'phone' => $user->phone,
                'email' => $user->email,
                'active' => $user->active,
                'role' => $user->role,
                'remember_token' => $user->remember_token


            ]
        ], 200);
    }

    public function logout(Request $request)
    {
        // Obtenemos el usuario que el middleware inyectó
        $user = $request->user();

        if ($user) {
            $user->remember_token = null;
            $user->save();
            return response()->json(['message' => 'Logout successful'], 200);
        }

        return response()->json(['message' => 'User not found in session'], 404);
    }
}
