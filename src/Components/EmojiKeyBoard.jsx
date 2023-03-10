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
        "๐",
        "๐",
        "๐",
        "๐",
        "๐",
        "๐",
        "๐คฃ",
        "๐",
        "๐",
        "๐",
        "๐",
        "๐",
        "๐",
        "๐ฅฐ",
        "๐",
        "๐",
        "๐ฅฒ",
        "๐",
        "๐",
        "๐ค",
        "๐คฉ",
        "๐ค",
        "๐ซก",
        "๐คจ",
        "๐",
        "๐",
        "๐ถ",
        "๐ซฅ",
        "๐ถโ๐ซ๏ธ",
        "๐",
        "๐",
        "๐ฃ",
        "๐ฅ",
        "๐ฎ",
        "๐ค",
        "๐ฏ",
        "๐ช",
        "๐ซ",
        "๐ฅฑ",
        "๐ด",
        "๐",
        "๐",
        "๐",
        "๐",
        "๐คค",
        "๐",
        "๐",
        "๐",
        "๐",
        "๐ซค",
        "๐",
        "๐ซ ",
        "๐ค",
        "๐ฒ",
        "โน๏ธ",
        "๐",
        "๐",
        "๐"
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