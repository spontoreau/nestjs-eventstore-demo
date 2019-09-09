import { IEvent } from "@nestjs/cqrs";
import { Event } from "../../event-store/event";
import { EventType } from "./event-type";

export class DepositedEvent extends Event implements IEvent {
  constructor(aggregatedId: string, date: string, amount: number) {
    super(aggregatedId, EventType.Deposited, {
      date,
      amount
    });
  }
}
