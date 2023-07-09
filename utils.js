const fs = require("fs")

const getChat = () => {
    filename = "chat.dat"
    result = fs.readFileSync(filename, "utf8")
    return result;
}
const setChat = (message) => {
    console.log(message)
    if(message['username'] === undefined || message['content'] === undefined)
        return
    filename = "chat.dat"
    fs.appendFileSync(filename, message['username']+": "+message['content']+"\n");
}

module.exports = {getChat, setChat}