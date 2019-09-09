export function isValidEvent(
  value: any
): value is { streamId: string; eventType: string; data: Object } {
  return value.streamId && value.eventType && value.data;
};