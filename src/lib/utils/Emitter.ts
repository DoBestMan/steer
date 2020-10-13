export type EmitterCallback<T> = (data: T) => void;

export class Emitter<T> {
  private subscribers: EmitterCallback<T>[] = [];

  emit(data: T) {
    const callbacks = this.subscribers;

    callbacks.forEach((callback) => {
      callback.call(null, data);
    });
  }

  on(newCallback: EmitterCallback<T>) {
    this.subscribers.push(newCallback);
  }

  off(callbackToRemove: EmitterCallback<T>) {
    this.subscribers = this.subscribers.filter(
      (callback) => callback !== callbackToRemove,
    );
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  DEBUG_destroy() {
    this.subscribers = [];
  }
}
