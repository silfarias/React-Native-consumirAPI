import { useState } from "react";
import './style.css'

export function Page() {

  const [pokemons, setPokemons] = useState([]);

  const getPokemons = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon')
    const list = await response.json()
    const { results } = list
    const newPokemons = results.map( async (pokemon) => {
      const response = await fetch(pokemon.url)
      const poke = await response.json()
      return {
        id: poke.id,
        name: poke.name,
        img: poke.sprites.other.dream_world.front_default
      }
    })
    setPokemons(await Promise.all(newPokemons));
  }

  const handleDelete = (id) => {
    setPokemons(pokemons.filter(pokemon => pokemon.id !== id))
  }

  return (
    <div className="container">
      <h1 className="mt-2 my-2 text-center">Pokédex</h1>
      <button className="btn btn-primary mx-auto d-block" onClick={getPokemons}>Obtener Pokemons</button>
      {
        pokemons.map(pokemon => {
          return (
            <div key={pokemon.id} className="mt-3 border border-dark rounded p-3 caja-pokemon">
              <h5 className="text-center">{pokemon.name}</h5>
              <img src={pokemon.img} alt={pokemon.name} className="mx-auto d-block" />
              <button className="btn btn-danger mx-auto d-block mt-2" onClick={() => handleDelete(pokemon.id)}>Eliminar</button>
            </div>
          )
        })
      }
    </div>
  )
}
