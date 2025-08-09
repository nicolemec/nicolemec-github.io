// Clase Navegador: se encarga de manejar las distintas pantallas o escenas del programa
class Navegador {
    constructor() {
        this.mensaje = null; // Mensaje de instrucciones
        this.pantallas = []; // Acá guardamos todas las pantallas que vamos a usar
        this.pantallaActual = null; // Esta es la pantalla que se está mostrando en este momento
        this.indicePantalla = 0; // Este número nos dice cuál pantalla estamos viendo
    }

    // Agrega una pantalla nueva al arreglo de pantallas
    agregarPantalla(p) {
        this.pantallas.push(p); // Metemos la pantalla al final del arreglo
        if (!this.pantallaActual) {
            this.pantallaActual = p; // Si todavía no hay pantalla actual, ponemos esta como la primera
        }
    }

    // Cambia a la pantalla que sigue en la lista
    proximaPantalla() {

        if (this.pantallaActual.stop) {
            this.pantallaActual.stop();
        }

        const i = (this.indicePantalla + 1) % this.pantallas.length; // Sumamos uno y si nos pasamos, volvemos al principio
        this.pantallaActual = this.pantallas[i]; // Mostramos la pantalla siguiente
        this.indicePantalla = i; // Actualizamos el número de pantalla actual

        // Pausar o reproducir la música de fondo
        if (this.indicePantalla === 1) {
            // Si vamos a la Pantalla01, pausa la música global
            if (musicaDeFondo && musicaDeFondo.isPlaying()) {
                musicaDeFondo.pause();
            }
        } else {
            // Si vamos a cualquier otra pantalla, reanuda la música global
            if (musicaDeFondo && !musicaDeFondo.isPlaying()) {
                musicaDeFondo.loop();
            }
        }

        this.pantallaActual.preload?.();
        this.pantallaActual.setup?.();
    }

    // Cambia a la pantalla anterior en la lista
    previaPantalla() {
        let i = (this.indicePantalla - 1); // Restamos uno para ir a la anterior
        if (i < 0) {
            i = this.pantallas.length - 1; // Si nos pasamos para atrás, vamos a la última pantalla
        }
        this.pantallaActual = this.pantallas[i]; // Mostramos la pantalla anterior
        this.indicePantalla = i; // Actualizamos el número de pantalla actual
    }

    // Permite elegir una pantalla específica usando su número en la lista
    elegirPantalla(i) {
        if (i >= this.pantallas.length || i < 0) {
            print(`Error: No existe la pantalla ${i}. Máximo índice: ${this.pantallas.length - 1}`);
            return;
        }

        if (i >= this.pantallas.length || i < 0) {
            print(`Error, la escena ${i} no existe`); // Si el número está fuera de rango, avisamos
            return;
        }

        this.pantallaActual = this.pantallas[i]; // Mostramos la pantalla que eligieron
        this.indicePantalla = i; // Actualizamos el número de pantalla actual

        if (this.pantallaActual.stop) {
            this.pantallaActual.stop();
        }

        this.pantallaActual = this.pantallas[i];
        this.indicePantalla = i;

        // Pausar o reproducir la música de fondo
        if (this.indicePantalla === 1) {
            // Si vamos a la Pantalla01, pausa la música global
            if (musicaDeFondo && musicaDeFondo.isPlaying()) {
                musicaDeFondo.pause();
            }
        } else {
            // Si vamos a cualquier otra pantalla, reanuda la música global
            if (musicaDeFondo && !musicaDeFondo.isPlaying()) {
                musicaDeFondo.loop();
            }
        }

        this.pantallaActual.preload?.();
        this.pantallaActual.setup?.();
    }
    //método para mostrar el mensaje de ayuda en la pantalla actual
    mostrarAyuda() {
        if (this.pantallaActual.mensaje) {
            this.pantallaActual.mensaje.activo = true;
            this.pantallaActual.mensaje.tiempoActual = 0;
        }
    }
}
//Clase para botones de cambio de pantalla
class Button {
    constructor(x, y, w, h, img, action) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
        this.action = action;
    }

    draw() {
        if (this.img) {
            image(this.img, this.x, this.y, this.w, this.h);
        }
        // Verifica si el mouse está encima y cambia el cursor
        if (this.contains(mouseX, mouseY)) {
            cursor(HAND); // Cambia a "pointer"
        }
    }

    contains(x, y) {
        if (x >= this.x &&
            x <= this.x + this.w &&
            y >= this.y &&
            y <= this.y + this.h) {
            return true;
        }
        return false;
    }

    clicked() {
        if (this.contains(mouseX, mouseY)) {
            this.action();
        }
    }
}
// Clase base para una Pantalla
class Pantalla {
    constructor() {
        background(255, 245, 221); // Ponemos el fondo de la pantalla de un color claro
    }
    // metodo para precargar archivos multimedia
    preload() {

        // Aquí se pueden cargar imágenes, sonidos, etc. que necesite la pantalla
    }

    // Configuraciones iniciales de cada pantalla
    setup() {
        // Aquí se pueden hacer configuraciones iniciales de la pantalla
    }

    // Acá iría todo lo que queremos dibujar en la pantalla
    draw() {
        // Instrucciones para dibujar la pantalla
    }

    // Esto se ejecuta cuando hacés clic con el mouse en la pantalla
    mouseClicked() {
        // Acciones a realizar al hacer clic en la pantalla
    }

}
class MensajeFlotante {
    constructor(texto, duracion = 100) {
        this.texto = texto;
        this.duracion = duracion;
        this.tiempoActual = 0;
        this.activo = true;
    }

    update() {
        if (this.activo) {
            this.tiempoActual++;
            if (this.tiempoActual >= this.duracion) {
                this.activo = false;
            }
        }
    }

    draw() {
        if (!this.activo) return;

        push();
        rectMode(CENTER);
        textAlign(CENTER, CENTER);

        // Cordenadas de la ventana
        let boxW = width * 0.45;
        let boxH = height * 0.15;
        let x = width / 2;
        let y = height / 4;

        // Ventana
        //linea de sombra porque el stroke no funciona :(
        fill(0, 0, 0);
        rect(x, y, boxW + 5, boxH + 5);
        // ventana de texto
        fill(255, 245, 221);
        rect(x, y, boxW, boxH);

        // Texto
        if (breeSerifFont) { // Verifica si la fuente global ha sido cargada
            textFont(breeSerifFont); //
        } else {
            // Fallback en caso de que la fuente no cargue
            textFont('Arial');
        }

        textSize(18);
        noStroke();
        fill(0);
        text(this.texto, x, y);
        pop();
    }
}

