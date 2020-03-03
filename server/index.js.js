const express = require('express');
const path = require('path');
const http = require('http');
const ws = require('ws');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();

// HTTP Server

// app.use(express.static(path.join(__dirname, '../../dist/websocket-charts')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../dist/websocket-charts/index.html'));
// });

const port = process.env.PORT || 8000;
const server = http.createServer(app);
const filepath = './index-1283.csv';

server.listen(port, () => {
  console.log(`HTTP server running on port ${port}...`);
});

// WebSocket Server
function printing(){console.log('created socket');}
const wsPort = 8088;
const wsServer = new ws.Server({port: wsPort});

console.log(`WebSocket server is running on port ${wsPort}...`);
p =fs.createReadStream(filepath)
                      .pipe(csv())
                      .on('data', (row) => {
                        date=row['DATE'],
                        cls =row['CLS']
                        // console.log(date,cls);
                      });

wsServer.on('connection',
           websocket => {
              printing();
                setInterval(() => {
                  // Broadcasting to all clients
                  printing();
                  p = Math.random() * 20 + 10;
                  wsServer.clients.forEach(

                    client => client.send(JSON.stringify({
                      
                      close: p,
                      high : p*1.2,
                      low : p*0.9,
                      open : p*1.2-p*0.3*Math.random(),
                      time: new Date()
                      
                    })));
                }, 2000);

                // websocket.on('message', message => {
                //   const now = new Date();
                //   wsServer.clients.forEach(
                //     client => client.send(JSON.stringify({
                //       text: message,
                //       time: now })));
                // });
           });
