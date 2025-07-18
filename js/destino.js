document.addEventListener('DOMContentLoaded', () => {
    const destinos = [
        {
            id: 'volcan-santa-ana',
            nombre: 'Volcán de Santa Ana',
            descripcion: 'El Volcán de Santa Ana, también conocido como Ilamatepec, es el volcán más alto de El Salvador. Su cráter alberga una laguna de color verde azulado que lo hace un destino popular para el senderismo y ofrece vistas panorámicas impresionantes.',
            tipo: 'montaña',
            urlImagen: 'https://elsalvador.travel/system/wp-content/uploads/2020/01/Volca%CC%81n-Ilamatepeq-Santa-Ana-20.jpg' 
        },
        {
            id: 'ruta-de-las-flores',
            nombre: 'Ruta de las Flores',
            descripcion: 'Un pintoresco recorrido por varios pueblos coloniales como Juayúa, Apaneca, Ataco y Nahuizalco, famoso por sus festivales gastronómicos, artesanías, cafetales y paisajes florales durante ciertas épocas del año.',
            tipo: 'ciudad',
            urlImagen: 'https://elsalvador.travel/system/wp-content/uploads/2024/10/rutadelasflores.jpg'
        },
        {
            id: 'el-tunco-beach',
            nombre: 'Playa El Tunco',
            descripcion: 'Reconocida como uno de los mejores destinos para surfear en El Salvador, El Tunco es también un lugar vibrante con restaurantes, bares y un ambiente bohemio. Ideal para disfrutar de atardeceres y la vida nocturna.',
            tipo: 'playa',
            urlImagen: 'https://elsalvador.travel/system/wp-content/uploads/2020/01/EL-TUNCO.jpg'
        },
        {
            id: 'lago-ilopango',
            nombre: 'Lago de Ilopango',
            descripcion: 'Un lago de origen volcánico de gran belleza, ideal para la práctica de deportes acuáticos como el kayak, buceo y velerismo. Rodeado de montañas y con varias islas de interés.',
            tipo: 'montaña',
            urlImagen: 'https://elsalvador.travel/system/wp-content/uploads/2021/04/20210130_135810-1.jpg'
        },
        {
            id: 'parque-nacional-el-boqueron',
            nombre: 'Parque Nacional El Boquerón',
            descripcion: 'Ubicado en la cima del Volcán de San Salvador, este parque ofrece senderos que llevan a miradores con vistas espectaculares del cráter, la ciudad de San Salvador y sus alrededores.',
            tipo: 'montaña',
            urlImagen: 'https://elsalvador.travel/system/wp-content/uploads/2024/08/lagocoatepeque-01.jpg'
        },
        {
            id: 'suchitoto',
            nombre: 'Suchitoto',
            descripcion: 'Una joya colonial de El Salvador, conocida por sus calles empedradas, casas antiguas, la iglesia de Santa Lucía y su cercanía al Lago Suchitlán. Un centro cultural y artesanal.',
            tipo: 'ciudad',
            urlImagen: 'https://elsalvador.travel/system/wp-content/uploads/2024/05/suchitoto.jpg'
        }
    ];

    const listaDestinos = document.getElementById('lista-destinos');
    const detalleDestino = document.getElementById('detalle-destino');
    const tituloDetalle = detalleDestino.querySelector('h3');
    const descripcionDetalle = detalleDestino.querySelector('p');
    const botonesFiltro = document.querySelectorAll('.boton-filtro');

    const renderizarDestinos = (destinosFiltrados) => {
        listaDestinos.innerHTML = ''; 
        destinosFiltrados.forEach(destino => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta-destino');
            tarjeta.setAttribute('data-id', destino.id);
            tarjeta.innerHTML = `
                <img src="${destino.urlImagen}" alt="${destino.nombre}">
                <h3>${destino.nombre}</h3>
                <p>${destino.descripcion.substring(0, 100)}...</p> `;
            listaDestinos.appendChild(tarjeta);

            tarjeta.addEventListener('click', () => {
                mostrarDetalleDestino(destino.id);
            });
        });
    };

    const mostrarDetalleDestino = (id) => {
        const destinoSeleccionado = destinos.find(dest => dest.id === id);
        if (destinoSeleccionado) {
            tituloDetalle.textContent = destinoSeleccionado.nombre;
            descripcionDetalle.textContent = destinoSeleccionado.descripcion;
            detalleDestino.style.display = 'block'; 
            detalleDestino.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', (evento) => {
            const tipoFiltro = evento.target.dataset.filtro;

            botonesFiltro.forEach(btn => btn.classList.remove('activo'));
            evento.target.classList.add('activo');

            let filtrados = [];
            if (tipoFiltro === 'todos') {
                filtrados = destinos;
            } else {
                filtrados = destinos.filter(dest => dest.tipo === tipoFiltro);
            }
            renderizarDestinos(filtrados);
            detalleDestino.style.display = 'none'; 
        });
    });

    renderizarDestinos(destinos);
});