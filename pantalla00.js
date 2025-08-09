// Clase que representa la primera pantalla (Pantalla00)
class Pantalla00 extends Pantalla {
    constructor() {
        super(); // Llama al constructor de la clase base Pantalla
        this.mensaje = null; // Mensaje de instrucciones

        this.imgVentana = null; // Imagen de la ventana
        this.imgAstronauta = null; // Imagen del astronauta
        this.imgLuna = null; // Imagen de la luna
        this.mundo = null; // Imagen del mundo
        this.texto = null; // Imagen del texto
        this.buttinnav = null; // Imagen del botón de navegación
        this.buttonsig = null; // Imagen del botón de siguiente
        this.videofondo = null; // Video de fondo
    }

    // Método que se ejecuta al precargar los recursos multimedia
    preload() {
        this.imgVentana = recursosPantalla00.imgVentana;
        this.imgAstronauta = recursosPantalla00.imgAstronauta;
        this.imgLuna = recursosPantalla00.imgLuna;
        this.mundo = recursosPantalla00.mundo;
        this.texto = recursosPantalla00.texto;
        this.buttinnav = recursosPantalla00.buttinnav;
        this.buttonsig = recursosPantalla00.buttonsig;
        this.videofondo = recursosPantalla00.videofondo;

        if (this.videofondo) {
            this.videofondo.volume(0);
            this.videofondo.hide();
            this.videofondo.stop();
        }
    }

    // Configuraciones iniciales de cada pantalla
    setup() {
        // Inicializar el video de fondo
        this.playing = true;
        if (this.videofondo) {
            this.videofondo.stop();
            this.videofondo.loop();
        }
        // Mensaje
        this.mensaje = new MensajeFlotante("Tómate un momento.\n Paso 001: Detén el universo.\nUn clic para pausar el tiempo. Otro para seguir mirando.\nAl final, avanza..");
        // Botones
        this.botones = [
            //boton para navegar entre pantallas
            new Button(width * 0.85, height * 0.85, height * 0.1, height * 0.1, this.buttinnav, () => {
                click.play();
                this.stop()
                navegador.elegirPantalla(5);
            }),
            //boton para siguiente
            new Button(width * 0.92, height * 0.85, height * 0.1, height * 0.1, this.buttonsig, () => {
                click.play();
                this.stop();
                navegador.proximaPantalla();
            }),
            //botón de ayuda
            new Button(width * 0.79, height * 0.85, height * 0.07, height * 0.07, recursosBotonAyuda.imgAyuda, () => {
                click.play();
                navegador.mostrarAyuda();
            })
        ];
    }

    // Método para dibujar la pantalla
    draw() {
        background(0);
        cursor(ARROW);

        // Dibujar el frame actual del video si está cargado
        if (this.videofondo && this.videofondo.loadedmetadata) {
            push();
            noStroke();
            translate(0, 0, -500);
            texture(this.videofondo);
            plane(width * 2, height * 2);
            pop();
        }
        // Dibuja y anima al mundo
        if (this.mundo) {
            push();
            noStroke();
            translate(0, -20, -200);
            rotateY(frameCount * 0.001);
            texture(this.mundo);
            sphere(width / 6);
            pop();
        }
        if (this.imgVentana) {
            push();
            noStroke();
            translate(0, 0, 0);
            texture(this.imgVentana);
            plane(width, height);
            pop();
        }
        // Volver a 2D para superponer imágenes encima del canvas
        resetMatrix();
        push();
        translate(-width / 2, -height / 2);
        if (this.imgLuna) image(this.imgLuna, 0, 0, width, height);
        if (this.imgAstronauta) image(this.imgAstronauta, 0, 0, width, height);
        if (this.texto) image(this.texto, 0, 0, width, height);
        // Dibujar los botones
        for (let button of this.botones) {
            if (button.draw) button.draw();
        }
        // Escribe mensaje de instrucciones
        if (this.mensaje) {
            this.mensaje.update();
            this.mensaje.draw();
        }
        pop();
        resetMatrix();
    }

    // Método que se ejecuta cuando se hace clic con el ratón
    mouseClicked() {
        // Revisar si se hizo clic en los botones
        let clickEnBoton = false;
        for (let button of this.botones) {
            if (button.contains(mouseX, mouseY)) {
                button.clicked();
                clickEnBoton = true;
                break;
            }
        }
        // Si no se hizo clic en botones, alternar reproducción
        if (!clickEnBoton && this.videofondo) {
            if (this.playing) {
                this.videofondo.pause();
            } else {
                this.videofondo.loop();
            }
            this.playing = !this.playing;
        }
    }

    stop() {
        if (this.videofondo) {
            this.videofondo.stop();
        }
        this.playing = false;
    }
    //mensajes
    mostrarMensaje(texto, duracion = 180) {
        this.mensaje = new MensajeFlotante(texto, duracion);
    }
    actualizarYMostrarMensaje() {
        if (this.mensaje) {
            this.mensaje.update();
            this.mensaje.draw();
        }
    }
}
