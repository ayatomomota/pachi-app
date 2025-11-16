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
  const [error, setError] = useState<string | null>(null);

  const handleAdd = () => {
    // バリデーション
    if (startCount === '') {
      setError('遊戯開始回転数を入力してください');
      return;
    }
    if (inputTotal === '') {
      setError('累計回転数を入力してください');
      return;
    }
    setError(null);

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
    <div className='space-y-6'>
      
      {/* 入力カード */}
      <div className='bg-white shadow-md rounded-xl p-6 space-y-4'>
        {/* エラーメッセージ */}
        {error && (
          <p className='text-red-400 font-semibold'>
            {error}
          </p>
        )}
        {/* 累計回転数 */}
        <div>
          <label className='font-semibold block mb-1'>累計回転数</label>
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
            >
              追加
            </button>
          </div>
        </div>

        {/* 平均回転数 */}
        <div className='bg-gray-50 p-4 rounded-lg border'>
          <span className='text-lg font-semibold'>平均回転数：</span>
          <span className='text-blue-700 text-xl font-bold'>{avgRotation}</span>回
        </div>
        
        {/* 遊戯開始回転数*/}
        <div>
          <label className='font-semibold block mb-1'>遊戯開始回転数：</label>
            <input
              type="number"
              value={startCount}
              onChange={(e) =>
                setStartCount(e.target.value === '' ? '' : Number(e.target.value))
              }
              className='border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-blue-400 text-black'
            />
        </div>
      </div>

      {/* テーブルカード */}
      <div className='bg-white shadow-md rounded-xl p-6 overflow-x-auto'>
        <table className='w-full border-collapse'>
          <thead>
            <tr className='bg-gray-100 text-left'>
              <th className='border-b p-3 font-semibold'>No</th>
              <th className='border-b p-3 font-semibold'>累計回転数</th>
              <th className='border-b p-3 font-semibold'>回転数</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr
                key={record.no}
                className='hover:bg-blue-50 transition'
              >
                <td className='border-b p-3 text-center'>{record.no}</td>
                <td className='border-b p-3 text-right'>{record.total}</td>
                <td className='border-b p-3 text-right'>{record.diff}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {records.length === 0 && (
          <p className='text-gray-500 text-center mt-4'>記録がありません</p>
        )}
      </div>
    </div>
  )
}