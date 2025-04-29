import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import SearchFilter from './SearchFilter';
import './PokemonList.css';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // Fetch the first 150 Pokémon
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return {
              id: details.data.id,
              name: details.data.name,
              image: details.data.sprites.front_default,
              types: details.data.types.map(type => type.type.name),
            };
          })
        );
        
        // Extract all unique types
        const allTypes = new Set();
        pokemonData.forEach(pokemon => {
          pokemon.types.forEach(type => allTypes.add(type));
        });
        setTypes(['all', ...Array.from(allTypes).sort()]);
        
        setPokemonList(pokemonData);
        setFilteredPokemon(pokemonData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    let filtered = pokemonList;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    
    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(pokemon => 
        pokemon.types.includes(selectedType))
    }
    
    setFilteredPokemon(filtered);
  }, [searchTerm, selectedType, pokemonList]);

  if (loading) return <div className="loading">Loading Pokémon...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="pokemon-list-container">
      <SearchFilter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        types={types}
      />
      
      {filteredPokemon.length === 0 ? (
        <div className="no-results">No Pokémon found matching your criteria.</div>
      ) : (
        <div className="pokemon-grid">
          {filteredPokemon.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonList;