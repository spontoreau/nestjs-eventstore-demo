import { DomainException } from "./domain-exception";

export class AccountAlreadyExistsException extends DomainException {
  constructor(accountNumber: string) {
    super(`Account already exists: ${accountNumber}.`);
  }
}