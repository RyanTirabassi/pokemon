import React, { useCallback, useEffect, useRef, useState } from "react";
import SearchBar from "./components/SearchBar";
import PokedexCard from "./components/PokedexCard";
import { getPokemonByNameOrId } from "./api/pokeapi";
import { toMeters, toKilograms, capitalize } from "./utils/format";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef();

  const handleSearch = useCallback(
    async (value) => {
      const q = (value ?? query).trim();
      if (!q) return;

      // abort previous request
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      setLoading(true);
      setError("");
      // NÃO limpar o `data` aqui — mantém o card visível enquanto busca
      // setData(null);

      try {
        const res = await getPokemonByNameOrId(q, controllerRef.current.signal);
        setData(res);
      } catch (err) {
        if (err?.name === "AbortError") return;
        // normalize possible error shape
        const status = err?.status ?? (err?.response?.status);
        if (status === 404) setError("Pokémon não encontrado. Tente outro nome ou ID.");
        else if (status === 429) setError("Muitas requisições. Aguarde alguns segundos e tente novamente.");
        else setError("Ocorreu um erro ao buscar os dados. Tente novamente.");
      } finally {
        setLoading(false);
      }
    },
    [query]
  );

  useEffect(() => {
    handleSearch("pikachu");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasPokemon = Boolean(data);

  const img =
    data?.sprites?.other?.["official-artwork"]?.front_default ||
    data?.sprites?.front_default;

  const types = data?.types?.map((t) => t.type.name) ?? [];

  return (
    <div className="app">
      <div className="layout">
        <section className="deviceCol">
          {hasPokemon ? (
            <PokedexCard
              id={data.id}
              name={capitalize(data.name)}
              image={img}
              types={types}
              height={toMeters(data.height)}
              weight={toKilograms(data.weight)}
              loading={loading}
              error={error}
            />
          ) : (
            <p role="status" className="status">Carregando…</p>
          )}
        </section>

        <aside className="sideCol">
          <h1 className="title">Pokédex</h1>
          <SearchBar
            value={query}
            onChange={setQuery}
            onSearch={handleSearch}
          />
        </aside>
      </div>
    </div>
  );
}