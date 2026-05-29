import React from "react";
import { View, Image, Text, Pressable } from "react-native";

export default function PokemonPreview({ pokemon, onViewDetails }) {
  if (!pokemon) return <Text>Selecciona un pokemon para ver sus detalles</Text>;

  return (
    <View>
      <Image
        style={{ width: 100, height: 100 }}
        source={{ uri: pokemon?.sprites?.front_default }}
      />

      <Text>{pokemon.name}</Text>

      <Pressable onPress={onViewDetails}>
        <Text>Ver detalles</Text>
      </Pressable>
    </View>
  );
}
