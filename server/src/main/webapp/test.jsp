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
    <script src="https://cdn.pubnub.com/pubnub.min.js"></script>

       <script type="text/javascript" src="resources/js/pb-client/pb-client-app.js"></script>
<script type="text/javascript">
  function init(){

    pubnub = PUBNUB.init({
      publish_key: 'pub-c-9e641560-a7a3-4102-a85c-ce656fc6f89b',
      subscribe_key: 'sub-c-21592bca-8014-11e5-a49d-02ee2ddab7fe'
    });
    pubnub.subscribe({
      channel: 'dispatch',
      message: function (message) {
        console.log(JSON.stringify(message));

      }
      , metadata: {key1: "value1", key2: "value2"}
    });



  }


  function publish(message){

    pubnub.publish({
      channel: 'dispatch',
      message: {
        user_id: 42,
        lat: -37.945,
        lng: 122.574
      }
    });

  }

  function checkChannels(){
    pubnub.here_now({ callback:function(message) {


      var s = "";
      var ss = "";


      }
    });


  }

</script>

  </head>
  <body onload="init();">

  <table>
    <tr>
      <td>
        <h4>Login</h4>
        <input type="text" value="playerb" id="message"/>
        <button onclick="publish($('#message').val());return false;">Login</button>
        <button onclick="checkChannels(); return false;">Get channels</button>
      </td>
      <td>
        <h4>Player list</h4>
        <ul id="playerList">
          <li>No players yet. Login first</li>
        </ul>

      </td>
      <td>
        <h4>Games</h4>
        <ul id="gameList">
          <li>No games loaded. Login first.</li>
        </ul>
      </td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>

  </table>


  <form style="display: inline-block;float: left;">
      <table>
        <tr>
          <td></td>
          <td></td>
        </tr>

      </table>


  </form>

  <canvas id="demoCanvas" style="border: solid 1px grey; display: inline-block;" width="720" height="900"></canvas>

  <ol id="actionList" style="border: solid 1px black;
    display: inline-block;
    vertical-align: top;
    width: 400px;">

  </ol>
  </body>
</html>
