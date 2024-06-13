"use client";

export interface optionInterface {
  id: number;
  value: string;
  label: string;
}

type Props = {
  id: string;
  header: string;
  showLabel?: boolean;
  options: optionInterface[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const DropDownButton = ({
  id,
  options,
  header,
  showLabel = true,
  onChange,
}: Props) => {
  return (
    <div className="max-w-sm mx-auto flex justify-center">
      {showLabel && (
        <label
          htmlFor={id}
          className="block my-4 text-sm font-medium text-gray-900 dark:text-white min-w-20"
        >
          {header}
        </label>
      )}
      <select
        id={id}
        name={id}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {options.map((item) => (
          <option key={item.id} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDownButton;
