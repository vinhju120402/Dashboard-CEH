
import React, { useState, useEffect } from 'react';
import { Search, Scale, Truck, FileText, ArrowUpRight, ArrowDownLeft, Clock, Filter } from 'lucide-react';

interface EquipmentTableProps {
  type: string;
  searchTerm?: string;
}

interface WeighRecord {
  id: number;
  vehicleNumber: string;
  ticketNumber: string;
  cargoType: string;
  grossWeight: number; // Tổng
  tareWeight: number;  // Bì
  netWeight: number;   // Hàng
  scaleId: string;
  timeIn: string;
  timeOut: string;
  status: 'completed' | 'weighing_in' | 'weighing_out';
}

export const EquipmentTable: React.FC<EquipmentTableProps> = ({ type }) => {
  const [data, setData] = useState<WeighRecord[]>([]);
  const [ticketFilter, setTicketFilter] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState('');

  useEffect(() => {
    const commodities = ['Than đá', 'Quặng sắt', 'Thạch cao', 'Dăm gỗ', 'Đá vôi'];
    
    // Generate 50 rows of detailed weighing data
    const newData: WeighRecord[] = Array.from({ length: 50 }).map((_, i) => {
        const isCompleted = i > 4; // Top 5 are processing
        const gross = Math.floor(Math.random() * 30000) + 30000; // 30-60 tons
        const tare = Math.floor(Math.random() * 8000) + 12000;   // 12-20 tons
        const net = gross - tare;

        return {
            id: i + 1,
            vehicleNumber: `29C-${(12340 + i * 5).toString().slice(0, 3)}.${(i * 12).toString().slice(0, 2)}`,
            ticketNumber: `W-2506-${(1000 + i).toString()}`,
            cargoType: commodities[i % commodities.length],
            grossWeight: isCompleted ? gross : (Math.random() > 0.5 ? gross : 0),
            tareWeight: isCompleted ? tare : (Math.random() > 0.5 ? tare : 0),
            netWeight: isCompleted ? net : 0,
            scaleId: i % 2 === 0 ? 'Cân 01 (Cổng A)' : 'Cân 02 (Cổng B)',
            timeIn: `17/06/2025 0${8 + Math.floor(i/10)}:${(i * 5) % 60 < 10 ? '0' : ''}${(i * 5) % 60}`,
            timeOut: isCompleted ? `17/06/2025 0${8 + Math.floor(i/10)}:${(i * 5 + 15) % 60 < 10 ? '0' : ''}${(i * 5 + 15) % 60}` : '--',
            status: isCompleted ? 'completed' : (Math.random() > 0.5 ? 'weighing_in' : 'weighing_out'),
        };
    });
    setData(newData);
  }, [type]);

  const filteredData = data.filter(item => 
    item.vehicleNumber.toLowerCase().includes(vehicleFilter.toLowerCase()) &&
    item.ticketNumber.toLowerCase().includes(ticketFilter.toLowerCase())
  );

  const totalNetWeight = filteredData.reduce((acc, curr) => acc + curr.netWeight, 0);

  return (
    <div className="flex flex-col gap-6 animate-fadeIn h-full">
        {/* KPI Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Phiếu cân trong ngày</p>
                    <p className="text-2xl font-extrabold text-slate-800 mt-1">{filteredData.length}</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                    <FileText size={20} />
                </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Tổng hàng hóa (Net)</p>
                    <div className="flex items-baseline gap-1 mt-1">
                        <p className="text-2xl font-extrabold text-green-600">{totalNetWeight.toLocaleString()}</p>
                        <span className="text-xs font-bold text-slate-400">kg</span>
                    </div>
                </div>
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                    <Scale size={20} />
                </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Đang cân</p>
                    <p className="text-2xl font-extrabold text-orange-500 mt-1">
                        {data.filter(i => i.status !== 'completed').length} <span className="text-sm font-medium text-slate-400">xe</span>
                    </p>
                </div>
                <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center animate-pulse">
                    <Truck size={20} />
                </div>
            </div>
        </div>

        {/* Control Bar */}
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-wrap items-center gap-6 w-full md:w-auto">
                    <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                            <Scale size={20} />
                        </div>
                        <h3 className="font-bold text-slate-700 text-sm uppercase">Trạm Cân Điện Tử</h3>
                    </div>

                    <div className="h-8 w-px bg-slate-200 hidden md:block"></div>

                    <div className="flex flex-col">
                        <label className="text-xs text-slate-500 font-bold mb-1 uppercase">Số phiếu cân</label>
                        <input 
                            type="text" 
                            value={ticketFilter}
                            onChange={(e) => setTicketFilter(e.target.value)}
                            placeholder="Nhập số phiếu..."
                            className="border border-slate-300 rounded-lg px-4 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-500 w-48 shadow-sm"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs text-slate-500 font-bold mb-1 uppercase">Số xe / Số romooc</label>
                        <input 
                            type="text" 
                            value={vehicleFilter}
                            onChange={(e) => setVehicleFilter(e.target.value)}
                            placeholder="Nhập số xe..."
                            className="border border-slate-300 rounded-lg px-4 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-500 w-48 shadow-sm"
                        />
                    </div>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-600 text-sm font-bold rounded-lg hover:bg-blue-50 transition-all shadow-sm ml-auto">
                    <Search size={16} />
                    <span>Nạp dữ liệu</span>
                </button>
            </div>
        </div>

      {/* Main Table */}
      <div className="w-full overflow-hidden border border-slate-200 rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto max-h-[600px] custom-scrollbar">
          <table className="w-full border-collapse min-w-[1200px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-200 shadow-sm">
                <th className="border-r border-slate-100 py-4 px-6 w-16 text-center bg-slate-50">STT</th>
                <th className="border-r border-slate-100 py-4 px-6 text-left bg-slate-50">Số Phiếu</th>
                <th className="border-r border-slate-100 py-4 px-6 text-left bg-slate-50">Số Xe / Số Romooc</th>
                <th className="border-r border-slate-100 py-4 px-6 text-left bg-slate-50">Loại Hàng</th>
                <th className="border-r border-slate-100 py-4 px-6 text-right bg-slate-50">Bì (Tare)</th>
                <th className="border-r border-slate-100 py-4 px-6 text-right bg-slate-50 text-blue-700">Hàng (Net)</th>
                <th className="border-r border-slate-100 py-4 px-6 text-center bg-slate-50">Thời gian</th>
                <th className="border-r border-slate-100 py-4 px-6 text-left bg-slate-50">Trạm Cân</th>
                <th className="py-4 px-6 text-center bg-slate-50">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
              {filteredData.map((row, index) => (
                <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 text-center text-slate-400 font-medium">{index + 1}</td>
                  <td className="py-4 px-6 font-mono text-slate-600">{row.ticketNumber}</td>
                  <td className="py-4 px-6 font-bold text-slate-800 flex items-center gap-2">
                     <Truck size={14} className="text-slate-400"/>
                     {row.vehicleNumber}
                  </td>
                  <td className="py-4 px-6 text-slate-700">{row.cargoType}</td>
                  <td className="py-4 px-6 text-right font-mono text-slate-500">{row.tareWeight > 0 ? row.tareWeight.toLocaleString() : '-'}</td>
                  <td className="py-4 px-6 text-right font-mono font-bold text-blue-700">{row.netWeight > 0 ? row.netWeight.toLocaleString() : '-'}</td>
                  <td className="py-4 px-6 text-center text-xs">
                      <div className="flex flex-col items-center gap-0.5">
                          <span className="text-slate-600 font-medium flex items-center gap-1"><ArrowUpRight size={10} className="text-green-500"/> {row.timeIn}</span>
                          <span className="text-slate-400 flex items-center gap-1"><ArrowDownLeft size={10} className="text-orange-400"/> {row.timeOut}</span>
                      </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600 text-xs font-bold uppercase">{row.scaleId}</td>
                  <td className="py-4 px-6 text-center">
                     <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${
                       row.status === 'completed' 
                       ? 'bg-green-50 text-green-600 border-green-200' 
                       : 'bg-orange-50 text-orange-500 border-orange-200'
                     }`}>
                       {row.status === 'completed' && 'Hoàn thành'}
                       {row.status === 'weighing_in' && 'Đang cân tổng'}
                       {row.status === 'weighing_out' && 'Đang cân bì'}
                     </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
