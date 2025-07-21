
//se agreggo a una constante cada elemento del DOM que se va a utilizar
const elemtPupusas = document.getElementById("expPupusas");
const elemtYuca = document.getElementById("expYuca");
const elemtTamales = document.getElementById("expTamales");
const elemtSopa = document.getElementById("expSopa");
const elemtAtol = document.getElementById("expAtol");
const elemtRiguas = document.getElementById("expRiguas");

//se agregan las constantes de los "a" de la lsita que cambiara la imagen
const linkDanza = document.getElementById("danza");
const linkMusica = document.getElementById("musica");
const linkArtesanias = document.getElementById("artesanias");
const linkFestividades = document.getElementById("Festividades");
const linkLeyendas = document.getElementById("leyendas");
const imagenCambiable = document.getElementById("imagenCambiable");
const textoImagen = document.getElementById("txtImagen");

//se agregan las constantes de los elementos que se van a utilizar para el colapse
const elementColapse = document.getElementById("collapseExample");
const elementColapse2 = document.getElementById("collapseExample2");

//se agregan las constantes de los elementos que se van a utilizar para el texto del colapse
const txtColapsed = document.getElementById("txtColapsed");
const txtColapsed2 = document.getElementById("txtColapsed2");

const btns = document.querySelectorAll(".list-group-item");

//se agregan los eventos a cada elemento del DOM para cambiaar el texto del colapse y la clase del colapse
//cada evento cambia el texto y la clase del colapse para que se muestre el texto correspondiente al elemento seleccionado
elemtPupusas.addEventListener('click', () => {
    elementColapse.className = "col-4 offset";
    txtColapsed.innerHTML = "Las pupusas son un plato tradicional de El Salvador, hechas de masa de maíz rellena con diversos ingredientes como frijoles, queso o chicharrón.";
});

elemtYuca.addEventListener('click', () => {
    elementColapse.className = "col-4 offset-4";
    txtColapsed.innerHTML = "La yuca es un tubérculo muy consumido en El Salvador, a menudo se sirve hervida o frita y se acompaña con salsa, chicharrón y encurtido.";
});

elemtTamales.addEventListener('click', () => {
    elementColapse.className = "col-4 offset-8";
    txtColapsed.innerHTML = "Los tamales de elote son un platillo típico salvadoreño, elaborados con maíz tierno y a menudo se sirven con crema y queso.";
});

elemtSopa.addEventListener('click', () => {
    elementColapse2.className = "col-4 offset";
    txtColapsed2.innerHTML = "La sopa de patas es un plato tradicional salvadoreño, hecho a base de patas de res, verduras y especias.";
});

elemtAtol.addEventListener('click', () => {
    elementColapse2.className = "col-4 offset-4";
    txtColapsed2.innerHTML = "El atol de elote es una bebida caliente y espesa hecha a base de maíz tierno, ideal para acompañar las comidas.";
});

elemtRiguas.addEventListener('click', () => {
    elementColapse2.className = "col-4 offset-8";
    txtColapsed2.innerHTML = "Las riguas son un platillo típico de El Salvador, hechas con masa de maíz y queso, a menudo se sirven con crema y curtido.";
});

//se agregan los eventos a cada elemento del DOM para cambiar la imagen, el texto de la imagen y tambien por cada elemento 
//con la clase "active" se le quita la clase y se le agrega al elemento seleccionado
linkDanza.addEventListener('click', () => {
    btns.forEach(el => {
        el.classList.remove("active");
    });

    linkDanza.classList.add("active");
 
    imagenCambiable.src = "./assets/Danza.png";
    textoImagen.innerHTML = "La danza es una parte integral de la cultura salvadoreña, con expresiones que van desde las danzas tradicionales indígenas hasta las influencias africanas y españolas. Las danzas folclóricas, como la danza de los indios, son populares en festividades y celebraciones.";
});

linkMusica.addEventListener('click', () => {
    btns.forEach(el => {
        el.classList.remove("active");
    });

    linkMusica.classList.add("active");

    imagenCambiable.src = "./assets/torito.png";
    textoImagen.innerHTML = "La música folclórica, como la cumbia y la marimba, es parte fundamental de la cultura salvadoreña, con bailes como el 'Torito Pinto' y 'La Culebra' que se presentan en festividades.";
});

linkArtesanias.addEventListener('click', () => {
    btns.forEach(el => {
        el.classList.remove("active");
    });

    linkArtesanias.classList.add("active");

    imagenCambiable.src = "./assets/artesanias.png";
    textoImagen.innerHTML = "Las artesanías salvadoreñas incluyen textiles, cerámicas y tallas de madera, reflejando la rica herencia cultural del país. Lugares como Nahuizalco, La Palma e Ilobasco son famosos por sus artesanías, incluyendo cerámica, barro cocido, jarcia, cestería y juguetes.";
});

linkFestividades.addEventListener('click', () => {
    btns.forEach(el => {
        el.classList.remove("active");
    });

    linkFestividades.classList.add("active");

    imagenCambiable.src = "./assets/festividades.png";
    textoImagen.innerHTML = "Las festividades más importantes de El Salvador incluyen la Semana Santa, las Fiestas Agostinas (fiestas patronales de San Salvador), y las Fiestas Julias (fiestas patronales de Santa Ana). Además, se celebran el Día de la Independencia, el Día de los Difuntos, y las fiestas de Navidad y Año Nuevo. Estas festividades son momentos de gran alegría y celebración, donde la música, la danza y la gastronomía juegan un papel central. Las fiestas patronales, como las de San Salvador, son eventos importantes que celebran la identidad cultural del país.";
});

linkLeyendas.addEventListener('click', () => {
    btns.forEach(el => {
        el.classList.remove("active");
    });

    linkLeyendas.classList.add("active");

    imagenCambiable.src = "./assets/leyendasMitos.png";
    textoImagen.innerHTML = "Las leyendas y mitos salvadoreños incluyen historias como la Llorona, el Cadejo, y la Siguanaba, que reflejan la rica tradición oral del país. Estas leyendas son parte integral de la cultura salvadoreña y se transmiten de generación en generación.";
});