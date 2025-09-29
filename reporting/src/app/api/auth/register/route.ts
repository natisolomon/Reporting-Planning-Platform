// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import { AuthService } from '@/services/authService';

// Define allowed roles (match your UserRole type)
const ALLOWED_ROLES = ['leader', 'staff', 'supervisor'] as const;
type AllowedRole = typeof ALLOWED_ROLES[number];

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  role?: string; // optional and untrusted from client
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as RegisterRequestBody;

    // Validate required fields
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required.' },
        { status: 400 }
      );
    }

    // Optional: validate and sanitize role (do NOT allow 'admin' from public registration)
    let role: AllowedRole = 'leader'; // default role
    if (body.role && ALLOWED_ROLES.includes(body.role as AllowedRole)) {
      role = body.role as AllowedRole;
    }

    const user = await AuthService.registerUser({
      name: body.name.trim(),
      email: body.email.toLowerCase().trim(),
      password: body.password,
      role, // now guaranteed to be a valid UserRole
    });

    return NextResponse.json({
      success: true,
      userId: user.insertedId.toString(), // ensure ObjectId is serialized
    });
  } catch (err) {
    // Safe error handling without `any`
    const errorMessage =
      err instanceof Error ? err.message : 'An unexpected error occurred during registration.';

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}