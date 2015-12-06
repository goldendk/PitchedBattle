<%--
  Created by IntelliJ IDEA.
  User: Karl-JohanV
  Date: 18-10-2015
  Time: 08:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>test</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="https://code.createjs.com/preloadjs-0.6.1.min.js"></script>
    <script src="https://cdn.pubnub.com/pubnub.min.js"></script>

    <script type="text/javascript" src="resources/js/createjs/easeljs-0.8.1.min.js"></script>
    <script type="text/javascript" src="resources/js/pb-client/unit.js"></script>
    <script type="text/javascript" src="resources/js/pubnub/pubnub-connection.js"></script>
    <script type="text/javascript" src="resources/js/pb-client/backend-connection.js"></script>
    <script type="text/javascript" src="resources/js/pb-client/backend-controller.js"></script>
    <script type="text/javascript" src="resources/js/pb-client/zones.js"></script>
    <script type="text/javascript" src="resources/js/pb-client/zone-control.js"></script>
    <script type="text/javascript" src="resources/js/pb-client/translate-control.js"></script>
    <script type="text/javascript" src="resources/js/pb-client/rotate-control.js"></script>
    <script type="text/javascript" src="resources/js/pb-client/model.js"></script>
    <script type="text/javascript" src="resources/js/pb-client/boardpiece.js"></script>

    <style type="text/css">
      #gameList li{
        cursor: pointer;
        text-decoration: underline;
      }

    </style>
    <script type="text/javascript" src="resources/js/pb-client/pb-client-app.js"></script>
  </head>
  <body onload="init();">


  <div style="display: inline-block;float: left;">
      <table>
        <tr>
          <td>Front</td>
          <td><input type="text" id="front" value="4"/> </td>
        </tr>
        <tr>
          <td>Side</td>
          <td><input type="text" id="side" value="2" /> </td>

        </tr>
        <tr>
          <td>Deploy unit</td>
          <td><button onclick="deployBoardPiece($('#front').val(), $('#side').val()); return false;">Deploy Unit</button></td>
        </tr>

        <tr>
          <td>
            <h4>Login</h4>
            <input type="text" value="playerb" id="playerName"/>
            <button onclick="window.bpBackend.login($('#playerName' ).val(),'somepassword' ); return false;">Login</button>
          </td>
          </tr>
        <tr>
          <td>
            <h4>Player list</h4>
            <ul id="playerList">
              <li>No players yet. Login first</li>
            </ul>

          </td>
          </tr>
        <tr>
          <td>
            <h4>Games</h4>
            <ul id="gameList">
              <li>No games loaded. Login first.</li>
            </ul>
          </td>
          <tr/>
        <tr>
        <td>
            <button onclick="window.bpBackend.startGame()">Start Game</button>

          </td>
        </tr>

        </tr>



      </table>


  </div>

  <canvas id="demoCanvas" style="border: solid 1px grey; display: inline-block;" width="360" height="240"></canvas>

  <ol id="actionList" style="border: solid 1px black;
    display: inline-block;
    vertical-align: top;
    width: 400px;">

  </ol>
  </body>
</html>
