import { useEffect } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchUsers } from "../redux/users/UsersSlice";
import UserSidebar from "./UserSidebar";

const UserList = () => {
  const { users, isLoading, error } = useSelector((state: RootState) => state.UsersR);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className='container'>
      <UserSidebar />
      <div className='main-content'>
        <h2>List of all users</h2>
        <section className="users">
          {users.length > 0 &&
            users.map((user) => {
              return (
                <article key={user.id} className='user'>
                  <h2>{`${user.firstName} ${user.lastName}`}</h2>
                  <h2>{user.email}</h2>
                  <h2>{user.role}</h2>
                </article>
              )
            })}
        </section>
      </div>
    </div>
  )
}

export default UserList