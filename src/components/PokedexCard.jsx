import React from "react";
import "./PokedexCard.css";

export default function PokedexCard({ id, name, image, types, height, weight }) {
  return (
    <div className="pokedexDevice" aria-label={`Pokédex mostrando ${name}`}>
      {/* Topo com luzes */}
      <div className="topBar" aria-hidden="true">
        <span className="lens" />
        <span className="dot red" />
        <span className="dot yellow" />
        <span className="dot green" />
      </div>

      {/* Tela (bezel grosso + “parafusos”/bolinhas e grelha) */}
      <div className="screenWrap">
        <div className="screen">
          {image ? (
            <img src={image} alt={`Imagem oficial de ${name}`} />
          ) : (
            <div className="screenPlaceholder" />
          )}
        </div>
        <div className="screenDots" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="speaker" aria-hidden="true" />
      </div>

      {/* Botões coloridos */}
      <div className="colorBtns" aria-hidden="true">
        <span className="btn flat yellow" />
        <span className="btn flat blue" />
      </div>

      {/* Linha de baixo: analógico + TELINHA VERDE + D-pad */}
      <div className="bottomRow">
        <span className="analogBtn" aria-hidden="true" />

        <div className="infoPanel">
          <h2 className="pokeName">
            {name} <span className="pokeId">#{id}</span>
          </h2>
          <dl>
            <div><dt>Tipo:</dt><dd>{types.join(", ")}</dd></div>
            <div><dt>Altura:</dt><dd>{height}</dd></div>
            <div><dt>Peso:</dt><dd>{weight}</dd></div>
            <div><dt>Id:</dt><dd>#{id}</dd></div>
          </dl>
        </div>

        <div className="dpad" aria-hidden="true">
          <span className="v" />
          <span className="h" />
        </div>
      </div>
    </div>
  );
}