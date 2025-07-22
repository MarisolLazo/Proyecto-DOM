// ======== SELECCIÓN DE ELEMENTOS DEL DOM ========
const elementoDOM = document.getElementById('textoSaludo');
const contenidoDOM = document.querySelector('#contenido');
const btnApretable = document.querySelector('#botonMagico');
const btnBuscar = document.getElementById('btnBuscarDestino');
const inputBuscar = document.getElementById('inputDestino');
const carrusel = document.querySelector('.carrusel');
const destacados = document.querySelector('.lugares-destacados');
const listaDestacados = document.getElementById('listaDestacados');
const imagenCarrusel = document.getElementById('imagenCarrusel');

// ======== MODAL: SELECCIÓN DE ELEMENTOS DEL MODAL ========
const modal = document.getElementById('modalDestino');
const modalContenido = document.getElementById('infoDestinoModal');
const cerrarModal = document.getElementById('cerrarModal');

// ======== OBJETO CON INFORMACIÓN DE LOS DESTINOS ========
const destinosInfo = {
  "Suchitoto": {
    descripcion: "Un hermoso pueblo colonial lleno de historia y cultura.",
    direccion: "Suchitoto, Cuscatlán, El Salvador",
    imagen: "./assets/img/suchitoto.jpeg"
  },
  "Playa El Tunco": {
    descripcion: "Destino favorito de surfistas y turistas por su belleza y vida nocturna.",
    direccion: "La Libertad, El Salvador",
    imagen: "./assets/img/el tunco.jpg"
  },
  "Volcán de Izalco": {
    descripcion: "Uno de los volcanes más icónicos de El Salvador.",
    direccion: "Parque Nacional Cerro Verde, Sonsonate El Salvador",
    imagen: "./assets/img/volcan de izalco.jpeg"
  },
  "Lago de Coatepeque": {
    descripcion: "Un lago de origen volcánico famoso por sus aguas cristalinas y vistas panorámicas.",
    direccion: "Lago de Coatepeque, Santa Ana, El Salvador",
    imagen: "./assets/img/lago de coatepeque.jpeg"
  },
  "Las pilas": {
    descripcion: "Un paraje natural con pozas de agua cristalina rodeadas de vegetación.",
    direccion: "Las Pilas, Arambala, Morazán, El Salvador",
    imagen: "./assets/img/las pilas arambala.jpeg"
  }
};

// ======== EXTRAEMOS LOS NOMBRES DE LOS DESTINOS EN UN ARRAY ========
const nombresDestinos = Object.keys(destinosInfo);

// ======== MOSTRAR MENSAJE INICIAL ========
contenidoDOM.innerHTML = "<h3>Descubre la magia de nuestro país 🇸🇻</h3>";

// ======== AL HACER CLIC EN "Haz clic aquí" (Botón Principal) ========
btnApretable.addEventListener('click', () => {
  let nombre = prompt("¿Cómo te llamas?");
  if (!nombre) return;

  console.log(`🟢 El usuario se llama: ${nombre}`); // Esta línea muestra el nombre en consola

  // Remover fondo inicial
     document.body.classList.remove('fondo-inicial');

  // Cambiar saludo
  elementoDOM.style.color = "darkgreen";
  elementoDOM.innerText = `Hola ${nombre}, prepárate para conocer destinos increíbles.`;
  btnApretable.style.display = "none";

  // Mostrar buscador, carrusel y destacados
  document.querySelector('.buscador-destino').style.display = 'flex';
  carrusel.style.display = "block";
  destacados.style.display = "block";

  // Mostrar tres destinos destacados
  listaDestacados.innerHTML = "";
  let contador = 0;
  for (let i = 0; i < nombresDestinos.length && contador < 3; i++) {
    if (i % 2 === 0) {
      const li = document.createElement("li");
      li.textContent = nombresDestinos[i];
      listaDestacados.appendChild(li);
      contador++;
    }
  }

  // Iniciar carrusel automático
  iniciarCarrusel();
});



// ======== FUNCIONALIDAD DEL CARRUSEL DE IMÁGENES ========
const imagenes = nombresDestinos.map(destino => destinosInfo[destino].imagen);
let indice = 0;

function iniciarCarrusel() {
  setInterval(() => {
    indice = (indice + 1) % imagenes.length;
    imagenCarrusel.src = imagenes[indice];
    imagenCarrusel.alt = nombresDestinos[indice];
  }, 3000);
}

// ======== AL HACER CLIC EN UNA IMAGEN DEL CARRUSEL SE MUESTRA EL MODAL ========
imagenCarrusel.addEventListener('click', () => {
  const destino = nombresDestinos[indice];
  const info = destinosInfo[destino];
  mostrarInfoDestino(destino, info);
});

// ======== BOTÓN DE BÚSQUEDA DE DESTINO MANUAL ========
btnBuscar.addEventListener('click', () => {
  const buscar = inputBuscar.value.trim();
  if (!buscar) return alert("Por favor escribe un destino.");

  const destino = nombresDestinos.find(d => d.toLowerCase() === buscar.toLowerCase());
  if (!destino) return alert("Destino no encontrado en destacados.");

  mostrarInfoDestino(destino, destinosInfo[destino]);
});


// ======== FUNCIÓN PARA MOSTRAR INFORMACIÓN EN EL MODAL ========
function mostrarInfoDestino(nombre, info) {
  console.log(`Mostrando información de ${nombre}`);
  modalContenido.innerHTML = `
    <h3>${nombre}</h3>
    <p><strong>Descripción:</strong> ${info.descripcion}</p>
    <p><strong>Dirección:</strong> ${info.direccion}</p>
    <img src="${info.imagen}" alt="${nombre}" style="max-width:100%; margin-top:10px; border-radius:8px;">
  `;
  modal.style.display = 'block';

  // Limpiar campo de búsqueda después de mostrar
  inputBuscar.value = '';
}
// ======== BOTÓN PARA CERRAR EL MODAL ========
cerrarModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// ======== CERRAR MODAL AL PRESIONAR FUERA DE SU CONTENIDO ========
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
