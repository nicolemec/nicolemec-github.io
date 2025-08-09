// Clase que representa la primera pantalla (Pantalla00)
class Pantalla03 extends Pantalla {
    constructor() {
        super();
        //Mensaje de instrucciones
        this.mensaje = null;
        //Assets
        this.background = null;
        this.astronauta = null;
        // Inicializamos el array de  palabras
        this.palabras = [
            { texto: '"Me' },
            { texto: 'dejo' },
            { texto: 'caer.' },
            { texto: 'Pero' },
            { texto: 'el viento' },
            { texto: 'me' },
            { texto: 'sostiene."' }
        ];
        this.animaciones = []; // Palabras animándose
        this.palabraActual = 0; // Índice de la próxima palabra a mostrar
        this.click = null;
        this.butsig = null;

        //Estrellas
        this.estrellas = []; // Array para almacenar las estrellas
        this.numEstrellas = 2000; // Cantidad de estrellas
        this.tamanoBaseEstrella = random(2, 5); // Tamaño de las estrellas
        // Crea las estrellas con posiciones aleatorias
        for (let i = 0; i < this.numEstrellas; i++) {
            this.estrellas.push({
                x: random(width),
                y: random(height),
                tamano: random(this.tamanoBaseEstrella * 0.5, this.tamanoBaseEstrella * 1.5), // Tamaño ligeramente aleatorio
                brillo: random(50, 255), // Brillo inicial aleatorio
                variacionBrillo: random(-5, 5) // Variación aleatoria del brillo
            });
        }
    }
    // Método que se ejecuta al precargar los recursos multimedia
    preload() {
        this.background = recursosPantalla03.background;
        this.astronauta = recursosPantalla03.astronauta;
        this.click = recursosPantalla03.click;
        this.butsig = recursosPantalla03.butsig;

        if (this.astronauta) {
            this.astronauta.hide();
            this.astronauta.volume(0);
            this.astronauta.loop();
        }
    }
    // Configuraciones iniciales de cada pantalla
    setup() {
        // Reiniciar animaciones y palabra actual
        this.animaciones = [];
        this.palabraActual = 0;

        // Define posiciones x,y para cada palabra segun el tamaño del canvas
        //Me
        this.palabras[0].x = width / 10;
        this.palabras[0].y = height / 7;
        //dejo
        this.palabras[1].x = width * 0.35;
        this.palabras[1].y = height * 0.25;
        //caer
        this.palabras[2].x = width * 0.65;
        this.palabras[2].y = height * 0.18;
        //pero
        this.palabras[3].x = width * 0.85;
        this.palabras[3].y = height * 0.5;
        //el viento
        this.palabras[4].x = width * 0.25;
        this.palabras[4].y = height * 0.85;
        //me
        this.palabras[5].x = width * 0.5;
        this.palabras[5].y = height * 0.8;
        //sostiene
        this.palabras[6].x = width * 0.85;
        this.palabras[6].y = height * 0.75;

        // Botones
        this.botones = [
            //botón sigueinte
            new Button(width * 0.92, height * 0.85, height * 0.1, height * 0.1, this.butsig, () => {
                click.play();
                navegador.elegirPantalla(4);
            }),
            //botón de ayuda
             new Button(width * 0.85, height * 0.85, height * 0.1, height * 0.1, recursosBotonAyuda.imgAyuda, () => {
                click.play();
                navegador.mostrarAyuda();
            })
        ];
        //Mensaje
        this.mensaje = new MensajeFlotante("Al absurdo universo, me rebelo \n bailando, saltando y leyendo. \n Paso 004: Llena el vacío con palabras.\n Haz clic para revelar las palabras que me hacen flotar.");
        // Configuración de texto
        textSize(60);
        textAlign(CENTER, CENTER);
    }
    // Método para dibujar la pantalla
    draw() {
        resetMatrix(); // Restablece la matriz de transformación
        translate(-width / 2, -height / 2); // Translada el origen a la esquina superior izquierda

        cursor(ARROW); // Establece el cursor por defecto
        background(140);

        // Dibujar fondo primero
        if (this.background) {
            image(this.background, 0, 0, width, height);
        }

        //Dibujar las estrellas
        noStroke();
        for (let estrella of this.estrellas) {
            fill(255, estrella.brillo); // Color blanco con el brillo actual
            ellipse(estrella.x, estrella.y, estrella.tamano, estrella.tamano);

            // Actualizar el brillo para el titileo
            estrella.brillo += estrella.variacionBrillo;
            if (estrella.brillo <= 50 || estrella.brillo >= 255) {
                estrella.variacionBrillo *= -1; // Invertir la dirección del brillo al alcanzar los límites
            }
        }

        // Dibujar astronauta segundo
        if (this.astronauta && this.astronauta.loadedmetadata) {
            image(this.astronauta, 0, 0, width, height);
        }

        // Dibujar animaciones de palabras
        // Fuente
        if (breeSerifFont) {
            textFont(breeSerifFont);
        } else {
            textFont('Arial'); // Fallback
        }
        for (let a of this.animaciones) {
            // Avanzar animación
            a.tiempo = min(a.tiempo + 1, a.maxTiempo);
            let t = a.tiempo / a.maxTiempo;
            let desenfoque = map(1 - t, 0, 1, 0, 10);
            a.y = lerp(a.y, a.yFinal, 0.1); // Movimiento hacia arriba suave
            // Dibujar múltiples capas para simular el blur
            for (let i = 0; i < 10; i++) {
                let offsetX = random(-desenfoque, desenfoque);
                let offsetY = random(-desenfoque, desenfoque);
                fill(255, 255 * 0.1);
                text(a.texto, a.x + offsetX, a.y + offsetY);
            }
            // Dibujar texto nítido encima
            fill(255, 255 * t);
            text(a.texto, a.x, a.y);
        }

        // Dibujar botones (ensure they are drawn last as well)
        for (let boton of this.botones) {
            boton.draw();
        }
        // Escribe mensaje de instrucciones
        if (this.mensaje) {
            this.mensaje.update();
            this.mensaje.draw();
        }
    }

    // Método que se ejecuta cuando se hace clic con el ratón
    mouseClicked() {
        print('--- mouse clicked en Pantalla03!');
        let clickEnBoton = false;

        for (let button of this.botones) {
            if (button.contains(mouseX, mouseY)) {
                button.clicked();
                clickEnBoton = true;
                break;
            }
        }

        // Si no fue un clic en botón, mostrar la siguiente palabra
        if (!clickEnBoton && this.palabraActual < this.palabras.length) {
            const p = this.palabras[this.palabraActual];
            this.animaciones.push({
                texto: p.texto,
                x: p.x,
                y: p.y + 30,         // empieza más abajo
                yFinal: p.y,         // guarda la posición final
                tiempo: 0,
                maxTiempo: 60
            });
            if (this.click) this.click.play();
            this.palabraActual++;
        }
    }
}