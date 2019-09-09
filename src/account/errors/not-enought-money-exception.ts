import { DomainException } from "./domain-exception";

export class NotEnougthMoneyException extends DomainException {
  constructor(accountNumber: string) {
    super(`Account ${accountNumber} don't have enougth money.`);
  }
}