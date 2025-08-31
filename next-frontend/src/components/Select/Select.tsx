import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

export const Select = ({
  id = "select",
  name = "select",
  value,
  onChange,
  required,
}: {
  type?: string;
  id?: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required: boolean;
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-gray-700 font-medium mb-2"
      >
        {name.charAt(0).toUpperCase() + name.slice(1) + (required ? " *" : "")}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none "
        >
          <option value="">Select a status</option>
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>

        </select>
        <span className="absolute z-50 top-0 right-0 h-full flex items-center mr-2 pointer-events-none">
          <RiArrowDropDownLine
            size={25}
            className="pointer-events-none text-gray-500"
          />
        </span>
      </div>
    </div>
  );
};

export default Select;
