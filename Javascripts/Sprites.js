class Sprites{
    constructor({position, imagenSrc}){
        this.position=position
        this.loaded = false
        this.image = new Image()
        this.image.onload= ()=>{
            this.width = this.image.width
            this.height = this.image.height
            this.loaded = true
        }
        this.image.src = imagenSrc
    }

    draw(){
        if(!this.image){
            return
        }
        contexto.drawImage(this.image, this.position.x, this.position.y)
    }

    update(){
        this.draw()
    }
}
