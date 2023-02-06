import { Grid } from "@chakra-ui/react";
import Folders from "components/folders/folders";
import Layout from "components/layout/layout";
import Notes from "components/notes/notes";
import { useActions } from "hooks/useActions";
import useGetFolders from "hooks/useGetFolders";
import { NextPage } from "next";
import React, { useEffect } from "react";

const Index: NextPage = () => {
  const { setFolders } = useActions();
  const folders = useGetFolders();

  useEffect(() => {
    setFolders(folders);
  }, [folders?.length]);

  return (
    <Layout>
      <Grid templateColumns={"1fr 2fr"}>
        <Folders />
        <Notes />
      </Grid>
    </Layout>
  );
};

export default Index;
