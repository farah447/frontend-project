import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
                <li>
                    <Link to="/dashboared/user">User</Link>
                </li>
                <li>
                    <Link to="/dashboared/admin">Admin</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar