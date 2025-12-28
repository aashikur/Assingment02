import { pool } from "../../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const signup = async (payload: Record<string, any>) => {
    const { name, email, password, phone, role } = payload;

    const hashPassword = bcrypt.hashSync(password, 10);
    // match = bcrypt.compareSync(password, hashPassword); // true

    const result = await pool.query(
        `INSERT INTO 
        users (name, email, password, phone, role) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *`,
        [name, email, hashPassword, phone, role]
    );

    return result.rows[0];

}


const signin = async (payload: Record<string, any>) => {
    const { email, password } = payload;

    if (!email || !password) {
        return null;
    }
    const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    )

    const isMatch = bcrypt.compareSync(password, result.rows[0].password); // true
    if (!isMatch) {
        return null;
    }

    const user = result.rows[0];
    delete user.password;

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: '1h' })

    return { user, token };

}

export const authServices = {
    signup,
    signin
}