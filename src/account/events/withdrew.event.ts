import { IEvent } from "@nestjs/cqrs";
import { Event } from "../../event-store/event";
import { EventType } from "./event-type";

export class WithdrewEvent extends Event implements IEvent  {
  constructor(aggregatedId: string, date: string, amount: number) {
    super(aggregatedId, EventType.Withdrew, {
      date,
      amount
    });
  }
}
