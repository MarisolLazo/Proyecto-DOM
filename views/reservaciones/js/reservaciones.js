// ===== VARIABLES GLOBALES =====
// Contador de reservas realizadas en la sesion actual
// Mientras se mantenga en ala pagina actual
let reservasRealizadas = 0

// Información de cada destino con su nombre completo y precio por persona
/* generamos variables globales que incluyen el precio de cada destino marcado 
el precio en general es por person atal y como se nos anuncia en el apartado de 
datos importantes en el formulario*/
const destinosInfo = {
  "volcan-izalco": { nombre: "Volcán de Izalco", precio: 45 },
  "ruta-flores": { nombre: "Ruta de las Flores", precio: 35 },
  "lago-coatepeque": { nombre: "Lago de Coatepeque", precio: 40 },
  "joya-ceren": { nombre: "Joya de Cerén", precio: 25 },
  "playa-tunco": { nombre: "Playa El Tunco", precio: 30 },
  "suchitoto": { nombre: "Suchitoto", precio: 35 },
  "tazumal": { nombre: "Tazumal", precio: 20 },
  "cerro-verde": { nombre: "Cerro Verde", precio: 50 },
}

// ===== INICIALIZACIÓN =====
// Se ejecuta cuando la página termina de cargar

// deja configurado el formulario, activa la validacion en tiempo real
// habilita la calculadora de precios, actualiza el contador de reservas y anima las tarjetas de contenido.
document.addEventListener("DOMContentLoaded", () => {
  inicializarFormulario()
  configurarValidacionTiempoReal()
  configurarCalculadoraPrecio()
  actualizarContador()

  const cards = document.querySelectorAll(".card")
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("fade-in-up")
    }, index * 200)
  })
})

// ===== CONFIGURACIÓN INICIAL DEL FORMULARIO =====
// Prepara el formulario para que no se puedan seleccionar fechas pasadas 
// y conecta el envio del formulario para procesar la reserva sin recargar la pagina para el contador
function inicializarFormulario() {
  const form = document.getElementById("reservaForm");
  const fechaInput = document.getElementById("fecha");

  // fecha minima (hoy)
  const hoy = new Date().toISOString().split("T")[0];
  fechaInput.min = hoy;

  // procedemos a procesar el forumlario 
  form.addEventListener("submit", (e) => {
    e.preventDefault() 
    procesarReserva()
  });
}

// ===== VALIDACIÓN EN TIEMPO REAL =====
// Configura eventos para validar campos mientras el usuario escribe

//restroalimentacion para el usuario

function configurarValidacionTiempoReal() {
  const campos = ["nombre", "email", "telefono", "fecha", "destino", "personas"]

  campos.forEach((campo) => {
    const elemento = document.getElementById(campo)
    elemento.addEventListener("blur", () => validarCampo(campo)) 
    elemento.addEventListener("input", () => limpiarError(campo))
  });


  document.getElementById("terminos").addEventListener("change", () => {
    validarTerminos()
  })

  const radioButtons = document.querySelectorAll('input[name="tipoTour"]')
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", () => validarTipoTour())
  })
}

// ===== CALCULADORA DE PRECIO =====
// Configura la calculadora automatica  de precios
function configurarCalculadoraPrecio() {

  //  vinculamos  los selectores de destino y número de personas 
  // para actualizar el precio total automaticamente cuando cambian.
  const destinoSelect = document.getElementById("destino")
  const personasSelect = document.getElementById("personas")

  destinoSelect.addEventListener("change", actualizarCalculadoraPrecio)
  personasSelect.addEventListener("change", actualizarCalculadoraPrecio)
}

// Actualiza la calculadora de precio en tiempo real
//  muestra el precio total según el destino y personas seleccionadas
function actualizarCalculadoraPrecio() {
  const destinoSeleccionado = document.getElementById("destino").value
  const personasSeleccionadas = document.getElementById("personas").value
  const calculadora = document.getElementById("calculadoraPrecio")

  if (destinoSeleccionado && personasSeleccionadas) {
    const infoDestino = destinosInfo[destinoSeleccionado]
    const numeroPersonas = personasSeleccionadas === "6" ? 6 : Number.parseInt(personasSeleccionadas)
    const precioTotal = infoDestino.precio * numeroPersonas

    
    document.getElementById("destinoCalculado").textContent = infoDestino.nombre
    document.getElementById("precioPorPersona").textContent = infoDestino.precio
    document.getElementById("numeroPersonas").textContent = personasSeleccionadas
    document.getElementById("precioTotal").textContent = precioTotal

    calculadora.style.display = "block"
  } else {
    calculadora.style.display = "none"
  }
}

// ===== VALIDACIÓN DE CAMPOS =====
// Valida un campo específico y muestra errores si es necesario
/* La siguiente función nos ayudará a validar cada de los input del formulario y nos devolvera una alerta sino cumple con lo que se pide =>Cada uno de los campos serán requisitos para poder enviar el formulario También ajusta clases de bootstrap (`is-valid` / `is-invalid`) para mostrar visualmente si el campo es válido o no.*/


function validarCampo(campo) {
  const elemento = document.getElementById(campo)
  const valor = elemento.value.trim()
  let esValido = true
  let mensaje = ""

  switch (campo) {
    case "nombre":
      if (!valor) {
        esValido = false
        mensaje = "El nombre es obligatorio"
      } else if (valor.length < 2) {
        esValido = false
        mensaje = "El nombre debe tener al menos 2 caracteres"
      } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
        esValido = false
        mensaje = "El nombre solo puede contener letras y espacios"
      }
      break

    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!valor) {
        esValido = false
        mensaje = "El email es obligatorio"
      } else if (!emailRegex.test(valor)) {
        esValido = false
        mensaje = "Ingresa un email válido"
      }
      break

    case "telefono":
      const telefonoRegex = /^[0-9+\-\s()]+$/
      if (!valor) {
        esValido = false
        mensaje = "El teléfono es obligatorio"
      } else if (!telefonoRegex.test(valor) || valor.length < 8) {
        esValido = false
        mensaje = "Ingresa un teléfono válido (mínimo 8 dígitos)"
      }
      break

    case "fecha":
      const fechaSeleccionada = new Date(valor)
      const hoy = new Date()
      hoy.setHours(0, 0, 0, 0)
      if (!valor) {
        esValido = false
        mensaje = "La fecha es obligatoria"
      } else if (fechaSeleccionada < hoy) {
        esValido = false
        mensaje = "La fecha no puede ser anterior a hoy"
      }
      break

    case "destino":
    case "personas":
      if (!valor) {
        esValido = false
        mensaje = "Este campo es obligatorio"
      }
      break
  }

  if (esValido) {
    elemento.classList.remove("is-invalid")
    elemento.classList.add("is-valid")
  } else {
    elemento.classList.remove("is-valid")
    elemento.classList.add("is-invalid")
    const feedbackElement = elemento.nextElementSibling
    if (feedbackElement && feedbackElement.classList.contains("invalid-feedback")) {
      feedbackElement.textContent = mensaje
    }
  }

  return esValido
}

// Validamos que este marcado el check del terminos y condiciones recibe el id del elemento y 
// se devuelve una respuesta en el html 
// en este caso usamos la clase para seleccionar donde queremos el mensaje (".invalid-feedback")
function validarTerminos() {
  const terminos = document.getElementById("terminos")
  const feedbackElement = terminos.parentElement.querySelector(".invalid-feedback")

  if (!terminos.checked) {
    terminos.classList.add("is-invalid")
    if (feedbackElement) {
      feedbackElement.textContent = "Debes aceptar los términos y condiciones"
    }
    return false
  } else {
    terminos.classList.remove("is-invalid")
    return true
  }
}

// Valida que se haya seleccionado un tipo de tour
function validarTipoTour() {
  const radioButtons = document.querySelectorAll('input[name="tipoTour"]')
  const tipoTourSeleccionado = document.querySelector('input[name="tipoTour"]:checked')

  if (!tipoTourSeleccionado) {
    radioButtons.forEach((radio) => {
      radio.classList.add("is-invalid")
    })
    return false
  } else {
    radioButtons.forEach((radio) => {
      radio.classList.remove("is-invalid")
    })
    return true
  }
}

// Limpia los errores visuales de un campo
// los erros no se quitaran a menos que se limpie el div que los contiene
function limpiarError(campo) {
  const elemento = document.getElementById(campo)
  elemento.classList.remove("is-invalid")
}

// Valida todo el formulario antes de enviarlo
// todos los campos requeridos, terminos y tipo de tour
// devuelve si el formulario esta completamente valido
function validarFormularioCompleto() {
  const campos = ["nombre", "email", "telefono", "fecha", "destino", "personas"]
  let formularioValido = true

  // Validar todos los campos
  campos.forEach((campo) => {
    if (!validarCampo(campo)) {
      formularioValido = false
    }
  })

  // Validar términos y tipo de tour
  if (!validarTerminos()) {
    formularioValido = false
  }

  if (!validarTipoTour()) {
    formularioValido = false
  }

  return formularioValido
}

// ===== PROCESAMIENTO DE RESERVA =====
// Procesa la reserva cuando se envía el formulario
function procesarReserva() {
  limpiarAlertas()

  // Validar formulario completo
  if (!validarFormularioCompleto()) {
    mostrarAlerta("Por favor, corrige los errores en el formulario", "danger")
    return
  }

  const datosReserva = recopilarDatosFormulario()

  localStorage.setItem("ultimaReserva", JSON.stringify(datosReserva))

  reservasRealizadas++
  actualizarContador()
  mostrarAlerta("¡Reserva realizada exitosamente! Redirigiendo a confirmación...", "success")

  // Abrir la página de confirmación en una nueva ventana después de 1 segundo o el ti
  setTimeout(() => {
    window.open("./confirmacion-reservas.html", "_blank")
  }, 1000)
  limpiarFormulario();// ademas limpiamos el formulario antes de salir
}


function recopilarDatosFormulario() {
  const tipoTourSeleccionado = document.querySelector('input[name="tipoTour"]:checked')
  const destinoSeleccionado = document.getElementById("destino").value
  const personas = document.getElementById("personas").value

  // Calcular precio total
  const precioBase = destinosInfo[destinoSeleccionado]?.precio || 30
  const numeroPersonas = personas === "6" ? 6 : Number.parseInt(personas)
  const precioTotal = precioBase * numeroPersonas

  return {
    nombre: document.getElementById("nombre").value,
    email: document.getElementById("email").value,
    telefono: document.getElementById("telefono").value,
    fecha: document.getElementById("fecha").value,
    destino: destinosInfo[destinoSeleccionado]?.nombre || destinoSeleccionado,
    personas: personas,
    tipoTour: tipoTourSeleccionado?.value || "",
    comentarios: document.getElementById("comentarios").value,
    precioTotal: precioTotal,
  }
}

// ===== FUNCIONES DE INTERFAZ =====
// Actualiza el contador de reservas en la interfaz para mostrar el numero de reservas de hoy
function actualizarContador() {
  const contador = document.getElementById("reservasCounter")
  contador.textContent = reservasRealizadas
  contador.classList.add("pulse")
  setTimeout(() => {
    contador.classList.remove("pulse")
  }, 2000)
}

// Muestra una alerta en la parte superior de la pagina
function mostrarAlerta(mensaje, tipo) {
  const alertContainer = document.getElementById("alertContainer")
  const alertHTML = `
    <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
      <i class="fas fa-${tipo === "success" ? "check-circle" : "exclamation-triangle"}"></i>
      ${mensaje}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `
  alertContainer.innerHTML = alertHTML

  // Auto-cerrar después de 5 segundos, no es necesario, pero ayuda a saber que se esta haciendo
  setTimeout(() => {
    const alert = alertContainer.querySelector(".alert")
    if (alert) {
      alert.classList.remove("show")
      setTimeout(() => {
        alert.remove()
      }, 150)
    }
  }, 5000)
}

// Limpia todas las alertas de la página
function limpiarAlertas() {
  const alertContainer = document.getElementById("alertContainer")
  alertContainer.innerHTML = ""
}

// Limpiar completamente el formulario
function limpiarFormulario() {
  const form = document.getElementById("reservaForm")
  form.reset()

  // Limpiamps las clases de los div
  const elementos = form.querySelectorAll(".form-control, .form-select, .form-check-input")
  elementos.forEach((elemento) => {
    elemento.classList.remove("is-valid", "is-invalid")
  })

// ademas es necesario ocultar la calculadora
  document.getElementById("calculadoraPrecio").style.display = "none"
}
