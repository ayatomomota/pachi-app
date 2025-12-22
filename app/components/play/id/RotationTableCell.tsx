import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function RotationTableCell({ children }: Props) {
  return <td className="border-b p-2 text-center text-sm">{children}</td>;
}
