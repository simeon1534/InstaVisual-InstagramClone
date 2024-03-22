import {Request, Response} from "express";
import {UserModel} from "../models/UserModel";
import {UserDataInput} from "../types/UserDataInput";
import {UpdateUserData} from "../types/UpdateUserData";

export const getUser = async (req: Request, res: Response) => {
    const userId= parseInt(req.params.id);
    const userModel = new UserModel();
    const user = await userModel.getUser(userId);
    res.send(user);

}

export const getUserByUsername = async (req: Request, res: Response) => {
    const userName= req.params.username;
    const userModel = new UserModel();
    const user = await userModel.getUserByUsername(userName);
    res.send(user);

}

export const getUsers = async (req: Request, res: Response) => {

    const userModel = new UserModel();
    const users = await userModel.getUsers();
    res.send(users);

}

export const createUser = async (req: Request, res: Response) => {

    let userData: UserDataInput = req.body;



    if (!userData.username) {
        return res.send({
            status: 400,
            message: "Username has not been provided"
        })
    }
    if (!userData.password) {
        return res.send({
            status: 400,
            message: "Password has not been provided"
        })
    }
    if (!userData.email) {
        return res.send({
            status: 400,
            message: "Email has not been provided"
        })
    }
    const userModel = new UserModel();
    await userModel.createUser(userData)
    res.send({
        status: 201,
        message: "User created successfully!"
    })
}

export const deleteUser = async (req:Request,res: Response) => {
    const userModel = new UserModel();
    const userId = parseInt(req.params.id);

    const existingUser = await userModel.getUser(userId)
    console.log(existingUser)
    if (existingUser.length === 0) {
        return res.send({
            status: 404,
            message: "Not existing user!"
        })
    }
    await userModel.deleteUser(userId);
    res.send({
        status:204,
        message: `User with id ${userId} deleted successfully!`
    })
}


export const updateUser = async (req:Request,res: Response) => {
    const userModel = new UserModel();
    const userId = parseInt(req.params.id);
    let updateUserData: UpdateUserData = req.body;
    await userModel.updateUser(userId, updateUserData)
    res.send({
        status: 200,
        message: "User with id ${userId} updated successfully!"
    })



}