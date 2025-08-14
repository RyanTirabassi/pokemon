import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SearchBar from "./components/SearchBar";
import { PokedexCard } from "./components/PokedexCard";
import { getPokemonByNameOrId } from "./api/pokeapi";
import { toMeters, toKilograms, capitalize } from "./utils/format";
import "./App.css";


export default function App() {
const [query, setQuery] = useState("");
const [data, setData] = useState(null);
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
const controllerRef = useRef();


const handleSearch = useCallback(async (value) => {
const q = (value ?? query).trim();
if (!q) return;
controllerRef.current?.abort();
controllerRef.current = new AbortController();
setLoading(true);
setError("");
setData(null);
try {
const res = await getPokemonByNameOrId(q, controllerRef.current.signal);
setData(res);
} catch (err) {
if (err.name === "AbortError") return;
if (err.status === 404) setError("Pokémon não encontrado. Tente outro nome ou ID.");
else if (err.status === 429) setError("Muitas requisições. Aguarde alguns segundos e tente novamente.");
else setError("Ocorreu um erro ao buscar os dados. Tente novamente.");
} finally {
setLoading(false);
}
}, [query]);


// carrega um exemplo para a primeira visita
useEffect(() => {
handleSearch("pikachu");
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


const content = useMemo(() => {
if (loading) return <p role="status" className="status">Carregando…</p>;
if (error) return <p role="alert" className="status error">{error}</p>;
if (!data) return null;


const img = data.sprites?.other?.["official-artwork"]?.front_default || data.sprites?.front_default;
const types = data.types?.map(t => t.type.name) ?? [];
const abilities = data.abilities?.map(a => a.ability.name) ?? [];


return (
<PokedexCard
id={data.id}
name={capitalize(data.name)}
image={img}
types={types}
height={toMeters(data.height)}
weight={toKilograms(data.weight)}
abilities={abilities}
stats={data.stats}
/>
);
}, [loading, error, data]);


return (
<div className="app">
<header className="header">
<h1>Pokédex</h1>
</header>


<main>
<SearchBar
value={query}
onChange={setQuery}
onSearch={handleSearch}
/>
{content}
</main>


<footer className="footer">
<small>Dados por PokeAPI • Projeto demo</small>
</footer>
</div>
);
}