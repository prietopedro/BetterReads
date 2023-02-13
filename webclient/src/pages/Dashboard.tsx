import { Spinner } from '@chakra-ui/react';
import HomeLibrary from '../components/HomeLibrary';
import SearchBooks from '../components/SearchBooks';
import useUserbooksData from '../hooks/useUserbooksData';
import PageLayout from '../layout/PageLayout';

function Dashboard() {
  const { isLoading, favoriteBooks, plannedBooks, readingBooks } =
    useUserbooksData();

  return (
    <>
      <SearchBooks />
      <PageLayout>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <HomeLibrary library="Planned" books={plannedBooks} />
            <HomeLibrary library="Reading" books={readingBooks} />
            <HomeLibrary library="Favorites" books={favoriteBooks} />
          </>
        )}
      </PageLayout>
    </>
  );
}

export default Dashboard;
