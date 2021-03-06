"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SteamModel = void 0;
const DbConnect_1 = require("./DbConnect");
class SteamModel extends DbConnect_1.DbConnect {
    constructor() {
        super(...arguments);
        this.lastId = 0;
    }
    insertNewRecord(users) {
        return new Promise((resolve, reject) => {
            var request = `INSERT INTO steam_playtime SET`;
            for (let i = 0; i < users.length; i++) {
                request += ` user_${users[i].id}=${users[i].playtime},`;
            }
            request += ` date='${this.getDate()}'`;
            this.db.query(request, (err, result) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(result.insertId);
            });
        });
    }
    getRecord(value, where) {
        if (value === "previous")
            where = this.lastId -= 1;
        else if (value === "next")
            where = this.lastId += 1;
        else if (value === "first" || value === "last")
            this.lastId = where;
        return new Promise((resolve, reject) => {
            let request = `SELECT * FROM steam_playtime where count_id=${where}`;
            console.log(request);
            this.db.query(request, (err, result) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(result[0]);
            });
        });
    }
    getAllRecords() {
        return new Promise((resolve, reject) => {
            let request = `SELECT * FROM steam_playtime`;
            this.db.query(request, (err, result) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(result);
            });
        });
    }
    deleteRecordById(id) {
        return new Promise((resolve, reject) => {
            let request = `DELETE FROM steam_playtime WHERE count_id=${id}`;
            this.db.query(request, (err, result) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(result);
            });
        });
    }
    getDate() {
        let today;
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (day.toString().length == 1) {
            day = "0" + day;
        }
        if (month.toString().length == 1) {
            month = "0" + month;
        }
        return (today = `${day}/${month}/${year}`);
    }
    getLastId() {
        return this.lastId;
    }
}
exports.SteamModel = SteamModel;
