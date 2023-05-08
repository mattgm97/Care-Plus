import React, { useEffect, useState } from "react";
import "./global.css";
import { GoogleMap, Marker } from "@react-google-maps/api";

function DetailedInfo({ data, show, closeDetail }: any) {


  const [center, setCenter] = useState<any>({
    lat: 0,
    lng: 0,
  })

  const geocoder = new google.maps.Geocoder();
useEffect(()=>{
  geocoder
  .geocode({address: data.address})
  .then((result) => {
    const { results } = result;
    /*console.log(results)
    console.log(results[0].geometry.location.lat)
    console.log(results[0].geometry.location.lng)*/
    var latlng = results[0].geometry.location;
    setCenter(latlng)
  })
  .catch((e) => {
    console.log("Geocode was not successful for the following reason: " + e);
  });

},[show])



    const mq = window.matchMedia("(max-width: 820px)");
    let containerStyle = {
        width: "100%",
        height: "815px",
      };
    if(!mq.matches){
        containerStyle = {
            width: "895px",
            height: "815px",
          };
    }
 

  if (!show) {
    return <></>;
  }

  return (
    <div className="detailedComponent">
        <span className="closeDetails" onClick={closeDetail}><img src="/arquivos/Xbranco.svg" alt="" /></span>
      <div className="dataPlace">
        <h2>{data.corporatename}</h2>
        <div className="infoBlock">
          <span className="infoTitle">Nome Comercial do Plano:</span>
          <span className="infoContent">{data.businessname}</span>
        </div>
        <div className="infoBlock">
          <span className="infoTitle">Registro ANS:</span>
          <span className="infoContent">{data.ans}</span>
        </div>
        <div className="infoBlock">
          <span className="infoTitle">Prestador:</span>
          <span className="infoContent">{data.provider}</span>
        </div>

        <div className="iconLine withicon">
          <div className="telefone">
            <img src="/arquivos/headset-search.svg" alt="" />
            <a href={`tel:${data.phone}`}>{data.phone}</a>
          </div>

          {/*<div className="moreInfo">
            <img src="/arquivos/list-icon.svg" alt="" />
            <span>Ver planos atendidos</span>
  </div>*/}
        </div>

        <hr />

        <div className="infoBlock">
          <span className="infoTitle">Nome Fantasia:</span>
          <span className="infoContent">{data.namefantasy}</span>
        </div>

        <div className="infoBlock">
          <span className="infoTitle">Razão Social:</span>
          <span className="infoContent">{data.corporatename}</span>
        </div>
        <div className="infoBlock">
          <span className="infoTitle">CNPJ:</span>
          <span className="infoContent">{data.cnpj}</span>
        </div>
        <div className="infoBlock">
          <span className="infoTitle">Tipo de Estabelecimento:</span>
          <span className="infoContent">{data.establishment}</span>
        </div>

        <div className="infoBlock">
          <span className="infoTitle">Endereço:</span>
          <span className="infoContent">{data.address}</span>
        </div>

        <div className="iconLine">
          <div className="infoBlock">
            <span className="infoTitle">Bairro:</span>
            <span className="infoContent">{data.neighborhood}</span>
          </div>

          <div className="infoBlock">
            <span className="infoTitle">Município:</span>
            <span className="infoContent">{data.county}</span>
          </div>
        </div>

        <div className="iconLine">
          <div className="infoBlock special">
            <span className="infoTitle">UF:</span>
            <span className="infoContent">{data.uf}</span>
          </div>

          <div className="infoBlock special">
            <span className="infoTitle">CEP:</span>
            <span className="infoContent">{data.postalcode}</span>
          </div>
        </div>
      </div>
      <div className="mapContainer">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18}>
          <Marker position={center} icon={"/arquivos/pinCP.svg"}/>
          <></>
        </GoogleMap>
      </div>
    </div>
  );
}

export default DetailedInfo;
