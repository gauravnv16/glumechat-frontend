import axios from 'axios';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { API } from '../../DataBase/API';
import ChatScreen from './ChatScreen';

export const ChatSide = () => {
    const [isChat,setIsChat] = useState(false);
    const [to_user,setToUser] = useState({});

    const currentUser = JSON.parse(window.sessionStorage.getItem("user"));
    console.log(currentUser)
    const [users,setUsers] = useState([]);

    useEffect(() => {
        axios.get(`${API}api/users`)
        .then((res) => {
            setUsers(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    },[])
    
    // console.log(users)
    const searchUser = (e) => {
        let input = e.target.value.toLowerCase();
        let x = document.getElementsByClassName("chat-side-body-item");
        for (let i = 0; i < x.length; i++) {
            if (!x[i].getElementsByTagName("h3")[0].innerHTML.toLowerCase().includes(input)) {
                x[i].style.display="none";
            } else {
                x[i].style.display="flex";
            }
        }
    }

    const sideUser = (username,lastmessage,time,to,from) => {
        return (
            <div className="chat-side-body-item" onClick={() => {
                setIsChat(true);
                setToUser({name:username,status:"online",to:to,from:from});
                // console.log({name:username,status:"online"});
            }}>
                <div className="flex">
                    <img src={`https://avatars.dicebear.com/api/avataaars/${to}.svg `} alt="" className="chat-side-body-item-avatar"/>
                        <div className="chat-side-body-item-text">
                            <h3 name="username">{ username }</h3>
                            <span className="chat-side-body-item-text-message">{ lastmessage }</span>
                    </div>
                </div>
                <span className="chat-side-body-item-text-time">{ time }</span>
            </div>
        )
    }
    return (
        <>
           <div className="chat-side">
                <div className="chat-side-header">
                <h1>
                    <img src={`https://avatars.dicebear.com/api/avataaars/${currentUser.id}.svg `}alt="" className="chat-side-header-avatar"/>
                        <div className="chat-side-header-text">
                        <h1>{ currentUser.name }</h1>
                        <span className="status online">Online</span>
                    </div>
                </h1>
                    
                    <h1>Chats</h1>
                    <div className="chat-side-header-search">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Search" onChange={ searchUser }/>
                    </div>
                </div>
                <div className="chat-side-body">

                    {
                        users.map((user) => {
                            if(user.id !== currentUser.id) 
                            return sideUser(user.name,user.lastmessage,user.time,user.id,currentUser.id)
                        })
                    }
                    
                    
                </div>
                <div className="chat-side-footer">
                    {/* <img src={`https://avatars.dicebear.com/api/avataaars/${uuidv4()}.svg`} alt="" className="chat-side-footer-avatar"/> */}
                    <div className='chat-side-footer-text'>
                    
                    </div>
                </div>
           </div>
            <ChatScreen isChat={isChat} user={to_user}/>
        </>
    )
}