import * as SQLite from "expo-sqlite";
import { User } from "../models/user";
import { Order } from "../models/order";

export const db = SQLite.openDatabaseAsync("delivery.db");

export async function initDatabase() {
    (await db).execAsync(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        );
    `);

    (await db).execSync(`
        CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        orderNumber TEXT NOT NULL,
        confirmed BOOLEAN NOT NULL,
        details TEXT
    );
    `);

    const defaultUsers = [
        new User(0, "admin@example.com", "admin123", "admin"),
        new User(0, "user@example.com", "user123", "user"),
        new User(0, "driver@example.com", "driver123", "driver")
    ];

    defaultUsers.forEach(async user => {
        const existingUser = (await db).getFirstAsync<User>(
            "SELECT * FROM users WHERE email = ?", [user.email]
        );
        if (!existingUser) {
            (await db).runAsync(
                "INSERT INTO users (email, password, role) VALUES (?, ?, ?)", [user.email, user.password, user.role]
            );
        }
    });

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

    defaultOrders.forEach(async pkg => {
        const existingOrder = (await db).getFirstSync(
            "SELECT * FROM orders WHERE orderNumber = ?", [pkg.orderNumber]
        );
        if (!existingOrder) {
            (await db).runSync(
                "INSERT INTO orders (orderNumber, confirmed, details) VALUES (?, ?, ?)",
                [pkg.orderNumber, pkg.confirmed ? 1 : 0, pkg.details]
            );
        }
    });

    // const allOrders = (await db).getAllAsync<{ id: number; orderNumber: string; confirmed: number; details: string }>('Select * from orders');
    // for (const row of await allOrders) {
    //     console.log(`Order: ${row.id}, Order Number: ${row.orderNumber}, Confirmed: ${row.confirmed}`);
    // }

    // console.log(((await allOrders).length));
}