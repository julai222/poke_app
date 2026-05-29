import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
 Image,
 ScrollView,
} from "react-native";


import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const getPokemons = async () => {
      try {
        const res = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );

        const data = await res.json();

        setPokemons(data.results);
      } catch (error) {
        console.error("error en funcion getPokemons", error);
      }
    };

    getPokemons();
  }, []);

  const getPokemon = async (nombre) => {
    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nombre}`
      );

      const data = await res.json();

      setPokemon(data);
    } catch (error) {
      console.error("error en funcion getPokemon", error);
    }
  };

  const Home = () => {
    const navigation = useNavigation();

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.arriba}>
          <Text>Lista de pokemons</Text>

          <FlatList
            data={pokemons}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  getPokemon(item.name);
                }}
              >
                <Text>{item.name}</Text>
              </Pressable>
            )}
          />
        </View>

        <View style={styles.abajo}>
          <Text>Detalles del pokemon</Text>

          {pokemon ? (
            <View>
              <Image
                style={{ width: 100, height: 100 }}
                source={{
                  uri: pokemon?.sprites?.front_default,
                }}
              />

              <Text>{pokemon.name}</Text>

              <Pressable
                onPress={() => {
                  navigation.navigate("Detalles", {
                    pokemon: pokemon,
                  });
                }}
              >
                <Text>Ver detalles</Text>
              </Pressable>
            </View>
          ) : (
            <Text>
              Selecciona un pokemon para ver sus detalles
            </Text>
          )}
        </View>
      </SafeAreaView>
    );
  };

  const Detalles = ({ route }) => {
  const { pokemon } = route.params;

  return (
    <ScrollView style={styles.detallesContainer}>
      
      <Text style={styles.titulo}>
        {pokemon.name.toUpperCase()}
      </Text>

      <Image
        style={styles.imagenGrande}
        source={{
          uri: pokemon.sprites.front_default,
        }}
      />

      <View style={styles.card}>

        <Text style={styles.subtitulo}>
          Información
        </Text>

        <Text style={styles.texto}>
          ID: {pokemon.id}
        </Text>

        <Text style={styles.texto}>
          Altura: {pokemon.height}
        </Text>

        <Text style={styles.texto}>
          Peso: {pokemon.weight}
        </Text>

        <Text style={styles.texto}>
          EXP: {pokemon.base_experience}
        </Text>

      </View>

      <View style={styles.cardTipos}>
        <Text style={styles.subtitulo}>
          Tipos
        </Text>

        {pokemon.types.map((item, index) => (
          <Text key={index} style={styles.tipoTexto}>
            {item.type.name}
          </Text>
        ))}
      </View>

      <View style={styles.cardStats}>
        <Text style={styles.subtitulo}>
          Estadísticas
        </Text>

        {pokemon.stats.map((item, index) => (
          <View key={index} style={styles.statsContainer}>
            <Text style={styles.texto}>
              {item.stat.name}
            </Text>

            <Text style={styles.texto}>
              {item.base_stat}
            </Text>
          </View>
        ))}
      </View>

    </ScrollView>
  );
};

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
          />

          <Stack.Screen
            name="Detalles"
            component={Detalles}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  arriba: {
    flex: 0.7,
    backgroundColor: "pink",
  },

  abajo: {
    flex: 0.3,
    backgroundColor: "purple",
  },

  // NUEVOS ESTILOS

  detallesContainer: {
    flex: 1,
    backgroundColor: "#ffcb05",
    padding: 20,
  },

  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2a75bb",
  },

  imagenGrande: {
    width: 220,
    height: 220,
    alignSelf: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },

  cardTipos: {
    backgroundColor: "#2a75bb",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },

  cardStats: {
    backgroundColor: "#ff0000",
    padding: 20,
    borderRadius: 20,
    marginBottom: 40,
  },

  texto: {
    fontSize: 18,
    marginBottom: 10,
    color: "#222",
  },

  subtitulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "black",
  },

  tipoTexto: {
    fontSize: 20,
    color: "white",
    marginBottom: 10,
    textTransform: "capitalize",
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});