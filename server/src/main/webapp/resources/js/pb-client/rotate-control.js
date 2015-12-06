(function(window){
    var p = createjs.extend(RotateControl, createjs.Bitmap);
    p.model;
    p.lastY;
    p.rotateLabel;

    function RotateControl(boardpiece){
        this.BitMap_constructor("/resources/img/sub_blue_rotate_ccw.png")
        this.boardpiece = boardpiece;
        this.init();
    }
    p.init = function(){
        this.setupRotate();
        var hit = new createjs.Shape();
        hit.graphics.beginFill("#000").drawRect(0, 0, 100, 100);
        this.hitArea = hit;
    }



    p.setupRotate = function(){
        var scaleFactor =  window.BASE_SCALE_FACTOR / 30;
        this.scaleX = scaleFactor;
        this.scaleY = scaleFactor;
        var obj = this;
        this.addEventListener("pressmove", function(evt) {
            if(obj.lastY){
                var diff = evt.stageY - obj.lastY;

                //console.log(evt.stageY);
                //console.log(p.lastY);
                //console.log(diff);
                //console.log(p.model.rotation);
                var event = new createjs.Event(PLAYER_ACTION);
                event.data = {type: "rotate", rotationChange: 2*diff};
                obj.dispatchEvent(event);
            }
            obj.lastY = evt.stageY;
        });
        this.addEventListener("pressup", function(evt){
            obj.lastY = null;
            var event = new createjs.Event(PLAYER_ACTION);
            event.data = {type: "position", "bp": obj.boardpiece};
            obj.dispatchEvent(event);
        });

    }
    window.RotateControl = createjs.promote(RotateControl, "BitMap");



})(window);