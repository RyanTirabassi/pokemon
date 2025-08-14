import React from "react";
import { capitalize } from "../utils/format";


export function PokedexCard({ id, name, image, types, height, weight, abilities, stats }) {
return (
<section className="pokedex" aria-live="polite">
<div className="device">
<div className="screen">
{image ? (
<img src={image} alt={`Imagem oficial de ${name}`} />
) : (
<div className="placeholder" aria-hidden="true" />
)}
</div>


<div className="info">
<h2>{name} <span className="id">#{id}</span></h2>


<div className="types">
{types.map((t) => (
<span key={t} className={`badge type-${t}`}>{capitalize(t)}</span>
))}
</div>


<dl className="metrics">
<div><dt>Altura</dt><dd>{height}</dd></div>
<div><dt>Peso</dt><dd>{weight}</dd></div>
</dl>


<div className="abilities">
<h3>Habilidades</h3>
<ul>
{abilities.map((a) => (
<li key={a}>{capitalize(a)}</li>
))}
</ul>
</div>


<div className="stats">
<h3>Atributos base</h3>
<ul>
{stats?.map((s) => (
<li key={s.stat.name}>
<span className="label">{capitalize(s.stat.name)}</span>
<progress value={s.base_stat} max="200" aria-valuemin="0" aria-valuemax="200" aria-valuenow={s.base_stat} />
<span className="value">{s.base_stat}</span>
</li>
))}
</ul>
</div>
</div>
</div>
</section>
);
}