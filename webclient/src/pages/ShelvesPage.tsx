import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import HomeLibrary from '../components/HomeLibrary';
import SearchBooks from '../components/SearchBooks';
import PageLayout from '../layout/PageLayout';
import {
  favorites,
  planned,
  reading,
  finished,
  getBooks,
} from '../state/store/features/userBookSlice';
import { getShelves } from '../state/store/features/userShelfSlice';
import { useAppDispatch, useAppSelector } from '../state/store/store';

function ShelvesPage() {
  const readingBooks = useAppSelector(reading);
  const plannedBooks = useAppSelector(planned);
  const favoriteBooks = useAppSelector(favorites);
  const finishedBooks = useAppSelector(finished);
  const dispatch = useAppDispatch();
  const { shelves } = useAppSelector((state) => state.userShelves);
  const { books } = useAppSelector((state) => state.userBooks);
  useEffect(() => {
    dispatch(getBooks());
    dispatch(getShelves());
  }, [dispatch]);
  return (
    <>
      <SearchBooks />
      <PageLayout>
        <HomeLibrary library="Favorites" books={favoriteBooks} onlyImage />
        <HomeLibrary library="Planned" books={plannedBooks} onlyImage />
        <HomeLibrary library="Reading" books={readingBooks} onlyImage />
        <HomeLibrary library="Finished" books={finishedBooks} onlyImage />
        <Box>
          {shelves.map((x) => (
            <HomeLibrary
              key={x.id}
              library={x.name}
              books={books.filter((book) => x.books.includes(book.userbookID))}
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
