import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' 
import '../../App.css'
import axios from 'axios'
import Form from './Form'
import { List } from './perfis/list'

export default function UserDetail({match}) { 

    if(match.params.id) {
        
        
        const [user, setUser] = useState({})
        useEffect(() => {
            async function fetchUser() {
                const response = await axios.get(`http://localhost:3000/api/v1/users/${match.params.id}`)
                setUser(response.data.data[0])
            }
            fetchUser();
        }, []); // Or [] if effect doesn't need props or state
        if(user.data) {
            return (
                <>
                    <header></header>
                    <div className="App">
                        <Form user={user.data} />
                    </div>
                </>
            )
    
        } else {
            return null
        }
    
    } else {
        const user = { 
            id: '', 
            attributes: 
                { public_id: '', nome:'', email: '', is_admin: false, active: false,
                lembre_me: false, authenticated: false, created_on: '', password: '', posto_id: '' 
                }
        }
        return (
                <>
                    <header></header>
                    <div className="App">
                        <Form user={user} />
                    </div>
                </>
        )
    }
}
