
import React, { useState } from 'react';
import { Search, Split, FileText, ArrowDownToLine, ArrowUpFromLine, Layers } from 'lucide-react';

export const CargoDistribution: React.FC = () => {
  const [subTab, setSubTab] = useState<'IMPORT' | 'EXPORT'>('IMPORT');
  const [blFilter, setBlFilter] = useState(''); 
  const [declFilter, setDeclFilter] = useState(''); 

  // Generated 20 export rows
  const exportData = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    code: `TK-${(100 + i).toString().padStart(3, '0')}`,
    partner: ['Nhà máy Nhiệt điện TB', 'Xi măng Hoàng Thạch', 'Hòa Phát Steel', 'Tôn Hoa Sen', 'Gạch Ốp Lát'][i % 5],
    commodity: ['Than đá', 'Thạch cao', 'Quặng sắt', 'Đá vôi', 'Cát'][i % 5],
    pile: `Bãi ${['A', 'B', 'C'][i % 3]} - Lô ${String((i % 3) + 1).padStart(2, '0')}`,
    requested: Math.floor(Math.random() * 5000) + 1000,
    actual: Math.floor(Math.random() * 5000),
    status: i % 3 === 0 ? 'processing' : 'completed'
  }));

  // Generated 20 import rows
  const importData = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    code: `BL-2506-${(i + 1).toString().padStart(2, '0')}`,
    partner: i % 2 === 0 ? 'MV. GLORY STAR' : 'MV. OCEAN BULK',
    commodity: ['Than đá', 'Quặng sắt', 'Thạch cao', 'Đá vôi', 'Than Cám'][i % 5],
    pile: `Bãi ${['A', 'B', 'C', 'D'][i % 4]} - Lô ${String((i % 4) + 1).padStart(2, '0')}`,
    requested: Math.floor(Math.random() * 20000) + 5000,
    actual: Math.floor(Math.random() * 5000),
    status: i < 5 ? 'processing' : 'pending'
  }));

  const rawData = subTab === 'IMPORT' ? importData : exportData;
  const currentData = rawData.filter(item => {
    if (subTab === 'IMPORT') {
      return item.code.toLowerCase().includes(blFilter.toLowerCase());
    } else {
      return item.code.toLowerCase().includes(declFilter.toLowerCase());
    }
  });

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      
      {/* Sub-tabs Navigation */}
      <div className="flex justify-center gap-4 border-b border-slate-200 pb-1">
        <button
            onClick={() => setSubTab('IMPORT')}
            className={`px-8 py-3 text-sm font-bold flex items-center gap-2 rounded-t-lg transition-all border-t-4 ${
                subTab === 'IMPORT' 
                ? 'bg-white text-blue-700 border-blue-600 shadow-sm -mb-px border-x border-slate-200 z-10' 
                : 'bg-slate-50 text-slate-500 border-transparent hover:bg-slate-100 hover:text-slate-700'
            }`}
        >
            <ArrowDownToLine size={18} />
            HÀNG NHẬP
        </button>
        <button
            onClick={() => setSubTab('EXPORT')}
             className={`px-8 py-3 text-sm font-bold flex items-center gap-2 rounded-t-lg transition-all border-t-4 ${
                subTab === 'EXPORT' 
                ? 'bg-white text-orange-600 border-orange-500 shadow-sm -mb-px border-x border-slate-200 z-10' 
                : 'bg-slate-50 text-slate-500 border-transparent hover:bg-slate-100 hover:text-slate-700'
            }`}
        >
            <ArrowUpFromLine size={18} />
            HÀNG XUẤT
        </button>
      </div>

      {/* Control Bar */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
        <div className="flex justify-between items-center flex-wrap gap-4">
           <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
                        <Split size={20} />
                    </div>
                    <h3 className="font-bold text-slate-700 text-sm uppercase">
                        {subTab === 'IMPORT' ? 'Kế Hoạch Nhập Kho & Phân Bổ' : 'Phiếu Yêu Cầu'}
                    </h3>
                </div>

                {/* Filter Inputs */}
                {subTab === 'IMPORT' ? (
                    <div className="flex flex-col">
                        <label className="text-xs text-slate-500 font-bold mb-1 uppercase">Số Vận Đơn</label>
                        <input 
                            type="text" 
                            value={blFilter}
                            onChange={(e) => setBlFilter(e.target.value)}
                            placeholder="Tìm vận đơn..."
                            className="border border-slate-300 rounded-lg px-4 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-500 w-64 shadow-sm"
                        />
                    </div>
                ) : (
                    <div className="flex flex-col">
                         <label className="text-xs text-slate-500 font-bold mb-1 uppercase">Số Tờ Khai</label>
                         <input 
                            type="text" 
                            value={declFilter}
                            onChange={(e) => setDeclFilter(e.target.value)}
                            placeholder="Tìm tờ khai..."
                            className="border border-slate-300 rounded-lg px-4 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-500 w-64 shadow-sm"
                        />
                    </div>
                )}
           </div>
           
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-600 text-sm font-bold rounded-lg hover:bg-blue-50 transition-all shadow-sm">
             <Search size={16} />
             <span>Nạp dữ liệu</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-hidden border border-slate-200 rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto max-h-[500px] custom-scrollbar">
          <table className="w-full border-collapse min-w-[900px]">
            <thead className="sticky top-0 z-10">
              <tr className={`text-xs font-bold uppercase border-b border-slate-200 shadow-sm ${subTab === 'IMPORT' ? 'bg-blue-50 text-blue-800' : 'bg-orange-50 text-orange-800'}`}>
                <th className="py-4 px-6 border-r border-white/20 w-16 text-center">STT</th>
                <th className="py-4 px-6 border-r border-white/20 text-left">
                    {subTab === 'IMPORT' ? 'Số Vận Đơn' : 'Số Tờ Khai'}
                </th>
                <th className="py-4 px-6 border-r border-white/20 text-left">
                    {subTab === 'IMPORT' ? 'Nguồn hàng / Tàu' : 'Khách hàng / Đơn vị nhận'}
                </th>
                <th className="py-4 px-6 border-r border-white/20 text-left">Loại hàng</th>
                <th className="py-4 px-6 border-r border-white/20 text-center">
                    Bãi
                </th>
                <th className="py-4 px-6 border-r border-white/20 text-right">Yêu cầu (Tấn)</th>
                <th className="py-4 px-6 border-r border-white/20 text-right">
                     {subTab === 'IMPORT' ? 'Đã nhập (Tấn)' : 'Đã giao (Tấn)'}
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
              {currentData.map((row, index) => {
                  return (
                    <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 text-center text-slate-400 font-medium">{index + 1}</td>
                      <td className="py-4 px-6 font-bold text-slate-800 flex items-center gap-2">
                          <FileText size={14} className="text-slate-400"/>
                          {row.code}
                      </td>
                      <td className="py-4 px-6 text-slate-600 font-medium">{row.partner}</td>
                      <td className="py-4 px-6 text-slate-600">{row.commodity}</td>
                      <td className={`py-4 px-6 text-center font-bold flex items-center justify-center gap-2 ${subTab === 'IMPORT' ? 'text-blue-700' : 'text-orange-700'}`}>
                          <Layers size={14} className="opacity-50"/>
                          {row.pile}
                      </td>
                      <td className="py-4 px-6 text-right font-medium">{row.requested.toLocaleString()}</td>
                      <td className="py-4 px-6 text-right text-green-600 font-bold">{row.actual.toLocaleString()}</td>
                    </tr>
                  );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
