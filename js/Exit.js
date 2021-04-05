class Exit{
    constructor(x,y){
        this.body = createSprite(x,y,50,30);
        this.body.shapeColor = "#fc030f";
        this.body.addImage(exit_img);
        this.body.scale = 3;
    }
}