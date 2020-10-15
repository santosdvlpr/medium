import React, { useState, useEffect } from 'react'
import '../../../App.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios'

function List () {
    useEffect(
        () => {
            fetchPerfis()
        },[]
    )
    const [perfis, setPerfis] = useState([])
    
    const fetchPerfis = async () => {
        const response = await axios.get('http://localhost:3000/api/v1/perfis')
        const res = await response.data
        setPerfis(res.data)
        console.log(res.data)
    }

    function alertClicked() {
        alert('You clicked the third ListGroupItem');
    }

    return (

        <Container>
            <Row className="justify-content-md-center">
                <h5>Perfís disponíveis</h5>
            </Row>
            <Row className="justify-content-md-center">
                <ListGroup>
                {perfis.map(perfil =>(
                    <ListGroup.Item action onClick={alertClicked} key={perfil.id}>
                        {perfil.attributes.nome}
                    </ListGroup.Item>
                ))}
                </ListGroup>
            </Row>
        </Container>

    )
}
export { List }
