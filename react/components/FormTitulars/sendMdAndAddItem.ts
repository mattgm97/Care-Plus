import axios from 'axios'
export interface DataMD2 {
  name: string,
  email: string,
  cpf: string,
  birthDate: string,
  gender: string,
  nameMotherOrPis: string,
  confEmail: string,
  pis: string,
  cell: string,
  agreement: boolean,
  conditionGeral: boolean,
  address: {
    cep: string,
    address: string,
    number: string,
    complement: string,
    city: string,
    uf: string,
    district: string
  }
}
function addItemCart(id: number, idSeller:string) {
  
  fetch(`/checkout/cart/add?sc=2&sku=${id}&qty=1&seller=${idSeller}`).then(() => {
    window.location.pathname = `/checkout`
  })
}
export const sendMasterDataAndAdd = (data: DataMD2 ,idProduct:number, idSeller:string) => {
  let options = {
    method: 'POST',
    headers: { Accept: 'application/vnd.vtex.ds.v10 json', 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  fetch("/api/dataentities/holderProduct/documents?_schema=schemasHolderProduct", options)
    .then((res:any) => res.json())
    .then(json => {
      localStorage.setItem('DocumentId', JSON.stringify(json.DocumentId))
      localStorage.setItem('Informacoes', JSON.stringify(data))
      if (json.DocumentId) {
        addItemCart(idProduct,idSeller)
      }
    }).catch(e => console.info(e))
}

export const TestaCPF = (strCPF:string) => {
  var newstrCPF = strCPF.replace('.', "").replace('.', "").replace('-', '')
  var Soma;
  var Resto;
  var i;
  var cpf = <HTMLInputElement>document.querySelector("[name=cpf]")   
  Soma = 0;
  if (newstrCPF == "00000000000" || newstrCPF == "11111111111" || newstrCPF == "22222222222" || newstrCPF == "33333333333" || newstrCPF == "44444444444" || newstrCPF == "55555555555" || newstrCPF == "666666666666" || newstrCPF == "777777777777" || newstrCPF == "88888888888" || newstrCPF == "99999999999"){
    
    cpf.value = ""
  
    return false;
  }
  for (i=1; i<=9; i++) Soma = Soma + parseInt(newstrCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;
  
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(newstrCPF.substring(9, 10)) ){
      
      cpf.value = ""
  
      return false
    } 
  
  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(newstrCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
  
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(newstrCPF.substring(10, 11) ) ){
      
      cpf.value = ""
  
      return false
    } 
    return true;
  }

  export const autoComplete = (value: string) => {
      var cep = value.replace(/[^0-9]/, "")

      type CEPResponse = {
        cep: string
        logradouro: string
        complemento: string
        bairro: string
        localidade: string
        uf: string
        ibge: string
        gia: string
        ddd: string
        siafi: string
        erro?: string
      }

      axios.get<CEPResponse, any>(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res:any) => {
        if(res.data.erro == undefined){
          var address = <HTMLInputElement>document.querySelector("[name=address]")
          var city = <HTMLInputElement>document.querySelector("[name=city]")
          var uf = <HTMLInputElement>document.querySelector("[name=uf]")
          var district = <HTMLInputElement>document.querySelector("[name=district]")
          district.value = res.data.bairro
          address.value = res.data.logradouro
          city.value = res.data.localidade
          uf.value = res.data.uf
    
          
        localStorage.setItem("address", JSON.stringify(address.value));
          localStorage.setItem("city", JSON.stringify(city.value));
          localStorage.setItem("uf", JSON.stringify(uf.value));
          localStorage.setItem("district", JSON.stringify(district.value));
        }else{
          alert("cep invalido")
        }
      }).catch(() =>{
        var cep = <HTMLInputElement>document.querySelector("[name=cep]")
        if(cep.value.length <= 0 ){
          alert("preencha o cep")
        }else{
          alert("cep invalido")
        }
      });
    }