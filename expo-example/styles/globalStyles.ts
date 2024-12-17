import { StyleSheet } from "react-native";

const theme = {
  primaryColor: "darkblue",
  defaultRadius: 4,
};

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 4,
  },
  input: {
    height: 32,
    borderWidth: 1,
    padding: 4,
    borderColor: "darkblue",
    borderRadius: theme.defaultRadius,
    width: "100%",
    marginTop: 12,
  },
  button: {
    height: 42,
    padding: 4,
    backgroundColor: "#1E90FF",
    borderRadius: theme.defaultRadius,
    width: "100%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default globalStyles;
