(function (window) {


    function PubnubConnection() {
        PubnubConnection.PLAYER_LOBBY_NAME = "playerLobby";


        this.connect = function (username, password) {
            this.pubnub = PUBNUB.init({
                publish_key: 'pub-c-9e641560-a7a3-4102-a85c-ce656fc6f89b',
                subscribe_key: 'sub-c-21592bca-8014-11e5-a49d-02ee2ddab7fe',
                uuid: username
            });
            this.username = username;

            this.pubnub.subscribe({
                channel: PubnubConnection.PLAYER_LOBBY_NAME,
                presence: function (m) {
                    console.log(m)
                },
                message: function (m) {
                    console.log(m)
                }
            });
        }

        this.createGameName = function(){
            return "game_" + this.username + "_" + (new Date().getTime());
        }

        this.listPlayers = function (callback) {
            this.pubnub.here_now({
                channel: PubnubConnection.PLAYER_LOBBY_NAME,
                callback: function (m) {
                    var playerList = [];
                    for (var key in m.uuids) {
                        playerList.push({"id": m.uuids[key], "name": m.uuids[key]});
                    }
                    callback.apply(callback, [playerList]);
                }
            });
        }


        this.disconnect = function () {
            this.pubnub.disconnect();
        }
        this.listGames = function (callback) {
            this.pubnub.here_now({
                    callback: function (m) {
                        var channelList = m.channels;
                        var gameList = [];
                        for (var key in channelList) {
                            if (key.startsWith("game_")) {
                                gameList.push({"id": key, name: key, players: channelList[key].uuids});
                            }
                        }
                        callback.apply(callback, [gameList]);
                    }
                }
            );
        }

        this.startGame = function () {
            var gameName = this.createGameName();
            this.joinGame({id: gameName, name: gameName});

        }

        this.joinGame = function (game) {
            this.gameName = game.id;
            var _this = this;
            this.pubnub.subscribe({
                channel: _this.gameName,
                message: function(m){ _this.receive(m)},
                error: function (error) {
                    // Handle error here
                    console.log(JSON.stringify(error));
                }
            });
        }

        this.dispatch = function (event) {
            this.pubnub.publish({
                channel: this.gameName,
                message: event,
                callback : function(m){
                    if(m[0] != 1){
                        console.log("Failed to send message : " + JSON.stringify(event));
                    }
                }
            });
        };
        this.receive = function (event) {
          //  console.log("receive called with : " + JSON.stringify(event));
            bpBackend.receive(event);
        }

    }


    window.PubnubConnection = PubnubConnection;

}(window));