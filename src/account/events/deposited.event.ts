import { AccountEvent } from "./account.event";

export class DepositedEvent extends AccountEvent {
  constructor(
    public readonly aggregatedId: string,
    date: string,
    amount: number
  ) {
    super(aggregatedId, "Deposited", {
      date,
      amount
    });
  }
}