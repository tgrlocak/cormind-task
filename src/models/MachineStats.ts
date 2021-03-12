import { Number } from "@ungap/global-this";

export class MachineStats {
    id: Number;
    minCycle: Number = 0;
    maxCycle: Number = 0;
    status: Number = 0;
    processStatus: Number = 0;
    prodAmount: Number = 0;
    defectAmount: Number = 0;
    amountChange: Number = 0;
    workDuration: Number = 0;
    loadAmount: Number = 0;
    dropAmount: Number = 0;
    expectedProdAmount: Number = 0;
    failureDuration: Number = 0;
    breakDuration: Number = 0;
    availability: Number = 0;
    performance: Number = 0;
    quality: Number = 0;
    oee: Number = 0;

    constructor(id: Number, prodAmount: Number, oee: Number) {
        this.id = id;
        this.prodAmount = prodAmount;
        this.oee = oee;
    }
}