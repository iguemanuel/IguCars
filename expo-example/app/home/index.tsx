import { Stack } from "expo-router";
import { useState } from "react";
import { Alert, FlatList, View, StyleSheet } from "react-native";

import HeaderRight from "../../components/HeaderRight";
import Loading from "../../components/Loading";
import StyledButton from "../../components/StyledButton";
import ViewCar from "../../components/ViewCar";
import CarModal from "../../components/Modal";
import useCollection from "../../firebase/hooks/useCollection";
import globalStyles from "../../styles/globalStyles";
import Car from "../../types/Car";

export default function Home() {
  const { data, create, update, remove, refreshData, loading } =
    useCollection<Car>("cars");

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const openModalForCreate = () => {
    setSelectedCar(null);
    setModalVisible(true);
  };

  const openModalForEdit = (car: Car) => {
    setSelectedCar(car);
    setModalVisible(true);
  };

  const handleSaveCar = async (carData: Omit<Car, "id">, id?: string) => {
    try {
      if (id) {
        await update(id, carData);
      } else {
        await create(carData);
      }
      await refreshData();
    } catch (error: any) {
      Alert.alert("Erro ao salvar carro", error.toString());
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Home",
          headerRight: () => <HeaderRight />,
        }}
      />

      <StyledButton
        title="Adicionar Novo Carro"
        onPress={openModalForCreate}
        style={styles.button}
      />

      <CarModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveCar}
        carToEdit={selectedCar}
      />

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ViewCar
              car={item}
              onEdit={() => openModalForEdit(item)}
              onDelete={async () => {
                if (item.id) {
                  await remove(item.id);
                  await refreshData();
                }
              }}
            />
          )}
          style={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF",
    padding: 24,
  },
  button: {
    marginBottom: 16,
    backgroundColor: "#1E90FF",
  },
  list: {
    width: "100%",
    marginTop: 16,
  },
});
