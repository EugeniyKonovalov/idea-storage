import { Grid, useMediaQuery } from "@chakra-ui/react";
import Folders from "components/folders/folders";
import Layout from "components/layout/layout";
import Notes from "components/notes/notes";
import { useActions } from "hooks/useActions";
import useGetFolders from "hooks/useGetFolders";
import { NextPage } from "next";
import React, { useEffect } from "react";
import { getIsShowMobileNote } from "store/notes/notes.selectors";

const Index: NextPage = () => {
  const [isSmallScreen] = useMediaQuery("(max-width: 991px)");
  const { setFolders } = useActions();
  const folders = useGetFolders();
  const isShowMobileNote = getIsShowMobileNote();

  useEffect(() => {
    setFolders(folders);
  }, [folders?.length]);

  return (
    <Layout>
      <Grid templateColumns={{ base: "1fr ", lg: "3fr 5fr" }}>
        {isSmallScreen ? !isShowMobileNote && <Folders /> : <Folders />}
        {isSmallScreen ? isShowMobileNote && <Notes /> : <Notes />}
      </Grid>
    </Layout>
  );
};

export default Index;
