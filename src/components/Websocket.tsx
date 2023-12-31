import React, {useContext, useEffect, useState} from 'react';
import {WebsocketContext} from "../contexts/WebsocketContext";

type MessagePayload = {
    content: string;
    msg: string
}
const Websocket = () => {
    const [value, setValue] = useState<string>('');
    const [messages, setMessages] = useState<MessagePayload[]>([])

    const socket = useContext(WebsocketContext)


    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected')
        })


        socket.on('onMessage', (newMessage: MessagePayload) => {
            console.log('onMessage event received');
            console.log(newMessage)
            setMessages((prev) => [...prev, newMessage])
        })

        //clean
        return () => {
            console.log('Unregistering Events ...')
            socket.off('connect');
            socket.off('onMessage');
        }
    }, [])

    const onSubmit = () => {
        socket.emit('newMessage', value)
        setValue('')
    }

    return (
        <div className='container'>
            <h1>Websocket component</h1>
            <div>
                { !messages.length ? <p>No messages!</p> :
                    <>
                        {messages.map((message) =>
                            <div>
                                <p>{message.content}</p>
                                {/*<p>{message.msg}</p>*/}
                            </div>
                        )
                        }
                    </>

                }
            </div>
            <div>
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
                <button onClick={onSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default Websocket;