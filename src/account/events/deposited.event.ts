import { Event } from "../../event-store/event";
import { EventType } from "./event-type";

export class Deposited extends Event {
  constructor(aggregatedId: string, date: string, amount: number) {
    super(`account-${aggregatedId}`, EventType.Deposited, {
      date,
      amount
    });
  }
}
