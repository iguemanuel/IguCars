import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import StyledButton from "./StyledButton";
import Car from "../types/Car";

interface CarModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (car: Omit<Car, "id">, id?: string) => void;
  carToEdit?: Car | null; // Objeto para edição
}

export default function CarModal({
  visible,
  onClose,
  onSave,
  carToEdit,
}: CarModalProps) {
  const [carData, setCarData] = useState<Omit<Car, "id">>({
    name: "",
    model: "",
    year: 0,
    price: 0,
    description: "",
  });

  // Preenche o modal com dados do carro ao abrir para edição
  useEffect(() => {
    if (carToEdit) {
      setCarData({
        name: carToEdit.name,
        model: carToEdit.model,
        year: carToEdit.year,
        price: carToEdit.price,
        description: carToEdit.description,
      });
    } else {
      setCarData({ name: "", model: "", year: 0, price: 0, description: "" });
    }
  }, [carToEdit, visible]);

  const handleInputChange = (key: keyof Car, value: string | number) => {
    setCarData({ ...carData, [key]: value });
  };

  const handleSave = () => {
    if (!carData.name || !carData.model || !carData.description) {
      Alert.alert(
        "Erro",
        "Todos os campos obrigatórios devem ser preenchidos."
      );
      return;
    }
    onSave(carData, carToEdit?.id);
    onClose();
  };

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>
            {carToEdit ? "Editar Carro" : "Novo Carro"}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={carData.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Modelo"
            value={carData.model}
            onChangeText={(text) => handleInputChange("model", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Ano"
            keyboardType="numeric"
            value={carData.year.toString()}
            onChangeText={(text) =>
              handleInputChange(
                "year",
                parseInt(text) || new Date().getFullYear()
              )
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Preço"
            keyboardType="numeric"
            value={carData.price.toString()}
            onChangeText={(text) =>
              handleInputChange("price", parseFloat(text) || 0)
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={carData.description}
            onChangeText={(text) => handleInputChange("description", text)}
          />

          <View style={styles.buttonContainer}>
            <StyledButton
              title={carToEdit ? "Atualizar" : "Criar"}
              onPress={handleSave}
            />
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelButton}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  cancelButton: {
    marginTop: 10,
    color: "#FF6347",
    fontWeight: "bold",
  },
});
