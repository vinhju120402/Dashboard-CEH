
import React from 'react';
import { Calendar, Search, Ship, Clock, ArrowRight } from 'lucide-react';

export const BerthSchedule: React.FC = () => {
  const dates = ['17-06-2025', '18-06-2025', '19-06-2025'];
  const hours = ['2H', '4H', '6H', '8H', '10H', '12H', '14H', '16H', '18H', '20H', '22H'];
  const yAxisLabels = [20, 40, 60, 80, 100];
  const totalColumns = dates.length * hours.length;

  const ships = [
    { 
      id: 1, 
      name: 'MV. GLORY STAR', 
      status: 'arrived', 
      color: 'bg-gradient-to-r from-blue-500 to-blue-600 border-blue-400', 
      textColor: 'text-white',
      shadow: 'shadow-blue-200',
      startCol: 2, 
      duration: 10, 
      rowIndex: 0 
    },
    { 
      id: 2, 
      name: 'MV. OCEAN BULK', 
      status: 'planned', 
      color: 'bg-gradient-to-r from-amber-400 to-amber-500 border-amber-300', 
      textColor: 'text-white',
      shadow: 'shadow-amber-200',
      startCol: 15, 
      duration: 8, 
      rowIndex: 2 
    },
    { 
      id: 3, 
      name: 'MV. OLD SHIP', 
      status: 'departed', 
      color: 'bg-gradient-to-r from-emerald-500 to-emerald-600 border-emerald-400', 
      textColor: 'text-white',
      shadow: 'shadow-emerald-200',
      startCol: 26, 
      duration: 5, 
      rowIndex: 1 
    },
    { 
      id: 4, 
      name: 'MV. PACIFIC DREAM', 
      status: 'planned', 
      color: 'bg-gradient-to-r from-amber-400 to-amber-500 border-amber-300', 
      textColor: 'text-white',
      shadow: 'shadow-amber-200',
      startCol: 4, 
      duration: 12, 
      rowIndex: 3 
    },
    { 
      id: 5, 
      name: 'MV. ASIAN PEARL', 
      status: 'planned', 
      color: 'bg-gradient-to-r from-amber-400 to-amber-500 border-amber-300', 
      textColor: 'text-white',
      shadow: 'shadow-amber-200',
      startCol: 18, 
      duration: 14, 
      rowIndex: 4 
    }
  ];

  const getStatusText = (status: string) => {
    switch(status) {
        case 'arrived': return 'ĐÃ CẬP BẾN';
        case 'planned': return 'KẾ HOẠCH';
        case 'departed': return 'ĐÃ RỜI BẾN';
        default: return '';
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      {/* Control Panel */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          
          <div className="flex flex-wrap items-center gap-6">
             <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2.5 rounded-lg border border-blue-100 text-blue-600">
                    <Calendar size={20} />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Kế hoạch cầu bến</h3>
                    <p className="text-xs text-slate-500 font-medium">Theo dõi lịch tàu cập bến</p>
                </div>
            </div>
            
            <div className="h-8 w-px bg-slate-200 hidden md:block"></div>

            <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                <div className="flex flex-col px-2">
                    <label className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">Từ ngày</label>
                    <input 
                      type="date" 
                      defaultValue="2025-06-17" 
                      className="bg-transparent text-sm font-bold text-slate-700 focus:outline-none"
                    />
                </div>
                <ArrowRight size={14} className="text-slate-300" />
                 <div className="flex flex-col px-2">
                    <label className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">Đến ngày</label>
                    <input 
                      type="date" 
                      defaultValue="2025-06-19" 
                      className="bg-transparent text-sm font-bold text-slate-700 focus:outline-none"
                    />
                </div>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
             {/* Enhanced Legend */}
            <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-amber-400 rounded-full shadow-[0_0_6px_rgba(251,191,36,0.5)]"></div>
                <span className="text-xs font-bold text-slate-600">Kế hoạch</span>
                </div>
                <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_6px_rgba(59,130,246,0.5)]"></div>
                <span className="text-xs font-bold text-slate-600">Cập cảng</span>
                </div>
                <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_6px_rgba(16,185,129,0.5)]"></div>
                <span className="text-xs font-bold text-slate-600">Rời cảng</span>
                </div>
            </div>

            <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform active:scale-95 ml-auto">
                <Search size={16} />
                <span>Nạp dữ liệu</span>
            </button>
          </div>

        </div>
      </div>

      {/* Grid Chart Container */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        {/* Header Info */}
        <div className="px-6 py-3 bg-slate-50/50 border-b border-slate-200 flex justify-between items-center">
             <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                 <Clock size={14} />
                 <span>Múi giờ: GMT+7</span>
             </div>
             <div className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                 Khu vực: Bến K12C
             </div>
        </div>

        <div className="overflow-x-auto relative custom-scrollbar">
            <div className="min-w-[1200px] relative pb-6">
            
            {/* Ship Overlays - Positioned on top of grid */}
            <div className="absolute top-[108px] left-[70px] right-0 bottom-0 pointer-events-none z-20">
                {ships.map(ship => {
                    const leftPercent = (ship.startCol / totalColumns) * 100;
                    const widthPercent = (ship.duration / totalColumns) * 100;
                    const topPos = ship.rowIndex * 70 + 12; // Adjusted for taller rows
                    const height = 48; 

                    return (
                        <div 
                            key={ship.id}
                            className={`absolute flex items-center gap-3 px-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer border border-white/20 pointer-events-auto group ${ship.color} ${ship.textColor}`}
                            style={{
                                left: `${leftPercent}%`,
                                width: `calc(${widthPercent}% - 4px)`, // Slight gap
                                top: `${topPos}px`,
                                height: `${height}px`
                            }}
                        >
                            <div className="bg-white/20 p-1.5 rounded-md backdrop-blur-sm">
                                <Ship size={18} className="text-white drop-shadow-sm" />
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-xs font-extrabold truncate tracking-wide drop-shadow-md">{ship.name}</span>
                                <span className="text-[10px] font-medium opacity-90 truncate">V.2506 • 45,000 Tấn</span>
                            </div>
                            
                            {/* Tooltip on Hover */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                                {getStatusText(ship.status)}
                            </div>
                        </div>
                    );
                })}
            </div>

            <table className="w-full border-collapse">
                <thead>
                {/* Date Header Row */}
                <tr>
                    <th className="border-r border-slate-100 p-2 w-[70px] bg-white sticky left-0 z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)]"></th>
                    {dates.map((date, i) => (
                    <th key={date} colSpan={hours.length} className={`border-b border-r border-slate-100 py-3 text-center bg-slate-50/80 backdrop-blur-sm ${i === 0 ? 'rounded-tl-lg' : ''}`}>
                         <div className="flex flex-col items-center">
                            <span className="text-xs font-extrabold text-slate-700 tracking-wider uppercase">{date}</span>
                         </div>
                    </th>
                    ))}
                </tr>
                {/* Hour Header Row */}
                <tr>
                    <th className="border-r border-slate-100 p-2 w-[70px] bg-white sticky left-0 z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)] border-b border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400">MÉT</span>
                    </th>
                    {dates.map((date) => (
                    hours.map((hour, idx) => (
                        <th key={`${date}-${hour}`} className={`border-b border-r border-slate-100 py-2 min-w-[40px] text-[10px] font-bold text-slate-400 bg-white ${idx % 2 === 0 ? 'bg-slate-50/30' : ''}`}>
                        {hour}
                        </th>
                    ))
                    ))}
                </tr>
                </thead>
                <tbody>
                {/* Rows */}
                {yAxisLabels.map((label, rowIndex) => (
                    <tr key={label} className="h-[70px] relative group">
                        <td className="border-b border-r border-slate-100 text-right pr-3 text-xs font-bold text-slate-500 bg-slate-50/50 sticky left-0 z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)] group-hover:bg-blue-50/50 transition-colors">
                            {label}m
                        </td>
                        {dates.map((date) => (
                            hours.map((hour, idx) => (
                            <td key={`${date}-${hour}-${label}`} className={`border-b border-r border-slate-50 relative ${idx % 2 === 0 ? 'bg-slate-50/20' : ''}`}>
                                {/* Vertical subtle guide line */}
                                <div className="absolute inset-y-0 right-0 w-px bg-slate-100/50"></div>
                            </td>
                            ))
                        ))}
                    </tr>
                ))}
                
                {/* Footer Label for Location K12C */}
                <tr>
                    <td className="py-4 pr-3 text-right sticky left-0 bg-white border-r border-slate-100 z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
                        <div className="font-extrabold text-blue-900 text-sm">K12C</div>
                    </td>
                    <td colSpan={totalColumns} className="bg-slate-50/20 border-t border-slate-100"></td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
      </div>
    </div>
  );
};
