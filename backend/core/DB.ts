
const mysql = require("mysql2");



const IS_DOCKER_CONTAINER = process.env.AM_I_IN_A_DOCKER_CONTAINER || false;

interface DbConfig {
    host: string;
    user: string;
    database: string;
}

let dbConfig: DbConfig;


if (IS_DOCKER_CONTAINER) {
    console.log('I am running in a Docker container');
    dbConfig = {
        host: "mysql-custom",
        user: "root",
        database: "instagram_test"
    };
}
else {
    console.log('I am running in a localhost');
    dbConfig = {
        host: "localhost",
        user: "root",
        database: "instagram_test"
    };
}

export class DB {
    public conn;

    constructor() {
        this.conn = mysql.createPool(dbConfig).promise()
    }

}

