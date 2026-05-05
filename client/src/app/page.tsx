import { Sidebar } from "@/components/layout/sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-gray-500">Bem-vindo ao Vision Track. Selecione um módulo no menu lateral.</p>
      </main>
    </div>
  );
}
