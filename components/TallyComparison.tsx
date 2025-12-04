
import React from 'react';
import { Search, Scale, Anchor, ArrowRight, AlertCircle, FileText } from 'lucide-react';

export const TallyComparison: React.FC = () => {
  const reportData = {
    shipName: 'MV. GLORY STAR',
    voyage: 'V.2506',
    commodity: 'Than đá',
    draftSurvey: 45200, 
    scaleTotal: 45150,  
    tolerancePercent: 0.11,
    status: 'match',
  };
  
  const variance = reportData.scaleTotal - reportData.draftSurvey;

  const shiftDetails = [
    { id: 1, shift: 'Ca 1 (17/06)', draft: 15000, scale: 14980, diff: -20 },
    { id: 2, shift: 'Ca 2 (17/06)', draft: 14500, scale: 14550, diff: +50 },
    { id: 3, shift: 'Ca 3 (17/06)', draft: 15700, scale: 15620, diff: -80 },
    { id: 4, shift: 'Ca 1 (16/06)', draft: 14000, scale: 14020, diff: +20 },
    { id: 5, shift: 'Ca 2 (16/06)', draft: 13500, scale: 13480, diff: -20 },
    { id: 6, shift: 'Ca 3 (16/06)', draft: 13000, scale: 13010, diff: +10 },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fadeIn h-full">
      {/* Header / Filter Bar */}
      <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
         <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                      <Scale size={20} />
                  </div>
                  <h3 className="font-bold text-slate-700 text-sm uppercase">Đối chiếu: Giám định & Cân điện tử</h3>
              </div>
              <div className="h-8 w-px bg-slate-200"></div>
              <select className="border border-slate-300 rounded-lg px-4 py-2 text-sm font-bold text-blue-900 focus:outline-none focus:border-blue-500 bg-slate-50 min-w-[240px] shadow-sm">
                  <option>MV. GLORY STAR (V.2506)</option>
                  <option>MV. OCEAN BULK (V.2502)</option>
              </select>
         </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-600 text-sm font-bold rounded-lg hover:bg-blue-50 transition-all shadow-sm">
           <Search size={16} />
           <span>Nạp dữ liệu</span>
        </button>
      </div>

      {/* Main Comparison Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Card: Ship Figures */}
        <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-all">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
            <div className="flex justify-between items-start mb-6 pl-2">
                <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Số liệu Tàu</span>
                    <span className="text-sm font-extrabold text-blue-700 flex items-center gap-2 mt-1"><Anchor size={16}/> Giám định mớn nước</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-full">
                    <FileText className="text-blue-500" size={24} />
                </div>
            </div>
            <div className="pl-2 text-center py-2">
                <span className="text-5xl font-black text-slate-800 tracking-tight">{reportData.draftSurvey.toLocaleString()}</span>
                <span className="text-sm text-slate-500 font-bold ml-2">Tấn</span>
            </div>
            <div className="pl-2 mt-4 text-xs text-slate-400 font-medium text-center">
                Số liệu giám định mớn nước ban đầu
            </div>
        </div>

        {/* Middle Card: Variance */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center relative">
             <span className="text-xs text-slate-400 font-bold uppercase absolute top-4 left-4 tracking-wider">Chênh lệch</span>
             
             <div className={`text-6xl font-black mb-2 tracking-tighter ${variance > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {variance > 0 ? '+' : ''}{variance}
             </div>
             <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">Tấn</span>
             
             <div className={`mt-6 px-4 py-1.5 rounded-full text-xs font-bold border flex items-center gap-2 ${Math.abs(reportData.tolerancePercent) <= 0.5 ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                {Math.abs(reportData.tolerancePercent)}% / ±0.5%
             </div>

             {Math.abs(reportData.tolerancePercent) > 0.5 && (
                 <div className="mt-4 flex items-center gap-2 text-red-600 text-xs font-bold animate-pulse">
                    <AlertCircle size={14} />
                    VƯỢT QUÁ DUNG SAI
                 </div>
             )}
        </div>

        {/* Right Card: Shore Figures */}
        <div className="bg-white border border-green-100 rounded-xl p-6 shadow-sm relative overflow-hidden group hover:border-green-300 transition-all">
             <div className="absolute top-0 right-0 w-1.5 h-full bg-green-500"></div>
            <div className="flex justify-between items-start mb-6 pr-2">
                 <div className="bg-green-50 p-3 rounded-full">
                    <Scale className="text-green-600" size={24} />
                </div>
                <div className="flex flex-col text-right">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Số liệu Bờ</span>
                    <span className="text-sm font-extrabold text-green-700 flex items-center justify-end gap-2 mt-1">Cân Điện Tử <ArrowRight size={16}/></span>
                </div>
            </div>
            <div className="pr-2 text-center py-2">
                <span className="text-5xl font-black text-slate-800 tracking-tight">{reportData.scaleTotal.toLocaleString()}</span>
                <span className="text-sm text-slate-500 font-bold ml-2">Tấn</span>
            </div>
             <div className="pr-2 mt-4 text-xs text-slate-400 font-medium text-center">
                Tổng cộng dồn các phiếu cân xe
            </div>
        </div>
      </div>

      {/* Visual Comparison Bar Chart */}
      <div className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm">
          <h4 className="text-sm font-bold text-slate-700 uppercase mb-8 tracking-wide">Biểu đồ so sánh sản lượng</h4>
          <div className="flex flex-col gap-8">
              {/* Draft Bar */}
              <div className="relative">
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                      <span>Giám định Mớn nước</span>
                      <span>{reportData.draftSurvey.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-10 rounded-lg overflow-hidden flex shadow-inner">
                      <div className="h-full bg-blue-500 relative flex items-center pl-4 text-white text-xs font-bold" style={{ width: '100%' }}>
                          100%
                      </div>
                  </div>
              </div>
              
              {/* Scale Bar */}
              <div className="relative">
                   <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                      <span>Cân Điện Tử</span>
                      <span>{reportData.scaleTotal.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-10 rounded-lg overflow-hidden flex shadow-inner">
                      <div 
                        className={`h-full relative flex items-center pl-4 text-white text-xs font-bold transition-all duration-1000 ${variance >= 0 ? 'bg-green-500' : 'bg-red-500'}`} 
                        style={{ width: `${(reportData.scaleTotal / reportData.draftSurvey) * 100}%` }}
                      >
                         {((reportData.scaleTotal / reportData.draftSurvey) * 100).toFixed(2)}%
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* Shift Breakdown Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wide">Chi tiết sai lệch theo ca</h4>
        </div>
        <table className="w-full text-sm">
            <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <th className="py-4 px-6 text-left">Ca làm việc</th>
                    <th className="py-4 px-6 text-right">Giám định (Tấn)</th>
                    <th className="py-4 px-6 text-right">Cân điện tử (Tấn)</th>
                    <th className="py-4 px-6 text-center">Chênh lệch (Tấn)</th>
                    <th className="py-4 px-6 text-center">Đánh giá</th>
                </tr>
            </thead>
            <tbody>
                {shiftDetails.map((row, idx) => (
                    <tr key={row.id} className={`border-b border-slate-100 hover:bg-slate-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                        <td className="py-4 px-6 font-bold text-slate-700">{row.shift}</td>
                        <td className="py-4 px-6 text-right font-mono text-blue-700 font-medium">{row.draft.toLocaleString()}</td>
                        <td className="py-4 px-6 text-right font-mono text-green-700 font-medium">{row.scale.toLocaleString()}</td>
                        <td className="py-4 px-6 text-center font-bold">
                            <span className={row.diff > 0 ? 'text-green-600' : 'text-red-500'}>
                                {row.diff > 0 ? '+' : ''}{row.diff}
                            </span>
                        </td>
                         <td className="py-4 px-6 text-center">
                            {Math.abs(row.diff) < 50 ? (
                                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase border border-green-200">Khớp</span>
                            ) : (
                                <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-[10px] font-bold uppercase border border-yellow-200">Kiểm tra</span>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};
