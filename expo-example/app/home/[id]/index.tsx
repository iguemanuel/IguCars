// Importações e definições de tipos
import { Stack, useGlobalSearchParams } from "expo-router";
import { Alert, Text, TextInput, View } from "react-native";

import HeaderRight from "../../../components/HeaderRight";
import Loading from "../../../components/Loading";
import StyledButton from "../../../components/StyledButton";
import useDocument from "../../../firebase/hooks/useDocument";
import globalStyles from "../../../styles/globalStyles";
import Car from "../../../types/Car";

export default function CarDetails() {
  const { id } = useGlobalSearchParams();

  const { data: car, loading, upsert } = useDocument<Car>("cars", id as string);

  const handleInputChange = (key: keyof Car, value: string | number) => {
    if (car) {
      upsert({ ...car, [key]: value });
    }
  };

  if (loading || !car) return <Loading />;

  return (
    <View style={{ flex: 1, backgroundColor: "#F0F8FF", padding: 16 }}>
      <Stack.Screen
        options={{
          title: "Detalhes do Carro",
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={{ fontSize: 24, color: "#1E90FF", fontWeight: "bold" }}>
        Detalhes do Carro
      </Text>

      <Text>ID: {id}</Text>

      <TextInput
        style={{
          height: 40,
          borderColor: "#87CEFA",
          borderWidth: 1,
          borderRadius: 8,
          paddingLeft: 8,
          backgroundColor: "#E6F7FF",
          marginBottom: 12,
        }}
        placeholder="Nome"
        value={car.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "#87CEFA",
          borderWidth: 1,
          borderRadius: 8,
          paddingLeft: 8,
          backgroundColor: "#E6F7FF",
          marginBottom: 12,
        }}
        placeholder="Modelo"
        value={car.model}
        onChangeText={(text) => handleInputChange("model", text)}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "#87CEFA",
          borderWidth: 1,
          borderRadius: 8,
          paddingLeft: 8,
          backgroundColor: "#E6F7FF",
          marginBottom: 12,
        }}
        placeholder="Ano"
        value={car.year.toString()}
        keyboardType="numeric"
        onChangeText={(text) =>
          handleInputChange("year", parseInt(text) || new Date().getFullYear())
        }
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "#87CEFA",
          borderWidth: 1,
          borderRadius: 8,
          paddingLeft: 8,
          backgroundColor: "#E6F7FF",
          marginBottom: 12,
        }}
        placeholder="Preço"
        value={car.price.toString()}
        keyboardType="numeric"
        onChangeText={(text) =>
          handleInputChange("price", parseFloat(text) || 0)
        }
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "#87CEFA",
          borderWidth: 1,
          borderRadius: 8,
          paddingLeft: 8,
          backgroundColor: "#E6F7FF",
          marginBottom: 12,
        }}
        placeholder="Descrição"
        value={car.description}
        onChangeText={(text) => handleInputChange("description", text)}
      />

      <StyledButton
        title="Salvar Alterações"
        onPress={async () => {
          try {
            await upsert(car);
            Alert.alert("Sucesso", "Carro atualizado com sucesso!");
          } catch (error: any) {
            Alert.alert("Erro ao atualizar carro", error.toString());
          }
        }}
        style={{
          backgroundColor: "#1E90FF",
          paddingVertical: 12,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 12,
        }}
      />
    </View>
  );
}
