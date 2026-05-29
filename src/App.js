import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Detalles from "./screens/Detalles";
import { getPokemons, getPokemonByName } from "./api/pokeApi";

const Stack = createNativeStackNavigator();

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPokemons(20);
        setPokemons(data.results || []);
      } catch (error) {
        console.error("error en funcion getPokemons", error);
      }
    })();
  }, []);

  const getPokemon = async (nombre) => {
    try {
      const data = await getPokemonByName(nombre);
      setPokemon(data);
    } catch (error) {
      console.error("error en funcion getPokemon", error);
    }
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home">
            {(props) => (
              <Home
                {...props}
                pokemons={pokemons}
                pokemon={pokemon}
                onSelect={getPokemon}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Detalles" component={Detalles} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
