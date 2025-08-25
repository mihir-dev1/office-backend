
import { Request, Response } from 'express';
import Employee from '../models/Employee';
import { z } from 'zod';
import { buildPagination } from '../utils/pagination';

const createSchema = z.object({ body: z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  title: z.string().optional(),
  company:   z.string()
})});

const updateSchema = z.object({
  params: z.object({ id: z.string().length(24) }),
  body: z.object({
    firstName: z.string().min(1).optional(),
    lastName:  z.string().min(1).optional(),
    email:     z.string().email().optional(),
    title:     z.string().optional(),
    company:   z.string()
  })
});

export const validators = { createSchema };

const idSchema = z.object({ params: z.object({ id: z.string().length(24) })});

export const EmployeeValidators = { createSchema, updateSchema, idSchema };

export async function createEmployee(req: Request, res: Response) {
  const doc = await Employee.create(req.body);
  res.status(201).json(doc);
}

export async function listEmployees(req: Request, res: Response) {
  const { limit, skip, sort } = buildPagination(req.query);
  const filter: any = {};
  if (req.query.company) filter.company = req.query.company;
  if (req.query.q) {
    const q = String(req.query.q);
    filter.$or = [
      { firstName: { $regex: q, $options: 'i' } },
      { lastName:  { $regex: q, $options: 'i' } },
      { email:     { $regex: q, $options: 'i' } },
    ];
  }
  const [items, total] = await Promise.all([
    Employee.find(filter).sort(sort).skip(skip).limit(limit).populate('company', 'name'),
    Employee.countDocuments(filter)
  ]);
  res.json({ items, total, pageSize: limit });
}

export async function getEmployee(req: Request, res: Response) {
  const emp = await Employee.findById(req.params.id).populate('company', 'name');
  if (!emp) return res.status(404).json({ message: 'Employee not found' });
  res.json(emp);
}

export async function updateEmployee(req: Request, res: Response) {
  const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!emp) return res.status(404).json({ message: 'Employee not found' });
  res.json(emp);
}

export async function deleteEmployee(req: Request, res: Response) {
  const emp = await Employee.findByIdAndDelete(req.params.id);
  if (!emp) return res.status(404).json({ message: 'Employee not found' });
  res.status(204).send();
}
