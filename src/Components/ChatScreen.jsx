import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ChatScreen = (props = {isChat:false,user:{}}) => {
    const Messages = [
        {
            from:"1",
            to:"2",
            text:"Hello",
            time:"12:20 am",
        },
        {
            from:"2",
            to:"1",
            text:"Hi",
            time:"12:00 am",
        },
        {
            from:"1",
            to:"2",
            text:"How are you?",
            time:"12:00 am",
        },
        {
            from:"2",
            to:"1",
            text:"I am fine",
            time:"12:00 am",
        },
    ]

    const [messages,setMessages] = useState(Messages);

    //function to filter message
    const searchMessage = (e) =>{
        const input = e.target.value;
        let m = document.getElementsByClassName('chat-screen-body-item');
        for(let i=0;i<m.length;i++){
            if(m[i].textContent.toLowerCase().includes(input.toLowerCase())){
                m[i].style.display = "flex";
            }
            else{
                m[i].style.display = "none";
            }
        }
    }

    //function to get the time
    const getTime = () => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        const hour = hours % 12;
        const minute = minutes < 10 ? '0' + minutes : minutes;
        const time = hour + ':' + minute + ' ' + ampm;
        return time;
    }
    
    const sendMessage = (e) =>{
        e.preventDefault();
        const input = e.target[0].value;
        if(input.trim() !== ""){
            setMessages([...messages,{
                from:props.user.from,
                to:props.user.to,
                text:input,
                time:getTime(),
            }])
        }
        e.target[0].value = "";
    }
    const Textmessage = (text,time,style="") => {
        return (
            <div className={"chat-screen-body-item " + style}>
            <img src={`https://avatars.dicebear.com/api/avataaars/${uuidv4()}.svg `} alt="" className="chat-screen-body-item-text-avatar"/>
                <div className="chat-screen-body-item-text">
                    <span className="chat-screen-body-item-text-message">{ text }</span>
                    <span className="chat-screen-body-item-text-time">{ time }</span>
                </div>
            </div> 
        )
    }
    if(props.isChat)
    return(
        <>
            <div className='chat-screen'>
                <div className="chat-screen-header">
                    <div className="chat-screen-header-left">
                        <img src={`https://avatars.dicebear.com/api/avataaars/${uuidv4()}.svg `} alt="" className="chat-screen-header-avatar"/>
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
                                    return Textmessage(message.text,message.time,"chat-screen-body-item-right")
                                else
                                return Textmessage(message.text,message.time)
                            }
                        
                        })
                }

                </div>
                <div className="chat-screen-footer">
                    <div className='flex'>
                    <i className="fas fa-smile"></i>
                    <form onSubmit={ sendMessage }>
                    <input type="text" placeholder="Type a message" />
                    </form>
                    </div>
                    <i className="fas fa-paper-plane"></i>
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
                        <i className="fas fa-paper-plane" ></i>
                        {/* <i className="fas fa-"></i> */}
                    </div>
                </div>
    
            </>
        )
    }
}

export default ChatScreen;