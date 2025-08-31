import React from "react";

export const TextInput = ({
  type = "text",
  id = "text",
  name = "text",
  value,
  onChange,
  required,
}: {
  type?: string;
  id?: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="">
        {name.charAt(0).toUpperCase() + name.slice(1) + (required ? " *" : "")}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={required}
      />
    </div>
  );
};

export default TextInput;
