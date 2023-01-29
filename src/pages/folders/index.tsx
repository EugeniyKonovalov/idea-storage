import Folders from "components/folders/folders";
import Layout from "components/layout/layout";
import { NextPage } from "next";
import React from "react";

const Index: NextPage = () => {
  return (
    <Layout>
      <Folders />
    </Layout>
  );
};

export default Index;
