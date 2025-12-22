import React from "react";

type LabelRowProps = {
  label: string;
  children: React.ReactNode;
};

export default function RotationLabel({ label, children }: LabelRowProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-600">{label}</label>
      {children}
    </div>
  );
}
