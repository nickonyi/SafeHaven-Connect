import { db } from "./connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
 const userId = req.params.userId;

    const sql = `SELECT * FROM users WHERE id = ?`;

    db.query(sql, [userId], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
         const {password,confirmPassword, ...info} = data[0];
        return res.status(200).json(info);
    })
}