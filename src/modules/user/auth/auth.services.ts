import { pool } from "../../config/db";


const signup = async (payload: Record<string, any>) => {
    const { name, email, password, phone, role } = payload;

    const result = await pool.query(
        `INSERT INTO 
        users (name, email, password, phone, role) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *`,
        [name, email, password, phone, role]
    );

    return result.rows[0];

}

export const authServices = {
    signup
}