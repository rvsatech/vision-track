import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { companyService } from '../services/company.service';
import { CreateCompanyInput } from '../schemas/company.schema';

export function useCompanies() {
  return useQuery({
    queryKey: ['companies'],
    queryFn: companyService.getAll,
  });
}

export function useCompany(id: number) {
  return useQuery({
    queryKey: ['companies', id],
    queryFn: () => companyService.getById(id),
    enabled: !!id,
  });
}

export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCompanyInput) => companyService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
  });
}

export function useDeleteCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => companyService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
  });
}
