
import React from 'react';
import { Calendar, Search, Ship, Clock, ArrowRight, Filter } from 'lucide-react';

export const BerthSchedule: React.FC = () => {
  const dates = ['17-06-2025', '18-06-2025', '19-06-2025'];
  const hours = ['2H', '4H', '6H', '8H', '10H', '12H', '14H', '16H', '18H', '20H', '22H'];
  const yAxisLabels = [20, 40, 60, 80, 100];
  const totalColumns = dates.length * hours.length;

  const ships = [
    { id: 1, name: 'MV. GLORY STAR', status: 'arrived', color: 'bg-blue-600', startCol: 2, duration: 10, rowIndex: 0 },
    { id: 2, name: 'MV. OCEAN BULK', status: 'planned', color: 'bg-amber-500', startCol: 15, duration: 8, rowIndex: 2 },
    { id: 3, name: 'MV. OLD SHIP', status: 'departed', color: 'bg-emerald-600', startCol: 26, duration: 5, rowIndex: 1 },
    { id: 4, name: 'MV. PACIFIC DREAM', status: 'planned', color: 'bg-amber-500', startCol: 4, duration: 12, rowIndex: 3 },
    { id: 5, name: 'MV. ASIAN PEARL', status: 'planned', color: 'bg-amber-500', startCol: 18, duration: 14, rowIndex: 4 }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Compact Control Panel */}
      <div className="flex items-center justify-between p-2 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-1.5 rounded text-blue-700"><Calendar size={16} /></div>
                <h3 className="text-sm font-bold text-slate-800 uppercase">Kế hoạch cầu bến</h3>
             </div>
             
             <div className="h-6 w-px bg-slate-300"></div>

             {/* Compact Date Range */}
             <div className="flex items-center gap-2 bg-white px-2 py-1 rounded border border-slate-300 shadow-sm">
                <input type="date" defaultValue="2025-06-17" className="text-xs font-medium border-none focus:ring-0 p-0 text-slate-600 bg-transparent" />
                <ArrowRight size={12} className="text-slate-400" />
                <input type="date" defaultValue="2025-06-19" className="text-xs font-medium border-none focus:ring-0 p-0 text-slate-600 bg-transparent" />
             </div>
          </div>

          <div className="flex items-center gap-3">
             {/* Legend Inline */}
             <div className="flex items-center gap-3 bg-white px-3 py-1 rounded-full border border-slate-200">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-amber-500 rounded-full"></div><span className="text-[10px] font-bold text-slate-600">Kế hoạch</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-blue-600 rounded-full"></div><span className="text-[10px] font-bold text-slate-600">Cập cảng</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-emerald-600 rounded-full"></div><span className="text-[10px] font-bold text-slate-600">Rời cảng</span></div>
             </div>
             <button className="bg-blue-600 text-white p-1.5 rounded hover:bg-blue-700 transition-colors"><Search size={16} /></button>
          </div>
      </div>

      {/* Grid Chart Container - Maximize Height */}
      <div className="flex-1 overflow-hidden flex flex-col relative">
        <div className="absolute top-2 right-4 z-10 text-[10px] font-bold text-slate-400 flex items-center gap-1 bg-white/80 px-2 rounded">
             <Clock size={10} /> GMT+7 | Bến K12C
        </div>

        <div className="flex-1 overflow-auto custom-scrollbar bg-slate-50/30">
            <div className="min-w-[1000px] relative pb-4">
            
            {/* Ships Layer */}
            <div className="absolute top-[65px] left-[50px] right-0 bottom-0 pointer-events-none z-20">
                {ships.map(ship => {
                    const leftPercent = (ship.startCol / totalColumns) * 100;
                    const widthPercent = (ship.duration / totalColumns) * 100;
                    const topPos = ship.rowIndex * 50 + 6; // Compact row height 50px
                    const height = 38; 

                    return (
                        <div 
                            key={ship.id}
                            className={`absolute flex items-center gap-2 px-2 rounded shadow-md cursor-pointer border border-white/20 pointer-events-auto hover:brightness-110 transition-all ${ship.color}`}
                            style={{
                                left: `${leftPercent}%`,
                                width: `calc(${widthPercent}% - 2px)`,
                                top: `${topPos}px`,
                                height: `${height}px`
                            }}
                        >
                            <Ship size={14} className="text-white/90" />
                            <div className="flex flex-col overflow-hidden leading-tight">
                                <span className="text-[10px] font-bold text-white truncate">{ship.name}</span>
                                <span className="text-[8px] text-white/80 truncate">V.2506 • 45kT</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <table className="w-full border-collapse">
                <thead className="sticky top-0 z-30 bg-white shadow-sm">
                <tr>
                    <th className="border-r border-b border-slate-200 p-1 w-[50px] bg-slate-50"></th>
                    {dates.map((date) => (
                    <th key={date} colSpan={hours.length} className="border-b border-r border-slate-200 py-1.5 text-center bg-slate-100 text-slate-600 text-xs font-bold border-t border-t-slate-200">
                         {date}
                    </th>
                    ))}
                </tr>
                <tr>
                    <th className="border-r border-b border-slate-200 p-1 w-[50px] bg-slate-50 text-[9px] font-bold text-slate-400">MÉT</th>
                    {dates.map((date) => (
                    hours.map((hour, idx) => (
                        <th key={`${date}-${hour}`} className={`border-b border-r border-slate-200 py-1 min-w-[30px] text-[9px] font-semibold text-slate-400 ${idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                        {hour}
                        </th>
                    ))
                    ))}
                </tr>
                </thead>
                <tbody>
                {yAxisLabels.map((label) => (
                    <tr key={label} className="h-[50px]"> {/* Compact Row Height */}
                        <td className="border-b border-r border-slate-200 text-right pr-2 text-[10px] font-bold text-slate-400 bg-slate-50">
                            {label}m
                        </td>
                        {dates.map((date) => (
                            hours.map((hour, idx) => (
                            <td key={`${date}-${hour}-${label}`} className={`border-b border-r border-slate-100 ${idx % 2 === 0 ? 'bg-slate-50/50' : ''}`}></td>
                            ))
                        ))}
                    </tr>
                ))}
                 <tr>
                    <td className="py-2 pr-2 text-right bg-white border-r border-slate-200 font-bold text-blue-800 text-xs">K12C</td>
                    <td colSpan={totalColumns} className="bg-slate-50 border-t border-slate-200"></td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
      </div>
    </div>
  );
};
