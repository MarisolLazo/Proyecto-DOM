document.addEventListener('DOMContentLoaded', () => {
    const destinos = [
    {
        id: 'volcan-santa-ana',
        nombre: 'Volcán de Santa Ana',
        descripcion: 'El Volcán de Santa Ana, también conocido como Ilamatepec, es el volcán más alto de El Salvador en el cráter alberga una laguna de color verde azulado que lo hace un destino popular para el senderismo y ofrece vistas panorámicas impresionantes.',
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
        descripcion: 'Reconocida como uno de los mejores destinos para surfear en El Salvador es también un lugar vibrante con restaurantes, bares y un ambiente bohemio es ideal para disfrutar de atardeceres y la vida nocturna.',
        tipo: 'playa',
        urlImagen: 'https://elsalvador.travel/system/wp-content/uploads/2020/01/EL-TUNCO.jpg'
    },
    {
        id: 'lago-ilopango',
        nombre: 'Lago de Ilopango',
        descripcion: 'Un lago de origen volcánico de gran belleza, ideal para la práctica de deportes acuáticos como el kayak, buceo y velerismo esta rodeado de montañas y con varias islas.',
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
        descripcion: 'Una joya colonial de El Salvador, conocida por sus calles empedradas, casas antiguas, la iglesia de Santa Lucía y su cercanía al Lago Suchitlán todo un centro cultural y artesanal.',
        tipo: 'ciudad',
        urlImagen: 'https://elsalvador.travel/system/wp-content/uploads/2024/05/suchitoto.jpg'
    },
    {
        id: 'el-sunzal-beach',
        nombre: 'Playa El Sunzal',
        descripcion: 'Cerca de El Tunco, El Sunzal es otra playa de clase mundial para el surf, con olas largas y consistentes que atraen tanto a principiantes como a surfistas experimentados igualmente es ideal para relajarse y disfrutar del ambiente costero.',
        tipo: 'playa',
        urlImagen: 'https://turismo.sv/wp-content/uploads/2019/06/el-sunzal-6.jpg'
    },
    {
        id: 'el-zonte-beach',
        nombre: 'Playa El Zonte',
        descripcion: 'Conocida por su ambiente relajado y su creciente popularidad entre surfistas y viajeros, El Zonte ofrece hermosas playas de arena negra, formaciones rocosas y pozas naturales. Es un lugar tranquilo para desconectar.',
        tipo: 'playa',
        urlImagen: 'https://i.pinimg.com/1200x/6b/65/b6/6b65b6d8863a70a1a635d1a49b32d860.jpg'
    },
    {
        id: 'playa-las-flores',
        nombre: 'Playa Las Flores',
        descripcion: 'Ubicada en la zona oriental del país, Las Flores es famosa por sus olas perfectas para el surf y su impresionante paisaje con acantilados esto lo convierte en un destino más remoto que ofrece una experiencia de playa más tranquila y natural.',
        tipo: 'playa',
        urlImagen: 'https://elsalvador.travel/system/wp-content/uploads/2020/09/Playa-Las-Flores-2-scaled.jpg'
    },
    {
        id: 'playa-el-cuco',
        nombre: 'Playa El Cuco',
        descripcion: 'Una de las playas más populares en la zona oriental de El Salvador, ideal para familias. Sus aguas son más tranquilas y la playa es extensa, perfecta para nadar, tomar el sol y disfrutar de mariscos frescos en sus restaurantes.',
        tipo: 'playa',
        urlImagen: 'https://elsalvadorinfo.net/wp-content/uploads/2025/04/El-Cuco-Beach-El-Salvador.jpg'
    },
    {
        id: 'playa-los-cobanos',
        nombre: 'Playa Los Cóbanos',
        descripcion: 'A diferencia de muchas playas salvadoreñas, Los Cóbanos se caracteriza por sus arrecifes de coral, lo que la convierte en un excelente lugar para snorkel y buceo estas aguas son más calmadas y cristalinas, perfectas para explorar la vida marina.',
        tipo: 'playa',
        urlImagen: 'https://elsalvadorviajar.com/wp-content/uploads/2021/10/PLAYA-LOS-COBANOS-Playas-de-El-Salvador.jpg'
    },
    {
        id: 'cerro-el-pital',
        nombre: 'Cerro El Pital',
        descripcion: 'El punto más alto de El Salvador, ubicado en la frontera con Honduras. Ofrece un clima fresco, ideal para el senderismo y el ecoturismo, con bosques de pinos y cipreses convirtiendolo en un lugar perfecto para acampar y disfrutar de la naturaleza.',
        tipo: 'montaña',
        urlImagen: 'https://elsalvador.travel/system/wp-content/uploads/2022/12/DestinationPital.jpg'
    },
    {
        id: 'parque-nacional-montecristo',
        nombre: 'Parque Nacional Montecristo',
        descripcion: 'Parte de la Reserva de la Biósfera Trifinio, este parque es un bosque nebuloso que alberga una gran diversidad de flora y fauna, incluyendo orquídeas y monos araña es un lugar perfecto para el senderismo y la observación de aves.',
        tipo: 'montaña',
        urlImagen: 'https://elsalvador.travel/system/wp-content/uploads/2021/04/Montecristo-16-07-2021.jpg'
    },
    {
        id: 'volcan-de-izalco',
        nombre: 'Volcán de Izalco',
        descripcion: 'Conocido como "El Faro del Pacífico" debido a sus constantes erupciones en el pasado, este volcán ofrece una impresionante vista desde el Parque Nacional Cerro Verde sin duda es un desafío para los excursionistas que buscan una aventura.',
        tipo: 'montaña',
        urlImagen: 'https://elsalvador.travel/system/wp-content/uploads/2020/01/Page12-R1-E008_007-scaled.jpg'
    },
    {
        id: 'santa-ana-ciudad',
        nombre: 'Santa Ana',
        descripcion: 'La segunda ciudad más grande de El Salvador, conocida por su impresionante Catedral de Santa Ana de estilo neogótico y su vibrante centro histórico nos ofrece una rica mezcla de arquitectura colonial y vida urbana.',
        tipo: 'ciudad',
        urlImagen: 'https://elsalvador.travel/system/wp-content/uploads/2023/07/CatedralSantaAna01.jpg'
    },
    {
        id: 'apaneca',
        nombre: 'Apaneca',
        descripcion: 'Parte de la Ruta de las Flores, Apaneca es un encantador pueblo cafetalero con un clima fresco y hermosos paisajes es muy conocido por sus actividades de aventura como el laberinto y el canopy, así como por sus fincas de café.',
        tipo: 'ciudad',
        urlImagen: 'https://www.laprensagrafica.com/__export/1618716561649/sites/prensagrafica/img/2021/04/17/20210417_084419548_fdpt15042021mrturapa12.jpg_554688467.jpg'
    },
    {
        id: 'juayua',
        nombre: 'Juayúa',
        descripcion: 'Otro pintoresco pueblo en la Ruta de las Flores, famoso por su festival gastronómico de fin de semana, donde se pueden degustar una gran variedad de platillos locales el cuenta con la Iglesia del Cristo Negro.',
        tipo: 'ciudad',
        urlImagen: 'https://st3.depositphotos.com/1023345/18205/i/450/depositphotos_182059696-stock-photo-seven-waterfalls-juayua-sonsonate-salvador.jpg'
    }
];

    const listaDestinos = document.getElementById('lista-destinos');
    const detalleDestino = document.getElementById('detalle-destino');
    const tituloDetalle = detalleDestino.querySelector('h3');
    const descripcionDetalle = detalleDestino.querySelector('p');
    const botonesFiltro = document.querySelectorAll('.boton-filtro');

    const mostrarDestinos = (destinosFiltrados) => {
        listaDestinos.innerHTML = ''; 
        destinosFiltrados.forEach(destino => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta-destino');
            tarjeta.setAttribute('data-id', destino.id);
            tarjeta.innerHTML = `
                <img src="${destino.urlImagen}" alt="${destino.nombre}">
                <h3>${destino.nombre}</h3>
                <p>${destino.descripcion.substring(0, 100)}</p> `;
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
            mostrarDestinos(filtrados);
            detalleDestino.style.display = 'none'; 
        });
    });

    mostrarDestinos(destinos);
});