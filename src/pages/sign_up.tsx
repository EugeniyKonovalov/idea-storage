import AuthForm from "components/auth/auth_form";
import Layout from "components/layout/layout";
import { NextPage } from "next";
import React from "react";

const Index: NextPage = () => {
  return (
    <Layout>
      <AuthForm />
    </Layout>
  );
};

export default Index;
