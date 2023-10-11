
let map
let marker

async function initMap() {
  
  const { Map } = await google.maps.importLibrary("maps")
  const {Marker} = await google.maps.importLibrary("marker")

  const coordenadasCajazeiras = { lat: -6.89031, lng: -38.55390 }

  map = new Map(document.getElementById("map"), {
    center: coordenadasCajazeiras,
    zoom: 14,

  })

  marker = new Marker({
    position: coordenadasCajazeiras,
    title: 'Local do Assalto',
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP
  })
  
  marker.addListener("click", () =>{
    const posicao = {
      lat: marker.getPosition().lat(),
      lng: marker.getPosition().lng()}
    
    console.log(posicao)
  })

  marker.addListener('dblclick', ()=>{
    const infowindow = new google.maps.InfoWindow({
        content: marker.title
    });

    infowindow.open({
        anchor: marker,
        map,
    });
  });

}

initMap();

export {map, marker}

// async function registraOcorrencia(){
//   const point = { type: 'Point', coordinates: [-76.984722, 39.807222]}; // GeoJson format: [lng, lat]
// import Ocorrencia from "./models/Ocorrencia.js"

// const ocorrencia = await Ocorrencia.create({
//       titulo: 'Roubo',
//       conteudo: 'Assaltante roubou celular',
//       local: point
//   })  
// }
