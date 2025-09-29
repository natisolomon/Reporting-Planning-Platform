// lib/user.ts
import { getDB } from './mongodb';

export async function getUserByEmail(email: string) {
  const db = await getDB();
  const user = await db.collection('users').findOne({ email });
  return user;
}