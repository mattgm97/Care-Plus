import React from "react";
import { useState, useEffect } from "react";
import "./global.css";

function ClinicInfos({ dados, selector }: any) {
  const [wasClicked, setWasClicked] = useState<boolean>(false);

  const clickHandler = () => {
    setWasClicked((prev) => !prev);
  };

  useEffect(() => {
    setWasClicked(false)
}, [dados]);

  return (
    <li key={dados.cnpj}>
      <div className="mainInfos" onClick={clickHandler}>
        <span>{dados.businessname}</span>
        <span>{dados.ans}</span>
        <span>{dados.provider}</span>
        <span>{dados.specialty}</span>
      </div>

      {wasClicked && (
        <>
          <div className="complementaryInfos">
            <div className="row">
              <div className="infoBlock">
                <span className="infoTitle">Nome Fantasia:</span>
                <span className="infoContent">{dados.namefantasy}</span>
              </div>
              <div className="infoBlock">
                <span className="infoTitle">Razão Social:</span>
                <span className="infoContent">{dados.corporatename}</span>
              </div>
              <div className="infoBlock">
                <span className="infoTitle">CNPJ:</span>
                <span className="infoContent">{dados.cnpj}</span>
              </div>
              <div className="infoBlock">
                <span className="infoTitle">Tipo de Estabelecimento:</span>
                <span className="infoContent">{dados.establishment}</span>
              </div>
            </div>
            <div className="row">
            <div className="infoBlock">
                <span className="infoTitle">Endereço:</span>
                <span className="infoContent">{dados.address}</span>
              </div>
              <div className="infoBlock">
                <span className="infoTitle">Bairro:</span>
                <span className="infoContent">{dados.neighborhood}</span>
              </div>
              <div className="infoBlock">
                <span className="infoTitle">Município:</span>
                <span className="infoContent">{dados.county}</span>
              </div>
              <div className="infoBlock special">
                <span className="infoTitle">UF:</span>
                <span className="infoContent">{dados.uf}</span>
              </div>

              <div className="infoBlock special">
                <span className="infoTitle">CEP:</span>
                <span className="infoContent">{dados.postalcode}</span>
              </div>
            </div>
          </div>

          <div className="complementaryActions">
            <div className="telefone">
<img src="/arquivos/headset-search.svg" alt="" /> <a href={`tel:${dados.phone}`}>{dados.phone}</a>
            </div>
            <div className="mapa" onClick={()=>selector(dados)}>
            <img src="/arquivos/mapspin.svg" alt="" /><span>Ver no mapa</span>
            </div>
            <div className="moreInfo" onClick={()=>selector(dados)}>
            <img src="/arquivos/list-icon.svg" alt="" /><span>Veja mais informações</span>
            </div>
          </div>
        </>
      )}
    </li>
  );
}

export default ClinicInfos;
