import { Event } from "../../event-store/event";
import { EventType } from "./event-type";

export class WithdrewEvent extends Event {
  constructor(aggregatedId: string, date: string, amount: number) {
    super(aggregatedId, EventType.Withdrew, {
      date,
      amount
    });
  }
}
