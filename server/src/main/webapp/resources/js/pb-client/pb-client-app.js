function init() {
    //static variables for application.
    window.COLOR_DEPLOY = "#000000";
    window.COLOR_BLUE = "#0000FF";
    window.COLOR_RED = "#FF0000";
    window.PLAYER_ACTION = "PlayerAction";
    window.DISPATCH_EVENT_DELAY = 50;
    window.BOARDPIECE_STATE = "boardpiece-state";
    window.DEPLOY_ACTION = "deployAction";
    window.BOARDPIECES = {};
    window.BOARDPIECE_COUNTER = 0;

    //layers
    window.BOARD_PIECE_LAYER = new createjs.Container();

    var queue = new createjs.LoadQueue(true);

    queue.loadFile("/resources/img/sub_blue_rotate_ccw.png");
    queue.on("complete", setup, this);
    queue.load();
}
function setup() {

    window.BASE_SCALE_FACTOR = 10;
    window.ZONE_FACTOR = 10;

    window.stage = new createjs.Stage("demoCanvas");
    stage.enableMouseOver(10);
    createjs.Ticker.setFPS(60);
    stage.mouseEnabled = true;

    stage.addChild(BOARD_PIECE_LAYER);

    window.text = new createjs.Text("Hello World", "bold 12px Arial", "#ff7700");
    text.x = 30;
    text.y = 30;
    stage.addChild(text);
    window.text2 = new createjs.Text("Hello World", "bold 12px Arial", "#ff7700");
    text2.x = 30;
    text2.y = 50;
    stage.addChild(text2);


    stage.addEventListener("stagemousemove", function (event) {
        text.text = "(" + event.stageX + ", " + event.stageY + ")";
    });


    createjs.Ticker.addEventListener("tick", tick);

    function tick() {
        stage.update()
    }

    window.bpUI = new function () {
        this.addRecord = function (event) {
            $("#actionList").append($("<li/>").text(JSON.stringify(event.data)));
        }
    };


    window.bpBackend = new PBBackendController(new PubnubConnection());

    //log in player
    var userParam = GetURLParameter("user");
    $('#playerName').val(userParam);
    window.bpBackend.login(userParam, 'somepassword')

}

function deployBoardPiece(front, side) {
    window.bpBackend.dispatch({
        "type": window.DEPLOY_ACTION,
        "front": front,
        "side": side,
        "bpId": bpBackend.username + "_" + (++window.BOARDPIECE_COUNTER),
        "x": 0.5,//deliver fraction of stage height / width.
        "y": 0.5,
        "color": window.COLOR_DEPLOY,
        "username": bpBackend.username
    });

}

addBoardPieceToBoard = function (event) {
    console.log("Add boardpiece called " + bpBackend.username);
    var model = new Model(event.front, event.side, event.color);
    var bp = new Boardpiece(model, event.username, event.bpId);
    bp.x = stage.canvas.width * event.x;
    bp.y = stage.canvas.height * event.y;

    bp.addEventListener(BOARDPIECE_STATE, function (event) {
        event.type = BOARDPIECE_STATE;
        window.bpBackend.dispatch(event.data);
    });

    bp.addEventListener("PlayerAction", function (event) {
        window.bpUI.addRecord(event);
    });

    bp.model.addEventListener("mouseover", function (event) {
        text2.text = "(" + event.localX + ", " + event.localY + ")";
    });

    window.BOARDPIECES[event.bpId] = bp;

    BOARD_PIECE_LAYER.addChild(bp);
}

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}




