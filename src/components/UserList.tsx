import { ChangeEvent, useEffect, useState } from "react";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { API_BASE_URL, banUnbanUsers, deleteUsers, fetchUsers, searchUser } from "../redux/users/usersSlice";
import { Button, Stack } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';

import UserSidebar from "./UserSidebar";
import SearchInput from "./SearchInput";
import useUserState from "../hooks/useUserState";
import DeleteIcon from '@mui/icons-material/Delete';
import themes from '../Theme/Themes';

const UserList = () => {
  const { users, isLoading, error, searchTerm } = useUserState();

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])
  console.log(users)
  /*if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error}</p>
  }*/

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchUser(event.target.value))
  }

  const searchUsers = searchTerm ? users.filter((user) => user.userName.toLowerCase().includes(searchTerm.toLowerCase())) : users

  const handleDelete = async (userName: string) => {
    try {
      dispatch(deleteUsers(userName))

    } catch (error) {
      console.log(error.response?.data?.message || 'An error occurred while deleting the user')
    }
  }

  const handleBanUnban = async (userName: string, isBanned: boolean) => {
    try {
      const response = isBanned ? dispatch(banUnbanUsers(userName)) : dispatch(banUnbanUsers(userName))
      console.log(response)
    } catch (error) {
      console.log(error.response?.data?.message || 'An error occurred while deleting the user')
    }
  }

  return (
    <ThemeProvider theme={themes} >
      <div className='container-user'>
        <UserSidebar />
        <div className='main-content-user'>
          <h2>List of all users</h2>
          <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
          <section className="users">
            {searchUsers.length > 0 &&
              searchUsers.map((user) => {
                if (String(user.isAdmin) !== 'Admin') {
                  return (
                    <article key={user._id} className='user'>
                      <img src={`${API_BASE_URL}/${user.image}`} alt={user.image}></img>
                      <h2>{`${user.userName}`}</h2>
                      <h2>{user.email}</h2>
                      <div className='main-content-user-btn'>
                        <Stack direction="row" spacing={2}>
                          <Button
                            className="Delete-btn"
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={() => { handleDelete(user.userName) }}> Delete</Button>

                          <Button
                            className="ban-btn"
                            variant="outlined"
                            onClick={() => { handleBanUnban(user.userName, user.isBanned) }}
                            color="secondary">{user.isBanned ? 'unban' : 'ban'}
                          </Button>
                        </Stack>
                      </div>
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