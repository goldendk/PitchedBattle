(function (window) {

    function Unit(size) {
        this.Shape_constructor(); // super call
        this.activate(size);
    }

    var p = createjs.extend(Unit, createjs.Shape);

// static properties:
Unit.SOME_VALUE = 42;

// public properties:

    p.bounds;	//visual radial size
    p.hit;		//average radial disparity
    p.size;		//size value itself
    p.spin;		//spin ammount
    p.score;	//score value

    p.vX;		//velocity X
    p.vY;		//velocity Y

    p.active;	//is it active


// public methods:

    //handle drawing a spaceRock
    p.getShape = function (size) {
        var angle = 0;
        var radius = size;

        this.size = size;
        this.hit = size;
        this.bounds = 0;

        //setup
        this.graphics.clear();
        this.graphics.beginStroke("#FFFFFF");
        this.graphics.moveTo(0, size);

        //draw spaceRock
        while (angle < (Math.PI * 2 - .5)) {
            angle += .25 + (Math.random() * 100) / 500;
            radius = size + (size / 2 * Math.random());
            this.graphics.lineTo(Math.sin(angle) * radius, Math.cos(angle) * radius);

            //track visual depiction for interaction
            if (radius > this.bounds) {
                this.bounds = radius;
            }	//furthest point

            this.hit = (this.hit + radius) / 2;					//running average
        }

        this.graphics.closePath(); // draw the last line segment back to the start point.
        this.hit *= 1.1; //pad a bit
    }

    //handle reinit for poolings sake
    p.activate = function (size) {
        this.getShape(size);

        //pick a random direction to move in and base the rotation off of speed
        var angle = Math.random() * (Math.PI * 2);
        this.vX = Math.sin(angle) * (5 - size / 15);
        this.vY = Math.cos(angle) * (5 - size / 15);
        this.spin = (Math.random() + 0.2 ) * this.vX;

        //associate score with size
        this.score = (5 - size / 10) * 100;
        this.active = true;
    }




    window.Unit = createjs.promote(Unit, "Shape");

}(window));