import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AppDispatch, RootState } from "../redux/store"
import { fetchUsers, login } from "../redux/users/UsersSlice"

export const Login = ({ pathName }: { pathName: string }) => {


  const { users } = useSelector((state: RootState) => state.UsersR)

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])


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

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    try {
      console.log(user)
      const foundUser = users.find(userData => userData.email === user.email)
      if (foundUser && foundUser.password === user.password) {
        dispatch(login(foundUser))
        navigate(pathName ? pathName : `/dashboard/${foundUser.role}`)
      } else {
        console.log("something wrong with email or password!")
      }
    } catch (error) {
      console.log(error)
    }
    setUser({
      email: '',
      password: ''
    })
  }

  return (
    <div className="container">
      <h2>User login</h2>
      <div className="card">
        <form className="registeation-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" id="email" value={user.email} onChange={handleInputChange} />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" placeholder="password" value={user.password} onChange={handleInputChange} />
          </div>

          <div className="form-control">
            <button type="submit" className="btn"> Login </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login