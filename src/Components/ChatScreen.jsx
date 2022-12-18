import { v4 as uuidv4 } from 'uuid';

const ChatScreen = () => {
    return(
        <>
            <div className='chat-screen'>
                <div className="chat-screen-header">
                    <div className="chat-screen-header-left">
                        <img src={`https://avatars.dicebear.com/api/avataaars/${uuidv4()}.svg `} alt="" className="chat-screen-header-avatar"/>
                        <div className="chat-screen-header-text">
                            <h1>Gaurav</h1>
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
                    <div className="chat-screen-body-item">
                    <img src={`https://avatars.dicebear.com/api/avataaars/${uuidv4()}.svg `} alt="" className="chat-screen-body-item-text-avatar"/>

                        <div className="chat-screen-body-item-text">
                            <span className="chat-screen-body-item-text-message">Hello</span>
                            <span className="chat-screen-body-item-text-time">12:00</span>
                        </div>
                    </div>
                    <div className="chat-screen-body-item chat-screen-body-item-right">
                    <img src={`https://avatars.dicebear.com/api/avataaars/${uuidv4()}.svg `} alt="" className="chat-screen-body-item-text-avatar"/>
                        <div className="chat-screen-body-item-text">
                            <span className="chat-screen-body-item-text-message">Hello</span>
                            <span className="chat-screen-body-item-text-time">12:00</span>
                        </div>
                    </div>
                </div>
                <div className="chat-screen-footer">
                    <div className='flex'>
                    <i className="fas fa-smile"></i>
                    <input type="text" placeholder="Type a message"/>
                    </div>
                    <i className="fas fa-paper-plane"></i>
                    {/* <i className="fas fa-"></i> */}
                </div>
            </div>

        </>
    )
}

export default ChatScreen;