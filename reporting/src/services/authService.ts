// src/services/authService.ts
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { getDB } from '@/lib/mongodb';
import { InsertOneResult, ObjectId } from 'mongodb';

export type UserRole = 'leader' | 'staff' | 'supervisor' | 'admin';

// ✅ Full user document (from DB)
export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt?: Date;
}

// ✅ Input shape for creating a user (no _id)
export interface UserInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt?: Date;
}

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set in environment variables');
  }
  return new TextEncoder().encode(secret);
};

export const AuthService = {
  async registerUser(data: UserInput): Promise<InsertOneResult<User>> {
    const db = await getDB();

    const hashedPassword = await bcrypt.hash(data.password, 10);

    // ✅ Now TypeScript knows this matches UserInput (no _id needed)
    const userData: UserInput = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
      createdAt: data.createdAt ?? new Date(),
    };

    // MongoDB adds _id automatically
    return db.collection<User>('users').insertOne(userData as unknown as User);
    // ⚠️ We cast because insertOne expects a full User, but MongoDB fills _id
  },

  async loginUser(email: string, password: string) {
    const db = await getDB();
    const user = await db.collection<User>('users').findOne({ email });

    if (!user || !user.password) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const token = await this.generateJWT(user);
    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },

  async generateJWT(user: User) {
    const secret = getJwtSecret();
    return await new SignJWT({
      id: user._id.toString(),
      role: user.role,
      email: user.email,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);
  },
};