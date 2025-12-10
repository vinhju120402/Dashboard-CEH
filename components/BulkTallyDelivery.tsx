
import React, { useState } from 'react';
import { Search, Clipboard, Truck, ArrowDownToLine, ArrowUpFromLine, Ship } from 'lucide-react';

export const BulkTallyDelivery: React.FC = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [subTab, setSubTab] = useState<'INBOUND' | 'OUTBOUND'>('INBOUND');
  const [ticketFilter, setTicketFilter] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState('');
  const [shipFilter, setShipFilter] = useState('');

  // Generated 50 rows of tally data with types
  const tallyData = Array.from({ length: 50 }).map((_, i) => {
    // Distribute types: Even index = INBOUND (Hạ tập kết), Odd = OUTBOUND (Xuất tàu)
    const type = i % 2 === 0 ? 'INBOUND' : 'OUTBOUND';
    
    return {
        id: i + 1,
        ticket: `TK-2506-${(i + 1).toString().padStart(3, '0')}`,
        // For OUTBOUND, use format CP1, CP2... for INBOUND keep license plates
        truck: type === 'INBOUND' ? `29C-123.${10 + i}` : `CP${(i % 5) + 1}`,
        timeIn: `17/06/2025 0${8 + Math.floor(i/10)}:${(i * 5) % 60 < 10 ? '0' : ''}${(i * 5) % 60}`,
        timeOut: i > 40 ? '--' : `17/06/2025 0${9 + Math.floor(i/10)}:${(i * 5 + 25) % 60 < 10 ? '0' : ''}${(i * 5 + 25) % 60}`,
        commodity: i % 3 === 0 ? 'Than đá' : i % 3 === 1 ? 'Quặng sắt' : 'Thạch cao',
        netWeight: i > 40 ? 0 : Math.floor(Math.random() * 10000) + 15000,
        tallyman: i % 2 === 0 ? 'Nguyễn Văn A' : 'Trần Văn B',
        shift: ['Ca 1', 'Ca 2', 'Ca 3'][i % 3],
        type: type,
        ship: i % 3 === 0 ? 'MV. GLORY STAR' : (i % 3 === 1 ? 'MV. OCEAN BULK' : 'MV. PACIFIC DREAM')
    };
  });

  const filteredData = tallyData.filter(item => {
    // Filter by Sub Tab
    if (item.type !== subTab) return false;

    // Filter by Ship
    if (shipFilter && item.ship !== shipFilter) return false;

    // Filter by Date Range
    if (fromDate || toDate) {
        // item.timeIn format is "17/06/2025 HH:mm"
        const datePart = item.timeIn.split(' ')[0];
        const [day, month, year] = datePart.split('/');
        // Create ISO string YYYY-MM-DD for comparison
        const itemIsoDate = `${year}-${month}-${day}`;

        if (fromDate && itemIsoDate < fromDate) return false;
        if (toDate && itemIsoDate > toDate) return false;
    }
    
    // Filter by Ticket
    if (ticketFilter && !item.ticket.toLowerCase().includes(ticketFilter.toLowerCase())) {
        return false;
    }

    // Filter by Vehicle
    if (vehicleFilter && !item.truck.toLowerCase().includes(vehicleFilter.toLowerCase())) {
        return false;
    }

    return true;
  });

  const totalWeight = filteredData.reduce((acc, curr) => acc + curr.netWeight, 0);

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      
      {/* Sub-tabs Navigation */}
      <div className="flex justify-center gap-4 border-b border-slate-200 pb-1">
        <button
            onClick={() => { setSubTab('INBOUND'); setShipFilter(''); }}
            className={`px-8 py-3 text-sm font-bold flex items-center gap-2 rounded-t-lg transition-all border-t-4 ${
                subTab === 'INBOUND' 
                ? 'bg-white text-blue-700 border-blue-600 shadow-sm -mb-px border-x border-slate-200 z-10' 
                : 'bg-slate-50 text-slate-500 border-transparent hover:bg-slate-100 hover:text-slate-700'
            }`}
        >
            <ArrowDownToLine size={18} />
            HẠ TẬP KẾT
        </button>
        <button
            onClick={() => { setSubTab('OUTBOUND'); setShipFilter(''); }}
             className={`px-8 py-3 text-sm font-bold flex items-center gap-2 rounded-t-lg transition-all border-t-4 ${
                subTab === 'OUTBOUND' 
                ? 'bg-white text-orange-600 border-orange-500 shadow-sm -mb-px border-x border-slate-200 z-10' 
                : 'bg-slate-50 text-slate-500 border-transparent hover:bg-slate-100 hover:text-slate-700'
            }`}
        >
            <ArrowUpFromLine size={18} />
            XUẤT TÀU
        </button>
      </div>

      {/* Control & Filter Bar */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-6">
             <div className="flex items-center gap-3 mr-4">
                <div className={`p-2 rounded-lg ${subTab === 'INBOUND' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                    <Clipboard size={20} />
                </div>
                <h3 className="font-bold text-slate-700 text-sm uppercase">
                    {subTab === 'INBOUND' ? 'Sổ Kiểm Đếm (Hạ Bãi)' : 'Sổ Kiểm Đếm (Xuất Tàu)'}
                </h3>
             </div>

            {/* Ship Filter - Available for both INBOUND and OUTBOUND */}
            <div className="flex flex-col">
              <label className="text-xs text-slate-500 font-bold mb-1 uppercase">Tàu chuyến</label>
              <div className="relative">
                  <select 
                      value={shipFilter}
                      onChange={(e) => setShipFilter(e.target.value)}
                      className="border border-slate-300 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-500 bg-white min-w-[180px] shadow-sm appearance-none"
                  >
                      <option value="">Tất cả tàu</option>
                      <option value="MV. GLORY STAR">MV. GLORY STAR</option>
                      <option value="MV. OCEAN BULK">MV. OCEAN BULK</option>
                      <option value="MV. PACIFIC DREAM">MV. PACIFIC DREAM</option>
                  </select>
                  <Ship size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
              </div>
            </div>

            {/* From Date Filter */}
            <div className="flex flex-col">
              <label className="text-xs text-slate-500 font-bold mb-1 uppercase">Từ ngày</label>
              <input 
                  type="date" 
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="border border-slate-300 rounded-lg px-4 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-500 bg-white w-36 shadow-sm"
              />
            </div>

            {/* To Date Filter */}
            <div className="flex flex-col">
              <label className="text-xs text-slate-500 font-bold mb-1 uppercase">Đến ngày</label>
              <input 
                  type="date" 
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="border border-slate-300 rounded-lg px-4 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-500 bg-white w-36 shadow-sm"
              />
            </div>

            {/* Shift Filter */}
            <div className="flex flex-col">
              <label className="text-xs text-slate-500 font-bold mb-1 uppercase">Ca làm việc</label>
              <select className="border border-slate-300 rounded-lg px-4 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-500 bg-white w-32 shadow-sm">
                  <option value="">Tất cả</option>
                  <option value="Ca 1">Ca 1</option>
                  <option value="Ca 2">Ca 2</option>
                  <option value="Ca 3">Ca 3</option>
              </select>
            </div>

             {/* Ticket Filter */}
             <div className="flex flex-col">
              <label className="text-xs text-slate-500 font-bold mb-1 uppercase">Số tờ khai</label>
              <input 
                  type="text" 
                  value={ticketFilter}
                  onChange={(e) => setTicketFilter(e.target.value)}
                  placeholder="Nhập số tờ khai..."
                  className="border border-slate-300 rounded-lg px-4 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-500 bg-white w-40 shadow-sm"
              />
            </div>

            {/* Vehicle Filter */}
            <div className="flex flex-col">
              <label className="text-xs text-slate-500 font-bold mb-1 uppercase">Số xe</label>
              <input 
                  type="text" 
                  value={vehicleFilter}
                  onChange={(e) => setVehicleFilter(e.target.value)}
                  placeholder="Nhập số xe..."
                  className="border border-slate-300 rounded-lg px-4 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-500 bg-white w-32 shadow-sm"
              />
            </div>
            
          </div>

          <div className={`flex items-center gap-6 px-5 py-3 rounded-lg border ml-auto ${subTab === 'INBOUND' ? 'bg-blue-50 border-blue-100' : 'bg-orange-50 border-orange-100'}`}>
                <div className="flex flex-col items-end">
                    <span className="text-xs text-slate-500 uppercase font-bold">Tổng lượt xe</span>
                    <span className="text-xl font-black text-slate-800">{filteredData.length}</span>
                </div>
                <div className={`w-px h-8 ${subTab === 'INBOUND' ? 'bg-blue-200' : 'bg-orange-200'}`}></div>
                <div className="flex flex-col items-end">
                    <span className="text-xs text-slate-500 uppercase font-bold">Tổng khối lượng</span>
                    <span className={`text-xl font-black ${subTab === 'INBOUND' ? 'text-blue-700' : 'text-orange-700'}`}>{totalWeight.toLocaleString()} <span className="text-xs text-slate-500 font-bold">kg</span></span>
                </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-600 text-sm font-bold rounded-lg hover:bg-blue-50 transition-all shadow-sm self-start xl:self-center">
             <Search size={16} />
             <span>Nạp dữ liệu</span>
          </button>
        </div>
      </div>

      {/* Tally Sheet Table */}
      <div className="w-full overflow-hidden border border-slate-200 rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto max-h-[600px] custom-scrollbar">
          <table className="w-full border-collapse min-w-[1000px]">
            <thead className="sticky top-0 z-10">
              <tr className={`text-xs font-bold uppercase tracking-wider border-b border-slate-200 shadow-sm ${subTab === 'INBOUND' ? 'bg-blue-50 text-blue-800' : 'bg-orange-50 text-orange-800'}`}>
                <th className="py-4 px-6 border-r border-white/20 w-16 text-center">STT</th>
                <th className="py-4 px-6 border-r border-white/20 text-left">Số tờ khai</th>
                <th className="py-4 px-6 border-r border-white/20 text-left">
                    {subTab === 'INBOUND' ? 'Số xe / Romooc' : 'Số xe'}
                </th>
                <th className="py-4 px-6 border-r border-white/20 text-left">Tàu chuyến</th>
                <th className="py-4 px-6 border-r border-white/20 text-center">Ca làm việc</th>
                <th className="py-4 px-6 border-r border-white/20 text-center">Giờ Vào</th>
                <th className="py-4 px-6 border-r border-white/20 text-center">Giờ Ra</th>
                <th className="py-4 px-6 border-r border-white/20 text-left">Hàng hóa</th>
                <th className="py-4 px-6 border-r border-white/20 text-right">Khối Lượng Tịnh (kg)</th>
                <th className="py-4 px-6 border-r border-white/20 text-left">Nhân viên KĐ</th>
                <th className="py-4 px-6 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
              {filteredData.map((row, index) => (
                <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 text-center text-slate-400">{index + 1}</td>
                  <td className="py-4 px-6 font-mono text-slate-600">{row.ticket}</td>
                  <td className="py-4 px-6 font-bold text-slate-800 flex items-center gap-2">
                      <div className="bg-slate-100 p-1 rounded text-slate-500"><Truck size={14}/></div>
                      {row.truck}
                  </td>
                  <td className="py-4 px-6 text-blue-600 font-medium text-xs">
                     {row.ship}
                  </td>
                  <td className="py-4 px-6 text-center text-slate-600 font-medium">{row.shift}</td>
                  <td className="py-4 px-6 text-center text-slate-600">{row.timeIn}</td>
                  <td className="py-4 px-6 text-center text-slate-600">{row.timeOut}</td>
                  <td className="py-4 px-6 font-medium text-slate-700">{row.commodity}</td>
                  <td className="py-4 px-6 text-right font-mono font-bold text-slate-800">{row.netWeight > 0 ? row.netWeight.toLocaleString() : '--'}</td>
                  <td className="py-4 px-6 text-slate-600">{row.tallyman}</td>
                  <td className="py-4 px-6 text-center">
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                          row.netWeight > 0 
                              ? 'bg-green-50 text-green-600 border-green-200' 
                              : 'bg-orange-50 text-orange-500 border-orange-200'
                      }`}>
                          {row.netWeight > 0 ? 'HOÀN THÀNH' : 'ĐANG THỰC HIỆN'}
                      </span>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                    <td colSpan={11} className="py-8 text-center text-slate-400 italic">Không tìm thấy dữ liệu phù hợp</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
