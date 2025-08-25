
import { Schema, Types, model } from 'mongoose';

export interface IEmployee {
  firstName: string;
  lastName: string;
  email: string;
  title?: string;
  company: string;
}

const employeeSchema = new Schema<IEmployee>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  title: String,
  company: String
}, { timestamps: true });
export default model<IEmployee>('Employee', employeeSchema);
