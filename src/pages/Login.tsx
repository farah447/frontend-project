import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "../redux/store"
import { fetchUsers, login } from "../redux/users/usersSlice"
import { ThemeProvider } from '@mui/material/styles';
import { Button } from "@mui/material";

import themes from '../Theme/Themes';

export const Login = ({ pathName }: { pathName: string }) => {


  const { users } = useSelector((state: RootState) => state.usersReducer)

  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: ''
  })


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }
    })
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    console.log("Users in Redux store:", users);
    try {
      const foundUser = users.find((userData) => userData.email.toLowerCase() === user.email.toLowerCase())

      if (!foundUser) {
        console.log("user not found with this email!")
        return
      }

      if (foundUser.password !== user.password) {
        console.log("user password did not match!")
        return
      }

      if (foundUser.isBanned) {
        console.log("user account is banned!")
        return
      }

      dispatch(login(foundUser))
      navigate(pathName ? pathName : `/dashboard/${foundUser.isAdmin}`)
    } catch (error) {
      console.log(error)
    }
    setUser({
      email: '',
      password: ''
    })
  }

  return (
    <ThemeProvider theme={themes} >
      <div className="login-container">
        <div className="card">
          <h2>User login</h2>
          <form className="registeation-form" onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="email">Email: </label>
              <input type="email" name="email" id="email" value={user.email} onChange={handleInputChange} required />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password: </label>
              <input type="password" name="password" id="password" placeholder="password" value={user.password} onChange={handleInputChange} required />
            </div>

            <div className="form-control">
              <Button
                className="btn-login"
                variant="outlined"
                type='submit'
                color="secondary"
                size="small">
                Login</Button>
              <Link to='/forget-password'> Forget Password?</Link>
            </div>
          </form>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Login