import createServer from './utils/createServer';
import socket from 'socket.io';
import expressStatusMonitor from 'express-status-monitor';
import connectToDB from './utils/connectToDB';
import './utils/config';

const main = async () => {
  await connectToDB();

  const app = createServer();
  const server = app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')} 🚀`);
    console.log('  Press Command C to stop\n');
  });

  const io = socket(server);
  io.on('connection', (soc) => {
    console.log('Connected...');
    soc.on('disconnect', () => {
      console.log('Disconnected');
    });
  });

  app.set('socketio', io);
  app.use(expressStatusMonitor({ websocket: io }));
};

main();
