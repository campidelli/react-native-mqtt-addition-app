import { createAction } from '@reduxjs/toolkit';
import { Client, Message } from 'react-native-paho-mqtt';

const mqttStorage = {
  setItem: (key, item) => {
    mqttStorage[key] = item;
  },
  getItem: (key) => mqttStorage[key],
  removeItem: (key) => {
    delete mqttStorage[key];
  },
};

const MQTT_ADDRESS = "ws://broker.mqttdashboard.com:8000/mqtt";

const topics = {
  'RESPOND_ADDITION': 'addition/response',
};

const actions = {
  'addition/response': 'RESPOND_ADDITION',
};

export const mqttConnect = createAction('MQTT_CONNECT');
export const mqttPublish = createAction('MQTT_PUBLISH');

class ReduxMQTT {
    constructor() {
      this.client = new Client({ uri: MQTT_ADDRESS, clientId: 'MQTT Addition App', storage: mqttStorage });
    }
    reconnect(store) {
      // Ideally we would check for this.client.isConnected() and call connect() again, but it is nor working properly
      this.client = new Client({ uri: MQTT_ADDRESS, clientId: 'MQTT Addition App', storage: mqttStorage });
      this.connect(store);
    }
    connect(store) {
      this.client.connect()
        .then(() => {
          console.log('MQTT - Connected');
          Object.keys(topics).forEach(action => {
              const topic = topics[action];
              this.client.subscribe(topic);
              console.log('MQTT - Subscribed to topic: ' + topic);
          });

          this.client.on('connectionLost', (err) => {
            console.log('MQTT - Connection lost! Reason: ', err);
            this.reconnect(store);
          });

          this.client.on('messageReceived', (message) => {
            console.log('MQTT - Topic: ', message.destinationName);
            console.log('MQTT - Message: ', message.payloadString);
            store.dispatch({
                type: actions[message.destinationName],
                payload: message.payloadString
            });
          });
        })
        .catch((err) => {
          console.log('MQTT - Error: ', err);
          this.reconnect(store);
        });
    }
}

export default function createMiddleware() {
    const reduxMQTT = new ReduxMQTT();
    return store => next => action => {
        console.log('Dispatching action: ', action);
        switch (action.type) {
            case 'MQTT_CONNECT':
                reduxMQTT.connect(store);
                break;
            case 'MQTT_PUBLISH':
                const payload = action.payload;
                const message = new Message(JSON.stringify(payload.message));
                message.destinationName = payload.topic;
                reduxMQTT.client.send(message);
                break;
            default:
                return next(action);
        }
    };
}
