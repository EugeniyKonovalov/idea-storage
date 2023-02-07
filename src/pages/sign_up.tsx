import AuthForm from "components/auth/auth_form";
import Layout from "components/layout/layout";
import { NextPage } from "next";

const Index: NextPage = () => {
  return (
    <Layout>
      <AuthForm />
    </Layout>
  );
};

export default Index;
