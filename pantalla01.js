// Clase Pantalla01 que hereda de la clase Pantalla
class Pantalla01 extends Pantalla {
    constructor() {
        super();
        //Mensaje de instrucciones
        this.mensaje = null;

        // Estados y recursos
        this.currentSong = 0;
        this.songs = [];
        this.songStarted = false;
        this.background = null;
        this.disco = null;
        this.brazo = null;
        this.astrobaila = null;
        this.texto = null;
        // Movimiento y efectos
        this.vibrando = false;
        this.vibracionTiempo = 0;
        this.vibracionDuracion = 60;
        this.efectoGiro = false;
        // Amplitud y volumen
        this.amp = null;
        this.volumenActual = 0;
        // Posiciones (se inicializan en setup)
        this.discoX = null;
        this.discoY = null;
        this.brazoX = null;
        this.brazoY = null;
        // Botones
        this.butsig = null;
        this.botones = [];
    }

    // Método que se ejecuta al precargar los recursos multimedia
    preload(songs, background, disco, brazo, butsig, astrobaila, texto) {
        this.songs = recursosPantalla01.songs;
        this.background = recursosPantalla01.background;
        this.disco = recursosPantalla01.disco;
        this.brazo = recursosPantalla01.brazo;
        this.butsig = recursosPantalla01.butsig;
        this.texto = recursosPantalla01.texto;
        this.astrobaila = recursosPantalla01.astrobaila;
        if (this.astrobaila) {
            this.astrobaila.hide();
            this.astrobaila.volume(0);
        }
    }

    // Configuraciones iniciales de cada pantalla
    setup() {
        // Posiciones y tamaños 
        this.discoX = width / 2;
        this.discoY = height * 0.85;
        this.brazoX = width * 0.65;
        this.brazoY = height * 0.7;
        this.brazoW = width * 0.3;
        this.brazoH = height * 0.1;
        // Amplitud para el control del volumen
        this.amp = new p5.Amplitude();
        // Botones
        this.botones = [
            //botón siguiente
            new Button(width * 0.92, height * 0.85, height * 0.1, height * 0.1, this.butsig, () => {
                click.play();
                this.stop();
                navegador.elegirPantalla(2);
                if (musicaDeFondo && !musicaDeFondo.isPlaying()) {
                    musicaDeFondo.loop(); // Reanuda la música al salir de la pantalla
                }
            }),
            //botón de ayuda
            new Button(width * 0.85, height * 0.85, height * 0.1, height * 0.1, recursosBotonAyuda.imgAyuda, () => {
                click.play();
                navegador.mostrarAyuda();
            })
        ];
        // Reset estados
        this.songStarted = false;
        this.efectoGiro = false;
        //Mensaje
        this.mensaje = new MensajeFlotante("Paso 002: Obligatorio, todos los días, baila.\nUn clic en el disco para la siguiente canción.\nUn clic en el brazo para pausar el baile.\n Baila aunque el final parezca alcanzarte.");

    }

    // Método para dibujar la pantalla
    draw() {
        // Reacomoda la matriz para no estar en webgl
        resetMatrix();
        translate(-width / 2, -height / 2);
        cursor(ARROW);
        background(0);

        // Fondo
        if (this.background) image(this.background, 0, 0, width, height);
        // Texto
        if (this.texto) {
            image(this.texto, 0, 0, width, height);
        }
        // Disco
        push();
        translate(this.discoX, this.discoY);
        imageMode(CENTER);
        //vibra al cambiar de canción
        if (this.vibrando) { //
            const angle = sin(frameCount * 0.5) * 0.05; //
            rotate(angle); //
            this.vibracionTiempo++; //
            if (this.vibracionTiempo > this.vibracionDuracion) { //
                this.vibrando = false; //
                this.vibracionTiempo = 0; //
            }
        }
        if (this.disco) image(this.disco, 0, 0, width * 0.65, height * 0.25);
        // Cambiar cursor si se pasa por encima del disco
        if (mouseX > this.discoX - width * 0.325 && mouseX < this.discoX + width * 0.325 &&
            mouseY > this.discoY - height * 0.125 && mouseY < this.discoY + height * 0.125) {
            cursor(HAND);
        }
        pop();
        // Efecto visual del giro del disco 
        if (this.efectoGiro) {
            push();
            translate(this.discoX, this.discoY);

            // Brillo por superposición
            blendMode(ADD);

            const discoAncho = width * 0.65;
            const discoAlto = height * 0.25;

            let ondas = 25; // cantidad de ondas visibles al mismo tiempo
            let espacio = 15; // distancia entre cada una

            for (let i = 0; i < ondas; i++) {
                let factor = (frameCount - i * espacio) % (ondas * espacio);
                let scale = map(factor, 0, ondas * espacio, 0.1, 1.5);

                let w = discoAncho * scale;
                let h = discoAlto * scale;

                // Color dinámico según volumen y tiempo
                let hue = (frameCount + i * 20 + this.volumenActual * 1000) % 360;
                let alpha = map(scale, 0.1, 1.5, 100, 0);

                strokeWeight(10);
                colorMode(HSL, 360, 100, 100, 100);
                stroke(-hue, 100, 60, alpha);
                fill(hue, 100, 60, alpha);
                ellipse(0, 0, w, h);
            }
            // Restaurar modos 
            blendMode(BLEND);
            colorMode(RGB);
            pop();
        }
        // Brazo
        if (this.brazo) {
            image(this.brazo, this.brazoX, this.brazoY, this.brazoW, this.brazoH);
            // Cambiar cursor si se pasa por encima del brazo
            if (mouseX > this.brazoX && mouseX < this.brazoX + this.brazoW &&
                mouseY > this.brazoY && mouseY < this.brazoY + this.brazoH) {
                cursor(HAND);
            }
        }
        // Reproducción de música y video
        if (!this.songStarted && this.songs.length > 0) {
            this.playSong(0);
            this.songStarted = true;
        }
        // Astronauta y volumen
        this.volumenActual = this.amp ? this.amp.getLevel() : 0;
        let velocidad = map(this.volumenActual, 0, 0.5, 0.9, 1.5);
        velocidad = constrain(velocidad, 0.9, 1.5);
        if (this.astrobaila) this.astrobaila.speed(velocidad);
        // Botones
        for (let button of this.botones) {
            if (button.draw) button.draw();
        }
        //Dibuja a astronauta bailando
        if (this.astrobaila && this.astrobaila.loadedmetadata) {
            image(this.astrobaila, 0, 50, width, height);
        }
        // Escribe mensaje de instrucciones
        if (this.mensaje) {
            this.mensaje.update();
            this.mensaje.draw();
        }
    }

    // Método que se ejecuta cuando se hace clic con el ratón
    mouseClicked() {
        print('--- mouse clicked en Pantalla01!');
        let clickEnBoton = false;
        for (let button of this.botones) {
            if (button.contains(mouseX, mouseY)) {
                button.clicked();
                clickEnBoton = true;
                break;
            }
        }
        if (!clickEnBoton) {
            if (mouseX > this.brazoX && mouseX < this.brazoX + this.brazoW &&
                mouseY > this.brazoY && mouseY < this.brazoY + this.brazoH) {
                click.play(); // Play a click sound for the arm
                this.togglePlayback(); // Toggle play/pause for song and video
                clickEnBoton = true; // Mark as handled
            } else {
                this.vibrando = true;
                this.efectoGiro = true;
                this.nextSong();
            }
        }
    }
    // Método para pausar o reproducir la canción y el video con el brazo
    togglePlayback() {
        if (this.songs[this.currentSong] && this.songs[this.currentSong].isPlaying()) {
            this.songs[this.currentSong].pause();
            if (this.astrobaila) {
                this.astrobaila.pause();
            } this.efectoGiro = false; // para el efecto de giro cuando para la canción
        } else {
            this.songs[this.currentSong].play(); // Use play to resume or start
            if (this.astrobaila) {
                this.astrobaila.loop(); // Loop video if song starts again
            }
            this.efectoGiro = true; // Turn on effect when playing
        }
    }
    // Método para cuando se cambia de pantalla
    stop() {
        // Detener canción y video al salir
        if (this.songs[this.currentSong] && this.songs[this.currentSong].isPlaying()) {
            this.songs[this.currentSong].stop();
        }
        if (this.astrobaila) {
            this.astrobaila.stop();
        }

        // Reanudar la música de fondo al salir de esta pantalla,
        // en caso de que no lo haga el navegador.
        if (musicaDeFondo && !musicaDeFondo.isPlaying()) {
            musicaDeFondo.loop();
        }

        // Reiniciar estados
        this.songStarted = false;
        this.efectoGiro = false;
    }

    // Métodos auxiliares para manejo de canciones y video
    playSong(index) {
        if (this.songs[index]) {
            this.songs[index].loop();
            if (this.amp) this.amp.setInput(this.songs[index]);
            this.efectoGiro = true;
        }
        if (this.astrobaila) this.astrobaila.loop();
        this.currentSong = index;
    }

    nextSong() {
        if (this.songs[this.currentSong] && this.songs[this.currentSong].isPlaying()) {
            this.songs[this.currentSong].stop();
        }
        this.currentSong = (this.currentSong + 1) % this.songs.length;
        this.playSong(this.currentSong);
    }
}
