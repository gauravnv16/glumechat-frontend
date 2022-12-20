export const EmojiKeyBoard = () => {
    //function to inser emoji
    const insertEmoji = (e) => {
        let input = document.getElementById('messageField');
        input.value += e.target.textContent;
    }

    // emojiKeyBodard
    //function to close emoji keyboard
    const closeEmojiKeyBoard = () => {
        let emojiKeyBodard = document.getElementById('emojiKeyBodard');
        emojiKeyBodard.style.display = "none";
    }
    const emojies = [
        "😀",
        "😃",
        "😄",
        "😁",
        "😆",
        "😅",
        "🤣",
        "😂",
        "🙂",
        "🙃",
        "😉",
        "😊",
        "😇",
        "🥰",
        "😗",
        "😙",
        "🥲",
        "😚",
        "🙂",
        "🤗",
        "🤩",
        "🤔",
        "🫡",
        "🤨",
        "😐",
        "😑",
        "😶",
        "🫥",
        "😶‍🌫️",
        "🙄",
        "😏",
        "😣",
        "😥",
        "😮",
        "🤐",
        "😯",
        "😪",
        "😫",
        "🥱",
        "😴",
        "😌",
        "😛",
        "😜",
        "😝",
        "🤤",
        "😒",
        "😓",
        "😔",
        "😕",
        "🫤",
        "🙃",
        "🫠",
        "🤑",
        "😲",
        "☹️",
        "🙁",
        "😖",
        "😞"
    ]
    return (
        <div className="emoji-keyboard" id="emojiKeyBodard">
           <form>
           <div className="emoji-keyboard-header">
                <div className="emoji-keyboard-header-left">
                    <div className="flex">
                    <i className="fas fa-arrow-left" onClick={ closeEmojiKeyBoard }></i>
                    <h1>Emoji</h1>
                    </div>
                </div>
                <div className="emoji-keyboard-header-right">
                    <i className="fas fa-ellipsis-v"></i>
                </div>
            </div>
            <div className="emoji-keyboard-body">
                {
                    emojies.map((emoji)=>{
                        return <span className="emoji-icon" onClick={ insertEmoji }>{emoji}</span>
                    })
                }
            </div>
           </form>
            </div>
                            
    )
}