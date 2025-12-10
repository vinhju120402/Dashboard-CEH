
import React, { useState, useEffect } from 'react';
import { Search, Scale, Truck, FileText, ArrowUpRight, ArrowDownLeft, Filter, RefreshCw } from 'lucide-react';

interface EquipmentTableProps {
  type: string;
  searchTerm?: string;
}

interface WeighRecord {
  id: number;
  vehicleNumber: string;
  ticketNumber: string;
  cargoType: string;
  grossWeight: number;
  tareWeight: number;
  netWeight: number;
  scaleId: string;
  timeIn: string;
  timeOut: string;
  status: 'completed' | 'weighing_in' | 'weighing_out';
}

export const EquipmentTable: React.FC<EquipmentTableProps> = ({ type }) => {
  const [data, setData] = useState<WeighRecord[]>([]);

  useEffect(() => {
    const commodities = ['Than đá', 'Quặng sắt', 'Thạch cao', 'Dăm gỗ', 'Đá vôi'];
    const newData: WeighRecord[] = Array.from({ length: 50 }).map((_, i) => {
        const isCompleted = i > 4; 
        const gross = Math.floor(Math.random() * 30000) + 30000;
        const tare = Math.floor(Math.random() * 8000) + 12000;
        const net = gross - tare;
        return {
            id: i + 1,
            vehicleNumber: `29C-${(12340 + i * 5).toString().slice(0, 3)}.${(i * 12).toString().slice(0, 2)}`,
            ticketNumber: `W-2506-${(1000 + i).toString()}`,
            cargoType: commodities[i % commodities.length],
            grossWeight: isCompleted ? gross : (Math.random() > 0.5 ? gross : 0),
            tareWeight: isCompleted ? tare : (Math.random() > 0.5 ? tare : 0),
            netWeight: isCompleted ? net : 0,
            scaleId: i % 2 === 0 ? 'Cân 01' : 'Cân 02',
            timeIn: `17/06 0${8 + Math.floor(i/10)}:${(i * 5) % 60}`,
            timeOut: isCompleted ? `17/06 0${8 + Math.floor(i/10)}:${(i * 5 + 15) % 60}` : '--',
            status: isCompleted ? 'completed' : (Math.random() > 0.5 ? 'weighing_in' : 'weighing_out'),
        };
    });
    setData(newData);
  }, [type]);

  const totalNetWeight = data.reduce((acc, curr) => acc + curr.netWeight, 0);

  return (
    <div className="flex flex-col h-full bg-white">
        {/* Compact Toolbar & Mini-KPIs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between p-2 border-b border-slate-200 gap-2 bg-slate-50/50">
            
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
                {/* Title */}
                <div className="flex items-center gap-2 text-purple-700 mr-2 flex-shrink-0">
                    <Scale size={18} />
                    <h3 className="font-black text-sm uppercase">Trạm Cân</h3>
                </div>

                {/* Vertical Divider */}
                <div className="h-6 w-px bg-slate-300 hidden md:block flex-shrink-0"></div>

                {/* Inline KPIs */}
                <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1 rounded shadow-sm">
                        <FileText size={14} className="text-slate-400" />
                        <div className="flex flex-col leading-none">
                             <span className="text-[10px] text-slate-500 font-bold uppercase">Phiếu</span>
                             <span className="text-sm font-black text-slate-700">{data.length}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1 rounded shadow-sm">
                        <Scale size={14} className="text-green-500" />
                        <div className="flex flex-col leading-none">
                             <span className="text-[10px] text-slate-500 font-bold uppercase">Tổng Net</span>
                             <span className="text-sm font-black text-green-700">{totalNetWeight.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1 rounded shadow-sm">
                        <Truck size={14} className="text-orange-500" />
                        <div className="flex flex-col leading-none">
                             <span className="text-[10px] text-slate-500 font-bold uppercase">Đang cân</span>
                             <span className="text-sm font-black text-orange-500">{data.filter(i => i.status !== 'completed').length}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Compact Filters */}
            <div className="flex items-center gap-2 ml-auto">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Số phiếu / xe..."
                        className="border border-slate-300 rounded px-2 py-1 text-xs focus:border-blue-500 w-32 md:w-40"
                    />
                    <Search size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                <button className="p-1.5 text-slate-500 hover:text-blue-600 bg-white border border-slate-300 rounded hover:bg-slate-50"><Filter size={14}/></button>
                <button className="p-1.5 text-blue-600 hover:text-blue-800 bg-blue-50 border border-blue-200 rounded"><RefreshCw size={14}/></button>
            </div>
        </div>

      {/* Dense Table */}
      <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full border-collapse min-w-[1000px]">
            <thead className="sticky top-0 z-10 bg-slate-100 shadow-sm">
              <tr className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                <th className="border-r border-slate-200 py-2 px-3 w-10 text-center">#</th>
                <th className="border-r border-slate-200 py-2 px-3 text-left">Số Phiếu</th>
                <th className="border-r border-slate-200 py-2 px-3 text-left">Số Xe</th>
                <th className="border-r border-slate-200 py-2 px-3 text-left">Hàng Hóa</th>
                <th className="border-r border-slate-200 py-2 px-3 text-right">Bì (Tare)</th>
                <th className="border-r border-slate-200 py-2 px-3 text-right text-blue-700">Hàng (Net)</th>
                <th className="border-r border-slate-200 py-2 px-3 text-center">Thời gian</th>
                <th className="border-r border-slate-200 py-2 px-3 text-left">Trạm Cân</th>
                <th className="py-2 px-3 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="text-xs text-slate-700">
              {data.map((row, index) => (
                <tr key={row.id} className="border-b border-slate-100 hover:bg-blue-50/50 transition-colors h-8">
                  <td className="py-1 px-3 text-center text-slate-400">{index + 1}</td>
                  <td className="py-1 px-3 font-mono text-slate-600">{row.ticketNumber}</td>
                  <td className="py-1 px-3 font-bold text-slate-800">{row.vehicleNumber}</td>
                  <td className="py-1 px-3">{row.cargoType}</td>
                  <td className="py-1 px-3 text-right font-mono text-slate-500">{row.tareWeight > 0 ? row.tareWeight.toLocaleString() : '-'}</td>
                  <td className="py-1 px-3 text-right font-mono font-bold text-blue-700">{row.netWeight > 0 ? row.netWeight.toLocaleString() : '-'}</td>
                  <td className="py-1 px-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                          <span className="text-[10px] text-slate-500">{row.timeIn}</span>
                          {row.timeOut !== '--' && <span className="text-[10px] text-slate-400">- {row.timeOut.split(' ')[1]}</span>}
                      </div>
                  </td>
                  <td className="py-1 px-3 text-slate-600">{row.scaleId}</td>
                  <td className="py-1 px-3 text-center">
                     <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${
                        row.status === 'completed' ? 'bg-green-500' : 'bg-orange-500 animate-pulse'
                     }`}></span>
                     <span className={row.status === 'completed' ? 'text-green-700 font-bold' : 'text-orange-600 font-bold'}>
                        {row.status === 'completed' ? 'Xong' : 'Đang cân'}
                     </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  );
};
