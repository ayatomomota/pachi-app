"use client";
import { useRotationData } from "../../../hooks/useRotationData";
import RotationInput from "./RotationInput";
import RotationDisplay from "./RotationDisplay";

type Props = {
  playId: string;
};

export default function RotationTable({ playId }: Props) {
  const {
    records,
    inputTotal,
    setInputTotal,
    startCount,
    setStartCount,
    average,
    error,
    isLoadingRecords,
    handleAdd,
    handleDeleteLast,
  } = useRotationData(playId);

  return (
    <div className="space-y-4">
      <RotationInput
        startCount={startCount}
        setStartCount={setStartCount}
        inputTotal={inputTotal}
        setInputTotal={setInputTotal}
        handleAdd={handleAdd}
        average={average}
        error={error}
      />
      <RotationDisplay
        isLoadingRecords={isLoadingRecords}
        records={records}
        handleDeleteLast={handleDeleteLast}
      />
    </div>
  );
}
