import { AccountEvent } from "./account.event";

export class DepositedEvent extends AccountEvent {
  constructor(aggregatedId: string, date: string, amount: number) {
    super(aggregatedId, "Deposited", {
      date,
      amount
    });
  }
}
