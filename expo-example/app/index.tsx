import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, View, StyleSheet } from "react-native";

import Loading from "../components/Loading";
import StyledButton from "../components/StyledButton";
import useAuth from "../firebase/hooks/useAuth";

export default function _screen() {
  const { user, login, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("igor@exemplo.com");
  const [password, setPassword] = useState("123456");

  useEffect(() => {
    if (user) {
      router.replace("/home/");
    }
  }, [user]);

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>IguCars</Text>
      <Text style={styles.subtitle}>
        Before starting, check the `Readme.md` for setup details!
      </Text>
      <Text style={styles.helperText}>
        Use email: igor@exemplo.com and password: 123456 to login.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <StyledButton
        title="Login"
        onPress={async () => {
          try {
            await login(email, password);
            router.push("/home/");
          } catch (error: any) {
            Alert.alert("Login error", error.toString());
          }
        }}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    textAlign: "center",
  },
  helperText: {
    fontSize: 12,
    color: "#777",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#CED4DA",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: 16,
    color: "#333",
  },
  button: {
    marginTop: 16,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});
