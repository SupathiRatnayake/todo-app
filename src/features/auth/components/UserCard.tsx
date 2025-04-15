import { useUser } from '../context/UserContext';

export default function UserCard() {
  const { user, isLoading } = useUser();

  if (isLoading) return <p>Loading user...</p>;

  return (
    <div>
      {/* <h2>{user?.firstName} {user?.lastName}</h2> */}
      <h2>{user?.name}</h2>
      <p>Email: {user?.email}</p>
    </div>
  );
}
