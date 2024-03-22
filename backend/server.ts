import {Express, urlencoded} from "express"
const express = require('express');

import {userRouter} from "./routes/userRoutes";
import {photoRouter} from "./routes/photoRoutes";
import {auth} from "./middlewares/auth";

const cors = require('cors');

const server: Express = express();
server.use(express.json({limit:'20mb'})); // Add this middleware before your routes
server.use(cors());
//server.set("view engine", "pug")

server.use(urlencoded({extended:true}));

server.use('/user_api',auth, userRouter);
server.use('/photo_api',auth,  photoRouter)


//server.get("/users/all", getAllUsers)
//server.post("/users/add/:id/:name/:email/:age", addUser)
//server.get("/users/find/:email", findUserByEmail)

server.listen(500, () => {
    console.log("Backend Started...")
})
