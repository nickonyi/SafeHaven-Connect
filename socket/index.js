const io = require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:5173",
        
    },
    rejectUnauthorized: false
})

let users = [];
console.log(users);

const addUser = (userId,socketId)=> {
    !users.some((user)=> user.userId ===userId) &&
    users.push({userId,socketId});
}
const removeUser= (socketId)=> {
    users = users.filter((user)=> user.socketId !== socketId);
}
const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

io.on("connection",(socket)=>{
    console.log("a user connected");
    //take userid and socket id from user
    socket.on("addUser",(userId)=> {
         addUser(userId,socket.id);
         console.log(users);
         io.emit("getUsers",users);

    })

    //send and get message
    socket.on("sendMessage",({senderId,receiverId,text})=> {
        
        const user = getUser(receiverId);
        console.log(receiverId);
        console.log(users);
        console.log(user);
        
        io.to(user.socketId).emit("getMessages",{
             senderId,
             text
        })
    })
    

    socket.on("disconnect",()=> {
        console.log("a user disconnected!!");
        removeUser(socket.id)
        io.emit("getUsers",users);
    })
})