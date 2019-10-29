import { DomainException } from "./domain-exception";

export class AccountAlreadyExistsException extends DomainException {
  constructor(accountNumber: string) {
    super(`Account ${accountNumber} already exists.`);
  }
}
