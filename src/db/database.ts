import * as SQLite from "expo-sqlite";
import { User } from "../models/user";
import { Order } from "../models/order";

export const db = SQLite.openDatabaseAsync("delivery.db");

export async function resetDatabase() {
    const database = await db;
    
    await database.execAsync(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS orders;
    `);
    
    await initDatabase();
}

async function initDatabase() {
    const database = await db;

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        );
    `);

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            number TEXT NOT NULL,
            confirmed BOOLEAN NOT NULL,
            details TEXT
    );
    `);

    const defaultUsers = [
        new User(0, "admin@example.com", "admin123", "admin"),
        new User(0, "user@example.com", "user123", "user"),
        new User(0, "driver@example.com", "driver123", "courier")
    ];

    for (const user of defaultUsers) {
        const existingUser = await database.getFirstAsync<User>(
            "SELECT * FROM users WHERE email = ?", [user.email]
        );
        if (!existingUser) {
            await database.runAsync(
                "INSERT INTO users (email, password, role) VALUES (?, ?, ?)", 
                [user.email, user.password, user.role]
            );
        }
    }

    // const allUsers = (await db).getAllAsync<User>('Select * from users');
    // for (const row of await allUsers) {
    //     console.log(`User: ${row.id}, Email: ${row.email}, Role: ${row.role}`);
    // }

    // console.log(((await allUsers).length));
    
    const defaultOrders = [
        new Order(0, "ORD001", false, "Package 1 details"),
        new Order(0, "ORD002", false, "Package 2 details"),
        new Order(0, "ORD003", false, "Package 3 details")
    ];

    for (const pkg of defaultOrders) {
        const existingOrder = await database.getFirstAsync(
            "SELECT * FROM orders WHERE number = ?", [pkg.number]
        );
        if (!existingOrder) {
            await database.runAsync(
                "INSERT INTO orders (number, confirmed, details) VALUES (?, ?, ?)",
                [pkg.number, pkg.confirmed ? 1 : 0, pkg.details]
            );
        }
    }

    // const allOrders = (await db).getAllAsync<{ id: number; number: string; confirmed: number; details: string }>('Select * from orders');
    // for (const row of await allOrders) {
    //     console.log(`Order: ${row.id}, Order Number: ${row.number}, Confirmed: ${row.confirmed}`);
    // }

    // console.log(((await allOrders).length));
}