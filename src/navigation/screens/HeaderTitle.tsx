import { View, StyleSheet } from "react-native";
import { Text } from "@react-navigation/elements";
import { useAuth } from "../../context/AuthContext";

export function HeaderTitle() {
    const { role } = useAuth();

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Delivery App</Text>
        {role && <Text style={styles.role}>({role})</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
    },
    role: {
        fontSize: 18,
        color: "#666",
    },
});
