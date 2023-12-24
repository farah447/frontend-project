import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "../redux/store"
import { fetchUsers, loginUser } from "../redux/users/usersSlice"
import { ThemeProvider } from '@mui/material/styles';
import { Button, Card, Typography } from "@mui/material";
import { CardContent, TextField, Box } from '@mui/material';

import themes from '../Theme/Themes';

export const Login = ({ pathName }: { pathName: string }) => {


  const { users } = useSelector((state: RootState) => state.usersReducer)
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.usersReducer);

  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }
    })
  }

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, [dispatch]);


  useEffect(() => {
    if (userData) {
      navigate(
        pathName ? pathName : `/dashboard/${userData && userData.isAdmin ? 'admin' : 'user'}`
      )
    }
  }, [userData, navigate, pathName])

  // const handleSubmit = async (event: FormEvent) => {
  //   event.preventDefault()
  //   console.log("Users in Redux store:", users);
  //   try {
  //     //const foundUser = users.find((userData) => userData.email.toLowerCase() === user.email.toLowerCase())
  //     dispatch(loginUser(user));
  //     navigate(`/dashboard/${userData?.isAdmin ? 'admin' : 'user'}`);

  //     /*if (loggedInUser) {
  //       navigate(`/dashboard/${loggedInUser.isAdmin ? 'admin' : 'user'}`);
  //     }
  //     if (loggedInUser.isAdmin === 'admin') {
  //       navigate('admin/dashboard')
  //     } else {
  //       navigate('user/dashboard')
  //     }*/

  //     /*if (!foundUser) {
  //       console.log("user not found with this email!")
  //       return
  //     }

  //     if (foundUser.password !== user.password) {
  //       console.log("user password did not match!")
  //       return
  //     }

  //     if (foundUser.isBanned) {
  //       console.log("user account is banned!")
  //       return
  //     }*/

  //     //navigate(pathName ? pathName : `/dashboard/${userData?.isAdmin}`)

  //   } catch (error) {
  //     console.log(error)
  //   }
  //   /*setUser({
  //     email: '',
  //     password: '',
  //   })*/
  // }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    console.log("Users in Redux store:", users);
    try {
      dispatch(loginUser(user));
      //  navigate(`/dashboard/${userData?.isAdmin ? 'admin' : 'user'}`);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ThemeProvider theme={themes}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Card>
          <CardContent>
            <Typography variant="h4" component="h2" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                value={user.email}
                onChange={handleInputChange}
                style={{ marginBottom: '20px', width: '100%' }}
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                value={user.password}
                onChange={handleInputChange}
                style={{ marginBottom: '20px', width: '100%' }}
              />
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </form>
            <Link to='/forget-password' style={{ display: 'block', marginTop: '20px' }}>
              Forgot Password?
            </Link>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  )
}

export default Login