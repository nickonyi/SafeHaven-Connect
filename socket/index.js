const io = require("socket.io")(8901,{
    cors:{
        origin:"http://localhost:5173"
    }
})

let users = [];

const addUser = (userId,socketId)=> {
    !users.some((user)=> user.userId ===userId) &&
    users.push({userId,socketId});
}
const removeUser= (socketId)=> {
    users = users.filter((user)=> user.socketId !== socketId);
}

io.on("connection",(socket)=>{
    console.log("a user connected");
    //take userid and socket id from user
    socket.on("addUser",(userId)=> {
         addUser(userId,socket.id);
         io.emit("getUsers",users);
    })

    socket.on("disconnect",()=> {
        console.log("a user disconnected!!");
        removeUser(socket.id)
        io.emit("getUsers",users);
    })
})