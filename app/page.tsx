import DataAsignMap from "@/components/data-asign-map";
import { promises as fs } from "fs";

export interface inputJSONType {
  "JS-Trns-Id"?: number;
  "JS-Cntx-Id"?: number;
  "JS-Data-Asgn-Id"?: number;
  "JS-Data-Asgn-Mdl-Id"?: string;
  "JS-Data-Asgn-Rtrn-Cd"?: string;
  "JS-Data-Asgn-Rsn-Tx"?: string;
  "JS-Prsn-Intn-Id"?: number;
  "JS-Prsn-Opt-EfBegDt"?: string;
  "JS-Elec-Opt-Lbl-Cd"?: string;
  "JS-Elec-Side-Fund-At"?: number;
  "JS-Elec-Opt-Tax-Cd"?: string;
  "JS-Elec-Opt-Rspn-Cd"?: string;
  "JS-Actl-Opt-Id"?: number;
  "JS-Actl-Opt-Lbl-Cd"?: string;
  "JS-Actl-Opt-Rspn-Cd"?: string;
  "JS-Actl-Side-Fund-At"?: number;
  "JS-Actl-Opt-Tax-Cd"?: string;
  "JS-Low-Cost-Pr-At"?: number;
  "JS-Dtbs-Stat-Cd"?: string;
  "JS-Calc-DtBs-Stat-Cd"?: string;
  "JS-Elec-Mthd-Cd"?: string;
  "JS-Elec-Part-Cv-Cd"?: string;
  "JS-Actl-Part-Cv-Cd"?: string;
  "JS-Prsn-SA-EfBegDt"?: string;
  "JS-SA-Id"?: number;
  "JS-RPP-At"?: number;
  "JS-SA-Elec-Mthd-Cd"?: string;
  "JS-YTD-Ctrb-At"?: number;
  "JS-Carr-Prcs-Id"?: number;
  "JS-SACalcDtBs-Stat-Cd"?: string;
  "JS-Pysc-Id"?: number;
  "JS-Trns-Rfrs-Cd"?: string;
  "JS-HSA-Mntn-Ind-Cd"?: string;
  "JS-Syst-PrsnSAEfBegDt"?: string;
  "JS-Top-Sugg-Type-Cd"?: string;
  "JS-Top-Sugg-Scor-Vl"?: number;
  "JS-Top-Sugg-TotCtrbAt"?: number;
}

export default async function Home() {
  const file = await fs.readFile(process.cwd() + "/store/Trace1.txt", "utf8");

  const lines = file.split("\n");
  let finalLines: inputJSONType | [] = [];

  lines.forEach((line, i) => {
    let finalLine = line.trim().replace(/^\s+|\s+$/gm, "");
    try {
      if (finalLine.slice(-4) === "}}0}") {
        finalLine = finalLine.replace("}}0}", "}");
      } else if (finalLine.slice(-1) === "}") {
        const regex = /}+$/;
        finalLine = finalLine.replace(regex, "}");
      } else {
        finalLine = finalLine + "}";
      }
      const json = JSON.parse(finalLine);
      //@ts-ignore
      finalLines.push(json);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  });
  //   console.log(finalLines);

  return (
    <div className="flex justify-center w-full h-screen bg-gray-300">
      <DataAsignMap rawData={finalLines} />
    </div>
  );
}
