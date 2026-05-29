export async function getPokemons(limit = 20) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch pokemons");
  return res.json();
}

export async function getPokemonByName(name) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) throw new Error("Failed to fetch pokemon");
  return res.json();
}
