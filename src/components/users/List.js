import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' 
import '../../App.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import axios from 'axios'

export default function List () {
    useEffect(
        () => {
            fetchUsers()
        },[]
    )
    const [users, setUsers] = useState([])
    
    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:3000/api/v1/users')
        //const users = await response
        //console.log(response.data.data)
        setUsers(response.data.data)
    }

    
    return (

        <Container>
            <Row className="justify-content-md-center">
                <h5>Usuários do Sic</h5>
            </Row>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>Nome</th>
                    <th>Usuário</th>
                    <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                {users.map(user =>(
                    <tr key={user.data.id}>
                        <td><Link to={`/user/${user.data.id}`}>{user.data.attributes.nome}</Link></td>
                        <td>{user.data.attributes.public_id}</td>
                        <td>{user.data.attributes.email}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    )
}
