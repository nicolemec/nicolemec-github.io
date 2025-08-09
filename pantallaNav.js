class PantallaNav extends Pantalla {
    constructor() {
        super();
        this.imgNav = null;
        this.butinicio = null;
        this.botones = [];
        this.lastWidth = null;
        this.lastHeight = null;
    }

    preload() {
        this.imgNav = recursosPantallaNav.imgNav;
        this.butinicio = recursosPantallaNav.butinicio;
    }

    setup() {
        this.recalcularLayout();
        // Botón de inicio
        this.botones = [
            new Button(
                width * 0.92, height * 0.85, height * 0.1, height * 0.1,
                this.butinicio,
                () => {
                    click.play();
                    navegador.elegirPantalla(0);
                }
            )
        ];
    }

    draw() {
        resetMatrix();
        cursor(ARROW);
        translate(-width / 2, -height / 2);

        // Solo recalcula si cambió el tamaño
        if (width !== this.lastWidth || height !== this.lastHeight) {
            this.recalcularLayout();
        }

        // Dibuja la imagen de navegación
        if (this.imgNav) {
            image(this.imgNav, 0, 0, width, height);
        }

        // Dibuja los botones
        for (let boton of this.botones) {
            boton.draw();
        }

        noStroke();
        fill(255, 150);

        // Hover visual
        if (this.isMouseOver(this.x1, this.y, this.w1, this.h1)) {
            rect(this.x2, this.y, this.w1, this.h1);
            rect(this.x3, this.y, this.w1, this.h1);
        } else if (this.isMouseOver(this.x2, this.y, this.w1, this.h1)) {
            rect(this.x1, this.y, this.w1, this.h1);
            rect(this.x3, this.y, this.w1, this.h1);
        } else if (this.isMouseOver(this.x3, this.y, this.w1, this.h1)) {
            rect(this.x1, this.y, this.w1, this.h1);
            rect(this.x2, this.y, this.w1, this.h1);
        } else {
            rect(this.x1, this.y, this.w1, this.h1);
            rect(this.x2, this.y, this.w1, this.h1);
            rect(this.x3, this.y, this.w1, this.h1);
        }
    }

    mouseClicked() {
        print('--- mouse clicked desde Nav!');
        let clickEnBoton = false;
        for (let button of this.botones) {
            if (button.contains(mouseX, mouseY)) {
                button.clicked();
                clickEnBoton = true;
                break;
            }
        }
        if (!clickEnBoton) {
            if (this.isMouseOver(this.x1, this.y, this.w1, this.h1)) {
                click.play();
                navegador.elegirPantalla(1);
            } else if (this.isMouseOver(this.x2, this.y, this.w1, this.h1)) {
                click.play();
                navegador.elegirPantalla(2);
            } else if (this.isMouseOver(this.x3, this.y, this.w1, this.h1)) {
                click.play();
                navegador.elegirPantalla(3);
            }
        }
    }

    isMouseOver(x, y, w, h) {
        return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
    }

    recalcularLayout() {
        const baseWidth = 1441;
        const baseHeight = 881;
        this.w1 = width * (325 / baseWidth);
        this.h1 = height * (698 / baseHeight);
        this.x1 = width * (327 / baseWidth) - this.w1 / 2;
        this.x2 = width * (720 / baseWidth) - this.w1 / 2;
        this.x3 = width * (1115 / baseWidth) - this.w1 / 2;
        this.y = height * (444 / baseHeight) - this.h1 / 2;
        this.lastWidth = width;
        this.lastHeight = height;
    }
}
