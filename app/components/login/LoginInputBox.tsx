import React from "react";

type PropsType = {
  label: string;
  type: string;
  name: string;
  placeholder: string;
};

const LoginInputBox = ({ label, type, name, placeholder }: PropsType) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-200"
        placeholder={placeholder}
      />
    </div>
  );
};

export default LoginInputBox;
