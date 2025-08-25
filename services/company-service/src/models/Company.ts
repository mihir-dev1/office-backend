
import { Schema, model } from 'mongoose';
export interface ICompany {
  name: string;
  address?: string;
  industry: string;
  website?: string;
}
const companySchema = new Schema<ICompany>({
  name: { type: String, required: true, index: true },
  address: String,
  industry: String,
  website: String
}, { timestamps: true });
export default model<ICompany>('Company', companySchema);
