function chequeo({
    objeto1,
    objeto2
}) {
    return (
        objeto1.position.y + objeto1.height >= objeto2.position.y &&
        objeto1.position.y <= objeto2.position.y + objeto2.height &&
        objeto1.position.x <= objeto2.position.x + objeto2.width &&
        objeto1.position.x + objeto1.width >= objeto2.position.x
    )
}

function chequeoPlat({
    objeto1,
    objeto2
}) {
    return (
        objeto1.position.y + objeto1.height >= objeto2.position.y &&
        objeto1.position.y + objeto1.height <= objeto2.position.y + objeto2.height &&
        objeto1.position.x <= objeto2.position.x + objeto2.width &&
        objeto1.position.x + objeto1.width >= objeto2.position.x
    )
}

function chequeoVictoria({
    objeto1,
    objeto2
}){
    return (
        objeto1.position.y + objeto1.height >= objeto2.position.y &&
        objeto1.position.y <= objeto2.position.y + objeto2.height &&
        objeto1.position.x <= objeto2.position.x + objeto2.width &&
        objeto1.position.x + objeto1.width >= objeto2.position.x
    )
}

function parar() {
    clearInterval(this.interval);
}