'use client'

import { useCompanies, useDeleteCompany } from '@/hooks/use-companies'
import { Button } from '@/components/ui/button'
import { Building2, Plus, Trash2, Loader2 } from 'lucide-react'
import { Sidebar } from '@/components/layout/sidebar'

export default function CompaniesPage() {
  const { data: companies, isLoading, error } = useCompanies()
  const deleteMutation = useDeleteCompany()

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta empresa?')) {
      await deleteMutation.mutateAsync(id)
    }
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Empresas</h2>
            <p className="text-gray-500">Gerencie os tenants cadastrados no sistema.</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Empresa
          </Button>
        </div>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg">
            Ocorreu um erro ao carregar as empresas. Certifique-se que o backend está rodando.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {companies?.map((company) => (
              <div 
                key={company.id} 
                className="group relative flex items-center justify-between rounded-xl border p-4 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{company.name}</h3>
                    <p className="text-xs text-gray-500">CNPJ: {company.cnpj || 'Não informado'}</p>
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-400 hover:text-red-600"
                  onClick={() => company.id && handleDelete(company.id)}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            
            {companies?.length === 0 && (
              <div className="col-span-full flex h-48 flex-col items-center justify-center rounded-xl border border-dashed text-gray-400">
                <Building2 className="h-8 w-8 mb-2" />
                <p>Nenhuma empresa encontrada.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
