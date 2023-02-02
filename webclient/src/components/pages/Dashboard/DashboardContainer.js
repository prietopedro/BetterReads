import React, {useContext, useEffect} from "react";
import { SearchBooks, HomeLibrary, PageLayout, Navbar } from "../../common";
import { AppContext } from "../../../state/context";
import { getUserBooks, getUserShelves } from "../../../api";


function DashboardContainer() {

    
  const {
    toBeRead,
    reading,
  } = useContext(AppContext)
    return (
      <>
        <Navbar />
        <SearchBooks />
        <PageLayout>
          <HomeLibrary library="Reading" books={reading} />
          <HomeLibrary library="Planned" books={toBeRead} />
        </PageLayout>
      </>
    );
}

export default DashboardContainer;
