import { useAppSelector } from '../state/store/store';

function Dashboard() {
  const { user } = useAppSelector((state) => state.user);
  return <div>HELLO {user.email}</div>;
}

export default Dashboard;
