import { Number } from "@ungap/global-this";

export class Machine {
    id: Number;
    barcode: string;

    constructor(id: Number, barcode: string) {
        this.id = id;
        this.barcode = barcode;
    }

    toString() {
        return JSON.stringify(this);
    }
}