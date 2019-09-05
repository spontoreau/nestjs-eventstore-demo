import { TCPConfig } from "geteventstore-promise";

export class EventStoreConfiguration {
  get config(): TCPConfig {
    return {
      credentials: {
        username: process.env.STORE_CREDENTIALS_USERNAME,
        password: process.env.STORE_CREDENTIALS_PASSWORD
      }
    };
  }
}