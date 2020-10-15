import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

function Nav () {
    return (
        <nav>
            <h3><Link className="nav-style" to="/">Logo</Link></h3>
            <ul className="nav-links">
                <Link className="nav-style" to="/list">
                    <li>Usuários</li>
                </Link>
                <Link className="nav-style" to="/user">
                    <li>Novo usuário</li>
                </Link>
            </ul>
        </nav>
    )
}
export { Nav }
