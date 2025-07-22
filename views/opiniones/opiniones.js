// Clase para manejar las opiniones
class GestorOpiniones {
    constructor() {
        this.comentarios = [];
        this.filtroActual = 'todos';
        this.claveStorage = 'comentarios-turismo-salvador';
        this.init();
    }

    init() {
        this.elementos = {
            nombreUsuario: document.getElementById('nombre-usuario'),
            calificacion: document.getElementById('calificacion'),
            textoComentario: document.getElementById('texto-comentario'),
            btnPublicar: document.getElementById('btn-publicar'),
            listaComentarios: document.getElementById('lista-comentarios'),
            totalComentarios: document.getElementById('total-comentarios'),
            sinComentarios: document.getElementById('sin-comentarios'),
            contador: document.getElementById('contador'),
            estrellaPromedio: document.getElementById('estrellas-promedio'),
            numeroPromedio: document.getElementById('numero-promedio'),
            filtros: document.querySelectorAll('.filtro-btn')
        };

        // Cargar datos guardados
        this.cargarDatos();
        this.configurarEventos();
        this.actualizarContador();
        this.renderizarComentarios();
        this.actualizarEstadisticas();
    }

    configurarEventos() {
        // Evento para publicar comentario
        this.elementos.btnPublicar.addEventListener('click', () => {
            this.publicarComentario();
        });

        // Evento para contar caracteres
        this.elementos.textoComentario.addEventListener('input', () => {
            this.actualizarContador();
        });

        // Eventos para filtros
        this.elementos.filtros.forEach(filtro => {
            filtro.addEventListener('click', (e) => {
                this.cambiarFiltro(e.target.dataset.filtro);
            });
        });

        // Permitir envío con Enter (Ctrl + Enter)
        this.elementos.textoComentario.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.publicarComentario();
            }
        });
    }

    publicarComentario() {
        const nombre = this.elementos.nombreUsuario.value.trim();
        const calificacion = this.elementos.calificacion.value;
        const texto = this.elementos.textoComentario.value.trim();

        // Validaciones
        if (!nombre) {
            this.mostrarError('Por favor, ingresa tu nombre');
            this.elementos.nombreUsuario.focus();
            return;
        }

        if (!calificacion) {
            this.mostrarError('Por favor, selecciona una calificación');
            this.elementos.calificacion.focus();
            return;
        }

        if (!texto) {
            this.mostrarError('Por favor, escribe tu comentario');
            this.elementos.textoComentario.focus();
            return;
        }

        if (texto.length < 10) {
            this.mostrarError('El comentario debe tener al menos 10 caracteres');
            this.elementos.textoComentario.focus();
            return;
        }

        // Crear nuevo comentario
        const nuevoComentario = {
            id: Date.now(),
            nombre: nombre,
            calificacion: parseInt(calificacion),
            texto: texto,
            fecha: new Date()
        };

        // Agregar comentario al array
        this.comentarios.unshift(nuevoComentario);

        // Guardar en localStorage
        this.guardarDatos();

        // Limpiar formulario
        this.limpiarFormulario();

        // Actualizar interfaz
        this.renderizarComentarios();
        this.actualizarEstadisticas();

        // Mostrar mensaje de éxito
        this.mostrarExito('¡Comentario publicado exitosamente!');

        // Scroll suave al comentario recién agregado
        setTimeout(() => {
            const primerComentario = document.querySelector('.comentario');
            if (primerComentario) {
                primerComentario.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }, 100);
    }

    eliminarComentario(id) {
        // Confirmar eliminación
        if (confirm('¿Estás seguro de que deseas eliminar este comentario?')) {
            // Encontrar y eliminar el comentario
            const indice = this.comentarios.findIndex(comentario => comentario.id === id);

            if (indice !== -1) {
                this.comentarios.splice(indice, 1);

                // Guardar cambios en localStorage
                this.guardarDatos();

                this.renderizarComentarios();
                this.actualizarEstadisticas();
                this.mostrarExito('Comentario eliminado correctamente');
            }
        }
    }

    cambiarFiltro(filtro) {
        this.filtroActual = filtro;

        // Actualizar botones de filtro
        this.elementos.filtros.forEach(btn => {
            btn.classList.remove('activo');
        });

        document.querySelector(`[data-filtro="${filtro}"]`).classList.add('activo');

        // Renderizar comentarios filtrados
        this.renderizarComentarios();
    }

    obtenerComentariosFiltrados() {
        if (this.filtroActual === 'todos') {
            return this.comentarios;
        }

        return this.comentarios.filter(comentario =>
            comentario.calificacion === parseInt(this.filtroActual)
        );
    }

    renderizarComentarios() {
        const comentariosFiltrados = this.obtenerComentariosFiltrados();

        // Mostrar u ocultar mensaje de sin comentarios
        if (comentariosFiltrados.length === 0) {
            this.elementos.listaComentarios.innerHTML = '';
            this.elementos.sinComentarios.style.display = 'block';
            return;
        }

        this.elementos.sinComentarios.style.display = 'none';

        // Generar HTML de comentarios
        this.elementos.listaComentarios.innerHTML = comentariosFiltrados
            .map(comentario => this.generarHTMLComentario(comentario))
            .join('');

        // Configurar eventos de eliminación
        this.configurarEventosEliminacion();
    }

    generarHTMLComentario(comentario) {
        const estrellas = '⭐'.repeat(comentario.calificacion);
        const fecha = this.formatearFecha(comentario.fecha);

        return `
            <div class="comentario" data-id="${comentario.id}">
                <div class="comentario-header">
                    <div class="info-usuario">
                        <span class="nombre-usuario">${this.escaparHTML(comentario.nombre)}</span>
                        <span class="calificacion-comentario">${estrellas}</span>
                        <span class="fecha-comentario">${fecha}</span>
                    </div>
                    <button class="btn-eliminar" data-id="${comentario.id}">
                        <span>🗑️</span>
                        Eliminar
                    </button>
                </div>
                <div class="comentario-texto">${this.escaparHTML(comentario.texto)}</div>
            </div>
        `;
    }

    configurarEventosEliminacion() {
        const botonesEliminar = document.querySelectorAll('.btn-eliminar');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                this.eliminarComentario(id);
            });
        });
    }

    actualizarContador() {
        const longitud = this.elementos.textoComentario.value.length;
        const maxLongitud = 500;

        this.elementos.contador.textContent = `${longitud}/${maxLongitud} caracteres`;

        // Cambiar color según proximidad al límite
        if (longitud > maxLongitud * 0.9) {
            this.elementos.contador.style.color = '#dc3545';
        } else if (longitud > maxLongitud * 0.7) {
            this.elementos.contador.style.color = '#ffc107';
        } else {
            this.elementos.contador.style.color = '#0077b6';
        }
    }

    actualizarEstadisticas() {
        const total = this.comentarios.length;
        this.elementos.totalComentarios.textContent = total;

        if (total > 0) {
            const promedioCalificacion = this.comentarios.reduce((suma, comentario) =>
                suma + comentario.calificacion, 0) / total;

            const estrellaPromedio = Math.round(promedioCalificacion);
            this.elementos.estrellaPromedio.textContent = '⭐'.repeat(estrellaPromedio);
            this.elementos.numeroPromedio.textContent = promedioCalificacion.toFixed(1);
        } else {
            this.elementos.estrellaPromedio.textContent = '⭐⭐⭐⭐⭐';
            this.elementos.numeroPromedio.textContent = '0.0';
        }
    }

    limpiarFormulario() {
        this.elementos.nombreUsuario.value = '';
        this.elementos.calificacion.value = '';
        this.elementos.textoComentario.value = '';
        this.actualizarContador();
    }

    formatearFecha(fecha) {
        const opciones = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };

        return fecha.toLocaleDateString('es-ES', opciones);
    }

    escaparHTML(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }

    mostrarError(mensaje) {
        this.mostrarNotificacion(mensaje, 'error');
    }

    mostrarExito(mensaje) {
        this.mostrarNotificacion(mensaje, 'exito');
    }

    mostrarNotificacion(mensaje, tipo) {
        // Crear elemento de notificación
        const notificacion = document.createElement('div');
        notificacion.className = `notificacion ${tipo}`;
        notificacion.textContent = mensaje;

        // Estilos para la notificación
        Object.assign(notificacion.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 25px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            fontSize: '14px',
            zIndex: '1000',
            maxWidth: '300px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: tipo === 'error' ? '#dc3545' : '#28a745'
        });

        document.body.appendChild(notificacion);

        // Animar entrada
        setTimeout(() => {
            notificacion.style.transform = 'translateX(0)';
        }, 100);

        // Remover después de 3 segundos
        setTimeout(() => {
            notificacion.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notificacion);
            }, 300);
        }, 3000);
    }

    // MÉTODOS PARA PERSISTENCIA DE DATOS
    guardarDatos() {
        try {
            // Convertir fechas a strings para poder guardarlas
            const comentariosParaGuardar = this.comentarios.map(comentario => ({
                ...comentario,
                fecha: comentario.fecha.toISOString()
            }));

            localStorage.setItem(this.claveStorage, JSON.stringify(comentariosParaGuardar));
        } catch (error) {
            console.error('Error al guardar datos:', error);
            this.mostrarError('Error al guardar el comentario');
        }
    }

    cargarDatos() {
        try {
            const datosGuardados = localStorage.getItem(this.claveStorage);

            if (datosGuardados) {
                const comentariosCargados = JSON.parse(datosGuardados);

                // Convertir strings de fecha de vuelta a objetos Date
                this.comentarios = comentariosCargados.map(comentario => ({
                    ...comentario,
                    fecha: new Date(comentario.fecha)
                }));
            } else {
                // Si no hay datos guardados, cargar comentarios de ejemplo
                this.cargarComentariosEjemplo();
            }
        } catch (error) {
            console.error('Error al cargar datos:', error);
            this.comentarios = [];
            this.cargarComentariosEjemplo();
        }
    }

    cargarComentariosEjemplo() {
        // Solo cargar comentarios de ejemplo si no hay datos guardados
        const comentariosEjemplo = [
            {
                id: Date.now() - 1000,
                nombre: "María González",
                calificacion: 5,
                texto: "¡Increíble experiencia visitando El Salvador! Los paisajes son hermosos y la gente muy amable. Recomiendo especialmente las playas de La Libertad.",
                fecha: new Date(Date.now() - 86400000) // Hace 1 día
            },
            {
                id: Date.now() - 2000,
                nombre: "Carlos Ramírez",
                calificacion: 4,
                texto: "Muy buen destino turístico. La comida tradicional es deliciosa y hay muchos lugares históricos por visitar. Solo mejoraría la señalización en algunos sitios.",
                fecha: new Date(Date.now() - 172800000) // Hace 2 días
            },
            {
                id: Date.now() - 3000,
                nombre: "Ana Martínez",
                calificacion: 5,
                texto: "El volcán de Santa Ana fue una experiencia única. Las vistas desde la cima son espectaculares. ¡Definitivamente regresaré!",
                fecha: new Date(Date.now() - 259200000) // Hace 3 días
            }
        ];

        this.comentarios = comentariosEjemplo;
        this.guardarDatos(); // Guardar los comentarios de ejemplo
    }

    // Método para limpiar todos los datos (útil para desarrollo/testing)
    limpiarTodosLosDatos() {
        if (confirm('¿Estás seguro de que quieres eliminar TODOS los comentarios? Esta acción no se puede deshacer.')) {
            localStorage.removeItem(this.claveStorage);
            this.comentarios = [];
            this.renderizarComentarios();
            this.actualizarEstadisticas();
            this.mostrarExito('Todos los comentarios han sido eliminados');
        }
    }

    // Método para exportar datos (útil para respaldos)
    exportarDatos() {
        const datos = {
            fecha_exportacion: new Date().toISOString(),
            total_comentarios: this.comentarios.length,
            comentarios: this.comentarios
        };

        const dataStr = JSON.stringify(datos, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});

        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `comentarios_turismo_salvador_${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        this.mostrarExito('Datos exportados correctamente');
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Crear instancia global del gestor para poder acceder desde la consola
    window.gestorOpiniones = new GestorOpiniones();
});

// Función global para limpiar datos (solo para desarrollo/administración)
function limpiarDatos() {
    if (window.gestorOpiniones) {
        window.gestorOpiniones.limpiarTodosLosDatos();
    }
}

// Función global para exportar datos
function exportarDatos() {
    if (window.gestorOpiniones) {
        window.gestorOpiniones.exportarDatos();
    }
}