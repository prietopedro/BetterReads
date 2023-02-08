import axiosWithCredentials from './axios';

export type Shelf = {
  id: string;
  name: string;
  books: string[];
};
type UserShelvesAxiosResponse = {
  data: { shelves: Shelf[] };
};

export const fetchUserShelves = async () => {
  const res = await axiosWithCredentials.get<UserShelvesAxiosResponse>(
    'api/user/shelves',
  );
  return res.data.data.shelves;
};

export default {
  fetchUserShelves,
};
