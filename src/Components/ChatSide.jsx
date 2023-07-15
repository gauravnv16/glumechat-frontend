import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { API } from '../../DataBase/API';
import ChatScreen from './ChatScreen';
import { userContext } from './UserContext';
import { useNavigate } from 'react-router';

export const ChatSide = () => {
    const [isChat,setIsChat] = useState(false);
    const [to_user,setToUser] = useState({});
    const navigate = useNavigate();
    // const currentUser = JSON.parse(window.sessionStorage.getItem("user"));
    const currentUser = useContext(userContext).user;

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
           <div className="chat-side" style={{
                minWidth:"300px",
           }}>
                <div className="flex flex-col">
                <header className='flex items-center justify-between'>
                <h1>
                    <div>
                        <h3 className='text-sm text-gray-800'>{ currentUser.name }</h3>
                        <span className="text-xs text-green-500">Online</span>
                    </div>
                </h1>
                <section>
                    <button className="text-xs bg-red-500 text-white px-3 py-2 rounded" onClick={() => {
                        window.sessionStorage.removeItem("user");
                        navigate("/");
                    }}>Logout</button>
                </section>
            </header>
            <hr className='my-2'/>
                    <h3 className='m-2 text-xl font-bold'>Chats</h3>
                    <div className='border-2 border-gray-100 flex items-center p-2 my-2 rounded'>
                        <i className="fas fa-search mr-2 text-gray-500"></i> 
                        <input type="text" placeholder="Search" onChange={ searchUser } className="outline-none w-full" />
                    </div>
                </div>
                <hr className='my-2'/>
                <div className="chat-side-body">

                    {
                        users.map((user,index) => {
                            if(user.id !== currentUser.id) 
                            return <span key={index}>{sideUser(user.name,user.lastmessage,user.time,user.id,currentUser.id)}</span>
                        })
                    }
                    
                    
                </div>
           </div>
            <ChatScreen isChat={isChat} user={to_user}/>
        </>
    )
}