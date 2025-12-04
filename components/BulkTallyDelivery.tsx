
import React, { useState } from 'react';
import { Search, Clipboard, Truck } from 'lucide-react';

export const BulkTallyDelivery: React.FC = () => {
  const [dateFilter, setDateFilter] = useState('');

  // Generated 30 rows of tally data with Vietnamese Values
  const tallyData = Array.from({ length: 30 }).map((_, i) => ({
    id: i + 1,
    ticket: `BL-2506-${(i + 1).toString().padStart(3, '0')}`,
    truck: i % 3 === 0 ? `29C-123.${10 + i}` : i % 3 === 1 ? `14H-998.${20 + i}` : `15C-555.${30 + i}`,
    timeIn: `17/06/2025 0${8 + Math.floor(i/4)}:${(i * 10) % 60 < 10 ? '0' : ''}${(i * 10) % 60}`,
    timeOut: i > 25 ? '--' : `17/06/2025 0${9 + Math.floor(i/4)}:${(i * 10 + 20) % 60 < 10 ? '0' : ''}${(i * 10 + 20) % 60}`,
    commodity: i % 2 === 0 ? 'Than đá' : 'Quặng sắt',
    netWeight: i > 25 ? 0 : Math.floor(Math.random() * 10000) + 15000,
    tallyman: i % 2 === 0 ? 'Nguyễn Văn A' : 'Trần Văn B',
    shift: 'Ca 1',
  }));

  const filteredData = tallyData.filter(item => {
    if (!dateFilter) return true;
    const [year, month, day] = dateFilter.split('-');
    const formattedDate = `${day}/${month}/${year}`;
    // Check if the date string is present in either Time In or Time Out
    return item.timeIn.includes(formattedDate) || (item.timeOut !== '--' && item.timeOut.includes(formattedDate));
  });

  const totalWeight = filteredData.reduce((acc, curr) => acc + curr.netWeight, 0);

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      {/* Control & Filter Bar */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-6">
             <div className="flex items-center gap-3 mr-4">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <Clipboard size={20} />
                </div>
                <h3 className="font-bold text-slate-700 text-sm uppercase">Sổ Kiểm Đếm</h3>
             </div>

            {/* Date Filter */}
            <div className="flex flex-col">
              <label className="text-xs text-slate-500 font-bold mb-1 uppercase">Ngày tháng</label>
              <input 
                  type="date" 
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="border border-slate-300 rounded-lg px-4 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-500 bg-white w-40 shadow-sm"
              />
            </div>

            {/* Shift Filter */}
            <div className="flex flex-col">
              <label className="text-xs text-slate-500 font-bold mb-1 uppercase">Ca làm việc</label>
              <select className="border border-slate-300 rounded-lg px-4 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-500 bg-white w-40 shadow-sm">
                  <option value="1">Ca 1 (Sáng)</option>
                  <option value="2">Ca 2 (Chiều)</option>
                  <option value="3">Ca 3 (Đêm)</option>
              </select>
            </div>

             {/* Commodity Filter */}
             <div className="flex flex-col">
              <label className="text-xs text-slate-500 font-bold mb-1 uppercase">Loại hàng</label>
              <select className="border border-slate-300 rounded-lg px-4 py-2 text-sm text-slate-700 focus:outline-none focus:border-blue-500 bg-white w-48 shadow-sm">
                  <option value="">Tất cả</option>
                  <option value="coal">Than đá</option>
                  <option value="ore">Quặng sắt</option>
                  <option value="gypsum">Thạch cao</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-blue-50 px-5 py-3 rounded-lg border border-blue-100">
                <div className="flex flex-col items-end">
                    <span className="text-xs text-slate-500 uppercase font-bold">Tổng lượt xe</span>
                    <span className="text-xl font-black text-slate-800">{filteredData.length}</span>
                </div>
                <div className="w-px h-8 bg-blue-200"></div>
                <div className="flex flex-col items-end">
                    <span className="text-xs text-slate-500 uppercase font-bold">Tổng khối lượng</span>
                    <span className="text-xl font-black text-blue-700">{totalWeight.toLocaleString()} <span className="text-xs text-slate-500 font-bold">kg</span></span>
                </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-600 text-sm font-bold rounded-lg hover:bg-blue-50 transition-all shadow-sm self-start md:self-center">
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
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-200 shadow-sm">
                <th className="py-4 px-6 border-r border-slate-100 w-16 text-center bg-slate-50">STT</th>
                <th className="py-4 px-6 border-r border-slate-100 text-left bg-slate-50">Số Vận Đơn</th>
                <th className="py-4 px-6 border-r border-slate-100 text-left bg-slate-50">Số xe / Romooc</th>
                <th className="py-4 px-6 border-r border-slate-100 text-center bg-slate-50">Giờ Vào</th>
                <th className="py-4 px-6 border-r border-slate-100 text-center bg-slate-50">Giờ Ra</th>
                <th className="py-4 px-6 border-r border-slate-100 text-left bg-slate-50">Hàng hóa</th>
                <th className="py-4 px-6 border-r border-slate-100 text-right bg-slate-50">Khối Lượng Tịnh (kg)</th>
                <th className="py-4 px-6 border-r border-slate-100 text-left bg-slate-50">Nhân viên KĐ</th>
                <th className="py-4 px-6 text-center bg-slate-50">Trạng thái</th>
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
                    <td colSpan={9} className="py-8 text-center text-slate-400 italic">Không tìm thấy dữ liệu phù hợp</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
