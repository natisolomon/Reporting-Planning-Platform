// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify, JWTPayload } from 'jose';

const PROTECTED = [
  { prefix: '/leader', role: 'leader' },
  { prefix: '/staff', role: 'staff' },
  { prefix: '/supervisor', role: 'supervisor' },
  { prefix: '/admin', role: 'admin' },
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('/favicon.ico') ||
    pathname.startsWith('/auth')
  ) {
    return NextResponse.next();
  }

  const match = PROTECTED.find(p => pathname.startsWith(p.prefix));
  if (!match) return NextResponse.next();

  const token = req.cookies.get('token')?.value;

  // Debug logs
  console.log('🔍 Middleware triggered:', pathname);
  console.log('🔑 JWT_SECRET available:', !!process.env.JWT_SECRET);
  console.log('🍪 Token from cookie:', token ? 'PRESENT' : 'MISSING');

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not set');
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret) as { payload: JWTPayload & { role: string } };

    console.log('✅ Token verified | Role:', payload.role);

    if (payload.role !== match.role) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('❌ JWT verification failed:', (error as Error).message);
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
}

export const config = {
  matcher: ['/leader/:path*', '/staff/:path*', '/supervisor/:path*', '/admin/:path*'],
};