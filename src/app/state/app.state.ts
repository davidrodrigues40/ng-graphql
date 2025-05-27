import { signal, WritableSignal } from "@angular/core";

export class LocalStorageSignal<T> {
   private readonly _signal: WritableSignal<T>;

   constructor(private readonly key: string, defaultValue: T) {
      // Initialize the signal with a value from localStorage or the default value
      const storedValue = localStorage.getItem(this.key);
      const initialValue = storedValue !== null ? (JSON.parse(storedValue) as T) : defaultValue;

      this._signal = signal(initialValue);
   }

   get(): T {
      return this._signal();
   }

   // Set a new value and persist it to localStorage
   set(value: T): void {
      localStorage.setItem(this.key, JSON.stringify(value));
      this._signal.set(value);
   }

   // Update the value using a function and persist it to localStorage
   update(updater: (currentValue: T) => T): void {
      const newValue = updater(this._signal());
      localStorage.setItem(this.key, JSON.stringify(newValue));
      this._signal.set(newValue);
   }
}

export function localStorageSignal<T>(key: string, initialValue: T) {
   return new LocalStorageSignal<T>(key, initialValue);
}

export class AppState {
   static readonly displayMode: LocalStorageSignal<'light' | 'dark'> = localStorageSignal('displayMode', 'light');
   static readonly clipboardText: WritableSignal<string> = signal('');
}