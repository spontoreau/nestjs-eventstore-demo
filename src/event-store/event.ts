export abstract class Event {
  constructor(
    public readonly streamId: string,
    public readonly eventType: string,
    public readonly data: object
  ) {}
}

