
import React from 'react';
import { Search, Anchor, Weight, Activity, Clock, Box, Truck } from 'lucide-react';

export const CargoHandlingStatus: React.FC = () => {
  // Dummy data for Bulk Cargo context
  const kpiData = {
    totalManifest: 45000, // Tấn
    completed: 28500, // Tấn
    productivity: 850, // Tấn/h
  };

  const holdsData = [
    { id: 1, name: 'Hầm 1', commodity: 'Than đá', total: 8000, done: 7800, crane: '--', status: 'completed' },
    { id: 2, name: 'Hầm 2', commodity: 'Than đá', total: 10000, done: 6500, crane: 'Cẩu 01', status: 'working' },
    { id: 3, name: 'Hầm 3', commodity: 'Quặng sắt', total: 12000, done: 4000, crane: 'Cẩu 02', status: 'working' },
    { id: 4, name: 'Hầm 4', commodity: 'Quặng sắt', total: 9000, done: 9000, crane: '--', status: 'completed' },
    { id: 5, name: 'Hầm 5', commodity: 'Than đá', total: 6000, done: 1200, crane: 'Cẩu 03', status: 'working' },
  ];

  const craneData = [
    { 
      id: 'C01', 
      name: 'Cẩu 01 (Liebherr)', 
      status: 'active', 
      rate: 320, 
      hold: 'Hầm 2',
      trucks: ['XD-01', 'XD-02', 'XD-05', 'XD-08'],
      truckStatus: 'working'
    },
    { 
      id: 'C02', 
      name: 'Cẩu 02 (Kocks)', 
      status: 'active', 
      rate: 290, 
      hold: 'Hầm 3',
      trucks: ['XD-12', 'XD-14', 'XD-15'],
      truckStatus: 'working'
    },
    { 
      id: 'C03', 
      name: 'Cẩu 03 (Kocks)', 
      status: 'active', 
      rate: 240, 
      hold: 'Hầm 5',
      trucks: ['XD-22', 'XD-24'],
      truckStatus: 'idle'
    },
    { 
      id: 'C04', 
      name: 'Cẩu 04 (Gottwald)', 
      status: 'maintenance', 
      rate: 0, 
      hold: '--',
      trucks: [],
      truckStatus: 'idle'
    },
  ];

  // Expanded manifest data
  const manifestData = [
    { id: 1, bl: 'COSU123456', commodity: 'Than đá', hatch: 'Hầm 2', consignee: 'Nhiệt điện TB', weight: 5000, done: 3500 },
    { id: 2, bl: 'HLCU987654', commodity: 'Quặng sắt', hatch: 'Hầm 3', consignee: 'Hòa Phát Steel', weight: 8000, done: 2500 },
    { id: 3, bl: 'MSCU111222', commodity: 'Than đá', hatch: 'Hầm 5', consignee: 'Xi măng HP', weight: 3000, done: 600 },
    { id: 4, bl: 'ONEY555666', commodity: 'Than đá', hatch: 'Hầm 1', consignee: 'Nhiệt điện TB', weight: 8000, done: 8000 },
    { id: 5, bl: 'CMAU777888', commodity: 'Thạch cao', hatch: 'Hầm 4', consignee: 'Xi măng Cẩm Phả', weight: 4500, done: 4500 },
    { id: 6, bl: 'SITG999000', commodity: 'Than Cám 3a', hatch: 'Hầm 2', consignee: 'Than Đông Bắc', weight: 5000, done: 3000 },
    { id: 7, bl: 'OOLU121212', commodity: 'Quặng sắt', hatch: 'Hầm 3', consignee: 'Gang Thép TN', weight: 4000, done: 1500 },
    { id: 8, bl: 'HLCU333444', commodity: 'Than Bituminous', hatch: 'Hầm 5', consignee: 'Nhiệt điện QN', weight: 3000, done: 600 },
    { id: 9, bl: 'EMCU555666', commodity: 'Đá vôi', hatch: 'Hầm 4', consignee: 'Vôi CN', weight: 4500, done: 4500 },
    { id: 10, bl: 'YMLU777888', commodity: 'Than đá', hatch: 'Hầm 1', consignee: 'Nhiệt điện TB', weight: 2000, done: 2000 },
    { id: 11, bl: 'COSU454545', commodity: 'Quặng Niken', hatch: 'Hầm 3', consignee: 'Kim Loại Màu', weight: 2500, done: 1000 },
    { id: 12, bl: 'SITC888999', commodity: 'Than đá', hatch: 'Hầm 2', consignee: 'Nhiệt điện TB', weight: 3500, done: 1200 },
    { id: 13, bl: 'MSCU654321', commodity: 'Dăm gỗ', hatch: 'Hầm 5', consignee: 'Giấy Bãi Bằng', weight: 1500, done: 300 },
    { id: 14, bl: 'CMAU987654', commodity: 'Than đá', hatch: 'Hầm 1', consignee: 'Nhiệt điện HP', weight: 2000, done: 2000 },
    { id: 15, bl: 'ONEY112233', commodity: 'Quặng sắt', hatch: 'Hầm 4', consignee: 'Hòa Phát Steel', weight: 3500, done: 3500 },
  ];

  const remaining = kpiData.totalManifest - kpiData.completed;
  const progressPercent = Math.round((kpiData.completed / kpiData.totalManifest) * 100);

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      {/* Control & Info Bar */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col">
              <label className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-wide">Tàu khai thác</label>
              <div className="relative">
                <select className="border border-slate-300 rounded-lg px-4 py-2 text-sm font-bold text-blue-900 focus:outline-none focus:border-blue-500 bg-slate-50 min-w-[240px] shadow-sm">
                  <option>MV. GLORY STAR (V.2506) - Hàng Rời</option>
                  <option>MV. OCEAN BULK (V.2502)</option>
                </select>
              </div>
            </div>
            
            <div className="h-10 w-px bg-slate-200 hidden md:block"></div>

            <div className="flex gap-8">
                <div className="flex flex-col">
                    <span className="text-xs text-slate-400 uppercase font-bold">Bắt đầu</span>
                    <span className="text-sm font-bold text-slate-700">17/06/2025 08:00</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-slate-400 uppercase font-bold">Dự kiến xong</span>
                    <span className="text-sm font-bold text-slate-700">19/06/2025 14:00</span>
                </div>
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-600 text-sm font-bold rounded-lg hover:bg-blue-50 transition-all shadow-sm self-start md:self-center">
             <Search size={16} />
             <span>Nạp dữ liệu</span>
          </button>
        </div>
      </div>

      {/* KPI Dashboard - Modern Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-300 transition-all">
            <div>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Tổng Khai Thác</span>
                <div className="mt-1">
                    <span className="text-2xl font-extrabold text-slate-800">{kpiData.totalManifest.toLocaleString()}</span>
                    <span className="text-xs text-slate-500 ml-1 font-medium">Tấn</span>
                </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                 <Weight size={20} />
            </div>
        </div>
        
        {/* Card 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-green-300 transition-all">
            <div>
                 <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Đã Hoàn Thành</span>
                    <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">{progressPercent}%</span>
                 </div>
                <div className="mt-1">
                    <span className="text-2xl font-extrabold text-green-600">{kpiData.completed.toLocaleString()}</span>
                    <span className="text-xs text-slate-500 ml-1 font-medium">Tấn</span>
                </div>
            </div>
             <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-green-100 transition-colors">
                 <Box size={20} />
            </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-orange-300 transition-all">
            <div>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Còn Lại</span>
                <div className="mt-1">
                    <span className="text-2xl font-extrabold text-orange-500">{remaining.toLocaleString()}</span>
                    <span className="text-xs text-slate-500 ml-1 font-medium">Tấn</span>
                </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 group-hover:bg-orange-100 transition-colors">
                 <Clock size={20} />
            </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-purple-300 transition-all">
            <div>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Năng suất</span>
                <div className="mt-1">
                    <span className="text-2xl font-extrabold text-purple-600">{kpiData.productivity}</span>
                    <span className="text-xs text-slate-500 ml-1 font-medium">Tấn/giờ</span>
                </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-100 transition-colors">
                 <Activity size={20} />
            </div>
        </div>
      </div>

      {/* Main Visualization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Ship Holds Visualization */}
        <div className="lg:col-span-2 bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm uppercase mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Anchor size={18} className="text-blue-500"/>
                Sơ đồ khai thác hầm hàng
            </h3>
            
            <div className="flex justify-between items-end h-[240px] px-2 gap-4">
                {holdsData.map((hold) => {
                    const percent = Math.round((hold.done / hold.total) * 100);
                    const isCompleted = percent === 100;
                    return (
                        <div key={hold.id} className="flex-1 flex flex-col justify-end h-full group relative">
                            {/* Crane Indicator overlay */}
                            {hold.crane !== '--' && (
                                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10 animate-bounce">
                                     <div className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded shadow-lg whitespace-nowrap border border-blue-700">
                                        {hold.crane}
                                     </div>
                                     <div className="w-0.5 h-6 bg-slate-300"></div>
                                </div>
                            )}

                            {/* Hold Container */}
                            <div className="w-full bg-slate-100 border-x border-b border-slate-300 rounded-b-lg relative overflow-hidden h-[180px] flex flex-col justify-end shadow-inner">
                                {/* Fill Level */}
                                <div 
                                    className={`w-full transition-all duration-1000 ease-out relative ${isCompleted ? 'bg-gradient-to-t from-green-500 to-green-400' : 'bg-gradient-to-t from-slate-700 to-slate-600'}`}
                                    style={{ height: `${percent}%` }}
                                >
                                    {/* Texture overlay for bulk cargo look */}
                                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>
                                </div>
                                
                                {/* Percentage Text */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                                    <span className={`text-xl font-black drop-shadow-md ${percent > 50 ? 'text-white' : 'text-slate-500'}`}>{percent}%</span>
                                </div>
                            </div>
                            
                            {/* Labels */}
                            <div className="text-center mt-3">
                                <div className="font-bold text-slate-700 text-sm">{hold.name}</div>
                                <div className="text-[10px] text-slate-500 font-medium truncate w-full">{hold.commodity}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-6 flex justify-center gap-6 text-xs text-slate-500 font-medium border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-slate-600 rounded-sm"></div>
                    <span>Đang làm hàng</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                    <span>Hoàn thành</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-slate-200 rounded-sm"></div>
                    <span>Chưa bắt đầu</span>
                </div>
            </div>
        </div>

        {/* Crane Status Side-panel */}
        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex flex-col">
            <h3 className="font-bold text-slate-800 text-sm uppercase mb-4 border-b border-slate-100 pb-3">Trạng thái thiết bị</h3>
            <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1">
                {craneData.map((crane) => (
                    <div key={crane.id} className="flex flex-col p-3 bg-slate-50 rounded-lg border border-slate-100 hover:bg-white hover:shadow-sm transition-all">
                        {/* Crane Info */}
                        <div className="flex items-center justify-between">
                             <div>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2.5 h-2.5 rounded-full ${crane.status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-400'}`}></div>
                                    <span className="text-sm font-bold text-slate-700">{crane.name}</span>
                                </div>
                                <div className="text-xs text-slate-500 mt-1 pl-4">
                                    Vị trí: <span className="font-bold text-blue-600">{crane.hold}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-extrabold text-slate-700">{crane.rate}</div>
                                <div className="text-[10px] text-slate-400 uppercase font-semibold">Tấn/Giờ</div>
                            </div>
                        </div>
                        
                        {/* Truck Fleet Info */}
                        {crane.trucks.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-slate-200/60">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase">
                                        <Truck size={12} />
                                        <span>Đội xe phục vụ</span>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                        crane.truckStatus === 'working' 
                                            ? 'bg-green-100 text-green-700 border-green-200' 
                                            : 'bg-orange-50 text-orange-600 border-orange-200'
                                    }`}>
                                        {crane.truckStatus === 'working' ? 'Hoạt động' : 'Đang rảnh'}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 pl-4">
                                    {crane.trucks.map((truck) => (
                                        <span key={truck} className="text-[10px] font-bold text-slate-600 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-sm">
                                            {truck}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Detailed Manifest Table */}
      <div className="w-full overflow-hidden border border-slate-200 rounded-xl bg-white shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Chi tiết vận đơn</h4>
        </div>
        <div className="overflow-x-auto max-h-[400px] custom-scrollbar">
          <table className="w-full border-collapse min-w-[900px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="py-4 px-6 text-center w-16 bg-slate-50">STT</th>
                <th className="py-4 px-6 text-left bg-slate-50">Số Vận Đơn</th>
                <th className="py-4 px-6 text-left bg-slate-50">Hầm hàng</th>
                <th className="py-4 px-6 text-left bg-slate-50">Loại hàng</th>
                <th className="py-4 px-6 text-left bg-slate-50">Chủ hàng</th>
                <th className="py-4 px-6 text-right bg-slate-50">Tổng Lượng (Tấn)</th>
                <th className="py-4 px-6 text-right bg-slate-50">Đã Dỡ (Tấn)</th>
                <th className="py-4 px-6 text-center bg-slate-50">Tiến độ</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-700">
              {manifestData.map((row, index) => {
                  const percent = Math.round((row.done / row.weight) * 100);
                  return (
                      <tr key={row.id} className="border-b border-slate-100 hover:bg-blue-50/30 transition-colors">
                          <td className="py-4 px-6 text-center text-slate-400 font-medium">{index + 1}</td>
                          <td className="py-4 px-6 font-bold text-slate-800">{row.bl}</td>
                          <td className="py-4 px-6 font-medium text-blue-600">{row.hatch}</td>
                          <td className="py-4 px-6 text-slate-600">{row.commodity}</td>
                          <td className="py-4 px-6 text-slate-600">{row.consignee}</td>
                          <td className="py-4 px-6 text-right font-medium">{row.weight.toLocaleString()}</td>
                          <td className="py-4 px-6 text-right text-green-600 font-bold">{row.done.toLocaleString()}</td>
                          <td className="py-4 px-6">
                              <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden mx-auto">
                                  <div className={`h-full rounded-full ${percent === 100 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${percent}%` }}></div>
                              </div>
                          </td>
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
