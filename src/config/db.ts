import { Pool } from 'pg'
import { config } from '.'


const pool = new Pool({
    connectionString: config.connectionString,
})



const initDB = async () => {
    // user table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS users (

    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL, 
    phone VARCHAR(15) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'CUSTOMER' CHECK ( role IN ('ADMIN', 'CUSTOMER')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`)


    // Vehicles table
    await pool.query(`
        CREATE TABLE IF NOT EXISTS vehicles (

        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(100) NOT NULL,
        type VARCHAR(50) NOT NULL CHECK ( type IN ('car', 'bike', 'van', 'SUV')),
        registration_number VARCHAR(50) UNIQUE NOT NULL,
        daily_rent_price DECIMAL(10, 2) NOT NULL CHECK (daily_rent_price > 0),
        availability_status VARCHAR(50) NOT NULL DEFAULT 'available' CHECK ( availability_status IN ('available', 'booked')),

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`)


    // Bookings table
    await pool.query(`
            CREATE TABLE IF NOT EXISTS bookings (

            id SERIAL PRIMARY KEY,
            customer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ,
            vehicle_id INT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE ,

            rent_start_date TIMESTAMP NOT NULL,
            rent_end_date TIMESTAMP NOT NULL CHECK (rent_end_date > rent_start_date),
            total_price DECIMAL(10, 2) NOT NULL CHECK (total_price > 0),
            status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK ( status IN ('active', 'cancelled', 'returned')), 

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`)

}


export { pool, initDB }