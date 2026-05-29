import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PokemonList from "../components/PokemonList";
import PokemonPreview from "../components/PokemonPreview";

export default function Home({ navigation, pokemons, pokemon, onSelect }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.arriba}>
        <Text>Lista de pokemons</Text>

        <PokemonList data={pokemons} onSelect={onSelect} />
      </View>

      <View style={styles.abajo}>
        <Text>Detalles del pokemon</Text>

        <PokemonPreview
          pokemon={pokemon}
          onViewDetails={() => navigation.navigate("Detalles", { pokemon })}
        />
      </View>
    </SafeAreaView>
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
});
