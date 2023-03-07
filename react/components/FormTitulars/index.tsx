import React, { useState, useEffect, FormEvent } from 'react'
import { cpfMask, phoneMask, cepMask, birthDayMask, numberMask } from "../../utils/mask"
import "./global.css"
import { sendMasterDataAndAdd, DataMD2, TestaCPF, autoComplete } from "./sendMdAndAddItem"

export default function FormTitulars({ product, selectedItem }: any) {
  const [validate, setValidate] = useState(false)
  const[validCpf, setValidCpf] = useState({borderBottom: '2px solid #ededed'})
  const[showAbreviationError, setShowAbreviationError] = useState(false)
  const[showSecondAbreviationError, setShowSecondAbreviationError] = useState(false)
  const [showBirthdayError, setShowBirthdayError] = useState(false)
 
 
  //const[estilo, setEstilo] = useState()
  const [dataForm, setDataForm] = useState(
    {
      name: "",
      email: "",
      cpf: "",
      birthDate: "",
      gender: "",
      nameMotherOrPis: "",
      confEmail: "",
      pis: "",
      cell: "",
      agreement: false,
      conditionGeral: false,
      address: {
        cep: "",
        address: "",
        number: "",
        complement: "",
        city: "",
        uf: "",
        district: ""
      }
    }
  )

  const validateDataForm = () => {

        var address = document.querySelector("[name=address]") as HTMLInputElement
        var city = document.querySelector("[name=city]") as HTMLInputElement
        var uf = document.querySelector("[name=uf]") as HTMLInputElement
        var district = document.querySelector("[name=district]") as HTMLInputElement
        var cep = document.querySelector("[name=cep]") as HTMLInputElement
        var complement = document.querySelector("[name=complement]") as HTMLInputElement
        var number = document.querySelector("[name=number]") as HTMLInputElement
        var cepAutoComplete = {
          cep: cep.value,
          address: address.value,
          number: number.value,
          complement: complement.value,
          city: city.value,
          uf: uf.value,
          district: district.value
        }
          setDataForm({ ...dataForm, address: cepAutoComplete })
      }

      const CpfChecker = (e: any) => {

                const isValidCpf = TestaCPF(e)

                if(isValidCpf) {
                          setValidCpf({borderBottom: '2px solid green'})
                } else {
                          setValidCpf({borderBottom: '2px solid red'})
                }

      }

      // checar se nome completo não é abreviação
      const checkValidFullName = (str: string): boolean => {
        const separatedString = str.split(' ')
        console.log(separatedString)

        if(separatedString.length < 2) return false

        const atleastThreeLetters = separatedString.find(el => el.length < 2)

        if(atleastThreeLetters !== undefined) return false

        return true
      }

      const inputChecker = (e: any) => {
                const currentInput = document.querySelector(`input[name=${e}]`) as any

                    if(currentInput.value == "") {
                              currentInput.style.borderBottom = "2px solid red"
                    } else {
                              currentInput.style.borderBottom = "2px solid green"
                    }

                    if(currentInput.placeholder == "Nome Completo*") {
                      const inputValue = currentInput.value

                      const isValidValue = checkValidFullName(inputValue)

                      if(!isValidValue) {
                        currentInput.style.borderBottom = "2px solid red";
                        setShowAbreviationError(true)
                      } else {
                        setShowAbreviationError(false)
                      }
                    }

                    if(currentInput.placeholder == "Nome da Mãe*") {
                      const inputValue = currentInput.value

                      const isValidValue = checkValidFullName(inputValue)

                      if(!isValidValue) {
                        currentInput.style.borderBottom = "2px solid red";
                        setShowSecondAbreviationError(true)
                      } else {
                        setShowSecondAbreviationError(false)
                      }
                    }

                    if (currentInput.name == 'birthday') {
                      var birthday = currentInput.value;
                      var regexVar = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
                      var regexVarTest = regexVar.test(birthday);
                      var userBirthDate = new Date(birthday.replace(regexVar, "$3-$2-$1"));
                      var todayYear = (new Date()).getFullYear();
                      var cutOff19 = new Date();
                      cutOff19.setFullYear(todayYear - 1);
                      var cutOff95 = new Date();
                      cutOff95.setFullYear(todayYear - 150);
                      var validYear = birthday.split("/")[2]
                      if (!regexVarTest || userBirthDate > cutOff19 || userBirthDate < cutOff95 || validYear >= todayYear) {
                        currentInput.style.borderBottom = "2px solid red";
                        currentInput.value = "";
                        setShowBirthdayError(true)
                      } else {
                        setShowBirthdayError(false)
                      }
                      return userBirthDate;
                    } else {
                      return false
                    }
      }

    useEffect( () => {
        var url = window.location.href;
        if(url.search('/dados-do-titular') == -1){
          window.history.pushState("object or string", "Title", window.location.href + "/dados-do-titular");
        }
        window.onpopstate = function (e: any) {

            if(e.state == "object or string"){
              //console.log(window.location.href)
            }
            else{
              if(window.location.href = window.location.href + "/dados-do-titular"){
                window.location.replace(window.location.href);
              }
            }
        };

      }, [])
  const validateForm = (formData: DataMD2) => {

    const fullName = formData.name;

    const isValidFullName = checkValidFullName(fullName)

    if(!isValidFullName) setValidate(false)

    const motherName = formData.nameMotherOrPis

    const isValidMotherName = checkValidFullName(motherName)

    if(!isValidMotherName) setValidate(false)

    const dataTitular = formData.name && formData.email && formData.birthDate && formData.gender && formData.nameMotherOrPis && formData.cell && formData.agreement && formData.conditionGeral
    const address = formData.address
    const titulaAddress = address.cep && address.address && address.number && address.city && address.uf && address.district

    const allValiteded = dataTitular && titulaAddress

    if (allValiteded) setValidate(true)
    if (!allValiteded) setValidate(false)
  }

  useEffect(() => {
    validateForm(dataForm)
  }, [dataForm])

  function onsubmit(e: FormEvent) {
    e.preventDefault()
    console.log(dataForm)
    console.log("dataForm")
    console.log(product)
    console.log("product")
    console.log(selectedItem)
    sendMasterDataAndAdd(dataForm, selectedItem.itemId, selectedItem.sellers[0].sellerId)
  }

  console.log(dataForm)

let whichContract:any;

switch(selectedItem.itemId){
  case "12":
    whichContract = <a href="/arquivos/Contrato_Dental_Lite_CG_atualizado.pdf" target="_blank" className="linkPolicies" rel="noopener noreferrer">Contrato Dental Lite</a>
  break;
  case "7":
    whichContract = <a href="/arquivos/Contrato_Dental_Lite_CG_ORTO_PRÓTESE_atualizado.pdf" target="_blank" className="linkPolicies" rel="noopener noreferrer">Contrato Dental Lite Ortodontia e Prótese</a>
  break;
  case "5":
    whichContract = <a href="/arquivos/Contrato_Dental_Lite_CG_ORTO_atualizado.pdf" target="_blank" className="linkPolicies" rel="noopener noreferrer">Contrato Dental Lite Ortodontia</a>
  break;
  case "13":
    whichContract = <a href="/arquivos/Contrato_Dental_Pro_10_CG_atualizado.pdf" target="_blank" className="linkPolicies" rel="noopener noreferrer">Contrato Dental Pro 10</a>
  break;
  case "11":
    whichContract =   <a href="/arquivos/Contrato_Dental_Pro_20_CG_ORTO_ALINHADORES_atualizado.pdf" target="_blank" className="linkPolicies" rel="noopener noreferrer">Contrato Dental Pro20 Ortodontia e Alinhador Estético</a>
  break;
  case "9":
    whichContract = <a href="/arquivos/Contrato_Dental_Pro_10_CG_ORTO_PRÓTESE_atualizado.pdf" target="_blank" className="linkPolicies" rel="noopener noreferrer">Contrato Dental Pro10 Ortodontia e Prótese</a>
  break;
}


  return (
    <section className="containerFixed">
      <div className="containerForm">

        <div className="titleForm">
        Preencha o formulário abaixo
        </div>
        <div className="titleFormSub">
        Com as informações do titular do plano
        </div>

        <form onSubmit={onsubmit} className="form" method="post">
          <div className="subtitleContainer">
            <span className="subtitle">Dados Pessoais</span>

          </div>
          <div className="firstRowContainer">
            {showAbreviationError && <p className="abreviationError">Por favor, preencha um nome completo sem abreviações.</p>}
          <input

            type="text" name="name" placeholder="Nome Completo*"
            onChange={e => {
              setDataForm({ ...dataForm, name: e.target.value })
            }}
            onBlur={e => {
                      inputChecker(e.target.name)
            }}
            value={
              dataForm.name}
          />

          <input style={validCpf}  type="text" name="cpf" placeholder="CPF*"
            onChange={e => {
              setDataForm({ ...dataForm, cpf: e.target.value })
            }}
            onBlur={e => {
                CpfChecker(e.target.value)
            }}
            value={cpfMask(dataForm.cpf)}
          />

{showBirthdayError && <p className="abreviationBirthDayError">Por favor, insira uma data de nascimento válida.</p>}
            <input type="text" name="birthday" placeholder="Data de Nascimento*"
              onChange={e => { setDataForm({ ...dataForm, birthDate: e.target.value }) }}
              value={birthDayMask(dataForm.birthDate)}
              onBlur={e => {
                      inputChecker(e.target.name)
            }}
            />
          </div>

          <div className="firstRowContainer">
          

            <div className="select">
              <select name="gender" id="gender"
                onChange={e => { setDataForm({ ...dataForm, gender: e.target.value }) }}
                value={dataForm.gender}
              >
                <option value="" disabled hidden> Sexo*</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="prefiro não declarar">Prefiro não Declarar</option>
              </select>
            </div>

            {showSecondAbreviationError && <p className="abreviationError">Por favor, preencha um nome completo sem abreviações.</p>}
          <input type="text"
          onBlur={e => {
                    inputChecker(e.target.name)
          }}
          name="nameMotherOrPIS" placeholder="Nome da Mãe*"
            onChange={e => { setDataForm({ ...dataForm, nameMotherOrPis: e.target.value }) }}
            value={dataForm.nameMotherOrPis} />

<input type="text"
          onBlur={e => {
                    inputChecker(e.target.name)
          }}
          name="pis" placeholder="PIS"
            onChange={e => { setDataForm({ ...dataForm, pis: e.target.value }) }}
            value={dataForm.pis} />
          </div>


          <input type="text" name="cell" placeholder="Telefone Celular*"
          onBlur={e => {
                    inputChecker(e.target.name)
          }}
            onChange={e => { setDataForm({ ...dataForm, cell: e.target.value }) }}
            value={phoneMask(dataForm.cell)}
          />
          <input type="email" name="email" placeholder="E-mail*"
          onBlur={e => {
                    inputChecker(e.target.name)
          }}
            onChange={e => { setDataForm({ ...dataForm, email: e.target.value }) }}
            value={dataForm.email}
          />

          <input type="text" name="confEmail" placeholder="Confirmação de E-Mail*"
          onBlur={e => {
                    inputChecker(e.target.name)
          }}
            onChange={e => { setDataForm({ ...dataForm, confEmail: e.target.value }) }}
            value={dataForm.confEmail}
          />

          <div className="subtitleContainer">
            <span className="subtitle">Endereço</span>
          </div>
          <input type="text" name="cep" placeholder="CEP*"

            onChange={e => { setDataForm({ ...dataForm, address: { ...dataForm.address, cep: e.target.value } }) }}
            value={cepMask(dataForm.address.cep)}
            onBlur={e => {
              autoComplete(e.target.value)
                validateDataForm()
              }}
            onMouseOver={() => {
              validateDataForm()
            }}
          />
            <input type="text" name="uf" placeholder="UF*"
          onBlur={e => {
                    inputChecker(e.target.name)
          }}
            onChange={e => { setDataForm({ ...dataForm, address: { ...dataForm.address, uf: e.target.value } }) }}
            value={dataForm.address.uf}
          />

<input type="text" name="city" placeholder="Cidade*"
          onBlur={e => {
                    inputChecker(e.target.name)
          }}
            onChange={e => { setDataForm({ ...dataForm, address: { ...dataForm.address, city: e.target.value } }) }}
            value={dataForm.address.city}
          />

<input type="text" name="district" placeholder="Bairro*"
          onBlur={e => {
                    inputChecker(e.target.name)
          }}
            onChange={e => { setDataForm({ ...dataForm, address: { ...dataForm.address, district: e.target.value } }) }}
            value={dataForm.address.district}
          />


          <input type="text" name="address" placeholder="Endereço*"
          onBlur={e => {
                    inputChecker(e.target.name)
          }}
            onChange={e => { setDataForm({ ...dataForm, address: { ...dataForm.address, address: e.target.value } }) }}
            value={dataForm.address.address} />

          <input type="text" name="number" placeholder="Número*"
            onChange={e => { setDataForm({ ...dataForm, address: { ...dataForm.address, number: e.target.value } }) }}
            value={numberMask(dataForm.address.number)}
            onBlur={e => {
                    inputChecker(e.target.name)
          }}
            onFocus={() => {
              validateDataForm()
            }}
            onMouseOver={() => {
              validateDataForm()
            }}
          />
          <input type="text" name="complement" placeholder="Complemento"
            onChange={e => { setDataForm({ ...dataForm, address: { ...dataForm.address, complement: e.target.value } }) }}
            value={dataForm.address.complement}
            onBlur={e => {
                    inputChecker(e.target.name)
          }}
            onMouseOver={() => {
              validateDataForm()
            }}
          />
       
        
       <div className="agreementBox">
       <div className="agreementContainer">
            <input type="checkbox" id="agreement" name="agrment"
              onChange={e => {
                setDataForm({ ...dataForm, agreement: e.target.checked })
              }} />
            <label htmlFor="agreement">Estou ciente e concordo que os dados pessoais fornecidos por mim, incluindo os dados pessoais sensíveis, serão tratados de acordo com a política de Privacidade da Care Plus.</label>
          </div>
          <div className="agreementContainer">
            <input type="checkbox" id="agreement2" name="agrment"
              onChange={e => {
                setDataForm({ ...dataForm, conditionGeral: e.target.checked })
              }} />
            <label htmlFor="conditionGeral">Declaro que li as Condições Gerais, Contrato, Guia de Leitura Contratual e Manual de Planos de Saúde e concordo com as condições apresentadas.</label>
          </div>
       </div>

       <div className="titleFormSub titleDownload">
        Faça download do seu contrato abaixo:
        </div>
         <div className='linksContainers'>
          {whichContract}

          <a href="/arquivos/Condicoes_Gerais_new-min.pdf" target="_blank" className="linkPolicies" rel="noopener noreferrer">Condições Gerais</a>
          <a href="/arquivos/Guia_de_Leitura_Contratual_new.pdf" target="_blank" className="linkPolicies" rel="noopener noreferrer">Guia de Leitura Contratual</a>
          <a href="/arquivos/MPS_-_Manual_de_Contratação_Plano_de_Saúde_new-min.pdf" target="_blank" className="linkPolicies" rel="noopener noreferrer">MPS - Manual de Contratação Plano de Saúde</a>

         </div>

       
          <button type="submit" disabled={!validate ? true : false}> Continuar </button>
        </form>
      </div>

    </section>
  )
}


