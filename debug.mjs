import dgram from 'node:dgram';

const debug = () => {
  const server = dgram.createSocket('udp4');
  server.bind(8890);

  server.on('message', (msg) => {
    const telemetrics = msg
      .toString()
      .trim()
      .split(';')
      .reduce((acc, cur) => {
        const [key, val] = cur.split(':');
        return { ...acc, [key]: val };
      }, {});
    console.log(msg.toString());
  });
};

debug();
