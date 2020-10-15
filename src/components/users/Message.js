import React, {useState} from 'react';
import { render } from 'react-dom';
import FlashMessage from 'react-flash-message'
import '../../App.css'

function Message({mensagem}) {
    const [msg, setMsg] = useState(mensagem) 
    return (
        <FlashMessage mensagem={msg} duration={5000}>
            <strong>{msg}</strong>
        </FlashMessage>
    )
}
export default Message
 
