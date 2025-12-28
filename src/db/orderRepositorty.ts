import { Order } from "../models/order";
import { db } from "./database";

export async function getAllOrders(): Promise<Order[]> {
  const orders =  (await db).getAllAsync<Order>(
    "SELECT * FROM orders"
  );

  return orders;
}
