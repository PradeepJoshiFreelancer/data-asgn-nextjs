"use client";
import ButtonPanel from "@/components/button-pale";
import { Card, CardContent, CardHeader } from "@/components/card";
import DropDownButton from "@/components/select";
import Table from "@/components/table";
import CheckBox from "@/components/toggleButton";
import { useEffect, useState } from "react";
import loadDataFromFile from "@/store/readFile";
import { inputJSONType } from "@/app/page";

export interface Item {
  value: string | number | undefined;
  changeIndicator: boolean;
  type?: string;
}

export type TransformedDataItem = {
  id: number;
  value: string;
  label: string;
};

type Props = {
  rawData: inputJSONType[];
};

export default function DataAsignMap({ rawData }: Props) {
  const [data, setData] = useState<{ [key: string]: Item }[] | []>([]);
  const [filteredData, setFilteredData] = useState<
    { [key: string]: Item }[] | []
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trnsOptions, setTrnsOptions] = useState<TransformedDataItem[] | []>(
    []
  );
  const [showRowsWithChanges, setShowRowsWithChanges] = useState(false);
  const [showChanges, setShowChanges] = useState(false);
  const [selectedTrns, setSelectedTrns] = useState("");

  useEffect(() => {
    const options: TransformedDataItem[] = [];
    let count = 1;
    const formattedData = [];

    for (let i = 0; i < rawData.length; i++) {
      let hasChanges = "false";
      console.log(Object.keys(rawData[i]));

      if (rawData[i]["JS-Trns-Id"]) {
        const trnsId = JSON.stringify(rawData[i]["JS-Trns-Id"]);

        const exitingIndex = options.findIndex((item) => item.value === trnsId);
        if (exitingIndex === -1) {
          options.push({
            id: count++,
            value: trnsId,
            label: trnsId,
          });
        }
      }
      let formatedObj = {};
      if (i === 0) {
        formatedObj = Object.keys(rawData[0]).reduce(
          (
            acc: {
              [key: string]: Item;
            },
            key
          ) => {
            hasChanges = "true";
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
                value: rawData[0][key],
                changeIndicator: true,
                type: "header",
              };
            } else {
              acc[key] = {
                //@ts-ignore
                value: rawData[0][key],
                changeIndicator: true,
              };
            }
            return acc;
          },
          {}
        );
      } else {
        let changeIndicator = false;
        formatedObj = Object.keys(rawData[i]).reduce(
          (acc: { [key: string]: Item }, key) => {
            //@ts-ignore
            const value = rawData[i][key];
            if (
              key === "JS-Trns-Id" ||
              key === "JS-Cntx-Id" ||
              key === "JS-Data-Asgn-Id" ||
              key === "JS-Data-Asgn-Mdl-Id" ||
              key === "JS-Data-Asgn-Rtrn-Cd" ||
              key === "JS-Data-Asgn-Rsn-Tx" ||
              key === "JS-Prsn-Intn-Id"
            ) {
              acc[key] = { value, changeIndicator: true, type: "header" };
            } else {
              changeIndicator =
                //@ts-ignore
                rawData[i][key] !== rawData[i - 1][key].value ? true : false;
              acc[key] = { value, changeIndicator };
            }
            if (changeIndicator && hasChanges === "false") hasChanges = "true";

            return acc;
          },
          {}
        );
        formatedObj = {
          hasChanges: { value: hasChanges, changeIndicator: false },
          ...formatedObj,
        };
        formattedData.push(formatedObj);
      }
    }

    console.log(formattedData);

    setData(formattedData);
    setTrnsOptions(options);
    if (options.length > 0) {
      setSelectedTrns(options[0].value);

      setFilteredData(
        formattedData.filter((item) => {
          //@ts-ignore
          return JSON.stringify(item["JS-Trns-Id"].value) === options[0].value;
        })
      );
    }
  }, []);

  const buttonClickedHandller = (num: number) => {
    if (
      (num < 0 && currentIndex > 0) ||
      (num > 0 && currentIndex < filteredData.length)
    ) {
      setCurrentIndex((prevState) => prevState + num);
    }
  };

  const showRowsWithChangesHandller = () => {
    setShowRowsWithChanges((prevValue) => !prevValue);
    if (!showRowsWithChanges) {
      setFilteredData(
        data.filter((item) => {
          return (
            item.hasChanges.value === "true" &&
            //@ts-ignore
            item["JS-Trns-Id"].value.toString() === selectedTrns
          );
        })
      );
    } else
      setFilteredData(
        data.filter(
          //@ts-ignore
          (item) => item["JS-Trns-Id"].value.toString() === selectedTrns
        )
      );
    setCurrentIndex(0);
    setShowChanges(false);
  };

  if (filteredData.length === 0) return <h1>Loaing the file....</h1>;

  return (
    <Card className="max-w-screen-md w-full transition-all hover:border-primary/20 shadow-lg dark:shadow-black/60 bg-white m-6 overflow-scroll">
      <CardHeader title="Data Asign Map" />
      <CardContent>
        <div className="m-6 flex justify-between">
          <div className="flex flex-col justify-center">
            <DropDownButton
              id="trnsIds"
              header="Trnsaction"
              options={trnsOptions}
              onChange={(e) => {
                setSelectedTrns(e.target.value);
                if (!showRowsWithChanges) {
                  setFilteredData(
                    data.filter(
                      (item) =>
                        item.hasChanges.value === "true" &&
                        //@ts-ignore
                        item["JS-Trns-Id"].value.toString() === e.target.value
                    )
                  );
                } else
                  setFilteredData(
                    data.filter(
                      (item) => item["JS-Trns-Id"].value === e.target.value
                    )
                  );
                setCurrentIndex(0);
              }}
            />
          </div>
          <div className="flex flex-col justify-center m-4 min-w-48">
            <ButtonPanel
              showPrevButton={currentIndex !== 0}
              showNextButton={currentIndex !== filteredData.length - 1}
              onClickHandller={buttonClickedHandller}
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
                id={"showChanges"}
                onClick={() => setShowChanges(!showChanges)}
                label={"Show elements with change"}
                isChecked={showChanges}
              />
            )}
          </div>
          <div className="w-1/3">
            <CheckBox
              id={"showRowsWithChanges"}
              onClick={showRowsWithChangesHandller}
              label={"Show DA's that updated trnsaction"}
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
}