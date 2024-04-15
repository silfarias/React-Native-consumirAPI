import { useState } from "react";

export async function getPokemons() {
  try {
    const ApiPokimons = "https://pokeapi.co/api/v2/pokemon?limit=150";
    const respuesta = await fetch(ApiPokimons);
    const data = await respuesta.json();
    console.log(data);
    return data.results;
  } catch (error) {
    console.log(error);
  }
}

export const Page = () => {
  const [pokemons, setPokemons] = useState([]);
  const handleButton = async () => {
    const data = await getPokemons();
    setPokemons(data);
  };

  const handleDelete = (index) => {
    // Crea una nueva lista sin el elemento en el índice dado
    const updatedPokemons = pokemons.filter((_, i) => i !== index);
    setPokemons(updatedPokemons);
  };

  return (
    <div className="container">
      <button className="btn btn-primary mt-5" onClick={handleButton}>Mostrar Pokemons</button>
      <h2 className="mt-2">Pokemons</h2>
      <ul>
        {pokemons.map((pokemon, index) => (
            <div className="mt-2">
                <h6 key={index}>Pokemon: {pokemon.name}</h6>
                <p>Url: {pokemon.url}</p>
                <button className="btn btn-danger" onClick={() => handleDelete(index)}>Eliminar</button>
            </div>
        ))}
      </ul>
    </div>
  );
};
