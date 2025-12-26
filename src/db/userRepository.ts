import { User } from "../models/user";
import { db } from "./database";

export async function createUser(email: string, password: string): Promise<void> {
    (await db).runAsync(
        "INSERT INTO users (email, password) VALUES (?, ?)", [email, password]
    );
}

export async function findUserByEmail(email: string): Promise<User | null> {
    const user = (await db).getFirstAsync<User>(
        "SELECT * FROM users WHERE email = ?", [email]
  );

  return user ?? null;
}

export async function loginUser(
    email: string,
    password: string
): Promise<User | null> {
    const user = (await db).getFirstSync<User>(
        "SELECT * FROM users WHERE email = ? AND password = ?", [email, password]
    );

    return user ?? null;
}
export { User };
    


