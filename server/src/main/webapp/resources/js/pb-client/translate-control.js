(function (window) {
    var p = createjs.extend(TranslateControl, createjs.Container);

    function TranslateControl(model) {
        this.Container_constructor(); // super call
        this.mouseEnabled = true;
        this.redraw(model);
        this.model = model;
        this.addListeners();
    }

    p.redraw = function(model){
        //two sizes.
        var widthSide = model.drawHeight;

        var widthFront = model.drawWidth;

        this.leftArrow = this.drawArrow(widthSide, widthSide* 0.3, widthSide*0.6);
        this.rightArrow = this.drawArrow(widthSide, widthSide* 0.3, widthSide*0.6)
        this.frontArrow = this.drawArrow(widthFront, widthSide* 0.3, widthSide*0.6);
        this.backArrow = this.drawArrow(widthFront, widthSide* 0.3, widthSide*0.6);

        //place the arrows.
var distance = 8;
        this.leftArrow.x = model.rearLeft.x - distance;
        this.leftArrow.y = 0;
        this.leftArrow.rotation = 90;

        this.rightArrow.x = model.rearRight.x + distance;
        this.rightArrow.y = 0;
        this.rightArrow.rotation = -90;

        this.frontArrow.x = 0;
        this.frontArrow.y = model.frontLeft.y + distance;
        this.frontArrow.rotation = 0;

        this.backArrow.x = 0;
        this.backArrow.y = model.rearLeft.y - distance;
        this.backArrow.rotation = 180;

        this.addChild(this.leftArrow);
        this.addChild(this.rightArrow);
        this.addChild(this.frontArrow);
        this.addChild(this.backArrow);

    }

    p.addListeners = function(){
        var obj = this;
        var xAxisPresssMove = function(event){
            if(obj.lastPoint){
                var lastLocal = obj.globalToLocal(obj.lastPoint.x, obj.lastPoint.y);
                var localPoint = obj.globalToLocal(event.stageX, event.stageY);
                var yDiff = localPoint.y - lastLocal.y;//y is used for front and back since default direction of object is "up", not "left".
                var newGlobal = obj.model.localToGlobal(0, yDiff);
                obj.parent.onChange({type: "translate", axis: "y",
                    "pos": newGlobal })
            }
            obj.lastPoint = new createjs.Point(event.stageX, event.stageY);
        };

        var pressUp = function(event){
            obj.lastPoint = null;
        }

        this.frontArrow.addEventListener("pressmove", xAxisPresssMove);
        this.frontArrow.addEventListener("pressup", pressUp);
        this.backArrow.addEventListener("pressmove", xAxisPresssMove);
        this.backArrow.addEventListener("pressup", pressUp);
        var yAxisPresssMove = function(event){
            if(obj.lastPoint){
                var lastLocal = obj.globalToLocal(obj.lastPoint.x, obj.lastPoint.y);
                var localPoint = obj.globalToLocal(event.stageX, event.stageY);
                var xDiff = localPoint.x - lastLocal.x;//x is used for left and right since default direction of object is "up", not "left".
                var newGlobal = obj.model.localToGlobal(xDiff, 0);
                obj.parent.onChange({type: "translate", axis: "x",
                    "pos": newGlobal })
            }
            obj.lastPoint = new createjs.Point(event.stageX, event.stageY);
        };

        this.leftArrow.addEventListener("pressmove", yAxisPresssMove);
        this.leftArrow.addEventListener("pressup", pressUp);

        this.rightArrow.addEventListener("pressmove", yAxisPresssMove);
        this.rightArrow.addEventListener("pressup", pressUp);

        //add free move listeners.
        this.model.addEventListener("pressmove", function(event){
            if(obj.model.lastPoint){
                var lastLocal = obj.model.globalToLocal(obj.model.lastPoint.x, obj.model.lastPoint.y);
                var localPoint = obj.model.globalToLocal(event.stageX, event.stageY);
                var xDiff = localPoint.x - lastLocal.x;//x is used for left and right since default direction of object is "up", not "left".
                var yDiff = localPoint.y - lastLocal.y;
                var newGlobal = obj.model.localToGlobal(xDiff, yDiff);
                var newEvent = new createjs.Event(PLAYER_ACTION);
                newEvent.data = {type: "translate", axis: "both",
                    "pos": newGlobal };
                obj.dispatchEvent(newEvent);
            }
            obj.model.lastPoint = new createjs.Point(event.stageX, event.stageY);
        });
        this.model.addEventListener("pressup", function(event){
            obj.model.lastPoint = null;
            var event = new createjs.Event(PLAYER_ACTION);
            event.data = {type: "placement" };
        });
    }



    /**
     * Draws a block arrow.
     * @param width - the width of the base.
     * @param height1 - the height of the square block.
     * @param heigth2 - the height of the arrow shape.
     */
    p.drawArrow = function(width, height1, height2){
        var shape = new createjs.Shape();

        shape.graphics.beginFill("#555555");
        shape.graphics.beginStroke("#222222")
        shape.graphics.moveTo(- width * 0.5, 0);

        var g = shape.graphics;
        g.lineTo(width * 0.5, 0);
        g.lineTo(width * 0.5, height1);
        g.lineTo(0, height2);
        g.lineTo(-width *0.5, height1);
        g.lineTo(-width*0.5, 0);
        g.lineTo(width*0.5, 0)
        return shape;
    }


    window.TranslateControl = createjs.promote(TranslateControl, "Container");


})(window);