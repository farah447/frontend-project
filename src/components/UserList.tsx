import { ChangeEvent, useEffect, useState } from "react";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { banUser, deleteUser, fetchUsers, searchUser } from "../redux/users/UsersSlice";
import { Button, Stack } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';

import UserSidebar from "./UserSidebar";
import SearchInput from "./SearchInput";
import UseUserState from "../hooks/UseUserState";
import DeleteIcon from '@mui/icons-material/Delete';
import themes from '../Theme/Themes';

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
    <ThemeProvider theme={themes} >
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
                      <Stack direction="row" spacing={2}>
                        <Button
                          className="Delete-btn"
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          onClick={() => { handleDelete(user.id) }}> Delete</Button>

                        <Button
                          className="ban-btn"
                          variant="outlined"
                          onClick={() => { handleBan(user.id) }}
                          color="secondary">{user.ban ? 'unban' : 'ban'}
                        </Button>
                      </Stack>
                    </article>
                  )
                }
              })}
          </section>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default UserList