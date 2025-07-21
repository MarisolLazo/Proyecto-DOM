// Cargar detalles de la reserva desde localStorage
// la funcion se ejecuta automaticamente cuando la página web termina de cargar (DOMContentLoaded). 
// recuperamos los datos de la reserva guardados previamente en localStorage bajo el nombre ultimaReserva
// procesar y formatear la información
// y finalmente mostrar los detalles completos de la reserva en el elemento HTML con el id detallesReserva.
//  Si no se encuentra ninguna reserva previamente guardada, muestra un mensaje indicando que no existen datos 
// y ofrece un boton para hacer una nueva reserva, pero no se ejecuta sin haber guadado datos

document.addEventListener("DOMContentLoaded", function () {
  const datosReserva = JSON.parse(
    localStorage.getItem("ultimaReserva") || "{}"
  );

  if (Object.keys(datosReserva).length === 0) {
    document.getElementById("detallesReserva").innerHTML = `
            <div class="text-center">
              <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
              <h5>No se encontraron datos de reserva</h5>
              <p class="text-muted">Por favor, realiza una nueva reserva</p>
              <a href="./reservaciones.html" class="btn btn-primary">Hacer Reserva</a>
            </div>
          `;
    return;
  }

  // Generar número de reserva
  // algo que podria usar el back para generar id de reservas con el fin de no repetir
  // generamos el numero
  const numeroReserva = "TR" + Date.now().toString().slice(-6);

  // damos fromarto a los datos de fecha para que el usuario la pueda leer
  const fechaFormateada = new Date(datosReserva.fecha).toLocaleDateString(
    "es-ES",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  document.getElementById("detallesReserva").innerHTML = `
          <div class="row mb-4">
            <div class="col-md-6">
              <h6 class="text-primary">Número de Reserva</h6>
              <p class="fw-bold">${numeroReserva}</p>
            </div>
            <div class="col-md-6">
              <h6 class="text-primary">Fecha de Reserva</h6>
              <p>${new Date().toLocaleDateString("es-ES")}</p>
            </div>
          </div>

          <div class="info-row">
            <div class="row">
              <div class="col-sm-4"><strong><i class="fas fa-user me-2"></i>Nombre:</strong></div>
              <div class="col-sm-8">${datosReserva.nombre}</div>
            </div>
          </div>
          
          <div class="info-row">
            <div class="row">
              <div class="col-sm-4"><strong><i class="fas fa-envelope me-2"></i>Email:</strong></div>
              <div class="col-sm-8">${datosReserva.email}</div>
            </div>
          </div>
          
          <div class="info-row">
            <div class="row">
              <div class="col-sm-4"><strong><i class="fas fa-phone me-2"></i>Teléfono:</strong></div>
              <div class="col-sm-8">${datosReserva.telefono}</div>
            </div>
          </div>
          
          <div class="info-row">
            <div class="row">
              <div class="col-sm-4"><strong><i class="fas fa-calendar me-2"></i>Fecha de Viaje:</strong></div>
              <div class="col-sm-8">${fechaFormateada}</div>
            </div>
          </div>
          
          <div class="info-row">
            <div class="row">
              <div class="col-sm-4"><strong><i class="fas fa-map-marker-alt me-2"></i>Destino:</strong></div>
              <div class="col-sm-8">${datosReserva.destino}</div>
            </div>
          </div>
          
          <div class="info-row">
            <div class="row">
              <div class="col-sm-4"><strong><i class="fas fa-users me-2"></i>Personas:</strong></div>
              <div class="col-sm-8">${datosReserva.personas}</div>
            </div>
          </div>
          
          <div class="info-row">
            <div class="row">
              <div class="col-sm-4"><strong><i class="fas fa-route me-2"></i>Tipo de Tour:</strong></div>
              <div class="col-sm-8">${
                datosReserva.tipoTour.charAt(0).toUpperCase() +
                datosReserva.tipoTour.slice(1)
              }</div>
            </div>
          </div>
          
          ${
            datosReserva.comentarios
              ? `
          <div class="info-row">
            <div class="row">
              <div class="col-sm-4"><strong><i class="fas fa-comment me-2"></i>Comentarios:</strong></div>
              <div class="col-sm-8">${datosReserva.comentarios}</div>
            </div>
          </div>
          `
              : ""
          }
          
          <div class="total-price text-center">
            <h4 class="text-success mb-0">
              <i class="fas fa-dollar-sign me-2"></i>Total: $${
                datosReserva.precioTotal
              } USD
            </h4>
          </div>
        `;
});
