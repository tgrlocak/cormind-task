import XLSX from "xlsx";
import { Machine } from "../models/Machine";
import { AuthorizationService } from "./authorization.service";
import { DataService } from "./data.service";

const authService = new AuthorizationService();
const dataService = new DataService();

export class FileService {
  async process(file: File) {
    const success = await authService.login();

    if (!success) {
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      this.handleFile(reader.result);
    };

    reader.readAsArrayBuffer(file);
  }

  async handleFile(file: any) {
    const wb = XLSX.read(file, { type: "buffer" });
    const ws = wb.Sheets[wb.SheetNames[0]];

    for (let key in ws) {
      if (key.startsWith("B") && !!ws[key] && ws[key]["w"].startsWith("*")) {
        const cellValue = ws[key]["w"];

        const barcode = cellValue.split("*")[1];
        const field = cellValue.split("*")[2];

        const result = await this.getMachineValues(barcode, field);
        ws[key].v = result;
      }
    }

    XLSX.writeFile(wb, "Cormind-Updated.xlsx");
  }

  async getMachineValues(barcode: string, field: string) {
    const machines = await dataService.getMachines();

    const filtered = machines.filter((m) => m.barcode === barcode);

    if (filtered && filtered.length > 0) {
      return await this.getMachineStats(filtered[0], field);
    }
  }

  async getMachineStats(machine: Machine, field: string) {
    const stats = await dataService.getMachineStats(machine.id);
    let value = null;

    switch (field) {
      case "prodAmount":
        value = stats.prodAmount;
        break;
      case "oee":
        value = stats.oee;
        break;
      default:
        break;
    }

    return value;
  }
}
