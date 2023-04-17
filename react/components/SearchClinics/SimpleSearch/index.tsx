import React, { useState, useRef } from "react";
import "./global.css";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
interface ProductAvailableProps {
  // children: any;
}

const SearchClinics: StorefrontFunctionComponent<
  ProductAvailableProps
> = () => {
  const [cidade, setCidade] = useState<string>("");
  const [estado, setEstado] = useState<string>("");
  const [especialidade, setEspecialidade] = useState<string>("");
  const cityRef = useRef<HTMLInputElement>(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDGmRxjv6Vzll4z0ObpWtu-ZdIfAFLDSaM",
    libraries: ["places"],
  });

  const onPlaceChanged = () => {
    console.log(cityRef.current?.value);
    if (cityRef.current?.value) {
      let endereço = cityRef.current?.value
      let [city, estado] = endereço.split(",")
      estado = estado.trim()
      setEstado(estado)
      setCidade(city);
    }
  };

  const nameHandler = (event: any) => {
    setCidade(event.target.value);
  };

  const especialidadeHandler = (event: any) => {
    setEspecialidade(event.target.value);
  };

  const submitForm = (e: any) => {
    e.preventDefault();
    sessionStorage.setItem("cidade", cidade);
    sessionStorage.setItem("estado", estado);
    sessionStorage.setItem("especialidade", especialidade);
    window.location.href = "/buscafranquia";
  };

  if (!isLoaded) {
    return (
      <div className="loadingAppSearch">
        <img src="/arquivos/spinner.gif" />
      </div>
    );
  }
  return (
    
      <div className="boxBody">
        <h2>Encontre a clínica mais próxima de você</h2>
        <p>
          Temos mais de um milhão de profissionais em mais de xxx clínicas
          espalhadas pelo Brasil! Encontre o mais perto da sua casa!
        </p>

        <div className="inputContainer">
          <form onSubmit={submitForm} action="" method="post">
            <div className="field">
              <label htmlFor="where">Onde você está?</label>
              <Autocomplete
                types={["(cities)"]}
                fields={["address_components", "geometry", "icon", "name"]}
                restrictions={{ country: "br" }}
                onPlaceChanged={onPlaceChanged}
              >
                <input
                  id="where"
                  type="text"
                  name="local"
                  placeholder="Cidade"
                  onChange={nameHandler}
                  ref={cityRef}
                />
              </Autocomplete>
            </div>
            <div className="field">
              <label htmlFor="especialidade">
                Procurando alguma especialidade?
              </label>
              <select
                name="especialidade"
                id="especialidade"
                onChange={especialidadeHandler}
              >
                <option value="Laboremagna commodo">Laboremagna commodo</option>
                <option value="Teste2">TESTE 2</option>
                <option value="Teste3">TESTE 3</option>
                <option value="Teste4">TESTE 4</option>
              </select>
            </div>
            <button type="submit">
              Enviar <img src="/arquivos/side-arrow.svg" />
            </button>
          </form>
        </div>
      </div>
    
  );
};

export default SearchClinics;
