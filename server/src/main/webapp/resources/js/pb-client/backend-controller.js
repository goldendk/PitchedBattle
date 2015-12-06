(function (window){


    function PBBackendController(impl){
        this.impl = impl;

        this.login = function(username, password){
            console.log("login called: " + username + " : " + password);
            this.authenticated = true;
            this.username = username;
            impl.connect(username, password);
            this.listPlayers();
            this.listGames();
        }

        this.listPlayers = function(){
            console.log("Calling list of players.");
            var _this = this;
            impl.listPlayers(
                    function(listOfPlayers){
                    var playerList = $("#playerList");
                    playerList.empty();
                    for(var key in listOfPlayers){
                        playerList.append($("<li/>").text(listOfPlayers[key].name));
                    }

                });
            if(window.bpBackend.authenticated){
                setTimeout(window.bpBackend.listPlayers, 5000);
            }
        }

        this.logout = function(){
            console.log("logout called: " + this.username);
            username = null;
            impl.disconnect();
            this.authenticated = false;
        }
        this.listGames = function(){
            console.log("list games called");
            var _this = this;
           impl.listGames( function(listOfGames){
                    $("#gameList").empty();
                    for(var key in listOfGames){
                        (function(){
                            var game = listOfGames[key];
                            if(game.id.startsWith("game_")){
                                $("#gameList").append($("<li/>").text(game.name + " - " + game.players.length).click(function(event){window.bpBackend.joinGame(game);}));
                            }

                        }());

                    }
                    if($("#gameList li").length == 0 ){
                        $("#gameList").append(
                            $("<li/>").text("No games found")
                        );
                    }


            });
            if(window.bpBackend.authenticated){
                setTimeout(window.bpBackend.listGames, 4500);
            }
        }

        this.startGame = function(){
            console.log("start game called");
            impl.startGame();
            window.COLOR_DEPLOY = COLOR_BLUE;
        }

        this.joinGame = function(game){
            console.log("join game called: " + JSON.stringify(game));
            if(game.id.indexOf(this.username) != -1){
                window.COLOR_DEPLOY = COLOR_BLUE;
            }
            else{
                window.COLOR_DEPLOY = COLOR_RED;
            }
            console.log("Set player color to :" + COLOR_DEPLOY);
            impl.joinGame(game);
        }

        this.dispatch = function(event){

            if(this.lastDispatch == null || (this.lastDispatch + DISPATCH_EVENT_DELAY) < new Date().getTime()){
                // console.log("dispatch called with : " + JSON.stringify(event));
                this.lastDispatch = new Date().getTime();
                event.username = this.username;
                impl.dispatch(event)
            }
        };
        /**
         * This method receives events from the backend and moves board-pieces on the screen accordingly.
         * Certain sequences of events will trigger different events to be throw from this instances which the application
         * can listen to.
         *
         * @param event
         */
        this.receive = function(event){
          //  console.log("receive called with : " + JSON.stringify(event));
            if(event.type == window.DEPLOY_ACTION){
                console.log("We have a deploy action");
                window.addBoardPieceToBoard(event);
            }
            else if(event.username != this.username){
                if(event.type == BOARDPIECE_STATE){
                    var bp = BOARDPIECES[event.bpId];
                    bp.setGamePostion(event.posX, event.posY);
                    bp.setGameRotation(event.rotation);
                }
                else if(event.type == "rotate"){
                    var bp = BOARDPIECES[event.bpId];

                    bp.setGameRotation(event.rotation);
                }
                else if(event.type == "translate"){
                    var bp = BOARDPIECES[event.bpId];
                    bp.setGamePostion(event.posX, event.posY);
                }
            }
        }
    }
    window.PBBackendController = PBBackendController;

}(window));