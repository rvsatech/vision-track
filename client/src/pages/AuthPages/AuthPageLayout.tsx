import React from "react";
import GridShape from "../../components/common/GridShape";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
import { BrainCircuit } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}

        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            <GridShape />

            <div className="flex flex-col items-center max-w-xs">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-white/10">
                <BrainCircuit className="w-9 h-9 text-white/90" />
              </div>

              <h2 className="mb-2 text-xl font-semibold text-white/90">
                VisionTrack
              </h2>

              <p className="text-center text-gray-400 dark:text-white/60">
                Plataforma corporativa para gestão, auditoria e rastreabilidade
                de processos de IA.
              </p>
            </div>
          </div>
        </div>

        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}