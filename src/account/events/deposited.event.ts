import { Event } from "../../event-store/event";
import { EventType } from "./event-type";

export class DepositedEvent extends Event {
  constructor(aggregatedId: string, date: string, amount: number) {
    super(aggregatedId, EventType.Deposited, {
      date,
      amount
    });
  }
}
