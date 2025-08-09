// Crear una instancia del objeto Navegador, que gestionará las pantallas
const navegador = new Navegador();

// Variable para el boton de información
let recursosBotonAyuda = {
    imgAyuda: null
  };
// Efectos de sonido
let click, flip, bounce, musicaDeFondo;
// Agrupar recursos de Pantalla00 en un solo objeto
let recursosPantalla00 = {
  imgVentana: null,
  imgAstronauta: null,
  imgLuna: null,
  mundo: null,
  texto: null,
  buttinnav: null,
  buttonsig: null,
  videofondo: null,
};
// Agrupar recursos de Pantalla01 en un solo objeto
let recursosPantalla01 = {
  songs: [],
  background: null,
  disco: null,
  brazo: null,
  butsig: null,
  astrobaila: null
};
// Agrupar recursos de Pantalla02 en un solo objeto
let recursosPantalla02 = {
  background: null,
  astronautacentro: null,
  astronautader: null,
  astronautaizq: null,
  texto: null,
  butsig: null
};
// Agrupar recursos de Pantalla03 en un solo objeto
let recursosPantalla03 = {
  background: null,
  astronauta: null,
  butsig: null,
  click: null,
  fuente: null
};

// Agrupar recursos de Pantalla04 en un solo objeto
let recursosPantalla04 = {
  background: null,
  butinicio: null,
  butnav: null
}
// Agrupar recursos de PantallaNav en un solo objeto
let recursosPantallaNav = {
  imgNav: null,
  butinicio: null
}

// Función para cargar los recursos multimedia antes de que comience el programa
function preload() {
  //Canción de fondo
  musicaDeFondo = loadSound ('media/earth.mp3');
    // Efecto de sonido de click
  click = loadSound('media/click.mp3');

  //boton de info
  recursosBotonAyuda.imgAyuda = loadImage('media/botones/bot_ayuda.png');

  // Carga global de la fuente para que MensajeFlotante pueda acceder a ella
  breeSerifFont = loadFont('media/fonts/BreeSerif-Regular.ttf');

  // Recursos de Pantalla00
  recursosPantalla00.imgVentana = loadImage('media/inicio/ventana.png');
  recursosPantalla00.imgAstronauta = loadImage('media/inicio/astronauta.png');
  recursosPantalla00.imgLuna = loadImage('media/inicio/luna.png');
  recursosPantalla00.mundo = loadImage('media/inicio/mundo.png');
  recursosPantalla00.texto = loadImage('media/inicio/texto.png');
  recursosPantalla00.buttinnav = loadImage('media/botones/bot_text_nav.png');
  recursosPantalla00.buttonsig = loadImage('media/botones/bot_text_sig.png');
  recursosPantalla00.videofondo = createVideo(['media/inicio/background.mp4']);
  recursosPantalla00.videofondo.volume(0);
  recursosPantalla00.videofondo.hide();
  recursosPantalla00.videofondo.stop();

  // Recursos Pantalla01
  recursosPantalla01.songs = [
    loadSound('media/pantalla1/lets_pretend.mp3'),
    loadSound('media/pantalla1/apocalypse_please.mp3'),
    loadSound('media/pantalla1/until_the_end.mp3'),
    loadSound('media/pantalla1/die_with_a_smile.mp3')
  ];
  recursosPantalla01.background = loadImage('media/pantalla1/background_n.png');
  recursosPantalla01.disco = loadImage('media/pantalla1/disco.png');
  recursosPantalla01.brazo = loadImage('media/pantalla1/brazo.png');
  recursosPantalla01.astrobaila = createVideo('media/pantalla1/astronauta.webm');
  recursosPantalla01.astrobaila.hide();
  recursosPantalla01.astrobaila.volume(0);
  recursosPantalla01.texto = loadImage('media/pantalla1/texto.png');
  recursosPantalla01.butsig = loadImage('media/botones/bot_sig.png');

  // Recursos Pantalla02
  recursosPantalla02.background = loadImage('media/pantalla2/background.png');
  recursosPantalla02.astronautacentro = createVideo('media/pantalla2/00.webm');
  recursosPantalla02.astronautacentro.hide();
  recursosPantalla02.astronautacentro.volume(0);
  recursosPantalla02.astronautader = createVideo('media/pantalla2/01.webm');
  recursosPantalla02.astronautader.hide();
  recursosPantalla02.astronautader.volume(0);
  recursosPantalla02.astronautaizq = createVideo('media/pantalla2/02.webm');
  recursosPantalla02.astronautaizq.hide();
  recursosPantalla02.astronautaizq.volume(0);
  recursosPantalla02.texto = loadImage('media/pantalla2/texto.png');
  recursosPantalla02.butsig = loadImage('media/botones/bot_sig.png');
  recursosPantalla02.bounce = loadSound('media/pantalla2/bounce.mp3');

  // Recursos Pantalla03
  recursosPantalla03.background = loadImage('media/pantalla3/background.jpg');
  recursosPantalla03.astronauta = createVideo('media/pantalla3/astroleyendo.webm');
  recursosPantalla03.astronauta.hide();
  recursosPantalla03.astronauta.volume(0);
  recursosPantalla03.click = loadSound('media/pantalla3/wind.mp3');
  recursosPantalla03.butsig = loadImage('media/botones/bot_sig.png');

  // Recursos Pantalla04
  recursosPantalla04.background = loadImage('media/fin/fin.png');
  recursosPantalla04.butinicio = loadImage('media/botones/bot_inicio.png');
  recursosPantalla04.butnav = loadImage('media/botones/bot_nav.png');

  // Recursos PantallaNav
  recursosPantallaNav.imgNav = loadImage('media/nav/nav.png');
  recursosPantallaNav.butinicio = loadImage('media/botones/bot_inicio.png');
}

function setup() {
  createCanvas(1080, 720, WEBGL);
  // Configuración de texto
  textSize(60);
  textAlign(CENTER, CENTER);

  // Crear y agregar pantallas al navegador
  let p = new Pantalla00();
  navegador.agregarPantalla(p);
  // Pantalla01 
  p = new Pantalla01();
  p.preload(
    recursosPantalla01.songs,
    recursosPantalla01.background,
    recursosPantalla01.disco,
    recursosPantalla01.brazo,
    recursosPantalla01.butsig,
    recursosPantalla01.astrobaila,
    recursosPantalla01.texto,
    recursosPantalla01.butsig,
  );
  p.setup();
  navegador.agregarPantalla(p);
  // Pantalla02
  p = new Pantalla02();
  p.preload();
  p.setup();
  navegador.agregarPantalla(p);
  // Pantalla03
  p = new Pantalla03();
  p.preload();
  p.setup();
  navegador.agregarPantalla(p);

  // Pantalla04
  p = new Pantalla04();
  p.preload();
  p.setup();
  navegador.agregarPantalla(p);

  // PantallaNav
  p = new PantallaNav();
  p.preload();
  p.setup();
  navegador.agregarPantalla(p);

  //Preload y setup de la pantalla actual
  navegador.pantallaActual.preload?.();
  navegador.pantallaActual.setup?.();

  //Reproducir la musica de fondo
  musicaDeFondo.loop();
  musicaDeFondo.setVolume(0.5);
}

function draw() {
  textFont(breeSerifFont);
  navegador.pantallaActual.draw(); // Llamar al método draw de la pantalla actual
}

// Función que se ejecuta cuando se hace clic con el ratón
function mouseClicked() {
  console.log(mouseX, mouseY);
  navegador.pantallaActual.mouseClicked(); // Llamar al método mouseClicked de la pantalla actual
}
