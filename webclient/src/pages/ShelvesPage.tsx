import { Box } from '@chakra-ui/react';
import HomeLibrary from '../components/HomeLibrary';
import SearchBooks from '../components/SearchBooks';
import useUserbooksData from '../hooks/useUserbooksData';
import useUsershelvesData from '../hooks/useUsershelvesData';
import PageLayout from '../layout/PageLayout';

function ShelvesPage() {
  const {
    data: userBooksData,
    favoriteBooks,
    plannedBooks,
    readingBooks,
    finishedBooks,
  } = useUserbooksData();

  const { data: shelvesData, isSuccess: shelvesIsSuccess } =
    useUsershelvesData();

  return (
    <>
      <SearchBooks />
      <PageLayout>
        <HomeLibrary library="Favorites" books={favoriteBooks} onlyImage />
        <HomeLibrary library="Planned" books={plannedBooks} onlyImage />
        <HomeLibrary library="Reading" books={readingBooks} onlyImage />
        <HomeLibrary library="Finished" books={finishedBooks} onlyImage />
        <Box>
          {shelvesIsSuccess &&
            shelvesData?.map((x) => (
              <HomeLibrary
                key={x.id}
                library={x.name}
                books={
                  userBooksData?.filter((book) => x.books.includes(book.id)) ||
                  []
                }
                id={x.id}
                onlyImage
              />
            ))}
        </Box>
      </PageLayout>
    </>
  );
}

export default ShelvesPage;
