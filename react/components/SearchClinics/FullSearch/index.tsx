import React, { useState, useRef, useEffect } from "react";
import "./global.css";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import ReactPaginate from "react-paginate";
import ClinicInfos from "./ClinicInfos";
import DetailedInfo from "./DetailedInfo";
interface ProductAvailableProps {
  // children: any;
}

const SearchClinicsFull: StorefrontFunctionComponent<
  ProductAvailableProps
> = () => {
  const [cidade, setCidade] = useState<any>("");
  const [estado, setEstado] = useState<any>("");
  const [bairro, setBairro] = useState<any>("");
  const [shouldShow, setShouldShow] = useState<boolean>(false);
  const [detailedComponentData, setDetailedComponentData] = useState<any>({});
  const [especialidade, setEspecialidade] = useState<any>("");
  const [searchResults, setSearchResults] = useState<any>([]);
  const [wasSearched, setWasSearched] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [especialidateLista, setEspecialidadeLista] = useState<any>([]);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const cityRef = useRef<HTMLInputElement>(null);
  const bairroRef = useRef<HTMLInputElement>(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDGmRxjv6Vzll4z0ObpWtu-ZdIfAFLDSaM", //temp key
    libraries: ["places"],
  });

  const paginate = ({ selected }: any) => {
    setCurrentPage(selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setDetailsComponent = (current: any) => {
    setShouldShow((prev: any) => !prev);
    setDetailedComponentData(current);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    fetch(`/api/dataentities/BR/search?_fields=specialty&_sort=specialty ASC`)
      .then((res: any) => res.json())
      .then((data: any) => {
        let myOptions = [];
        for (let i = 0; i < data.length; i++) {
          myOptions.push(data[i].specialty);
        }

        //Set faz a filtragem de dados automaticamente pra mim
        let uniqueItems = [...new Set(myOptions)];
        setEspecialidadeLista(uniqueItems);
      });
  }, []);

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
      doSearch(cidade, estado, "", especialidade);
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
      console.log(bairroRef.current?.value);
      let endereço = bairroRef.current?.value;
      let [bairro, city] = endereço.split(",");
      let handler = city.split("-");
      city = handler[0].trim();
      let estado = handler[1].trim();
      setEstado(estado);
      setCidade(city);
      setBairro(bairro);
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

  const closeDetail = () => {
    setShouldShow(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const doSearch = (
    cidade: any,
    estado: any,
    bairro: any,
    especialidade: any
  ) => {
    setShouldShow(false);
    fetch(
      `/api/dataentities/BR/search?county=${cidade}&uf=${estado}&neighborhood=${bairro}&specialty=${especialidade}&_fields=address,ans,businessname,cnpj,corporatename,county,establishment,latitude,longitude,namefantasy,neighborhood,postalcode,provider,specialty,uf,phone&_sort=provider ASC`
    )
      .then((res: any) => res.json())
      .then((data: any) => {
        setSearchResults(data);
        setWasSearched(true);
      });
  };

  const submitForm = (e: any) => {
    e.preventDefault();
    doSearch(cidade, estado, bairro, especialidade);
  };

  const currentPosts = searchResults.slice(indexOfFirstPost, indexOfLastPost);

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
                <select
                  name="estado"
                  id="estado"
                  onChange={estadoHandler}
                  value={estado}
                >
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
                  value={especialidade}
                >
                  <option value="" disabled selected hidden>
                    Especialidade Dental
                  </option>
                  {especialidateLista.map((el: any) => {
                    return <option value={el}>{el}</option>;
                  })}
                </select>
              </div>
            </div>

            <div className="fields submit">
              <button type="submit">Buscar</button>
            </div>
          </form>
        </div>
      </div>

      {!shouldShow && (
        <div className="resultsList">
          {searchResults.length > 0 && (
            <div className="resultsTable">
              <div className="tableFields">
                <h3>Nome Comercial do Plano</h3>
                <h3>Registro ANS</h3>
                <h3>Prestador</h3>
                <h3>Especialidade</h3>
              </div>
              <ul className="resultsList">
                {currentPosts.map((clinic: any) => {
                  return (
                    <ClinicInfos
                      dados={clinic}
                      selector={setDetailsComponent}
                    />
                  );
                })}
              </ul>

              <ReactPaginate
                onPageChange={paginate}
                pageCount={Math.ceil(searchResults.length / postsPerPage)}
                previousLabel={"Anterior"}
                nextLabel={"Próxima"}
                containerClassName={"pagination"}
                pageLinkClassName={"page-number"}
                previousLinkClassName={"page-number"}
                nextLinkClassName={"page-number"}
                activeLinkClassName={"active"}
              />
            </div>
          )}
        </div>
      )}
      {searchResults.length <= 0 && wasSearched ? (
        <h2 className="notFound">Não encontramos nenhum resultado</h2>
      ) : (
        ""
      )}

      <DetailedInfo
        show={shouldShow}
        data={detailedComponentData}
        closeDetail={closeDetail}
      />
      <div className="legendaQuali">
        <h3>Legenda Qualificações</h3>
        <div className="row">
          <ul>
            <li>
              <strong>A</strong> Programa de Acreditação
            </li>
            <li>
              <strong>P</strong> Profissional com Especialização
            </li>
            <li>
              <strong>E</strong> Título de Especialista
            </li>
            <li>
              <strong>G</strong> Certificações de Entidades Gestoras de Outros
              Programas de Qualidade
            </li>
            <li>
              <strong>D</strong> Profissional com Doutorado ou Pós-Doutorado
            </li>
          </ul>
          <ul>
            <li>
              <strong>N</strong> Comunicação de Eventos Adversos
            </li>
            <li>
              <strong>R</strong> Profissional com Residência
            </li>
            <li>
              <strong>Q</strong> Qualidade Monitorada
            </li>
            <li>
              <strong>I</strong> Certificação ISO 9001
            </li>
            <li>
              <strong>M</strong> Profissional com Mestrado
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SearchClinicsFull;
