(function (window) {
    var p = createjs.extend(Zones, createjs.Shape);

    function Zones(model){
        this.Shape_constructor();//super call.
        this.redraw(model);
    }

    p.redraw = function(model){

        var zonePoints = [model.rearLeft, model.rearRight, model.frontLeft, model.frontRight];
        var length = window.ZONE_FACTOR * Math.abs(model.rearLeft.x);

        this.drawZoneLine(model.rearLeft, new createjs.Point(length, length));
        this.drawZoneLine(model.frontRight, new createjs.Point(length, length));
       this.drawZoneLine(model.rearRight, new createjs.Point(length, length));
        this.drawZoneLine(model.frontLeft, new createjs.Point(length, length));

        //for(var k in zonePoints){
        //    var point = zonePoints[k];
        //    this.graphics.beginStroke("#999999");
        //    this.graphics.moveTo(point.x, point.y);
        //    this.graphics.lineTo(
        //
        //        (window.ZONE_FACTOR * point.x) + point.x,
        //
        //    //    ((point.y < 0 && point.x > 0) || (point.x < 0 && point.y > 0)) ? 1 : -1 *
        //
        //
        //        (window.ZONE_FACTOR * point.x) + point.y);
        //    this.graphics.endStroke();
        //}
    }

    p.drawZoneLine = function(point, point2){
        this.graphics.beginStroke("#999999");
        this.graphics.moveTo(point.x, point.y);

        var p = new createjs.Point();
        p.x = (point.x < 0 )?  point.x - point2.x : point.x + point2.x;
        p.y = (point.y < 0) ? point.y - point2.y : point.y + point2.y;

        this.graphics.lineTo(p.x , p.y);
        this.graphics.endStroke();

    }

    window.Zones = createjs.promote(Zones, "Shape");

})(window);
