import { COMMAND_PORT, DRONE_IP } from './config.mjs';
import createDrone from './drone.mjs';

const execute = async (...commands) => {
  for (const command of commands) {
    await command();
    console.log('-------------------------------');
  }
};

const drone = createDrone(DRONE_IP, COMMAND_PORT);
drone.connect();

execute(
  drone.command.takeoff(),
  drone.command.forward(50),
  drone.command.backward(50),
  drone.command.left(50),
  drone.command.right(50),
  drone.command.land()
)
  .catch((error) => console.log(error))
  .finally(drone.disconnect);
