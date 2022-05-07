import Server from 'bare-server-node';
import http from 'http';
import nodeStatic from 'node-static';
import fs from 'fs';

const bare = new Server('/bare/', '');

const serve = new nodeStatic.Server('static/');
const fakeServe = new nodeStatic.Server('BlacklistServe/');

const server = http.createServer();



server.on('request', (request, response) => {
  const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

  const isLS = ip.startsWith('34.216.110') || ip.startsWith('54.244.51') || ip.startsWith('54.172.60') || ip.startsWith('34.203.250') || ip.startsWith('34.203.254') || ['18.237.145.219', '34.213.241.18', '54.184.142.71', '34.219.54.89', '52.13.31.12', '52.89.157.185', '34.208.60.206', '3.80.101.141', '54.90.242.158', '54.172.185.65', '3.83.250.144', '18.209.180.25', '54.167.181.168', '54.166.136.197',  '52.207.207.52', '54.252.242.153', '3.104.121.59', '34.253.198.121', '63.33.56.11', '34.250.114.219', '54.171.251.199'].includes(ip)

  if (isLS)
    fakeServe.serve(request, response);
  else {
    if (bare.route_request(request, response))
      return true;

    serve.serve(request, response);
  }
});

server.on('upgrade', (req, socket, head) => {
        if (bare.route_upgrade(req, socket, head))
        return;
        socket.end();
});

server.listen(8080);
