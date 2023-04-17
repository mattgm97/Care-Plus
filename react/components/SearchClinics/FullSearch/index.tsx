import React, { useState, useRef, useEffect } from "react";
import "./global.css";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import ReactPaginate from 'react-paginate';
interface ProductAvailableProps {
  // children: any;
}

const SearchClinicsFull: StorefrontFunctionComponent<
  ProductAvailableProps
> = () => {
  const [cidade, setCidade] = useState<any>("");
  const [estado, setEstado] = useState<any>("");
  const [bairro, setBairro] = useState<any>("");
  const [especialidade, setEspecialidade] = useState<any>("");
  const [searchResults, setSearchResults] = useState<any>();
  const cityRef = useRef<HTMLInputElement>(null);
  const bairroRef = useRef<HTMLInputElement>(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDGmRxjv6Vzll4z0ObpWtu-ZdIfAFLDSaM",
    libraries: ["places"],
  });

  useEffect(() => {
    if (
      sessionStorage.getItem("cidade") &&
      sessionStorage.getItem("estado") &&
      sessionStorage.getItem("especialidade")
    ) {
      let cidade = sessionStorage.getItem("cidade");
      let estado = sessionStorage.getItem("estado");
      let especialidade = sessionStorage.getItem("especialidade");
      setCidade(cidade);
      setEstado(estado);
      setEspecialidade(especialidade);
    }
  }, []);

  const onPlaceChanged = () => {
    if (cityRef.current?.value) {
      let endereço = cityRef.current?.value;
      let [city, estado] = endereço.split(",");
      estado = estado.trim();
      setEstado(estado);
      setCidade(city);
     
    }
  };

  const onPlaceChangedBairro = () => {
    if (bairroRef.current?.value) {
      console.log(bairroRef.current?.value)
      let endereço = bairroRef.current?.value;
      let [bairro, city] = endereço.split(",");
      let handler = city.split("-")
      city = handler[0].trim()
      let estado = handler[1].trim();
      setEstado(estado);
      setCidade(city);
      setBairro(bairro)
    }
  };

  const nameHandler = (event: any) => {
    setCidade(event.target.value);
  };

  const NeighborhoodHandler = (event: any) => {
    setBairro(event.target.value);
  };

  const especialidadeHandler = (event: any) => {
    setEspecialidade(event.target.value);
  };

  const estadoHandler = (event: any) => {
    setEstado(event.target.value);
  };

  const submitForm = (e: any) => {
    e.preventDefault();

   
    fetch(`/api/dataentities/BR/search?county=${cidade}&uf=${estado}&neighborhood${bairro}&specialty=${especialidade}&_fields=address,ans,businessname,cnpj,corporatename,county,establishment,latitude,longitude,namefantasy,neighborhood,postalcode,provider,specialty,uf&_sort=provider ASC`)
    .then((res:any) => res.json())
    .then((data:any)=>{
      setSearchResults(data)
      console.log(data)
    })


  };

  if (!isLoaded) {
    return (
      <div className="loadingAppSearch">
        <img src="/arquivos/spinner.gif" />
      </div>
    );
  }
  return (
    <>
    <div className="boxBodyFull">
      <h2>Escolha abaixo:</h2>

      <div className="inputContainerFull">
        <form onSubmit={submitForm} action="" method="post">
          <div className="fields">
            <div className="field">
              <Autocomplete
                types={["(cities)"]}
                fields={["address_components", "geometry", "icon", "name"]}
                restrictions={{ country: "br" }}
                onPlaceChanged={onPlaceChanged}
              >
                <input
                  id="where"
                  type="text"
                  name="cidade"
                  placeholder="Cidade*"
                  onChange={nameHandler}
                  ref={cityRef}
                  value={cidade}
                />
              </Autocomplete>
            </div>
            <div className="field">
              <select name="estado" id="estado" onChange={estadoHandler} value={estado}>
                <option value="AC">AC</option>
                <option value="AL">AL</option>
                <option value="AP">AP</option>
                <option value="AM">AM</option>
                <option value="BA">BA</option>
                <option value="CE">CE</option>
                <option value="DF">DF</option>
                <option value="ES">ES</option>
                <option value="GO">GO</option>
                <option value="MA">MA</option>
                <option value="MT">MT</option>
                <option value="MS">MS</option>
                <option value="MG">MG</option>
                <option value="PA">PA</option>
                <option value="PB">PB</option>
                <option value="PR">PR</option>
                <option value="PE">PE</option>
                <option value="PI">PI</option>
                <option value="RJ">RJ</option>
                <option value="RN">RN</option>
                <option value="RS">RS</option>
                <option value="RO">RO</option>
                <option value="RR">RR</option>
                <option value="SC">SC</option>
                <option value="SP">SP</option>
                <option value="SE">SE</option>
                <option value="TO">TO</option>
              </select>
            </div>

            <div className="field">
              <Autocomplete
                types={["sublocality"]}
                fields={["address_components", "geometry", "icon", "name"]}
                restrictions={{ country: "br" }}
                onPlaceChanged={onPlaceChangedBairro}
              >
                <input
                  id="whereNeighborhood"
                  type="text"
                  name="bairro"
                  placeholder="Bairro"
                  onChange={NeighborhoodHandler}
                  ref={bairroRef}
                />
              </Autocomplete>
            </div>
            <div className="field">
              <select
                name="especialidade"
                id="especialidade"
                onChange={especialidadeHandler}
              >
                 <option value="" disabled selected hidden>Especialidade Dental</option>
                <option value="Laboremagna commodo">Laboremagna commodo</option>
                <option value="Teste2">TESTE 2</option>
                <option value="Teste3">TESTE 3</option>
                <option value="Teste4">TESTE 4</option>
              </select>
            </div>
          </div>

          <div className="fields submit">

            <button type="submit">BUSCAR</button>
          </div>
        </form>
      </div>

    </div>
    {
      searchResults &&(
        <div className="resultsTable">
    asasa
        </div>
      )
    
    }
    </>
  );
};

export default SearchClinicsFull;
