import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";


export function Confirmation({ route }: { route: { params: { orderId: string } } }) {
    const orderId = route.params.orderId;

  const handleConfirm = () => {
    Alert.alert(
      "Potwierdzenie",
      `Zamówienie ${orderId ?? ""} zostało odebrane!`,
      [{ text: "OK" }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Odbiór zamówienia</Text>
      <Text style={styles.subtitle}>
        {orderId ? `Zamówienie #${orderId}` : "Twoje zamówienie"} jest gotowe do odbioru.
      </Text>
      <Button title="Potwierdź odbiór" onPress={handleConfirm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
    color: "#555",
  },
});
