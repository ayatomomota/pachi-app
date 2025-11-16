'use client'
import { useState } from 'react'

type Record = {
  no: number;
  total: number;
  diff: number;
};

export default function RotationTable() {
  const [records, setRecords] = useState<Record[]>([]);
  const [inputTotal, setInputTotal] = useState<number | ''>('');
  const [startCount, setStartCount] = useState<number | ''>('');

  const handleAdd = () => {
    if (inputTotal === '' || startCount ==='') return;

    const total = Number(inputTotal);
    
    // 1回目だけ遊戯開始回転数を基準に計算
    let diff = 0;
    if (records.length === 0) {
      diff = total - Number(startCount);
    } else {
      diff = total - records[records.length - 1].total;
    }

    if (diff < 0) diff = 0;

    const newRecord: Record = {
      no: records.length + 1,
      total,
      diff,
    };

    setRecords([...records, newRecord]);
    setInputTotal('');
  };

  const avgRotation = records.length > 0
    ? Math.round(
      records.reduce((sum, r) => sum + r.diff, 0) / records.length
    ) : 0;
  return (
    <div className='bg-white p-4 shadow rounded text-black'>
      
      {/* 入力欄 */}
      <div className='flex gap-2 mb-4'>
        <input
          type="number"
          value={inputTotal}
          onChange={(e) =>
            setInputTotal(e.target.value === '' ? '' : Number(e.target.value))
          }
          className='border p-2 rounded'
          placeholder='累計回転数を入力'
        />
        <button
          onClick={handleAdd}
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >追加</button>
      </div>

      {/* 平均回転数 */}
      <div className='mb-4 text-lg font-semibold'>
        平均回転数：{avgRotation} 回
      </div>
      
      {/* 遊戯開始回転数*/}
      <div className='mb-4'>
      <label className='font-semibold'>遊戯開始回転数：</label>
        <input
          type="number"
          onChange={(e) =>
            setStartCount(e.target.value === '' ? '' : Number(e.target.value))
          }
          className='border p-2 rounded'
        />
      </div>
      {/* 回転数テーブル */}
      <table className='w-full border-collapse'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='border p-2'>No</th>
            <th className='border p-2'>累計回転数</th>
            <th className='border p-2'>回転数</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.no}>
              <td className='border p-2 text-center'>{record.no}</td>
              <td className='border p-2 text-right'>{record.total}</td>
              <td className='border p-2 text-right'>{record.diff}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}