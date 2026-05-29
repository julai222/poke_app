import React from "react";
import { FlatList, Pressable, Text } from "react-native";

export default function PokemonList({ data = [], onSelect }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => (
        <Pressable onPress={() => onSelect(item.name)}>
          <Text>{item.name}</Text>
        </Pressable>
      )}
    />
  );
}
