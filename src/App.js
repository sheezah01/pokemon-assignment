import React from 'react';
import PokemonList from './components/PokemonList';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <PokemonList />
    </div>
  );
}

export default App;  // Make sure to export as default