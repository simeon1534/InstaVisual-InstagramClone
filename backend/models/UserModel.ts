import {DB} from "../core/DB";
import {UserDataInput} from "../types/UserDataInput";
import {UpdateUserData} from "../types/UpdateUserData";



export class UserModel {
   private conn;
   constructor() {
       this.conn = new DB().conn;
   }


   async getUsers(){
       const [rows] =  await this.conn.query("SELECT * FROM users")
       return rows;
   }
    async getUser(user_id: number){
        const [rows] =  await this.conn.query("SELECT * FROM users WHERE user_id = ?", [user_id])
        return rows;
    }
    async getUserByUsername(username: string){
        const [rows] =  await this.conn.query("SELECT * FROM users WHERE username LIKE ?", [username])
        return rows;
    }

    async createUser(userDataInput: UserDataInput){
        const insertDataObject = [
            userDataInput.username,
            userDataInput.password,
            userDataInput.email,
            userDataInput.first_name ?? null,
            userDataInput.last_name ?? null
        ]
        await this.conn.execute("INSERT INTO users (username, password, email, first_name, last_name) VALUES (?, ?, ?, ?, ?)", insertDataObject)

    }

    async updateUser(user_id: number, updateUserData: UpdateUserData){

        const setStatement = Object.keys(updateUserData).map(key => `${key} = ?`).join(', ');
        const preparedStatementData = Object.values(updateUserData);

        preparedStatementData.push(user_id.toString());
        await this.conn.execute('UPDATE users SET ' + setStatement + ' WHERE user_id = ?', preparedStatementData);

        // easier logic below

        // const updateUserArray = Object.entries(updateUserData);
        // let setStatement = "";
        // let preparedStatementData = [];
        // for (let i = 0; i < updateUserArray.length; i++){
        //     setStatement += `${updateUserArray[i][0]} = ?`;
        //     setStatement += (i + 1 !== updateUserArray.length) ? ", " : " ";
        //     preparedStatementData.push(updateUserArray[i][1])
        // }
        // preparedStatementData.push(user_id);
        //
        // await this.conn.execute(`UPDATE users SET ${setStatement} WHERE user_id = ?`, preparedStatementData);
    }

    async deleteUser(user_id: number){
        const result = await this.conn.query("DELETE FROM users WHERE user_id = ?", [user_id]);
        return result[0].affectedRows;
    }


}

