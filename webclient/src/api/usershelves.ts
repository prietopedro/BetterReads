import {
  EditShelf,
  UserShelfAxiosResponse,
  UserShelvesAxiosResponse,
} from '../types';
import axiosWithCredentials from './axios';

export const fetchUserShelves = async () => {
  const res = await axiosWithCredentials.get<UserShelvesAxiosResponse>(
    'api/users/shelves',
  );
  return res.data.data.shelves;
};

export const addUserShelf = async (name: string) => {
  const res = await axiosWithCredentials.post<UserShelfAxiosResponse>(
    'api/users/shelves',
    { name },
  );
  return res.data.data.shelf;
};

export const deleteUserShelf = async (id: string) => {
  const res = await axiosWithCredentials.delete<UserShelfAxiosResponse>(
    `api/users/shelves/${id}`,
  );
  return res.data.data.shelf;
};
export const editUserShelf = async ({ id, ...rest }: EditShelf) => {
  const res = await axiosWithCredentials.put<UserShelfAxiosResponse>(
    `api/users/shelves/${id}`,
    rest,
  );
  return res.data.data.shelf;
};

export default {
  fetchUserShelves,
  addUserShelf,
  deleteUserShelf,
  editUserShelf,
};
