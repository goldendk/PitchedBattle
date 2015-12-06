(function (window) {

    function Model(baseWidth, baseHeight, color) {
        this.Shape_constructor(); // super call
        this.redraw(baseWidth, baseHeight, color);
        this.mouseEnabled = true;
    }

    var p = createjs.extend(Model, createjs.Shape);

    // public properties:
    p.baseWidth;	//visual radial size
    p.baseHeight;		//average radial disparity
    p.color;

    p.frontLeft;
    p.frontRight;
    p.rearLeft;
    p.rearRight;
// public methods:


    p.getShape = function (drawWidth, drawHeight, color) {
        //setup
        this.drawWidth = drawWidth;
        this.drawHeight = drawHeight;
        var baseX = -0.5 * drawWidth;
        var baseY = -0.5 * drawHeight;
        p.rearLeft = new createjs.Point(baseX, baseY);
        p.rearRight = new createjs.Point(-1 * baseX, baseY)
        p.frontRight = new createjs.Point(-1 * baseX, -1 * baseY)
        p.frontLeft = new createjs.Point(baseX, -1 * baseY);


        this.graphics.clear();
        this.graphics.beginStroke(color);
        this.graphics.beginFill(color);
        this.graphics.moveTo(this.rearLeft.x, this.rearLeft.y);
        this.graphics.lineTo(this.rearRight.x, this.rearRight.y);
        this.graphics.lineTo(this.frontRight.x, this.frontRight.y);
        this.graphics.lineTo(this.frontLeft.x, this.frontLeft.y);
        this.graphics.lineTo(this.rearLeft.x, this.rearLeft.y);
        this.graphics.closePath();
        this.graphics.beginFill(color);
        this.graphics.drawCircle(0, this.frontLeft.y, 5);
    }


    //handle reinit for poolings sake
    p.redraw = function (baseWidth, baseHeight, color) {
        this.graphics.clear();
        this.baseWidth = baseWidth;
        this.baseHeight = baseHeight;
        this.color = color;
        var drawWidth = baseWidth * window.BASE_SCALE_FACTOR;
        var drawHeight = baseHeight * window.BASE_SCALE_FACTOR;
        this.getShape(drawWidth,
            drawHeight,
            color);
    }


    window.Model = createjs.promote(Model, "Shape");

}(window));