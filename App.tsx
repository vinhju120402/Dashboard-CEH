
import React, { useState } from 'react';
import { ChevronUp, Search, Monitor, Ship, Layers, Scale, Truck, Database, Clipboard, Anchor, ArrowRightLeft } from 'lucide-react';
import { TabType } from './types';
import { EquipmentTable } from './components/EquipmentTable';
import { BerthSchedule } from './components/BerthSchedule';
import { CargoHandlingStatus } from './components/CargoHandlingStatus';
import { BulkTallyDelivery } from './components/BulkTallyDelivery';
import { GateOperations } from './components/GateOperations';
import { YardGeneralOps } from './components/YardGeneralOps';
import { YardStorage } from './components/YardStorage';
import { TallyComparison } from './components/TallyComparison';
import { CargoDistribution } from './components/CargoDistribution';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('BERTH');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Modern Card-style Tabs
  const getTabClass = (tab: TabType) => {
    const isActive = activeTab === tab;
    return `
      relative flex items-center justify-center gap-2 p-3 text-xs font-bold uppercase tracking-wide rounded-lg transition-all duration-200 border
      ${isActive 
        ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-[1.02]' 
        : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-700 hover:border-slate-300'
      }
    `;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 font-sans flex justify-center items-start">
      <div className="w-full max-w-[1440px] bg-white shadow-xl rounded-xl overflow-hidden border border-slate-200 min-h-[800px] flex flex-col">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-3">
             <div className="bg-blue-600 p-2 rounded-lg shadow-sm">
                <Monitor className="text-white" size={20} />
             </div>
             <div>
                <h1 className="text-lg font-extrabold text-slate-800 tracking-tight">CỔNG THÔNG TIN GIÁM SÁT</h1>
                <p className="text-xs text-slate-500 font-medium">Hệ thống quản lý khai thác hàng rời</p>
             </div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-700">Người dùng: Quản Trị Viên</p>
                <p className="text-[10px] text-slate-400">Cập nhật: 10:45</p>
             </div>
             <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-300"></div>
          </div>
        </div>

        {/* Tabs - 5x2 Grid Layout with Better Styling */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="grid grid-cols-5 gap-3">
            {/* Row 1 */}
            <button onClick={() => setActiveTab('BERTH')} className={getTabClass('BERTH')}>
              <Anchor size={16} /> Cầu Bến
            </button>
            <button onClick={() => setActiveTab('SHIP_OPS')} className={getTabClass('SHIP_OPS')}>
              <Ship size={16} /> Khai thác tàu
            </button>
            <button onClick={() => setActiveTab('TALLY')} className={getTabClass('TALLY')}>
              <Clipboard size={16} /> Kiểm đếm
            </button>
            <button onClick={() => setActiveTab('WEIGH')} className={getTabClass('WEIGH')}>
              <Scale size={16} /> Trạm Cân
            </button>
            <button onClick={() => setActiveTab('GATE_OPS')} className={getTabClass('GATE_OPS')}>
              <ArrowRightLeft size={16} /> Cổng Ra/Vào
            </button>

            {/* Row 2 */}
            <button onClick={() => setActiveTab('YARD_OPS')} className={getTabClass('YARD_OPS')}>
              <Layers size={16} /> Điều hành bãi
            </button>
            <button onClick={() => setActiveTab('STORAGE_SHIP')} className={getTabClass('STORAGE_SHIP')}>
              <Database size={16} /> Tồn kho (Tàu)
            </button>
             <button onClick={() => setActiveTab('STORAGE_MIXED')} className={getTabClass('STORAGE_MIXED')}>
              <Database size={16} /> Tồn kho (Trộn)
            </button>
            <button onClick={() => setActiveTab('TALLY_SHIP_YARD')} className={getTabClass('TALLY_SHIP_YARD')}>
              <Scale size={16} /> Đối chiếu Tàu/Bờ
            </button>
            <button onClick={() => setActiveTab('CARGO_DIST')} className={getTabClass('CARGO_DIST')}>
              <Truck size={16} /> Phân bổ hàng
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6 bg-slate-50/50 flex-1">
           {activeTab === 'BERTH' && <BerthSchedule />}

           {activeTab === 'SHIP_OPS' && <CargoHandlingStatus />}

           {activeTab === 'TALLY' && <BulkTallyDelivery />}

           {activeTab === 'WEIGH' && <EquipmentTable type="weigh_station" />}

           {activeTab === 'GATE_OPS' && <GateOperations />}
           
           {activeTab === 'YARD_OPS' && <YardGeneralOps />}

           {activeTab === 'STORAGE_SHIP' && <YardStorage mode="ship" />}

           {activeTab === 'STORAGE_MIXED' && <YardStorage mode="mixed" />}

           {activeTab === 'TALLY_SHIP_YARD' && <TallyComparison />}

           {activeTab === 'CARGO_DIST' && <CargoDistribution />}
        </div>
      </div>
    </div>
  );
};

export default App;
