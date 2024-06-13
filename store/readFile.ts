"use server";
import fs from "fs-extra";
import path from "path";

export default async function loadDataFromFile() {
  const finalLines: any[] = [];

  try {
    const configDirectory = path.resolve(process.cwd(), "store");
    console.log(configDirectory);
    console.log(path.join(configDirectory, "Trace1.txt"));

    const data = await fs.readFile(
      path.join(configDirectory, "Trace1.txt"),
      "utf8"
    );

    const lines = data.split("\n");

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
  } catch (error) {
    console.log("Error reading file:", error);
  }
  return finalLines;

  // fs.writeFile("file.txt", JSON.stringify(finalLines), function (err) {
  //   if (err) {
  //     return console.error(err);
  //   }
  //   console.log("File created!");
  // });
  // console.log(finalLines);
}
