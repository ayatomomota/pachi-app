import { Machine } from "./machine";

export type Play = {
  id: string;
  machineId: string;
  playDate: Date;
  average: number;
  startCount: number;
  machine: Machine;
};
