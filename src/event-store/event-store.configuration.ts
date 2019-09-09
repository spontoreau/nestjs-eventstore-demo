import { TCPConfig } from "geteventstore-promise";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EventStoreConfiguration {
  get config(): TCPConfig {
    return {
      hostname: process.env.EVENT_STORE_HOSTNAME || "localhost",
      port: parseInt(process.env.EVENT_STORE_PORT) || 1113,
      credentials: {
        username: process.env.EVENT_STORE_CREDENTIALS_USERNAME || "admin",
        password: process.env.EVENT_STORE_CREDENTIALS_PASSWORD || "changeit"
      }
    };
  }
}
