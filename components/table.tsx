import { Item } from "./data-asign-map";

type Props = {
  item: { [key: string]: Item };
  showChanges: boolean;
};

const Table = ({ item, showChanges }: Props) => {
  return (
    <div className="relative overflow-y-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-right w-1/2 text-blue-400 text-lg"
            >
              Column Name
            </th>
            <th scope="col" className="px-6 py-3 w-1/2  text-blue-400 text-lg">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(item).map(([key, value]) => {
            if (
              (!showChanges || value.changeIndicator) &&
              key !== "hasChanges"
            ) {
              return (
                <tr
                  key={key}
                  className={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ${
                    value.type && "text-lg text-blue-400"
                  }`}
                >
                  <th
                    scope="row"
                    className={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-right `}
                  >
                    {key}
                  </th>
                  <td
                    className={`x-6 py-4 ${
                      value.changeIndicator &&
                      !showChanges &&
                      value.type !== "header"
                        ? "bg-yellow-400"
                        : null
                    }`}
                  >
                    {value.value}
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
