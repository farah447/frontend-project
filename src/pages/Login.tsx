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

  useEffect(() => {
    if (userData) {
      navigate(
        pathName ? pathName : `/dashboard/${userData && userData.isAdmin ? 'admin' : 'user'}`
      )
    }
  }, [userData, navigate, pathName])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    console.log("Users in Redux store:", users);
    try {
      dispatch(loginUser(user));
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