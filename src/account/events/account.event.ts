import { IEvent } from "@nestjs/cqrs";

export type EventType = "Created" | "Deposited" | "Withdrew"

export abstract class AccountEvent implements IEvent {
  constructor(
    public readonly streamName: string,
    public readonly type: EventType,
    public readonly data: object
  ) {

  }
}