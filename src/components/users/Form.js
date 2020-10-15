import React, { useState, useEffect } from 'react'
import { useForm, ErrorMessage } from "react-hook-form"
import uState from '../../utils/useSState'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
import Message from './Message'
//import '../../App.css'


let renderCount = 0


export default function Form(props) {
    const { register, handleSubmit, watch, errors } = useForm()
    renderCount++
    const onSubmit = async data => {
        let user = {
            id: props.user.id,
            public_id: data.public_id,
            nome: data.nome, 
            email: data.email, 
            is_admin: false,
            active: false,
            lembre_me: false,
            authenticated: false,
            password: '123456',
            posto_id: data.posto_id,
            perfil: data.perfil
        }
        const result = await salvar(user)
        console.log(data)
        //return(result)
    }
     
    const [values, handleChange] = useState(props.user.attributes)
    const [postos, setPostos] = useState([])
    const [perfis, setPerfis] = useState([])
    const [userPerfis, setUserPerfis] = useState([])
    const [mensagem, setMensagem] = useState('')

    useEffect(() => {
        async function fetchUserPerfis() {
            const response2 = await axios(
                    'http://localhost:3000/api/v1/perfis',
            )
            setPerfis(response2.data.data)
            const response = await axios(
                `http://localhost:3000/api/v1/perfis/user/${props.user.id}`,
            )
            setUserPerfis(response.data.data)
        }
        fetchUserPerfis()
    },[])
    useEffect(() => {
        async function fetchPostos() {
            const response = await axios(
                 'http://localhost:3000/api/v1/postos',
            )
            setPostos(response.data.data)
        }
        fetchPostos()
    },[])
    
    
    const salvar = async  user => {
        
        let response = await fetch('http://localhost:3000/api/v1/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        let result = await response.json()
        setMensagem(`Usuário ${user.id} salvo com sucesso!!`);
        return(result)
    }

    function handlePerfil(perfil) {
        
        var copyUserPerfis = userPerfis
                
        if(JSON.stringify(userPerfis).includes(JSON.stringify(perfil)))
            {
                /** Remove o perfil */
                let i = JSON.stringify(copyUserPerfis).indexOf(JSON.stringify(perfil))
                var novo = copyUserPerfis.splice(i, 1)
                setUserPerfis(novo)
            }
        else
           {
                /** Insere o perfil */
                var l = copyUserPerfis.push(perfil)
                //console.log(l)
                setUserPerfis(copyUserPerfis)
           }
    }
/*
    if(perfis.length>0) {   
*/
        return (
            <Container>
                <Row>
                      <Message mensagem={mensagem} />
                </Row>
                <Row className="justify-content-md-center">
                    <h5>Usuário</h5>
                </Row>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                <Row className="justify-content-md-center">
                    <Col md={3}><label>Nome:</label></Col>
                    <Col md={7}>
                        <input
                        type="text"
                        value={values.nome}
                        onChange={handleChange}
                        className="form-control" 
                        name='nome' 
                        placeholder='nome completo' 
                        ref={register({
                            required: 'Nome é obrigatório!!', 
                            minLength: {value:15, message: 'Nome muito curto!!'}})}
                        />
                        {errors.nome && <p>{errors.nome.message}</p>}
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md={3}><label>Nome de Usuário:</label></Col>
                    <Col md={7}>
                        <input 
                        type="text" 
                        value={values.public_id}
                        onChange={handleChange}
                        className="form-control" 
                        name='public_id' 
                        placeholder='nome de usuario' 
                        ref={register({
                            required: 'Nome de usuário é obrigatório!!',
                            maxLength: {value:11, message: 'Nome de usuário muito longo'}})}
                        />
                        {errors.public_id && <p>{errors.public_id.message}</p>}
                    </Col>    
                </Row>
                <Row className="justify-content-md-center">
                    <Col md={3}><label>Email:</label></Col>
                    <Col md={7}>
                        <input 
                            className="form-control" 
                            type="email" 
                            value={values.email} 
                            onChange={handleChange}
                            name='email' 
                            placeholder='email' 
                            ref={register({
                                required: 'Email é obrigatório!!'
                                })}
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                    </Col>    
                </Row>
                <Row className="justify-content-md-center">
                    <Col md={3}><label>Posto:</label></Col>
                    <Col md={7}>
                        <select
                            className="form-control" 
                            name="posto_id" 
                            ref={register({
                                required: 'Posto é obrigatório!!'
                            })} 
                            value={values.posto_id}
                            onChange={handleChange}
                            > 
                        <option value="" key="">Selecionar</option>
                        {
                            postos.map(posto => (
                                <option value={posto.data.id} key={posto.data.id}>{posto.data.attributes.nome}</option>
                            ))
                        }
                        </select>   
                        {errors.posto_id && <p>{errors.posto_id.message}</p>}
                    </Col>    
                </Row>
                <Row className="justify-content-md-center">
                    <Col md={3}><label>Perfil:</label></Col>
                    <Col md={7}>
                        {/*console.log('----------^^^^^^--------------')*/}
                        {/*console.log(JSON.stringify(userPerfis))*/}
                        {perfis.map(perfil => ( 
                        <div key={perfil.data.id} className="form-check">
                            <label className="form-check-label">
                                <input
                                    type="checkbox"
                                    checked={JSON.stringify(userPerfis).includes(JSON.stringify(perfil))}
                                    className="form-check-input" 
                                    name={`perfil[${perfil.data.id-1}]`}
                                    ref={register()}
                                    onChange={handleChange}
                                    onClick={() => handlePerfil(perfil)}
                                />
                                {perfil.data.attributes.nome}
                            </label>
                        </div>
                        ))}
                    </Col>
                </Row>

                <br/>
                <p>Mensagem: {mensagem}</p>
                <Row className="justify-content-md-center">
                    <Col md={9} id="mensa"></Col>
                    <Col md={1} className="justify-content-md-right">
                        <Button type="submit" variant="primary" size="sm" active>Salvar</Button>
                    </Col>
                </Row>
                </form>
            </Container>
        )

/*
    }
    
     else {
        return (
            <p>Render Counter:{renderCount}</p>
        )
    }
    */    
}
