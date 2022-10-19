// This file will handle the websocket that connects to the binance server
// to fetch the orderbook changes

//  This is the API to get the market data 

// The project use binance API

const Websocket = require('ws');
const events = require('events');

// This is the binance API
let binancews = {
  EE: new events(), 
  ws: '',
  switchSymbol({ symbol }) {
    if (binancews.ws) binancews.ws.terminate();
    binancews.ws = new Websocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth`
    );
    binancews.ws.on('message', binancews.processStream);
  },
  processStream(payload) {
    const pl = JSON.parse(payload);
    binancews.EE.emit('OBUPDATES', pl);
  },
};

module.exports = binancews;
