import { Button, Text } from "@react-navigation/elements";
import React, { useEffect, useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Order } from "../../models/order";
import { getAllOrders } from "../../db/orderRepositorty";
import { StaticScreenProps } from "@react-navigation/native";

type Props = StaticScreenProps<{
  userId?: number;
}>

export function Home({ route }: Props) {
  const [openOrderId, setOpenOrderId] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const userId = route.params?.userId;

  useEffect(() => {
    const loadOrders = async () => {
      const data = await getAllOrders();
      setOrders(data);
    };

    loadOrders();
  }, []);

  const toggleOrder = (id: number) => {
    setOpenOrderId((prev) => (prev === id ? null : id));
  };

  return (
    <View style={styles.container}>
      {orders.map((order) => {
        const isOpen = openOrderId === order.id;

        return (
          <View key={order.id} style={styles.box}>
            <Pressable
              onPress={() => toggleOrder(order.id)}
              style={styles.header}
            >
              <Text style={styles.headerText}>
                Zamówienie #{order.number}
              </Text>
              <Text style={styles.icon}>{isOpen ? "▲" : "▼"}</Text>
            </Pressable>

            {isOpen && (
              <View style={styles.details}>
                <Text style={styles.detailsText}>
                  {order.details ?? "Brak szczegółów zamówienia"}
                </Text>

                {!order.confirmed && (
                  <Button
                    variant="filled"
                    color="#000"
                    screen="Confirmation"
                    params={{ orderId: order.number }}
                  >
                    Potwierdź zamówienie
                  </Button>
                )}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 12,
  },

  box: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
  },

  headerText: {
    fontSize: 18,
    fontWeight: "600",
    padding: 16,
  },

  icon: {
    fontSize: 18,
    opacity: 0.7,
    padding: 16,
  },

  details: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#888",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },

  detailsText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#fff",
    padding: 16,
  },
});

