const CACHE = new Map();


export async function getPokemonByNameOrId(nameOrId, signal) {
const key = String(nameOrId).toLowerCase().trim();
if (CACHE.has(key)) return CACHE.get(key);


const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(key)}`, { signal });
if (!res.ok) {
const err = new Error("request failed");
err.status = res.status;
throw err;
}
const json = await res.json();
CACHE.set(key, json);
return json;
}