import { DomainException } from "./domain-exception";

export class UnknowAccountException extends DomainException {
  constructor(accountNumber: string) {
    super(`Unknow account ${accountNumber}.`);
  }
}