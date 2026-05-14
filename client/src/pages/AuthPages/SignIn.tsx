import SignInForm from "../../components/auth/SignInForm";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Entrar | VisionTrack"
        description="Acesse o painel do VisionTrack para gerenciar empresas, usuários e auditorias de processos de IA."
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
