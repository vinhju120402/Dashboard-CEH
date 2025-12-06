
import React, { useState } from 'react';
import { Search, Database, Layers, Filter, Ship } from 'lucide-react';

interface YardStorageProps {
    mode: 'ship' | 'mixed';
}

export const YardStorage: React.FC<YardStorageProps> = ({ mode }) => {
  const isShipMode = mode === 'ship';
  const [yardFilter, setYardFilter] = useState('');
  const [shipFilter, setShipFilter] = useState('MV. GLORY STAR');
  
  // Generated 20 rows of storage data
  const storageData = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    pile: `Bãi ${['A', 'B', 'C', 'D'][i % 4]} - Lô ${String(Math.floor(i / 4) + 1).padStart(2, '0')}`,
    commodity: ['Than Cám 3a', 'Quặng Sắt', 'Than Bituminous', 'Đá Vôi', 'Thạch Cao'][i % 5],
    ship: i % 3 === 0 ? 'MV. GLORY STAR' : i % 3 === 1 ? 'MV. OCEAN BULK' : 'MV. OLD SHIP',
    quantity: Math.floor(Math.random() * 5) + 1,
    weight: Math.floor(Math.random() * 10000) + 5000,
    inventory: Math.floor(Math.random() * 5000) + 1000,
    lastUpdate: '10:00 17/06',
  }));

  const filteredData = storageData.filter(item => {
    let matchesShip = true;
    let matchesYard = true;

    // Filter by Ship (only in Ship mode)
    if (isShipMode) {
        matchesShip = item.ship === shipFilter;
    }

    // Filter by Yard (in both modes)
    if (yardFilter) {
        matchesYard = item.pile.includes(yardFilter);
    }

    return matchesShip && matchesYard;
  });

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      {/* Control Bar */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="flex items-center gap-6 w-full md:w-auto flex-wrap">
                <div className="flex items-center gap-3 mr-2">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                        <Database size={20} />
                    </div>
                    <h3 className="font-bold text-slate-700 text-sm uppercase whitespace-nowrap">
                        {isShipMode ? 'Hàng tồn theo tàu' : 'Hàng tồn bãi trộn'}
                    </h3>
                </div>
                
                {/* Ship Filter - Only for Ship Mode */}
                {isShipMode && (
                    <div className="flex flex-col">
                        <label className="text-xs text-slate-500 font-bold mb-1 uppercase">Chọn Tàu</label>
                        <div className="relative">
                            <select 
                                value={shipFilter}
                                onChange={(e) => setShipFilter(e.target.value)}
                                className="border border-slate-300 rounded-lg pl-9 pr-4 py-2 text-sm font-bold text-blue-900 focus:outline-none focus:border-blue-500 bg-slate-50 min-w-[200px] shadow-sm appearance-none"
                            >
                                <option value="MV. GLORY STAR">MV. GLORY STAR (V.2506)</option>
                                <option value="MV. OCEAN BULK">MV. OCEAN BULK (V.2502)</option>
                                <option value="MV. OLD SHIP">MV. OLD SHIP (V.2501)</option>
                            </select>
                            <Ship size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                        </div>
                    </div>
                )}

                {/* Yard Filter - For Both Modes */}
                <div className="flex flex-col">
                    <label className="text-xs text-slate-500 font-bold mb-1 uppercase">Lọc theo Bãi</label>
                    <div className="relative">
                        <select 
                            value={yardFilter}
                            onChange={(e) => setYardFilter(e.target.value)}
                            className="border border-slate-300 rounded-lg pl-9 pr-8 py-2 text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 bg-white min-w-[180px] shadow-sm appearance-none"
                        >
                            <option value="">Tất cả bãi</option>
                            <option value="Bãi A">Bãi A</option>
                            <option value="Bãi B">Bãi B</option>
                            <option value="Bãi C">Bãi C</option>
                            <option value="Bãi D">Bãi D</option>
                        </select>
                        <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                    </div>
                </div>
           </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-600 text-sm font-bold rounded-lg hover:bg-blue-50 transition-all shadow-sm ml-auto">
             <Search size={16} />
             <span>Nạp dữ liệu</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-hidden border border-slate-200 rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto max-h-[600px] custom-scrollbar">
          <table className="w-full border-collapse min-w-[1200px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-200 shadow-sm">
                <th className="py-4 px-6 border-r border-slate-100 w-16 text-center bg-slate-50">STT</th>
                <th className="py-4 px-6 border-r border-slate-100 text-left bg-slate-50">Bãi / Lô</th>
                <th className="py-4 px-6 border-r border-slate-100 text-left bg-slate-50">Loại hàng</th>
                {/* Show Ship column if in mixed mode to identify source */}
                {!isShipMode && <th className="py-4 px-6 border-r border-slate-100 text-left bg-slate-50">Tàu (Nguồn)</th>}
                <th className="py-4 px-6 border-r border-slate-100 text-center bg-slate-50">Số lượng (Đống)</th>
                <th className="py-4 px-6 border-r border-slate-100 text-right bg-slate-50">Trọng lượng (Tấn)</th>
                <th className="py-4 px-6 border-r border-slate-100 text-right bg-slate-50">Tồn kho thực tế (Tấn)</th>
                <th className="py-4 px-6 text-center bg-slate-50">Cập nhật cuối</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
              {filteredData.map((row, index) => (
                <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 text-center text-slate-400">{index + 1}</td>
                  <td className="py-4 px-6 font-bold text-slate-800">
                      <div className="flex items-center gap-2">
                        <div className="bg-slate-100 p-1 rounded text-slate-500"><Layers size={14}/></div>
                        {row.pile}
                      </div>
                  </td>
                  <td className="py-4 px-6 text-slate-700 font-medium">{row.commodity}</td>
                  {!isShipMode && <td className="py-4 px-6 text-blue-600 font-medium text-xs">{row.ship}</td>}
                  
                  <td className="py-4 px-6 text-center font-bold text-slate-700">{row.quantity}</td>
                  <td className="py-4 px-6 text-right font-mono text-slate-600">{row.weight.toLocaleString()}</td>
                  <td className="py-4 px-6 text-right font-mono font-bold text-blue-700">{row.inventory.toLocaleString()}</td>
                  <td className="py-4 px-6 text-center text-slate-400 text-xs font-medium">{row.lastUpdate}</td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                  <tr>
                      <td colSpan={isShipMode ? 7 : 8} className="py-8 text-center text-slate-400 italic">
                          Không tìm thấy dữ liệu phù hợp
                      </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
