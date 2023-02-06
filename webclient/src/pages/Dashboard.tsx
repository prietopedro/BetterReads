import { useEffect } from 'react';
import HomeLibrary from '../components/HomeLibrary';
import SearchBooks from '../components/SearchBooks';
import PageLayout from '../layout/PageLayout';
import {
  favorites,
  planned,
  reading,
  getBooks,
} from '../state/store/features/userBookSlice';
import { useAppDispatch, useAppSelector } from '../state/store/store';

function Dashboard() {
  const favoriteBooks = useAppSelector(favorites);
  const plannedBooks = useAppSelector(planned);
  const readingBooks = useAppSelector(reading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <>
      <SearchBooks />
      <PageLayout>
        <HomeLibrary library="Planned" books={plannedBooks} />
        <HomeLibrary library="Reading" books={readingBooks} />
        <HomeLibrary library="Favorites" books={favoriteBooks} />
      </PageLayout>
    </>
  );
}

export default Dashboard;
