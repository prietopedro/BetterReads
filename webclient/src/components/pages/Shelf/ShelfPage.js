import React, {useContext} from "react";
import { SearchBooks,HomeLibrary,Navbar,PageLayout } from "../../common";
import { Box } from "@chakra-ui/core";
import { AppContext } from "../../../state/context";


const ShelfPage = ({}) => {
    const {books,
        favorites,
        toBeRead,
        reading,
        finished,
        bookshelves
    } = useContext(AppContext)

  return (
    <>
      <Navbar />
      <SearchBooks />
      <PageLayout>
        <HomeLibrary
          library={"My Books"}
          books={books}
          onlyImage={true}
        />
        {/* <HomeLibrary library={"Favorites"} books={favorites} onlyImage={true} /> */}
        <HomeLibrary library={"Planned"} books={toBeRead} onlyImage={true} />
        <HomeLibrary library={"Reading"} books={reading} onlyImage={true} />
        <HomeLibrary library={"Finished"} books={finished} onlyImage={true} />
        <Box>
          {bookshelves.map((x) => (
            <HomeLibrary
              key={x._id}
              library={x.name}
              books={x.books}
              id={x._id}
              onlyImage={true}
            />
          ))}
        </Box>
      </PageLayout>
    </>
  );
};

export default ShelfPage;