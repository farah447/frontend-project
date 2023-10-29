import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../redux/store"
import { fetchUsers, updateUser } from "../redux/users/UsersSlice"

import UserSidebar from "./UserSidebar"
import UseUserState from "../hooks/UseUserState"

const UserProfile = () => {
  const dispatch: AppDispatch = useDispatch()
  const { userData, users } = UseUserState()
  const [isFormOpen, setIsFormOpen] = useState(false)

  const [user, setUser] = useState({
    firstName: userData?.firstName,
    lastName: userData?.lastName
  })
  //console.log(users)

  {/*useEffect(() => {
    setUser({
      firstName: userData?.firstName,
      lastName: userData?.lastName,
    });
  }, [userData]);*/}

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const handleFormOpen = () => {
    setIsFormOpen(!isFormOpen)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => {
      return { ...prevUser, [event.target.name]: event.target.value }
    })
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const updateUserData = { id: userData?.id, ...user }
    dispatch(updateUser(updateUserData))
    //console.log("Updating user data:", userData);
  }

  return (
    <div className='container'>
      <UserSidebar />
      <div className='main-content'>
        {userData && (
          <div>
            <div>
              <p>Id: {userData.id}</p>
              <p>Name: {`${userData?.firstName} ${userData?.lastName}`}</p>
              <p>Email: {userData.email}</p>
              <p>Role: {userData.role}</p>
              <button className="btn" onClick={handleFormOpen}>Edit profile</button>
            </div>

            {isFormOpen && (
              <form action="" onSubmit={handleSubmit}>
                <input type="text" name="firstName" value={user.firstName} onChange={handleChange} />
                <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
                <button type="submit">Update the Profile</button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;