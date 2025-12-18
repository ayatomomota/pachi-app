"use client";
import { Record } from "@/types";
import Loading from "@/app/play/[id]/loading";
import RotationTableHeader from "./rotation/RotationTableHeader";
import RotationTableCell from "./rotation/RotationTableCell";

type Props = {
  isLoadingRecords: boolean;
  records: Record[];
  handleDeleteLast: () => void;
};

export default function RotationDisplay({
  isLoadingRecords,
  records,
  handleDeleteLast,
}: Props) {
  if (isLoadingRecords) {
    return (
      <div className="bg-white shadow-md rounded-xl p-4 overflow-x-auto">
        <Loading />
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-xl p-4 overflow-x-auto">
        <p className="text-gray-500 text-center mt-2 text-sm">
          記録がありません
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-4 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <RotationTableHeader header="No" />
            <RotationTableHeader header="累計回転数" />
            <RotationTableHeader header="回転数" />
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={record.id} className="hover:bg-blue-50 transition">
              <RotationTableCell>{index + 1}</RotationTableCell>
              <RotationTableCell>{record.total}</RotationTableCell>
              <RotationTableCell>{record.diff}</RotationTableCell>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleDeleteLast}
          className="text-white bg-red-500 rounded px-3 py-1 hover:bg-red-600 text-sm active:bg-red-700 active:scale-99 transition"
        >
          一番下の記録を削除
        </button>
      </div>
    </div>
  );
}
