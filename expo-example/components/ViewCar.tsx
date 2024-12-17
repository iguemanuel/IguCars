import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Car from "../types/Car";

interface ViewCarProps {
  car: Car;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ViewCar({ car, onEdit, onDelete }: ViewCarProps) {
  return (
    <View style={styles.card}>
      <Text>
        {car.name} - {car.model} ({car.year})
      </Text>
      <Text>R$ {car.price}</Text>
      <Text>{car.description}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.editButton}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.deleteButton}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  editButton: { color: "blue" },
  deleteButton: { color: "red" },
});
