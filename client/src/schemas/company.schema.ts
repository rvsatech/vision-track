import { z } from 'zod';

export const companySchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  cnpj: z.string().regex(/^\d{14}$/, 'CNPJ deve ter 14 dígitos').optional().nullable(),
  planId: z.number().optional().nullable(),
});

export type Company = z.infer<typeof companySchema>;

export const createCompanySchema = companySchema.omit({ id: true });
export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
