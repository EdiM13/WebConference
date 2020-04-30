window.onload= funcion(){
  //código para manipulação
}

const btnRegister = document.getElementById("btnRegister")
btnRegister.addEventListener("click",funcion){

}

swal({
  title: "Inscrição na WebConference",
  html:
    '<input id="txtName" class="swal2-input" placeholder="name">'+
    '<input id="txtEmail" class="swal2-input" placeholder="e-mail">',
  showCancelButton: true,
  confirmButtonText:"Inscrever",
  cancelButtonText:"Cancelar",
  shoeLoaderOnConfirm: true,
  preConfirm: () => {
    const name = document.getElementById('txtName').value
    const email = document.getElementById('txtEmail').value
    const url_base= "https://fcawebbook.herokuapp.com"
    return
      fetch(`${url_base}/conferences/1/participants/${email}`,
      {headers:{"content-Type":"application/x-www-form-urlencoded"},
      method: "POST",
      body: `nomeparticipant=${name}`
     })
     .then (response =>{
       if(!response.ok){
         throw new Error(response.statusText);
       }
       return response.json();
     })
     .catch(error => {
       swal.showValidationError(`Pedido Falhou: ${error}`);
     })
  },
  allorOutsideClick: () => !swal.isLoadind()
}).then(result => {
  if (result.value){
    if(!result.value.err.code){
      swal ({title:"Inscrição feita com sucesso!"})
    } else {
      swal ({title:`${result.value.err_message}`})
    }
  }
})
