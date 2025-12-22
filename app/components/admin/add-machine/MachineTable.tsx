import { Machine } from "@/types";

type PropsType = {
  machines: Machine[];
};

const MachineTable = ({ machines }: PropsType) => {
  return (
    <table className="border">
      <thead className="bg-gray-200">
        <tr>
          <th className="border">編集</th>
          <th className="border">機器名</th>
        </tr>
      </thead>
      <tbody>
        {machines.map((machine) => (
          <tr key={machine.id}>
            <td className="border px-4 py-2">
              <button className="text-white bg-green-500 px-3 py-1 rounded whitespace-nowrap text-sm hover:bg-green-600 active:bg-green-700 active:scale-95 transition">
                編集
              </button>
            </td>
            <td className="border px-4 py-2 w-full">{machine.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MachineTable;
