const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

canvas.width = 1280
canvas.height = 720

var escribir = document.getElementById('texto')
escribir.innerText = "Salta hasta encontrar el nenufar"

const colisionPiso2D = []
for (let i = 0; i < colisionPiso.length; i += 107) {
    colisionPiso2D.push(colisionPiso.slice(i, i + 107))
}

const colisionSolidos = []
colisionPiso2D.forEach((fila, y) => {
    fila.forEach((symbol, x) => {
        if (symbol == 25681) {
            colisionSolidos.push(
                new ColisionSolido({
                    position: {
                        x: x * 12,
                        y: y * 12,
                    }
                })
            )
        }
    })
})

const colisionPlataforma2D = []
for (let i = 0; i < colisionPlataforma.length; i += 107) {
    colisionPlataforma2D.push(colisionPlataforma.slice(i, i + 107))
}
const colisionTransparente = []
colisionPlataforma2D.forEach((fila, y) => {
    fila.forEach((symbol, x) => {
        if (symbol == 25681) {
            colisionTransparente.push(
                new ColisionSolido({
                    position: {
                        x: x * 12,
                        y: y * 12,
                    }
                })
            )
        }
    })
})

const colisionVictoria2D = []
for (let i = 0; i < colisionVictoria.length; i += 107) {
    colisionVictoria2D.push(colisionVictoria.slice(i, i + 107))
}
const colisionGanarJuego = []
colisionVictoria2D.forEach((fila, y) => {
    fila.forEach((symbol, x) => {
        if (symbol == 25681) {
            colisionGanarJuego.push(
                new ColisionSolido({
                    position: {
                        x: x * 12,
                        y: y * 12,
                    }
                })
            )
        }
    })
})

const gravity = 0.2
const jugador = new Jugador({
    position: {
        x: 350,
        y: 2200,
    },
    colisionSolidos,
    colisionTransparente,
    colisionGanarJuego: colisionGanarJuego,
    imagenSrc: './Assets/SapoJuego.png',
    spriteChange: {
        SaltoD: {
            imagenSrc: './Assets/PersonajeSaltoD.png'
        },
        SaltoI: {
            imagenSrc: './Assets/PersonajeSaltoI.png'
        },
        CaidaD: {
            imagenSrc: './Assets/PersonajeCaidaD.png'
        },
        CaidaI: {
            imagenSrc: './Assets/PersonajeCaidaI.png'
        },
        MirarD: {
            imagenSrc: './Assets/SapoJuego.png',
        },
        MirarI: {
            imagenSrc: './Assets/SapoJuegoI.png',
        }
    }
})

const movimiento = {
    derecha: {
        presionado: false,
    },
    izquierda: {
        presionado: false,
    }
}

const fondo = new Sprites({
    position: {
        x: 0,
        y: 0,
    },
    imagenSrc: './Assets/Fondo.png'
})

const camara = {
    position: {
        x: 0,
        y: -2880 + canvas.height,
    },
}
let animateId
function animar() {
    animateId = window.requestAnimationFrame(animar)
    contexto.fillStyle = "white"
    contexto.fillRect(0, 0, canvas.width, canvas.height)

    contexto.save()
    contexto.translate(camara.position.x, camara.position.y)
    fondo.update()
    colisionSolidos.forEach((colisionSolido) => {
        colisionSolido.update()
    })
    colisionTransparente.forEach((colisionTransparente) => {
        colisionTransparente.update()
    })
    jugador.revisarParedesHorizontales()
    jugador.update()
    jugador.velocity.x = 0
    if (movimiento.derecha.presionado) {
        jugador.cambiarSprite('MirarD')
        jugador.velocity.x = 2.5
        jugador.miraHacia = 'right'
    } else if (movimiento.izquierda.presionado) {
        jugador.cambiarSprite('MirarI')
        jugador.velocity.x = -2.5
        jugador.miraHacia = 'left'
    } else if (jugador.velocity.y == 0) {
        jugador.estaEnElAire=false
        if (jugador.miraHacia == 'right') {
            jugador.cambiarSprite('MirarD')
        } else if (jugador.miraHacia == 'left') {
            jugador.cambiarSprite('MirarI')
        }
    }

    if (jugador.velocity.y < 0) {
        jugador.comprobarPosicionCamaraArriba({camara, canvas})
        if (jugador.miraHacia == 'right') {
            jugador.cambiarSprite('SaltoD')
        } else if (jugador.miraHacia == 'left')
            jugador.cambiarSprite('SaltoI')
    } else if (jugador.velocity.y > 0) {
        jugador.comprobarPosicionCamaraAbajo({camara, canvas})
        if (jugador.miraHacia == 'right') {
            jugador.cambiarSprite('CaidaD')
        } else if (jugador.miraHacia == 'left') {
            jugador.cambiarSprite('CaidaI')
        }

    }
    contexto.restore()
    
}

animar()

window.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW':
            if(jugador.estaEnElAire==false && event.code=='KeyW'){
                jugador.velocity.y = -14
                jugador.estaEnElAire=true
            }
            break
        case 'KeyA':
            movimiento.izquierda.presionado = true
            break
        case 'KeyD':
            movimiento.derecha.presionado = true
            break
        case 'ArrowUp':
            if(jugador.estaEnElAire==false && event.code=='ArrowUp'){
                jugador.velocity.y = -14
                jugador.estaEnElAire=true
            }
            break
        case 'ArrowLeft':
            movimiento.izquierda.presionado = true
            break
        case 'ArrowRight':
            movimiento.derecha.presionado = true
            break
        case 'Numpad8':
            if(jugador.estaEnElAire==false && event.code=='Numpad8'){
                jugador.velocity.y = -14
                jugador.estaEnElAire=true
            }
            break
        case 'Numpad4':
            movimiento.izquierda.presionado = true
            break
        case 'Numpad6':
            movimiento.derecha.presionado = true
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyA':
            movimiento.izquierda.presionado = false
            break
        case 'KeyD':
            movimiento.derecha.presionado = false
            break
        case 'ArrowLeft':
            movimiento.izquierda.presionado = false
            break
        case 'ArrowRight':
            movimiento.derecha.presionado = false
            break
        case 'Numpad4':
            movimiento.izquierda.presionado = false
            break
        case 'Numpad6':
            movimiento.derecha.presionado = false
            break
    }
})