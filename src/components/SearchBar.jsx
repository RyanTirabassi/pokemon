import React from "react";

export default function SearchBar({ value, onChange, onSearch }) {
  const onSubmit = (e) => {
    e.preventDefault(); // evita recarregar a página
    onSearch(value);
  };

  return (
    <form className="searchBar" onSubmit={onSubmit} role="search" aria-label="Buscar Pokémon">
      <label htmlFor="q" className="sr-only">Nome ou ID do Pokémon</label>
      <input
        id="q"
        placeholder="Digite o nome ou ID do Pokémon"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputMode="search"
        autoComplete="off"
      />
      <button type="submit">Buscar</button>
    </form>
  );
}