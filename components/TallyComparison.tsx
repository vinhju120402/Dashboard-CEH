
import React, { useState } from 'react';
import { Search, Anchor, ArrowRightLeft, FileBarChart, RefreshCw, ClipboardCheck, AlertCircle, Construction, Layers, Truck, Clock, Hammer } from 'lucide-react';

export const TallyComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'COMPARISON' | 'CRANE' | 'YARD'>('COMPARISON');
  const [selectedShip, setSelectedShip] = useState('MV. GLORY STAR (V.2506)');

  // Data now distinguishes between Crane Tally and Yard Tally
  const reportData = {
    shipName: 'MV. GLORY STAR',
    voyage: 'V.2506',
    commodity: 'Than đá',
    manifestTotal: 45000, // Số liệu khai báo
    craneTotal: 45100,    // Tổng đầu cần
    yardTotal: 44950,     // Tổng thực nhập tại bãi
  };
  
  // Variance typically compares Final Yard Receipt vs Manifest
  const variance = reportData.yardTotal - reportData.manifestTotal;
  const variancePercent = (variance / reportData.manifestTotal) * 100;
  const isToleranceOk = Math.abs(variancePercent) <= 0.5;

  const shiftDetails = [
    { id: 1, shift: 'Ca 1', date: '17/06/2025', manifest: 15000, craneTally: 15050, yardTally: 14990, note: 'Hao hụt vận chuyển' },
    { id: 2, shift: 'Ca 2', date: '17/06/2025', manifest: 15000, craneTally: 15020, yardTally: 15010, note: 'Bình thường' },
    { id: 3, shift: 'Ca 3', date: '17/06/2025', manifest: 15000, craneTally: 15030, yardTally: 14950, note: 'Đang kiểm tra lại' },
  ];

  // Helper to format time correctly
  const formatTime = (hour: number, minute: number) => {
    const extraHours = Math.floor(minute / 60);
    const finalHour = hour + extraHours;
    const finalMinute = minute % 60;
    return `${String(finalHour).padStart(2, '0')}:${String(finalMinute).padStart(2, '0')}`;
  };

  // Mock Data for Crane Tally
  const craneTallyData = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    hold: `Hầm ${['1', '2', '3', '4', '5'][i % 5]}`,
    equipment: `Cẩu ${['01', '02', '03'][i % 3]}`,
    truck: `29C-${120 + i}.${30 + i}`,
    time: `17/06/2025 ${formatTime(10, 30 + i)}`,
    commodity: 'Than đá',
    weight: 30000 + Math.floor(Math.random() * 5000), // Kg
    tallyman: 'Nguyễn Văn A'
  }));

  // Mock Data for Yard Tally
  const yardTallyData = Array.from({ length: 20 }).map((_, i) => {
    const minStart = 15 + (i * 2); 
    const minEnd = minStart + 12;
    
    return {
      id: i + 1,
      location: `Bãi ${['A', 'B', 'C'][i % 3]} - Lô ${Math.floor(i/5)+1}`,
      equipment: ['Máy xúc MX-01', 'Máy xúc MX-02', 'Băng tải T1'][i % 3],
      truck: `29C-${120 + i}.${30 + i}`,
      timeIn: `17/06/2025 ${formatTime(10, minStart)}`,
      timeOut: `17/06/2025 ${formatTime(10, minEnd)}`,
      commodity: 'Than đá',
      netWeight: 30100 + Math.floor(Math.random() * 4000), // Kg
      status: 'completed',
      weigher: 'Trần Văn B'
    };
  });

  return (
    <div className="flex flex-col gap-6 animate-fadeIn h-full">
      {/* Sub-tabs Navigation */}
      <div className="flex justify-center gap-4 border-b border-slate-200 pb-1">
            <button
                onClick={() => setActiveTab('COMPARISON')}
                className={`px-6 py-3 text-sm font-bold flex items-center gap-2 rounded-t-lg transition-all border-t-4 ${
                    activeTab === 'COMPARISON'
                    ? 'bg-white text-blue-700 border-blue-600 shadow-sm -mb-px border-x border-slate-200 z-10'
                    : 'bg-slate-50 text-slate-500 border-transparent hover:bg-slate-100'
                }`}
            >
                <ArrowRightLeft size={18} />
                ĐỐI CHIẾU
            </button>
            <button
                onClick={() => setActiveTab('CRANE')}
                className={`px-6 py-3 text-sm font-bold flex items-center gap-2 rounded-t-lg transition-all border-t-4 ${
                    activeTab === 'CRANE'
                    ? 'bg-white text-orange-600 border-orange-500 shadow-sm -mb-px border-x border-slate-200 z-10'
                    : 'bg-slate-50 text-slate-500 border-transparent hover:bg-slate-100'
                }`}
            >
                <Construction size={18} />
                TALLY ĐẦU CẦN
            </button>
            <button
                onClick={() => setActiveTab('YARD')}
                className={`px-6 py-3 text-sm font-bold flex items-center gap-2 rounded-t-lg transition-all border-t-4 ${
                    activeTab === 'YARD'
                    ? 'bg-white text-green-600 border-green-500 shadow-sm -mb-px border-x border-slate-200 z-10'
                    : 'bg-slate-50 text-slate-500 border-transparent hover:bg-slate-100'
                }`}
            >
                <Layers size={18} />
                TALLY BÃI
            </button>
      </div>

      {/* Control Panel (Common for all tabs) */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
             <div className={`p-2.5 rounded-lg text-white border ${
                 activeTab === 'COMPARISON' ? 'bg-blue-600 border-blue-600' : 
                 activeTab === 'CRANE' ? 'bg-orange-500 border-orange-500' : 'bg-green-600 border-green-600'
             }`}>
                {activeTab === 'COMPARISON' ? <FileBarChart size={20} /> : activeTab === 'CRANE' ? <Construction size={20} /> : <Layers size={20} />}
             </div>
             <div>
                <h3 className="font-bold text-slate-800 text-sm uppercase">
                    {activeTab === 'COMPARISON' ? 'Đối chiếu Tàu - Kho bãi' : activeTab === 'CRANE' ? 'Nhật ký Tally Đầu Cần' : 'Nhật ký Tally Bãi'}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                    {activeTab === 'COMPARISON' ? 'So sánh Vận đơn & Thực tế' : `Dữ liệu chi tiết từ ${activeTab === 'CRANE' ? 'cầu tàu' : 'trạm cân/bãi'}`}
                </p>
             </div>
             <div className="h-8 w-px bg-slate-200 mx-2 hidden md:block"></div>
             
             <div className="relative">
                <select 
                    value={selectedShip}
                    onChange={(e) => setSelectedShip(e.target.value)}
                    className="appearance-none bg-slate-50 border border-slate-300 text-slate-700 text-sm font-bold rounded-lg pl-10 pr-8 py-2 focus:outline-none focus:border-blue-500 min-w-[250px]"
                >
                    <option>MV. GLORY STAR (V.2506)</option>
                    <option>MV. OCEAN BULK (V.2502)</option>
                </select>
                <Anchor size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             </div>
        </div>

        <div className="flex gap-2">
            {activeTab !== 'COMPARISON' && (
                <div className="relative">
                    <input type="text" placeholder="Tìm số xe..." className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 w-48"/>
                    <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                </div>
            )}
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-lg hover:bg-slate-50 transition-all shadow-sm">
                <RefreshCw size={16} />
                <span>Làm mới</span>
            </button>
        </div>
      </div>

      {/* CONTENT: COMPARISON TAB */}
      {activeTab === 'COMPARISON' && (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* MANIFEST */}
                <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm flex flex-col justify-between">
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Tổng Vận Đơn (Manifest)</p>
                        <div className="flex items-baseline gap-1 mt-1">
                            <p className="text-2xl font-extrabold text-blue-800">{reportData.manifestTotal.toLocaleString()}</p>
                            <span className="text-sm font-medium text-slate-400">Tấn</span>
                        </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-50 flex items-center gap-2 text-xs text-slate-500">
                        <Anchor size={14} />
                        <span>Theo hồ sơ tàu</span>
                    </div>
                </div>

                {/* CRANE TALLY */}
                <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm flex flex-col justify-between">
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Tally Đầu Cần (Crane)</p>
                        <div className="flex items-baseline gap-1 mt-1">
                            <p className="text-2xl font-extrabold text-orange-600">{reportData.craneTotal.toLocaleString()}</p>
                            <span className="text-sm font-medium text-slate-400">Tấn</span>
                        </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-50 flex items-center gap-2 text-xs text-slate-500">
                        <Construction size={14} />
                        <span>Sản lượng qua cầu</span>
                    </div>
                </div>

                {/* YARD TALLY */}
                <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm flex flex-col justify-between">
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Tally Bãi (Yard)</p>
                        <div className="flex items-baseline gap-1 mt-1">
                            <p className="text-2xl font-extrabold text-emerald-700">{reportData.yardTotal.toLocaleString()}</p>
                            <span className="text-sm font-medium text-slate-400">Tấn</span>
                        </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-50 flex items-center gap-2 text-xs text-slate-500">
                        <Layers size={14} />
                        <span>Thực nhập kho bãi</span>
                    </div>
                </div>

                {/* VARIANCE */}
                <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm flex flex-col justify-between">
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Chênh Lệch (Bãi - VĐ)</p>
                        <div className="flex items-baseline gap-2 mt-1">
                            <p className={`text-2xl font-extrabold ${variance >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                {variance > 0 ? '+' : ''}{variance.toLocaleString()}
                            </p>
                            <span className="text-sm font-medium text-slate-400">Tấn</span>
                        </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-50 flex items-center gap-2 text-xs font-bold">
                        <span className={`px-2 py-0.5 rounded ${isToleranceOk ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {variancePercent > 0 ? '+' : ''}{variancePercent.toFixed(2)}%
                        </span>
                        <span className="text-slate-400 font-normal ml-auto flex items-center gap-1">
                            <AlertCircle size={12}/>
                            {isToleranceOk ? 'Đạt' : 'Lệch'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex-1">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                    <h4 className="font-bold text-slate-700 text-sm uppercase flex items-center gap-2">
                        <ArrowRightLeft size={16} className="text-blue-500" />
                        Bảng chi tiết số liệu
                    </h4>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                            <tr>
                                <th className="py-4 px-6 text-center w-16">STT</th>
                                <th className="py-4 px-6 text-left">Ngày</th>
                                <th className="py-4 px-6 text-left">Ca làm việc</th>
                                <th className="py-4 px-6 text-right text-blue-700">Vận Đơn (Manifest)</th>
                                <th className="py-4 px-6 text-right text-orange-700">Tally Đầu Cần</th>
                                <th className="py-4 px-6 text-right text-green-700">Tally Bãi</th>
                                <th className="py-4 px-6 text-center">Chênh lệch (Bãi - VĐ)</th>
                                <th className="py-4 px-6 text-left">Ghi chú</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {shiftDetails.map((row, index) => {
                                const rowDiff = row.yardTally - row.manifest;
                                return (
                                    <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="py-4 px-6 text-center text-slate-400">{index + 1}</td>
                                        <td className="py-4 px-6 font-medium text-slate-600">{row.date}</td>
                                        <td className="py-4 px-6 font-bold text-slate-800">{row.shift}</td>
                                        <td className="py-4 px-6 text-right font-medium text-blue-700">{row.manifest.toLocaleString()}</td>
                                        <td className="py-4 px-6 text-right font-bold text-orange-600">{row.craneTally.toLocaleString()}</td>
                                        <td className="py-4 px-6 text-right font-bold text-green-600">{row.yardTally.toLocaleString()}</td>
                                        <td className={`py-4 px-6 text-center font-bold ${rowDiff >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                            {rowDiff > 0 ? '+' : ''}{rowDiff}
                                        </td>
                                        <td className="py-4 px-6 text-slate-500 italic text-xs">{row.note}</td>
                                    </tr>
                                );
                            })}
                            <tr className="bg-slate-50/80 font-bold border-t border-slate-200">
                                <td className="py-4 px-6 text-center" colSpan={3}>TỔNG CỘNG</td>
                                <td className="py-4 px-6 text-right text-blue-800">{reportData.manifestTotal.toLocaleString()}</td>
                                <td className="py-4 px-6 text-right text-orange-800">{reportData.craneTotal.toLocaleString()}</td>
                                <td className="py-4 px-6 text-right text-emerald-800">{reportData.yardTotal.toLocaleString()}</td>
                                <td className={`py-4 px-6 text-center ${variance >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                                    {variance > 0 ? '+' : ''}{variance.toLocaleString()}
                                </td>
                                <td className="py-4 px-6"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
      )}

      {/* CONTENT: CRANE TALLY TAB */}
      {activeTab === 'CRANE' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex-1">
             <div className="overflow-x-auto custom-scrollbar max-h-[600px]">
                <table className="w-full text-sm text-left border-collapse min-w-[1200px]">
                    <thead className="bg-orange-50 text-orange-800 text-xs font-bold uppercase tracking-wider border-b border-orange-100 sticky top-0 z-10">
                        <tr>
                            <th className="py-4 px-6 text-center w-16">STT</th>
                            <th className="py-4 px-6 text-left">Thiết bị</th>
                            <th className="py-4 px-6 text-left">Hầm hàng</th>
                            <th className="py-4 px-6 text-left">Số xe / Số romooc</th>
                            <th className="py-4 px-6 text-left">Thời gian</th>
                            <th className="py-4 px-6 text-left">Loại hàng</th>
                            <th className="py-4 px-6 text-right">KL Tịnh (kg)</th>
                            <th className="py-4 px-6 text-left">Tallyman</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {craneTallyData.map((row, index) => (
                            <tr key={row.id} className="hover:bg-orange-50/30 transition-colors">
                                <td className="py-3 px-6 text-center text-slate-400 font-medium">
                                    <div>{index + 1}</div>
                                </td>
                                <td className="py-3 px-6 text-slate-700 font-bold whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <Hammer size={14} className="text-slate-400"/>
                                        {row.equipment}
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-blue-600 font-medium whitespace-nowrap">
                                    <div>{row.hold}</div>
                                </td>
                                <td className="py-3 px-6 font-bold text-slate-800 whitespace-nowrap">
                                     <div className="flex items-center gap-2">
                                        <Truck size={14} className="text-slate-400"/>
                                        {row.truck}
                                     </div>
                                </td>
                                <td className="py-3 px-6 text-slate-600 whitespace-nowrap">
                                    <div>{row.time}</div>
                                </td>
                                <td className="py-3 px-6 text-slate-700 whitespace-nowrap">
                                    <div>{row.commodity}</div>
                                </td>
                                <td className="py-3 px-6 text-right font-mono font-bold text-orange-700">
                                    <div>{row.weight.toLocaleString()}</div>
                                </td>
                                <td className="py-3 px-6 text-slate-500 italic whitespace-nowrap">
                                    <div>{row.tallyman}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
        </div>
      )}

      {/* CONTENT: YARD TALLY TAB */}
      {activeTab === 'YARD' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex-1">
             <div className="overflow-x-auto custom-scrollbar max-h-[600px]">
                <table className="w-full text-sm text-left border-collapse min-w-[1200px]">
                    <thead className="bg-green-50 text-green-800 text-xs font-bold uppercase tracking-wider border-b border-green-100 sticky top-0 z-10">
                        <tr>
                            <th className="py-4 px-6 text-center w-16">STT</th>
                            <th className="py-4 px-6 text-left">Vị trí Bãi</th>
                            <th className="py-4 px-6 text-left">Thiết bị</th>
                            <th className="py-4 px-6 text-left">Số xe / Số romooc</th>
                            <th className="py-4 px-6 text-center">Giờ Vào</th>
                            <th className="py-4 px-6 text-center">Giờ Ra</th>
                            <th className="py-4 px-6 text-left">Loại hàng</th>
                            <th className="py-4 px-6 text-right">KL Tịnh (kg)</th>
                            <th className="py-4 px-6 text-left">Nhân viên cân</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {yardTallyData.map((row, index) => (
                            <tr key={row.id} className="hover:bg-green-50/30 transition-colors">
                                <td className="py-3 px-6 text-center text-slate-400 font-medium">
                                    <div>{index + 1}</div>
                                </td>
                                <td className="py-3 px-6 font-bold text-slate-700 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <Layers size={14} className="text-slate-400"/>
                                        {row.location}
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-slate-700 font-medium whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <Hammer size={14} className="text-slate-400"/>
                                        {row.equipment}
                                    </div>
                                </td>
                                <td className="py-3 px-6 font-bold text-slate-800 whitespace-nowrap">
                                     <div className="flex items-center gap-2">
                                        <Truck size={14} className="text-slate-400"/>
                                        {row.truck}
                                     </div>
                                </td>
                                <td className="py-3 px-6 text-center text-slate-600 whitespace-nowrap">
                                    <div className="flex items-center justify-center gap-1">
                                        <Clock size={12} className="text-green-500"/> {row.timeIn}
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-center text-slate-600 whitespace-nowrap">
                                     <div className="flex items-center justify-center gap-1">
                                        <Clock size={12} className="text-orange-400"/> {row.timeOut}
                                     </div>
                                </td>
                                <td className="py-3 px-6 text-slate-700 whitespace-nowrap">
                                    <div>{row.commodity}</div>
                                </td>
                                <td className="py-3 px-6 text-right font-mono font-bold text-green-700">
                                    <div>{row.netWeight.toLocaleString()}</div>
                                </td>
                                <td className="py-3 px-6 text-slate-500 italic whitespace-nowrap">
                                    <div>{row.weigher}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
        </div>
      )}
    </div>
  );
};
