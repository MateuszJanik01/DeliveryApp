import React from "react";
import { View, StyleSheet, TextInput, Alert } from "react-native";
import { Button, Text } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { findUserByEmail } from "../../db/userRepository";

export function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const validateInput = (): boolean => {
    if (!email || !password) {
      Alert.alert("Błąd", "Wszystkie pola są wymagane");
      return false;
    }
    if (!email.includes("@")) {
      Alert.alert("Błąd", "Nieprawidłowy email");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInput()) return;

    setLoading(true);

    try {
      const user = await findUserByEmail(email);

      if (!user) {
        Alert.alert("Błąd logowania", "Użytkownik nie istnieje");
        return;
      }

      if (user.password !== password) {
        Alert.alert("Błąd logowania", "Nieprawidłowe hasło");
        return;
      }

      navigation.reset({
        index: 0,
        routes: [{ name: "HomeTabs" as never }],
      });

    } catch (e) {
      Alert.alert("Błąd", "Problem z bazą danych");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>DELIVERY APP</Text>
      <Text>Please enter your credentials to log in.</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button onPress={handleLogin} disabled={loading} variant="filled">
        {loading ? "Logging in..." : "Log in"}
      </Button>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 12,
  },
  h1: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    maxWidth: 320,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
});