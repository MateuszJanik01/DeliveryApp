import { Button, Text} from "@react-navigation/elements";
import React from "react";
import {
  View,
  Pressable,
  StyleSheet,
} from "react-native";


export function Home() {
  const [open, setOpen] = React.useState(false);


  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Pressable onPress={() => setOpen(!open)} style={styles.header}>
          <Text style={styles.headerText}>Kliknij, aby rozwinąć</Text>
          <Text style={styles.icon}>{open ? "▲" : "▼"}</Text>
        </Pressable>

        {open && (
          <View style={styles.details}>
            <Text style={styles.detailsText}>
              To są szczegóły widoczne po rozwinięciu!
            </Text>
            <Button screen="Confirmation" params={{ orderId: "12345" }}>Potwierdź zamówienie</Button>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
