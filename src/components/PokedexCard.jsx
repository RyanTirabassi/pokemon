import React from "react";

export default function PokedexCard({ id, name, image, types, height, weight }) {
  return (
    <div className="pokedexDevice" aria-label={`Pokédex mostrando ${name}`}>
      {/* Topo com luzes */}
      <div className="topBar">
        <span className="lens" aria-hidden="true" />
        <span className="dot red" aria-hidden="true" />
        <span className="dot yellow" aria-hidden="true" />
        <span className="dot green" aria-hidden="true" />
      </div>

      {/* Área da tela */}
      <div className="screenWrap">
        <div className="screen">
          {image ? (
            <img src={image} alt={`Imagem oficial de ${name}`} />
          ) : (
            <div className="screenPlaceholder" />
          )}
        </div>
        <div className="speaker" aria-hidden="true" />
      </div>

      {/* Linha de botões coloridos (decorativo) */}
      <div className="colorBtns" aria-hidden="true">
        <span className="btn flat yellow" />
        <span className="btn flat blue" />
      </div>

      {/* Painel verde de informações */}
      <div className="infoPanel">
        <h2 className="pokeName">{name} <span className="pokeId">#{id}</span></h2>
        <dl>
          <div><dt>Type:</dt><dd>{types.join(", ")}</dd></div>
          <div><dt>Height:</dt><dd>{height}</dd></div>
          <div><dt>Weight:</dt><dd>{weight}</dd></div>
          <div><dt>Id:</dt><dd>#{id}</dd></div>
        </dl>
      </div>

      {/* D-pad e botão redondo (decorativos) */}
      <div className="controls" aria-hidden="true">
        <span className="roundBtn" />
        <div className="dpad">
          <span className="v" />
          <span className="h" />
        </div>
      </div>
    </div>
  );
}