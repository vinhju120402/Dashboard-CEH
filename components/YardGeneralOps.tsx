
import React from 'react';
import { Search, Database, Truck, AlertTriangle, Layers, Hammer, MapPin } from 'lucide-react';

export const YardGeneralOps: React.FC = () => {
  const yards = [
    { id: 'B01', name: 'Bãi A - Lô 01', type: 'Open Yard', commodity: 'Than Cám 3a', volume: 15000, capacity: 20000, status: 'active' },
    { id: 'B02', name: 'Bãi B - Lô 01', type: 'Open Yard', commodity: 'Quặng Sắt', volume: 8000, capacity: 25000, status: 'active' },
    { id: 'K01', name: 'Kho K1 - Lô 01', type: 'Warehouse', commodity: 'Thạch Cao', volume: 4500, capacity: 5000, status: 'warning' }, 
    { id: 'B03', name: 'Bãi A - Lô 02', type: 'Open Yard', commodity: 'Than Bituminous', volume: 19500, capacity: 20000, status: 'active' },
    { id: 'K02', name: 'Kho K2 - Lô 01', type: 'Warehouse', commodity: 'Đá Vôi', volume: 500, capacity: 10000, status: 'idle' },
    { id: 'B04', name: 'Bãi Đệm - Lô 01', type: 'Buffer Yard', commodity: '--', volume: 0, capacity: 15000, status: 'maintenance' },
    { id: 'B05', name: 'Bãi C - Lô 01', type: 'Open Yard', commodity: 'Than Antracite', volume: 12000, capacity: 18000, status: 'active' },
    { id: 'B06', name: 'Bãi C - Lô 02', type: 'Open Yard', commodity: 'Cát San Lấp', volume: 5000, capacity: 20000, status: 'active' },
    { id: 'K03', name: 'Kho K3 - Lô 01', type: 'Warehouse', commodity: 'Phụ Gia Xi Măng', volume: 8000, capacity: 8000, status: 'active' },
  ];

  const equipmentFleet = [
    { id: 'MX-01', name: 'Máy xúc 01', type: 'Excavator', locationId: 'B01', activity: 'Vun đống' },
    { id: 'MX-02', name: 'Máy xúc 02', type: 'Excavator', locationId: 'B01', activity: 'Xúc lên xe' },
    { id: 'MU-05', name: 'Máy ủi 05', type: 'Bulldozer', locationId: 'B02', activity: 'San gạt' },
    { id: 'BT-01', name: 'Băng tải T1', type: 'Conveyor', locationId: 'K01', activity: 'Đang chạy' },
    { id: 'MX-03', name: 'Máy xúc 03', type: 'Excavator', locationId: 'B03', activity: 'Hạ tải' },
    { id: 'MU-02', name: 'Máy ủi 02', type: 'Bulldozer', locationId: 'B03', activity: 'Vun đống' },
    { id: 'BT-02', name: 'Băng tải T2', type: 'Conveyor', locationId: 'B03', activity: 'Đang chạy' },
    { id: 'SC-01', name: 'Xe sửa chữa', type: 'Service', locationId: 'B04', activity: 'Bảo trì sân bãi' },
    { id: 'MX-04', name: 'Máy xúc 04', type: 'Excavator', locationId: 'B05', activity: 'Vun đống' },
    { id: 'MX-05', name: 'Máy xúc 05', type: 'Excavator', locationId: 'B05', activity: 'Xúc lên xe' },
    { id: 'MU-06', name: 'Máy ủi 06', type: 'Bulldozer', locationId: 'B06', activity: 'San gạt' },
    { id: 'BT-03', name: 'Băng tải T3', type: 'Conveyor', locationId: 'K03', activity: 'Đang chạy' },
  ];

  const getEquipmentForYard = (yardId: string) => {
    return equipmentFleet.filter(eq => eq.locationId === yardId);
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn h-full">
      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
           <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Tổng Tồn Kho</p>
              <p className="text-2xl font-extrabold text-slate-800 mt-1">72,500 <span className="text-sm font-medium text-slate-400">Tấn</span></p>
           </div>
           <div className="p-3 bg-blue-50 rounded-full text-blue-500">
               <Database size={24} />
           </div>
        </div>
        <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
           <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Sức Chứa</p>
              <p className="text-2xl font-extrabold text-slate-800 mt-1">141,000 <span className="text-sm font-medium text-slate-400">Tấn</span></p>
           </div>
           <div className="text-right">
              <span className="text-xs text-green-700 bg-green-100 font-bold px-2 py-1 rounded-full">51.4% Sử dụng</span>
           </div>
        </div>
        <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
           <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Cơ giới hoạt động</p>
              <p className="text-2xl font-extrabold text-slate-800 mt-1">11<span className="text-slate-400">/12</span></p>
           </div>
           <div className="p-3 bg-orange-50 rounded-full text-orange-500">
               <Truck size={24} />
           </div>
        </div>
        <div className="bg-white p-5 border border-slate-200 rounded-xl shadow-sm flex items-center justify-between">
           <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Bảo trì</p>
              <p className="text-2xl font-extrabold text-red-600 mt-1">1</p>
           </div>
           <div className="p-3 bg-red-50 rounded-full text-red-500 animate-pulse">
               <AlertTriangle size={24} />
           </div>
        </div>
      </div>

      {/* Filter / Legend Bar */}
      <div className="flex flex-wrap items-center justify-between bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
            <h3 className="font-bold text-slate-700 text-sm uppercase flex items-center gap-2">
                <MapPin size={18} className="text-blue-500"/>
                Sơ đồ phân bố thiết bị & Hàng hóa
            </h3>
            <div className="h-6 w-px bg-slate-200 mx-2 hidden md:block"></div>
            <div className="flex gap-4 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm"></span> Hoạt động
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm"></span> Bảo trì/Ngưng
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300 shadow-sm"></span> Trống
                </div>
            </div>
        </div>
        <div className="flex items-center gap-3 mt-2 md:mt-0">
            <input type="text" placeholder="Tìm kho hoặc thiết bị..." className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 shadow-sm w-64" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 shadow-sm transition-colors">Tìm kiếm</button>
        </div>
      </div>

      {/* YARD GRID DISPLAY */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {yards.map((yard) => {
            const yardEquipment = getEquipmentForYard(yard.id);
            const percentage = Math.round((yard.volume / yard.capacity) * 100);
            const isMaintenance = yard.status === 'maintenance';
            
            return (
                <div key={yard.id} className={`bg-white border rounded-xl shadow-sm flex flex-col relative overflow-hidden transition-all hover:shadow-md ${isMaintenance ? 'border-red-200 bg-red-50' : 'border-slate-200'}`}>
                    
                    {/* Header */}
                    <div className="p-5 border-b border-slate-100 flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className="font-bold text-lg text-slate-800">{yard.name}</h4>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border ${
                                    yard.type === 'Warehouse' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                                }`}>
                                    {yard.type === 'Warehouse' ? 'Kho Kín' : 'Bãi Hở'}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <Layers size={14} className="text-slate-400" />
                                <span className="text-sm font-semibold text-slate-600">
                                    {yard.commodity}
                                </span>
                            </div>
                        </div>
                        <div className="text-right">
                             {isMaintenance ? (
                                 <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded flex items-center gap-1">
                                    <Hammer size={12} /> Bảo trì
                                 </span>
                             ) : (
                                <div className={`text-xl font-black ${percentage > 90 ? 'text-red-500' : 'text-slate-700'}`}>
                                    {percentage}%
                                </div>
                             )}
                        </div>
                    </div>

                    {/* Inventory Bar */}
                    <div className="px-5 py-4 bg-slate-50">
                        <div className="flex justify-between text-xs text-slate-500 mb-1.5 font-medium">
                            <span>Hiện tại: <b className="text-slate-700">{yard.volume.toLocaleString()}</b></span>
                            <span>Sức chứa: {yard.capacity.toLocaleString()} Tấn</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-700 ${isMaintenance ? 'bg-slate-400' : percentage > 85 ? 'bg-red-500' : 'bg-green-500'}`} 
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Equipment List */}
                    <div className="p-5 flex-1 flex flex-col">
                        <h5 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2 tracking-wider">
                            <Truck size={14} />
                            Cơ giới đang hoạt động ({yardEquipment.length})
                        </h5>
                        
                        {yardEquipment.length > 0 ? (
                            <div className="flex flex-col gap-2.5">
                                {yardEquipment.map(eq => (
                                    <div key={eq.id} className="flex items-center justify-between p-2.5 bg-white border border-slate-100 rounded-lg shadow-sm hover:border-blue-300 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs border border-blue-100">
                                                {eq.type === 'Excavator' ? 'MX' : eq.type === 'Bulldozer' ? 'MU' : eq.type === 'Conveyor' ? 'BT' : 'Xe'}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-800 leading-tight">{eq.name}</div>
                                                <div className="text-[10px] text-blue-600 uppercase font-bold mt-0.5">{eq.activity}</div>
                                            </div>
                                        </div>
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-lg bg-slate-50 min-h-[60px]">
                                <span className="text-xs text-slate-400 italic font-medium">Không có thiết bị hoạt động</span>
                            </div>
                        )}
                    </div>

                </div>
            );
        })}
      </div>
    </div>
  );
};
