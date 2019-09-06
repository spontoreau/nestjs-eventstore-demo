import { AccountEvent } from "./account.event";

export class CreatedEvent extends AccountEvent {
  constructor(
    public readonly aggregatedId: string
  ) {
    super(aggregatedId, "Created", {});
  }
}