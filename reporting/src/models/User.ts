// src/models/User.ts
import mongoose, { Document, Schema } from "mongoose";

export type Role = "admin" | "supervisor" | "staff" | "leader";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string; // hashed
  role: Role;
  region?: string;
  assignedStaff?: mongoose.Types.ObjectId; // optional
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "supervisor", "staff", "leader"],
    default: "leader",
  },
  region: { type: String },
  assignedStaff: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

// Avoid model overwrite in dev
export default mongoose.models.User as mongoose.Model<IUser> || mongoose.model<IUser>("User", UserSchema);
