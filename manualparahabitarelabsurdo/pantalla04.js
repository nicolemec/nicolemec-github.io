// Clase que representa la pantalla 04
class Pantalla04 extends Pantalla {
    constructor() {
        super(); // Llama al constructor de la clase base Pantalla

        this.background = null; // Imagen de fondo
        this.butinicio = null; // Botón de inicio
        this.butnav = null; // Botón de navegación

        this.cometa = null;//ANimación de cometa
    }

    // Método que se ejecuta al precargar los recursos multimedia
    preload() {
        this.background = recursosPantalla04.background;
        this.butinicio = recursosPantalla04.butinicio;
        this.butnav = recursosPantalla04.butnav;
    }

    // Configuraciones iniciales de cada pantalla
    setup() {
        // Inicializa el cometa 
        this.cometa = new Cometa();

        // Botones
        this.botones = [
            //Boton inicio
            new Button(width * 0.85, height * 0.85, height * 0.1, height * 0.1, this.butinicio, () => {
                click.play();
                navegador.elegirPantalla(0);
            }),
            //botón navegador
            new Button(width * 0.92, height * 0.85, height * 0.1, height * 0.1, this.butnav, () => {
                click.play();
                navegador.elegirPantalla(5);
            })
        ];
    }

    // Método para dibujar la pantalla
    draw() {
        resetMatrix();// Restablece la matriz de transformación
        cursor(ARROW); // Cambia el cursor a la flecha por defecto
        translate(-width / 2, -height / 2);

        // Dibujar la imagen de fondo
        if (this.background) {
            background(0);
            image(this.background, 0, 0, width, height);
        }

        //Dibuja el cometa
        if (this.cometa.isOffScreen()) {
            this.cometa.reset();
        }
        this.cometa.update();
        this.cometa.draw();

        // Dibujar los botones
        for (let boton of this.botones) {
            boton.draw();
        }
    }

    // Método que se ejecuta cuando se hace clic con el ratón
    mouseClicked() {
        print('--- mouse clicked desde PantallaFin!'); // Imprimir mensaje en la consola al hacer clic

        // Revisar si se hizo clic en los botones
        let clickEnBoton = false;
        for (let button of this.botones) {
            if (button.contains(mouseX, mouseY)) {
                button.clicked();
                clickEnBoton = true;
                break;
            }
        }
    }
}
class Cometa {
    constructor() {
        this.reset();
        this.trailLength = 25; // Longitud de la cola
        this.trail = []; // Array para almacenar la cola del cometa
    }

    reset() {
        // Reinicia el cometa para que aparezca desde un borde aleatorio
        const lado = floor(random(2)); // 0: arriba, 1: izquierda
        if (lado === 0) {
            this.x = random(width);
            this.y = -50;
        } else {
            this.x = -50;
            this.y = random(height / 3);
        }
        this.velocidadX = random(2, 5);
        this.velocidadY = random(2, 5);
        this.trail = [];
    }

    update() {
        this.x += this.velocidadX;
        this.y += this.velocidadY;

        // Guarda la posición actual para la cola
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.trailLength) {
            this.trail.shift();
        }
    }

    draw() {
        noStroke();

        // Dibuja la cola
        for (let i = 0; i < this.trail.length; i++) {
            const pos = this.trail[i];
            const alpha = map(i, 0, this.trail.length, 0, 200);
            const size = map(i, 0, this.trail.length, 1, 5);
            fill(255, 245, 221, alpha);
            ellipse(pos.x, pos.y, size);
        }

        // Dibuja la cabeza del cometa
        fill(255, 245, 221);
        ellipse(this.x, this.y, (random(7, 10)), (random(7, 10)));
    }

    isOffScreen() {
        return this.x > width + 50 || this.y > height + 50;
    }
}