import { ChatSide } from "./Components/ChatSide";
import { UserContext } from './Components/UserContext'

function Chat() {
    return <>
    <div className="container">
        <UserContext>
        <ChatSide/>
        </UserContext>
    </div>
    </>
}

export default Chat