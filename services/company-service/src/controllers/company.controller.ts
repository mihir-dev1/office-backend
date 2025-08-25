
import { Request, Response } from 'express';
import Company from '../models/Company';
import { z } from 'zod';
import { buildPagination } from '../utils/pagination';

const createSchema = z.object({ body: z.object({
  name: z.string().min(2),
  address: z.string().optional(),
  industry:z.string(),
  website: z.string().url().optional()
})});

const updateSchema = z.object({ body: z.object({
  name: z.string().min(2).optional(),
  address: z.string().optional(),
  industry:z.string(),
  website: z.string().url().optional()
}), params: z.object({ id: z.string().length(24) })});

const idSchema = z.object({ params: z.object({ id: z.string().length(24) })});

export const CompanyValidators = { createSchema, updateSchema, idSchema };
// export const validators = { createSchema };

export async function createCompany(req: Request, res: Response) {
  const doc = await Company.create(req.body);
  res.status(201).json({company:doc,message:'Company information added'});
}

// export async function listCompanies(req: Request, res: Response) {
//   const items = await Company.find().limit(100);
//   res.json(items);
// }

export async function listCompanies(req: Request, res: Response) {
  const { limit, skip, sort } = buildPagination(req.query);
  const filter: any = {};
  if (req.query.name) filter.name = { $regex: String(req.query.name), $options: 'i' };
  const [items, total] = await Promise.all([
    Company.find(filter).sort(sort).skip(skip).limit(limit),
    Company.countDocuments(filter)
  ]);
  res.json({ items, total, pageSize: limit });
}

export async function getCompany(req: Request, res: Response) {
  const doc = await Company.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: 'Company not found' });
  res.json(doc);
}

export async function updateCompany(req: Request, res: Response) {
  const doc = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!doc) return res.status(404).json({ message: 'Not found' });
  res.json(doc);
}

export async function deleteCompany(req: Request, res: Response) {
  const d = await Company.findByIdAndDelete(req.params.id);
  if (!d) return res.status(404).json({ message: 'Not found' });
  res.status(204).send();
}
