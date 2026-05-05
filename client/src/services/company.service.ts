import { api } from '../lib/axios';
import { Company, CreateCompanyInput } from '../schemas/company.schema';

export const companyService = {
  async getAll() {
    const { data } = await api.get<Company[]>('/companies');
    return data;
  },

  async getById(id: number) {
    const { data } = await api.get<Company>(`/companies/${id}`);
    return data;
  },

  async create(payload: CreateCompanyInput) {
    const { data } = await api.post<Company>('/companies', payload);
    return data;
  },

  async update(id: number, payload: Partial<CreateCompanyInput>) {
    const { data } = await api.patch<Company>(`/companies/${id}`, payload);
    return data;
  },

  async delete(id: number) {
    await api.delete(`/companies/${id}`);
  },
};
