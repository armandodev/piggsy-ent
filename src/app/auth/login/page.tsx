import React from "react";
import { LoginForm } from "@/components/forms";
import Layout from "@/components/ui/Layout";

export const metadata = {
  title: "Iniciar sesión - Piggsy ENT",
};

export default function LoginPage() {
  return (
    <Layout>
      <LoginForm />
    </Layout>
  );
}
