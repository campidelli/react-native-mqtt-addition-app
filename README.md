# react-native-mqtt-addition-app
A PoC React Native project to assess its use alongside MQTT

Go to http://www.hivemq.com/demos/websocket-client, connect and subscribe to two topics `addition/request` and `addition/response`.

You can then use this client to send a message to topic `addition/response`, the message body must follow the format `{ "augend": "2", "addend": "3", "result": "5" }`. As soon as you send the message, the app will receive it and update its Redux state.

When you send messages from the App (clicking on CALCULATE) it will send a message to topic `addition/request`.
