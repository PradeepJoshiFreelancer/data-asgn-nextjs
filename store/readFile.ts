"use server";
import { promises as fs } from "fs";
import path from "path";

export default async function loadDataFromFile() {
  const configDirectory = path.resolve(process.cwd(), "store");

  const data = await fs.readFile(
    path.join(configDirectory, "Trace1.txt"),
    "utf8"
  );

  const lines = data.split("\n");
  const finalLines: any[] = [];

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
      finalLines.push(json);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  });
  return finalLines;

  // fs.writeFile("file.txt", JSON.stringify(finalLines), function (err) {
  //   if (err) {
  //     return console.error(err);
  //   }
  //   console.log("File created!");
  // });
  // console.log(finalLines);
}
