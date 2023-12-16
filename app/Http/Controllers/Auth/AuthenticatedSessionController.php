<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\User; // Убедитесь, что вы импортировали модель User

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        // Get the currently authenticated user...
        $user = Auth::user();

        // Explicitly cast $user to an instance of User...
        $user = $user instanceof User ? $user : null;

        if ($user) {
            // Generate a new token for the user...
            $token = $user->createToken('token-name');

            // Return the user and token...
            return response()->json([
                'user' => $user,
                'token' => $token->plainTextToken,
            ]);
        }

        return response()->json(['error' => 'Authentication failed.']);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([]);
    }
}
