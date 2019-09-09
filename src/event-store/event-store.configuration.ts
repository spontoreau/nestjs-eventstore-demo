import { TCPConfig } from "geteventstore-promise";

export class EventStoreConfiguration {
  get config(): TCPConfig {
    return {
      hostname: process.env.EVENT_STORE_HOSTNAME || 'localhost',
      port: parseInt(process.env.EVENT_STORE_PORT) || 2113,
      credentials: {
        username: process.env.EVENT_STORE_CREDENTIALS_USERNAME || 'admin',
        password: process.env.EVENT_STORE_CREDENTIALS_PASSWORD || 'changeit'
      }
    };
  }
}