
import React, { useState } from 'react';
import { Search, ArrowRightLeft, Truck } from 'lucide-react';

export const GateOperations: React.FC = () => {
  const [vehicleFilter, setVehicleFilter] = useState('');
  const [ticketFilter, setTicketFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Generated 25 rows of gate data
  const gateData = Array.from({ length: 25 }).map((_, i) => ({
    id: i + 1,
    gate: i % 2 === 0 ? 'Cổng 1 (Làn Vào)' : 'Cổng 1 (Làn Ra)',
    truck: `29C-${100 + i}.${10 + i}`,
    ticket: `G-2506-${(i + 1).toString().padStart(3, '0')}`,
    driver: ['Nguyễn Văn A', 'Trần Văn B', 'Lê Văn C', 'Phạm Văn D', 'Hoàng Văn E'][i % 5],
    timeIn: `17/06/2025 ${String(Math.floor(7 + i / 4)).padStart(2, '0')}:${String((i * 15) % 60).padStart(2, '0')}`,
    timeOut: i % 2 !== 0 ? `17/06/2025 ${String(Math.floor(8 + i / 4)).padStart(2, '0')}:${String((i * 15 + 45) % 60).padStart(2, '0')}` : '--',
    duration: i % 2 !== 0 ? '1h 15p' : '--',
    type: 'Hạ tập kết bãi',
    status: i % 2 !== 0 ? 'exited' : 'in_port'
  }));

  const filteredData = gateData.filter(item => {
    const matchesVehicle = item.truck.toLowerCase().includes(vehicleFilter.toLowerCase());
    const matchesTicket = item.ticket.toLowerCase().includes(ticketFilter.toLowerCase());
    let matchesDate = true;
    if (dateFilter) {
      const [year, month, day] = dateFilter.split('-');
      const formattedDate = `${day}/${month}/${year}`;
      matchesDate = item.timeIn.includes(formattedDate) || (item.timeOut !== '--' && item.timeOut.includes(formattedDate));
    }
    return matchesVehicle && matchesTicket && matchesDate;
  });

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      {/* Control Bar */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
             <div className="flex items-center gap-2 mr-4 text-slate-700">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                     <ArrowRightLeft size={20} />
                </div>
                <h3 className="font-bold text-sm uppercase">Điều hành Cổng</h3>
             </div>

             {/* Filters */}
             <div className="flex flex-col">
                <label className="text-xs text-slate-500 font-bold mb-1 uppercase">Ngày tháng</label>
                <input 
                  type="date" 
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-500 w-40 shadow-sm"
                />
             </div>

             <div className="flex flex-col">
                <label className="text-xs text-slate-500 font-bold mb-1 uppercase">Số xe / Số romooc</label>
                <input 
                  type="text" 
                  value={vehicleFilter}
                  onChange={(e) => setVehicleFilter(e.target.value)}
                  placeholder="Tìm số xe..."
                  className="border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-500 w-48 shadow-sm"
                />
             </div>

             <div className="flex flex-col">
                <label className="text-xs text-slate-500 font-bold mb-1 uppercase">Số Phiếu</label>
                <input 
                  type="text" 
                  value={ticketFilter}
                  onChange={(e) => setTicketFilter(e.target.value)}
                  placeholder="Tìm số phiếu..."
                  className="border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-500 w-48 shadow-sm"
                />
             </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-600 text-sm font-bold rounded-lg hover:bg-blue-50 transition-all shadow-sm self-start md:self-center">
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
                <th className="py-4 px-6 border-r border-slate-100 text-left bg-slate-50">Cổng kiểm soát</th>
                <th className="py-4 px-6 border-r border-slate-100 text-left bg-slate-50">Số xe / Số romooc</th>
                <th className="py-4 px-6 border-r border-slate-100 text-left bg-slate-50">Số Phiếu</th>
                <th className="py-4 px-6 border-r border-slate-100 text-left bg-slate-50">Tài xế</th>
                <th className="py-4 px-6 border-r border-slate-100 text-center bg-slate-50">Giờ vào</th>
                <th className="py-4 px-6 border-r border-slate-100 text-center bg-slate-50">Giờ ra</th>
                <th className="py-4 px-6 border-r border-slate-100 text-center bg-slate-50">Lưu cảng</th>
                <th className="py-4 px-6 border-r border-slate-100 text-left bg-slate-50">Tác nghiệp</th>
                <th className="py-4 px-6 text-center bg-slate-50">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
              {filteredData.map((row, index) => (
                <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 text-center text-slate-400">{index + 1}</td>
                  <td className="py-4 px-6 font-semibold text-slate-700">{row.gate}</td>
                  <td className="py-4 px-6 font-bold text-slate-800 flex items-center gap-2">
                      <div className="bg-slate-100 p-1 rounded text-slate-500"><Truck size={14}/></div>
                      {row.truck}
                  </td>
                  <td className="py-4 px-6 text-slate-600 font-mono">{row.ticket}</td>
                  <td className="py-4 px-6 text-slate-600">{row.driver}</td>
                  <td className="py-4 px-6 text-center text-slate-600 font-medium">{row.timeIn}</td>
                  <td className="py-4 px-6 text-center text-slate-600 font-medium">{row.timeOut}</td>
                  <td className="py-4 px-6 text-center font-bold text-slate-700">{row.duration}</td>
                  <td className="py-4 px-6 font-medium text-slate-800">{row.type}</td>
                  <td className="py-4 px-6 text-center">
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                          row.status === 'exited'
                              ? 'bg-slate-100 text-slate-500 border-slate-200' 
                              : 'bg-green-100 text-green-700 border-green-200'
                      }`}>
                          {row.status === 'exited' ? 'ĐÃ RỜI CẢNG' : 'TRONG CẢNG'}
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
