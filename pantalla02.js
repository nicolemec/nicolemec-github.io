// Clase que representa la pantalla 02
class Pantalla02 extends Pantalla {
  constructor() {
    super();
    this.mensaje = null;

    this.background = null;
    this.astronautacentro = null;
    this.astronautader = null;
    this.astronautaizq = null;
    this.texto = null;
    this.butsig = null;
    this.particles = []; // Array para almacenar las partículas
    this.gravity = 0.05;
    this.bounce = null;
    this.sueloLateralIzquierdo = null;
    this.sueloLateralDerecho = null;
  }

  // Método que se ejecuta al precargar los recursos multimedia
  preload() {
    this.background = recursosPantalla02.background;
    this.astronautacentro = recursosPantalla02.astronautacentro;
    this.astronautader = recursosPantalla02.astronautader;
    this.astronautaizq = recursosPantalla02.astronautaizq;
    this.texto = recursosPantalla02.texto;
    this.butsig = recursosPantalla02.butsig;
    this.bounce = recursosPantalla02.bounce;

    if (this.astronautacentro) {
      this.astronautacentro.hide();
      this.astronautacentro.volume(0);
      this.astronautacentro.loop();
    }
    if (this.astronautader) {
      this.astronautader.hide();
      this.astronautader.volume(0);
      this.astronautader.loop();
    }
    if (this.astronautaizq) {
      this.astronautaizq.hide();
      this.astronautaizq.volume(0);
      this.astronautaizq.loop();
    }
  }

  // Configuraciones iniciales de cada pantalla
  setup() {
    // Inicializar suelos
    this.sueloLateralIzquierdo = new Floor(0, height * 0.9, width / 2, 1, 0);
    this.sueloLateralDerecho = new Floor(width / 2, height * 0.9, width / 2, 1, 0);
    // videos de los astronautas en loop
    if (this.astronautacentro && this.astronautacentro.loadedmetadata) {
      this.astronautacentro.loop();
    }
    if (this.astronautader && this.astronautader.loadedmetadata) {
      this.astronautader.loop();
    }
    if (this.astronautaizq && this.astronautaizq.loadedmetadata) {
      this.astronautaizq.loop();
    }

    // Botones
    this.botones = [
      //botno siguiente
      new Button(width * 0.92, height * 0.85, height * 0.1, height * 0.1, this.butsig, () => {
        click.play(); // Reproduce el sonido de clic
        navegador.elegirPantalla(3);
      }),
      //botón de ayuda
      new Button(width * 0.85, height * 0.85, height * 0.1, height * 0.1, recursosBotonAyuda.imgAyuda, () => {
        click.play();
        navegador.mostrarAyuda();
      })
    ];

    //Mensaje
    this.mensaje = new MensajeFlotante("Paso 003: Encuentra tus reflejos.\nUn clic en la pantalla para soltar a otro yo.\nRebota en todo lado, tal vez halles un amigo en el camino.");
  }

  // Método para dibujar la pantalla
  draw() {
    resetMatrix(); // Restablece la matriz de transformación
    translate(-width / 2, -height / 2);

    cursor(ARROW); // Establece el cursor por defecto
    background(0);

    // Señalar suelos
    this.sueloLateralIzquierdo.draw();
    this.sueloLateralDerecho.draw();

    // Dibujar el fondo
    if (this.background) {
      image(this.background, 0, 0, width, height);
    }
    // Dibujar el texto
    if (this.texto) {
      image(this.texto, 0, 0, width, height);
    }
    // Actualizar y dibujar partículas/ astronautas
    for (let p of this.particles) {
      p.update();
      p.display();
    }
    // Dibujar el video del astronauta central
    if (this.astronautacentro && this.astronautacentro.loadedmetadata) {
      image(this.astronautacentro, 0, 0, width, height);
    }
    // Botones
    for (let button of this.botones) {
      if (button.draw) button.draw();
    }
    // Escribe mensaje de instrucciones
    if (this.mensaje) {
      this.mensaje.update();
      this.mensaje.draw();
    }
  }

  // Método que se ejecuta cuando se hace clic con el ratón
  mouseClicked() {
    print('--- mouse clicked desde Pantalla02!');
    // Botón para ir a la siguiente pantalla
    let clickEnBoton = false;
    for (let button of this.botones) {
      if (button.contains(mouseX, mouseY)) {
        button.clicked();
        clickEnBoton = true;
        break; // Sale del bucle
      }
    }
    // Si no se hizo clic en un botón, crear una nueva partícula
    if (!clickEnBoton) {
      // inicia cada video de astronauta en 0
      if (this.astronautaizq) this.astronautaizq.time(0);
      if (this.astronautader) this.astronautader.time(0);
      // Le otorga caracterisitcas a cada partcula
      this.particles.push(new Particle(
        mouseX,
        mouseY,
        this.gravity,
        this.sueloLateralIzquierdo,
        this.sueloLateralDerecho,
        this.astronautaizq,
        this.astronautader,
        this.bounce
      ));
    }
  }

  // Método para cuando se cambia de pantalla
  stop() {
    if (this.astronautacentro) {
      this.astronautacentro.stop();
    }
    if (this.astronautader) {
      this.astronautader.stop();
    }
    if (this.astronautaizq) {
      this.astronautaizq.stop();
    }
    this.particles = [];
  }
}

// Clase para representar las partículas
class Particle {
  constructor(mouseX, mouseY, gravity, sueloLateralIzquierdo, sueloLateralDerecho, astronautaizq, astronautader, bounce) {
    this.position = createVector(mouseX, mouseY); // Posición de la partícula
    this.velocity = createVector(random(-1, 1), random(-1, 1)); // Velocidad inicial aleatoria
    this.acceleration = createVector(0, 0); // Aceleración inicial
    this.lifespan = 250; // Vida útil de la partícula
    this.radius = random(width / 6, width / 3);
    this.gravity = gravity;
    this.sueloLateralIzquierdo = sueloLateralIzquierdo;
    this.sueloLateralDerecho = sueloLateralDerecho;
    this.astronautaizq = astronautaizq;
    this.astronautader = astronautader;
    this.bounce = bounce;
    this.hasBounced = false;
  }

  // Método para actualizar la posición de la partícula
  update() {
    this.acceleration.y = this.gravity;
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    // Verificar colisiones con los bordes del lienzo
    if (this.position.y + this.radius > height) { // Si colisiona con el borde inferior
      this.position.y = height - this.radius; // Ajustar la posición en el borde inferior
      this.velocity.y *= -0.8;
      if (!this.hasBounced && this.bounce) { // Si no ha rebotado y hay sonido de rebote
        this.bounce.play();
        this.hasBounced = true;
      }
    }

    if (this.position.y - this.radius < 0) { // Si colisiona con el borde superior
      this.position.y = this.radius;
      this.velocity.y *= -0.8;
      if (!this.hasBounced && this.bounce) {
        this.bounce.play();
        this.hasBounced = true;
      }
    }

    // Verificar colisiones con los suelos
    this.checkFloorCollision(this.sueloLateralIzquierdo);
    this.checkFloorCollision(this.sueloLateralDerecho);

    // Reducir la vida útil de la partícula
    this.lifespan -= 0.6; // Reduce la vida útil
  }

  // Verificar colisiones 
  checkFloorCollision(suelo) {
    if (this.position.y + this.radius > suelo.y &&
      this.position.y - this.radius < suelo.y + suelo.height &&
      this.position.x + this.radius > suelo.x &&
      this.position.x - this.radius < suelo.x + suelo.width) {

      if (this.velocity.y > 0) {
        this.position.y = suelo.y - this.radius;
        this.velocity.y *= -0.5;

        if (!this.hasBounced && this.bounce) {
          this.bounce.play();
          this.hasBounced = true;
        }
      }
    }
  }

  // Método para dibujar la partícula
  display() {

    if (this.lifespan > 0) {
      push();
      const videoWidth = this.astronautaizq.width || 1;
      const videoHeight = this.astronautaizq.height || 1;
      const aspect = videoWidth / videoHeight;

      let planeWidth = this.radius;
      let planeHeight = this.radius / aspect;

      translate(this.position.x, this.position.y);
      if (this.position.x < width / 2 && this.astronautaizq && this.astronautaizq.loadedmetadata) {
        texture(this.astronautaizq);
      } else if (this.astronautader && this.astronautader.loadedmetadata) {
        texture(this.astronautader);
      }
      tint(255, this.lifespan);
      plane(planeWidth, planeHeight);
      pop();
    }
  }

  // Verificar si la partícula ha salido de los límites del lienzo o su vida útil ha terminado
  isOutOfBounds() {
    return (this.position.y > height + this.radius || this.position.x < -this.radius || this.position.x > width + this.radius || this.lifespan <= 0); // Retorna true si está fuera de límites o sin vida
  }
}

// Clase para representar el suelo 
class Floor {
  constructor(x, y, width, height, layer) {
    this.x = x; // Posición X del suelo
    this.y = y; // Posición Y del suelo
    this.width = width; // Ancho del suelo
    this.height = height; // Alto del suelo
  }
  draw() {
    // no se dibuja el suelo
  }
}