import { Machine } from "@/types";
import { FiEdit } from "react-icons/fi";

type PropsType = {
  machines: Machine[];
};

const MachineTable = ({ machines }: PropsType) => {
  if (machines.length === 0) {
    return (
      <div className="text-center py-10 px-4 border-2 border-dashed rounded-lg">
        <p className="text-gray-500">まだ遊戯台が登録されていません。</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th scope="col" className="px-6 py-3 font-medium text-gray-600">
              機器名
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">編集</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {machines.map((machine) => (
            <tr key={machine.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900 w-full">
                {machine.name}
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-2">
                  <FiEdit />
                  編集
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MachineTable;
