import { v4 as uuidv4 } from 'uuid';

export const ChatSide = () => {
    return (
        <>
           <div className="chat-side">
                <div className="chat-side-header">
                    
                    <h1>
                        
                    <img src={`https://avatars.dicebear.com/api/avataaars/${uuidv4()}.svg `}alt="" className="chat-side-header-avatar"/>
                        <div className="chat-side-header-text">
                        <h1>Gaurav</h1>
                        <span className="status online">Online</span>
                        </div>
                    </h1>
                    <h1>Chats</h1>
                    <div className="chat-side-header-search">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Search"/>
                    </div>
                </div>
                <div className="chat-side-body">
                    <div className="chat-side-body-item">
                        <div className="flex">
                            <img src={`https://avatars.dicebear.com/api/avataaars/${uuidv4()}.svg `} alt="" className="chat-side-body-item-avatar"/>
                            <div className="chat-side-body-item-text">
                                <h3>Gaurav</h3>
                                <span className="chat-side-body-item-text-message">Hello</span>
                            </div>
                        </div>
                        <span className="chat-side-body-item-text-time">12:00</span>
                    </div>
                    <div className="chat-side-body-item">
                        <div className="flex">
                            <img src={`https://avatars.dicebear.com/api/avataaars/${uuidv4()}.svg `} alt="" className="chat-side-body-item-avatar"/>
                            <div className="chat-side-body-item-text">
                                <h3>Gaurav</h3>
                                <span className="chat-side-body-item-text-message">Hello</span>
                            </div>
                        </div>
                        <span className="chat-side-body-item-text-time">12:00</span>
                    </div>
                    <div className="chat-side-body-item">
                        <div className="flex">
                            <img src={`https://avatars.dicebear.com/api/avataaars/${uuidv4()}.svg `} alt="" className="chat-side-body-item-avatar"/>
                            <div className="chat-side-body-item-text">
                                <h3>Gaurav</h3>
                                <span className="chat-side-body-item-text-message">Hello</span>
                            </div>
                        </div>
                        <span className="chat-side-body-item-text-time">12:00</span>
                    </div>
                </div>
           </div>
            
        </>
    )
}