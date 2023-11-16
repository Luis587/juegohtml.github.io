class Jugador extends Sprites {
    constructor({ position, colisionSolidos, colisionTransparente, colisionGanarJuego, imagenSrc, spriteChange }) {
        super({ imagenSrc })
        this.position = position
        this.velocity = {
            x: 0,
            y: 1,
        }
        this.colisionSolidos = colisionSolidos
        this.colisionTransparente = colisionTransparente
        this.colisionGanarJuego = colisionGanarJuego
        this.spriteChange = spriteChange
        this.miraHacia = 'right'
        this.estaEnElAire = false;
        for (let key in this.spriteChange) {
            const image = new Image()
            image.src = this.spriteChange[key].imagenSrc
            this.spriteChange[key].image = image
        }
        this.camaraHitbox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 150,
            height: 700,
        }
    }

    cambiarSprite(key) {
        if (this.image == this.spriteChange[key].image || !this.loaded) return
        this.image = this.spriteChange[key].image
    }

    updateCamaraHitbox() {
        this.camaraHitbox = {
            position: {
                x: this.position.x - 100,
                y: this.position.y - 150,
            },
            width: 400,
            height: 500,
        }
    }

    revisarParedesHorizontales() {
        if (this.position.x + this.width + this.velocity.x >= 1284 || this.position.x + this.velocity.x <= 0) {
            this.velocity.x = 0
        }
    }

    comprobarPosicionCamaraArriba({ canvas, camara }) {
        if (this.camaraHitbox.position.y + this.velocity.y <= 0) return
        if (this.camaraHitbox.position.y <= Math.abs(camara.position.y)) {
            camara.position.y -= this.velocity.y
        }
    }
    comprobarPosicionCamaraAbajo({ canvas, camara }) {
        if (this.camaraHitbox.position.y + this.camaraHitbox.height + this.velocity.y >= 2880) return
        if (this.camaraHitbox.position.y + this.camaraHitbox.height >= Math.abs(camara.position.y) + canvas.height) {
            camara.position.y -= this.velocity.y
        }
    }

    update() {
        this.updateCamaraHitbox()
        this.draw()
        this.position.x += this.velocity.x
        this.verificarColisionHorizontal()
        this.aplicarGravedad()
        this.verificarColisionVertical()
    }

    verificarColisionHorizontal() {
        for (let i = 0; i < this.colisionSolidos.length; i++) {
            const colisionSoli = this.colisionSolidos[i]
            if (
                chequeo({
                    objeto1: this,
                    objeto2: colisionSoli,
                })
            ) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0
                    this.position.x = colisionSoli.position.x - this.width - 0.01
                    break
                }
                if (this.velocity.x < 0) {
                    this.velocity.x = 0
                    this.position.x = colisionSoli.position.x + colisionSoli.width + 0.01
                    break
                }
            }
        }
    }

    aplicarGravedad() {
        this.velocity.y += gravity
        this.position.y += this.velocity.y
    }

    verificarColisionVertical() {
        //solidos
        for (let i = 0; i < this.colisionSolidos.length; i++) {
            const colisionSoli = this.colisionSolidos[i]
            if (
                chequeo({
                    objeto1: this,
                    objeto2: colisionSoli,
                })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    this.position.y = colisionSoli.position.y - this.height - 0.01
                    break
                }
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    this.position.y = colisionSoli.position.y + colisionSoli.height + 0.01
                    break
                }
            }
        }
        //victoria
        for (let i = 0; i < this.colisionGanarJuego.length; i++) {
            const colisionGanar = this.colisionGanarJuego[i]
            if (
                chequeoVictoria({
                    objeto1: this,
                    objeto2: colisionGanar,
                })
            ) {
                if (this.velocity.y > 0) 
                {
                    cancelAnimationFrame(animateId)
                    escribir.innerText = "¡Felicidades! Ganaste"
                }
            }
        }
        //plataformas
        for (let i = 0; i < this.colisionTransparente.length; i++) {
            const colisionTraver = this.colisionTransparente[i]
            if (
                chequeoPlat({
                    objeto1: this,
                    objeto2: colisionTraver,
                })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    this.position.y = colisionTraver.position.y - this.height - 0.01
                    break
                }
            }
        }
        
    }
}