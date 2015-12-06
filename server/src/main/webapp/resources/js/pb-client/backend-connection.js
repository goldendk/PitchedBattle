(function(window) {

    /**
     * API for the back-end connections. Implementations should contain the actual  logic connecting
     * the external back-end to the PitchedBattle application.
     * @constructor
     */
    function DummybackendConnection() {

        /**
         * connects to the back-end. Called when logging in.
         * @param username
         * @param password
         */
        this.connect = function (username, password) {
            console.log("connect called: " + username + " : " + password);
            this.username = username;
        }
        /**
         * Disconnects from the external service.
         */
        this.disconnect = function () {
            console.log("Disconnect called: " + this.username);
        }
        /**
         * Lists games. Calls the callback with an array of Games.
         * A game: { id: <id>, name: <name>, players: [ "aPlayer", "bPlayer"] }
         * @param callback
         */
        this.listGames = function (callback) {
            console.log("list games called");
        }
        /**
         * List players in lobby. Calls the callback with an array of players.
         * A Player: { id: <id>, name: <name>}
         * @param callback
         */
        this.listPlayers = function (callback) {
            console.log("list players called");
        }

        this.startGame = function (data, callback) {
            console.log("start game called");
        }

        this.joinGame = function (data, callback) {
            console.log("join game called");
        }

        this.dispatch = function (event) {
            console.log("dispatch called with : " + JSON.stringify(event));
        };
        this.receive = function (event) {
            console.log("receive called with : " + JSON.stringify(event));
        }
    }
})(window);