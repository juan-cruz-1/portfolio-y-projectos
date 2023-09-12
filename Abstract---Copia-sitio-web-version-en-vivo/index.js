const botonBuscar = document.getElementById("toggle-buscar-mobile");
const botonToggleMenuHeader = document.getElementById("toggle-menu-mobile");
const busquedaHeader = document.getElementById("busqueda-header");
const cerrarBusquedaHeader = document.querySelector("#busqueda-header button");
const menuHeaderMobile = document.getElementById("menu-header-mobile");


botonBuscar.addEventListener("click",toggleBuscar);
cerrarBusquedaHeader.addEventListener("click",toggleBuscar);

botonToggleMenuHeader.addEventListener("click", ()=>{
  menuHeaderMobile.classList.toggle("escondido");
  botonToggleMenuHeader.src = menuHeaderMobile.classList === "escondido" ?
    "./img/menu-hamburguesa.svg" :
    "./img/x.svg";
})


function toggleBuscar(){
  busquedaHeader.classList.toggle("escondido");
}

