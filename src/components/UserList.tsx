import { ChangeEvent, useEffect, useState } from "react";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { banUser, deleteUser, fetchUsers, searchUser } from "../redux/users/UsersSlice";

import UserSidebar from "./UserSidebar";
import SearchInput from "./SearchInput";
import UseUserState from "../hooks/UseUserState";

const UserList = () => {
  const { users, isLoading, error, searchTerm } = UseUserState();

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

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchUser(event.target.value))
  }

  const searchUsers = searchTerm ? users.filter((user) => user.firstName.toLowerCase().includes(searchTerm.toLowerCase())) : users

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id))
  }

  const handleBan = (id: number) => {
    dispatch(banUser(id))
  }

  return (
    <div className='container'>
      <UserSidebar />
      <div className='main-content'>
        <h2>List of all users</h2>
        <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
        <section className="users">
          {searchUsers.length > 0 &&
            searchUsers.map((user) => {
              if (user.role !== 'Admin') {
                return (
                  <article key={user.id} className='user'>
                    <h2>{`${user.firstName} ${user.lastName}`}</h2>
                    <h2>{user.email}</h2>
                    <h2>{user.role}</h2>
                    <button onClick={() => { handleDelete(user.id) }}>Delete</button>
                    <button onClick={() => { handleBan(user.id) }}>{user.ban ? 'unban' : 'ban'}</button>
                  </article>
                )
              }
            })}
        </section>
      </div>
    </div>
  )
}

export default UserList