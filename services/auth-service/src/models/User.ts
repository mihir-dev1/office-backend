
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  const self = this as any;
  if (!self.isModified('password')) return next();
  self.password = await bcrypt.hash(self.password, 10);
  next();
});

userSchema.methods.comparePassword = function (candidate: string) {
  // @ts-ignore
  return bcrypt.compare(candidate, this.password);
};

export default model<IUser>('User', userSchema);
