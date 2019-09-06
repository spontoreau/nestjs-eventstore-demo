import { AccountEvent } from "./account.event";

export class WithdrewEvent extends AccountEvent {
  constructor(
    public readonly aggregatedId: string,
    date: string,
    amount: number
  ) {
    super(aggregatedId, "Withdrew", {
      date,
      amount
    });
  }
}