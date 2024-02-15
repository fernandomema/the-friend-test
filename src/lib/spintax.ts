import { Spinner, SpinError } from "cnc-spintax"

export function spin(text: string): string {
    let s = new Spinner(text);
    return s.unspinRandom();
}