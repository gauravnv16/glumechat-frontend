import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { API } from '../../DataBase/API';
import { EmojiKeyBoard } from './EmojiKeyBoard';
import { FileUploadScreen } from './FileUploadScreen';
import { ImageZoomOnClick } from './ImageZoomOnClick';

const ChatScreen = (props = {isChat:false,user:{}}) => {
    // console.log(props.user)
    
    const [messages,setMessages] = useState([]);
    const [imageZoom,setImageZoom] = useState({});

    useEffect(()=> {
        axios.get(`${API}api/messages`).then((res) => {
            setMessages(res.data);
        }).catch((err) => {
            console.log(err);
        })
    },[messages]);

    //function to encrypt the message
    const encrypt = (text) => {
        let encrypted = "";
        for(let i=0;i<text.length;i++){
            encrypted += String.fromCharCode(text.charCodeAt(i) + 1);
        }
        return encrypted;
    }
    //function to decrypt the message
    const decrypt = (text) => {
        let decrypted = "";
        for(let i=0;i<text.length;i++){
            decrypted += String.fromCharCode(text.charCodeAt(i) - 1);
        }
        return decrypted;
    }
    //function to filter message
    
    const searchMessage = (e) =>{
        const input = e.target.value;
        let m = document.getElementsByClassName('chat-screen-body-item');
        for(let i=0;i<m.length;i++){
            if(m[i].textContent.toLowerCase().includes(input.toLowerCase())){
                m[i].style.display = "flex";
                // console.log({message:m[i].textContent,encrypted:encrypt(m[i].textContent),decrypted:decrypt(encrypt(m[i].textContent))})
            }
            else{
                m[i].style.display = "none";
            }
        }
    }

    //function to open emoji keyboard
    const openEmojiKeyBoard = () => {
        let emojiKeyBodard = document.getElementById('emojiKeyBodard');
        emojiKeyBodard.style.display = "flex";
    }
    //function to get the time
    const getTime = () => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        let hour = hours % 12;
        if(hour === 0)  hour = 12;
        
        const minute = minutes < 10 ? '0' + minutes : minutes;
        const time = hour + ':' + minute + ' ' + ampm;
        return time;
    }
    
    const sendMessage = (e) =>{
        e.preventDefault();
        const input = e.target[0].value;
        const m = encrypt(input);
        const time = getTime();

        if(input.trim() !== ""){
            const msgObj = {
                from:props.user.from,
                to:props.user.to,
                text:m,
                time:time,
                type:"text",
            }

            setMessages([...messages,{
                from:props.user.from,
                to:props.user.to,
                text:m,
                time:time,
            }])

            axios.post(`${API}api/messages/sendMessage`,msgObj).then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            })
        }


        e.target[0].value = "";
        
    }
    const Textmessage = (text,time,style="",id,type) => {
        if(type === "text"){
            return (
                <div className={"chat-screen-body-item " + style}>
                <img src={`https://avatars.dicebear.com/api/avataaars/${id}.svg `} alt="" className="chat-screen-body-item-text-avatar"/>
                    <div className="chat-screen-body-item-text">
                        <span className="chat-screen-body-item-text-message">{ text }</span>
                        <span className="chat-screen-body-item-text-time">{ time }</span>
                    </div>
                </div> 
            ) 
        } else if(type === "image") {
            return (
                <div className={"chat-screen-body-item-image " + style} style={{"margin":"30px 0px","height":"150px","overflow":"hidden","cursor":"pointer"}}>
                <img src={`https://avatars.dicebear.com/api/avataaars/${id}.svg `} alt="" className="chat-screen-body-item-text-avatar" />
                    <div className="chat-screen-body-item-text">
                        <img src={text} alt="" className="chat-screen-body-item-text-message-image" onClick={ () => {
                            console.log("you clicked")
                            setImageZoom({
                                src:text,
                                isZoom:true,
                                url:text,
                                filename:text.split("/")[text.split("/").length - 1],
                            })
                        }} style={{"height":"200px","width":"200px","borderRadius":"10px"}}/>
                        <span className="chat-screen-body-item-text-time">{ time }</span>
                    </div>
                </div> 
            )
        
        }
    }
    if(props.isChat)
    return(
        <>
            <div className='chat-screen'>
                <div className="chat-screen-header">
                    <div className="chat-screen-header-left">
                        <img src={`https://avatars.dicebear.com/api/avataaars/${props.user.to}.svg `} alt="" className="chat-screen-header-avatar"/>
                        <div className="chat-screen-header-text">
                            <h1>{ props.user.name }</h1>
                            <span className="status online">{ props.user.status }</span>
                        </div>
                    </div>
                    <div className="chat-screen-header-right">
                        <div className='chat-screen-header-right-search'>
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="Search" onChange={ searchMessage }/>
                                
                        </div>
                        <i className="fas fa-video"></i>
                        <i className="fas fa-phone"></i>
                        <i className="fas fa-ellipsis-v"></i>
                    </div>
                </div>
                <div className="chat-screen-body">
                {
                        messages.map((message) => {
                            if(props.user.from === message.from && props.user.to === message.to || props.user.from === message.to && props.user.to === message.from){
                                if(props.user.from === message.from)
                                    return Textmessage(decrypt(message.text),message.time,"chat-screen-body-item-right",message.from,message.type)
                                else
                                return Textmessage(decrypt(message.text),message.time,"",message.from,message.type)
                            }
                        
                        })
                }

                </div>
                <EmojiKeyBoard/>
                <FileUploadScreen user={props.user}/>
                <ImageZoomOnClick image={imageZoom}/>
                <div className="chat-screen-footer">
                    <div className='flex'>
                    <i className="fas fa-smile" onClick={ openEmojiKeyBoard }></i>
                    <form onSubmit={ sendMessage }>
                    <input type="text" placeholder="Type a message" id="messageField"/>
                    </form>
                    </div>
                    <div>
                    <i className="fas fa-image" onClick={ () => { document.getElementById('fileUploadScreen').style.display = "flex" } }></i>
                    <i className="fas fa-paper-plane"></i>
                    </div>
                    {/* <i className="fas fa-"></i> */}
                </div>
            </div>

        </>
    )
    else{
        const hidden = {
            visibility:'hidden'
        }
        return(
            <>
                <div className='chat-screen'>
                    <div className="chat-screen-header" style={hidden}>
                        <div className="chat-screen-header-left">
                            <img src={`https://avatars.dicebear.com/api/avataaars/${uuidv4()}.svg `} alt="" className="chat-screen-header-avatar"/>
                            <div className="chat-screen-header-text">
                                <h1></h1>
                                <span className="status online">Online</span>
                            </div>
                        </div>
                        <div className="chat-screen-header-right">
                            <div className='chat-screen-header-right-search'>
                                <i className="fas fa-search"></i>
                                <input type="text" placeholder="Search"/>
                                    
                            </div>
                            <i className="fas fa-video"></i>
                            <i className="fas fa-phone"></i>
                            <i className="fas fa-ellipsis-v"></i>
                        </div>
                    </div>
                    <div className="chat-screen-body">
                        
                        <h1 style={{"textAlign":"center"}}>Select a chat to start</h1>
                        
                    </div>
                    <div className="chat-screen-footer" style={hidden}>
                        <div className='flex'>
                        <i className="fas fa-smile"></i>
                        <input type="text" placeholder="Type a message"/>
                        </div>
                        {/* <i className="fas fa-pin"></i> */}
                        {/* file icon */}
                        <i className="fas fa-paper-plane"></i>

                        
                        {/* <i className="fas fa-"></i> */}
                    </div>
                </div>
    
            </>
        )
    }
}

export default ChatScreen;