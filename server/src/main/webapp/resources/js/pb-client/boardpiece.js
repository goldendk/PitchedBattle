(function (window) {
    var p = createjs.extend(Boardpiece, createjs.Container);
    p.model;
    p.rotateControl;
    p.zones;
    p.translateControl;
    p.onChange;
    p.bpId;

    function Boardpiece(model, username, bpId) {
        this.Container_constructor(); // super call
        this.addChild(model);
        model.x = 0;
        model.y = 0;
        this.bpId = bpId;
        this.model = model;
        this.mouseEnabled = true;
        this.username = username;
        this.setupControls();
        this.addListeners();
        this.onChange = p.onChange;
    }

    p.onChange = function(event){

        var _this = this;
        this.lastPoint = new createjs.Point(this.x, this.y);


        if(event.type == "rotate"){
           this.setGameRotation(this.model.rotation + event.rotationChange)
        }
        else if(event.type == "translate"){
                this.x = event.pos.x;
                this.y = event.pos.y;
        }

        if(event.username == null){// this has not been dispatched to back-end yet.
            var newEvent = new createjs.Event(BOARDPIECE_STATE);
            newEvent.data = {type: event.type , bpId: _this.bpId, rotation: _this.model.rotation, posX: _this.postionX(),
                posY: _this.positionY() };
            this.dispatchEvent(newEvent);
        }
    };

    p.setState = function(posX, posY, rotation){
        this.setGamePostion(posX, posY);
        this.setGameRotation(event.rotation);
    };

    p.setGamePostion = function(posX, posY){
        this.x = posX* stage.canvas.width;
        this.y = posY * stage.canvas.height;
    };
    p.setGameRotation = function( rotateCount ){
        this.model.rotation = rotateCount;
        this.zones.rotation = this.model.rotation;
        this.translateControl.rotation = this.model.rotation;
        this.rotateLabel.text = Math.floor(Math.abs(this.model.rotation % 360));
    }

    p.postionX = function(){
        return this.x / stage.canvas.width;
    };

    p.positionY = function(){
        return this.y / stage.canvas.height;
    };

    p.addListeners = function(){
        var obj = this;
        this.model.addEventListener("click", function(){
            if(window.activated  != obj){
                if(window.activated){
                    window.activated.deactivate();
                }
                window.activated = obj;
                window.activated.activate();
            }
            else{
                console.log("Already activated :" + p.toString());
            }

        });

        this.rotateControl.addEventListener(PLAYER_ACTION, function(event){
            obj.onChange(event.data);
        });
        this.translateControl.addEventListener(PLAYER_ACTION, function(event){
            obj.onChange(event.data);
        });
    };
    p.deactivate = function(){
        this.hideControls();
    };
    p.activate = function(){
        this.showControls();
    };

    p.setupControls = function () {
        this.setupRotation();
        this.setupTranslation();
        this.setupZones();
    };

    p.setupZones = function(){
        this.zones = new Zones(this.model);
    };
    p.setupTranslation = function(){
        this.translateControl = new TranslateControl(this.model);
        var _this = this;
    };


    p.setupRotation = function(){
        this.rotateControl = new RotateControl(this);
        this.rotateControl.x = 40;
        this.rotateControl.y = -50;
        var text = new createjs.Text("0", "bold 12px Arial", "#ff7700");
        text.x = 70;
        text.y = -45;

        text.label = "temp";
        this.rotateLabel = text;
    };

    p.showControls = function(){
        this.addChild(this.rotateControl);
        this.addChild(this.zones);
        this.addChild(this.rotateLabel)
        this.addChild(this.translateControl);
    };

    p.hideControls = function(){
        this.removeChild(this.rotateControl);
        this.removeChild(this.zones);
        this.removeChild(this.rotateLabel);
        this.removeChild(this.translateControl);
    };

    window.Boardpiece = createjs.promote(Boardpiece, "Container");

}(window));

