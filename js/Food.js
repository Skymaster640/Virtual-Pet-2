class Foods {
     constructor() {
        var foodStock
        var lastFed


        this.image = loadImage("Milk.png");
        this.foodStock = 30;

    }

    getFoodStock(){
        var foodRef=database.ref('foodS');
        foodRef.on("value",function(data){
            foodS=data.val();
        })
    }

    updateFoodStock(){
        database.ref('/').update({
            foodS:foodS
        })
    }

    deductFood(){
        //foodS--;
        database.ref('/').update({
          foodS:foodS
        })
    }

    display(){
        var x=30,y=100;

        imageMode(CENTER);
        //this.image(this.image,320,220,70,70);

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    }
}