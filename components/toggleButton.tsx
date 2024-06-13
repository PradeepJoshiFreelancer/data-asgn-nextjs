import { ChangeEvent } from "react";

interface CheckBoxProps {
  id: string;
  label: string;
  onClick?: (e: ChangeEvent<HTMLInputElement>) => void;
  isChecked?: boolean;
}
function CheckBox({
  id,
  label,
  onClick = () => {},
  isChecked = false,
}: CheckBoxProps) {
  return (
    <div className="flex items-start my-4">
      <input
        id={id}
        name={id}
        type="checkbox"
        value=""
        onChange={onClick}
        defaultChecked={isChecked}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor="default-checkbox"
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
}

export default CheckBox;
