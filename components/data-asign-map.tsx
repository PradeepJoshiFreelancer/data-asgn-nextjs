"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/card";
import Table from "@/components/table";
import { inputJSONType } from "@/app/page";
import DropDownButton from "./select";
import ButtonPanel from "./button-pale";
import CheckBox from "./toggleButton";

export interface Item {
  value: string;
  changeIndicator: boolean;
  type?: string;
}

type Props = {
  rawData: { [key: string]: inputJSONType[] };
  options: { id: number; value: string; label: string }[];
};

const DataAsignMap: React.FC<Props> = ({ rawData, options }) => {
  const [data, setData] = useState<{ [key: string]: Item[] }>({});
  const [filteredData, setFilteredData] = useState<Item[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trnsOptions, setTrnsOptions] = useState(options);
  const [showRowsWithChanges, setShowRowsWithChanges] = useState(false);
  const [showChanges, setShowChanges] = useState(false);
  const [selectedTrns, setSelectedTrns] = useState("");

  useEffect(() => {
    const resultMap: { [key: string]: Item[] } | {} = {};

    Object.keys(rawData).forEach((trns: string) => {
      //@ts-ignore
      resultMap[trns] = rawData[trns].map((trnsData, index) => {
        let hasChanges = false;
        let formattedObj: Item | {} = {};

        if (index === 0) {
          formattedObj = Object.keys(rawData[trns][0]).reduce(
            (acc: { [key: string]: Item }, key) => {
              if (
                key === "JS-Trns-Id" ||
                key === "JS-Cntx-Id" ||
                key === "JS-Data-Asgn-Id" ||
                key === "JS-Data-Asgn-Mdl-Id" ||
                key === "JS-Data-Asgn-Rtrn-Cd" ||
                key === "JS-Data-Asgn-Rsn-Tx" ||
                key === "JS-Prsn-Intn-Id"
              ) {
                acc[key] = {
                  value: rawData[trns][0][key].toString(),
                  changeIndicator: true,
                  type: "header",
                };
              } else {
                acc[key] = {
                  value: rawData[trns][0][key].toString(),
                  changeIndicator: true,
                };
              }
              hasChanges = true;
              return acc;
            },
            {}
          );
        } else {
          formattedObj = Object.keys(rawData[trns][index]).reduce(
            (acc: { [key: string]: Item }, key) => {
              const value = rawData[trns][index][key].toString();
              if (
                key === "JS-Trns-Id" ||
                key === "JS-Cntx-Id" ||
                key === "JS-Data-Asgn-Id" ||
                key === "JS-Data-Asgn-Mdl-Id" ||
                key === "JS-Data-Asgn-Rtrn-Cd" ||
                key === "JS-Data-Asgn-Rsn-Tx" ||
                key === "JS-Prsn-Intn-Id"
              ) {
                acc[key] = {
                  value,
                  changeIndicator: true,
                  type: "header",
                };
              } else {
                acc[key] = {
                  value,
                  changeIndicator:
                    rawData[trns][index][key] !== rawData[trns][index - 1][key],
                };
                if (
                  rawData[trns][index][key] !== rawData[trns][index - 1][key]
                ) {
                  hasChanges = true;
                }
              }
              return acc;
            },
            {}
          );
        }

        formattedObj = {
          hasChanges: { value: hasChanges.toString(), changeIndicator: false },
          ...formattedObj,
        };

        return formattedObj;
      });
    });

    setData(resultMap);
    setCurrentIndex(0);

    if (options.length > 0) {
      setSelectedTrns(options[0].value);
      //@ts-ignore
      setFilteredData(resultMap[options[0].value]);
    }
  }, [rawData, options]);

  const buttonClickedHandler = (num: number) => {
    if (
      (num < 0 && currentIndex > 0) ||
      (num > 0 && currentIndex < filteredData.length - 1)
    ) {
      setCurrentIndex((prevState) => prevState + num);
    }
  };

  const showRowsWithChangesHandler = () => {
    setShowRowsWithChanges((prev) => !prev);
    if (showRowsWithChanges) {
      setFilteredData(data[selectedTrns]);
    } else {
      setFilteredData(
        //@ts-ignore
        data[selectedTrns].filter((item) => item["hasChanges"].value === "true")
      );
    }
    setCurrentIndex(0);
    setShowChanges(false);
  };

  if (filteredData.length === 0) return <h1>Loading the file....</h1>;

  return (
    <Card className="max-w-screen-md w-full transition-all hover:border-primary/20 shadow-lg dark:shadow-black/60 bg-white m-6 overflow-scroll">
      <CardHeader title="Data Assign Map" />
      <CardContent>
        <div className="m-6 flex justify-between">
          <div className="flex flex-col justify-center">
            <DropDownButton
              id="trnsIds"
              header="Transaction"
              options={trnsOptions}
              onChange={(e) => {
                setSelectedTrns(e.target.value);
                if (showRowsWithChanges) {
                  setFilteredData(
                    data[e.target.value].filter(
                      //@ts-ignore
                      (item) => item["hasChanges"].value === "true"
                    )
                  );
                } else {
                  setFilteredData(data[e.target.value]);
                }
                setCurrentIndex(0);
              }}
            />
          </div>
          <div className="flex flex-col justify-center m-4 min-w-48">
            <ButtonPanel
              showPrevButton={currentIndex !== 0}
              showNextButton={currentIndex !== filteredData.length - 1}
              onClickHandler={buttonClickedHandler}
            />
          </div>
        </div>

        <div className="flex justify-between m-4">
          <div className="w-1/3 flex flex-col justify-center">
            <h3>
              Current Seq: {currentIndex + 1} of {filteredData.length}
            </h3>
          </div>
          <div className="w-1/3 flex">
            {showRowsWithChanges && (
              <CheckBox
                id="showChanges"
                onClick={() => setShowChanges((prev) => !prev)}
                label="Show elements with change"
                isChecked={showChanges}
              />
            )}
          </div>
          <div className="w-1/3">
            <CheckBox
              id="showRowsWithChanges"
              onClick={showRowsWithChangesHandler}
              label="Show DA's that updated transaction"
              isChecked={showRowsWithChanges}
            />
          </div>
        </div>
        {filteredData[currentIndex] && (
          <Table item={filteredData[currentIndex]} showChanges={showChanges} />
        )}
      </CardContent>
    </Card>
  );
};

export default DataAsignMap;
