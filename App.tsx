
import React, { useState } from 'react';
import { 
  Monitor, Ship, Layers, Scale, Truck, Database, 
  Clipboard, Anchor, ArrowRightLeft, Container, 
  Settings, Users, PackageCheck, ChevronRight, Menu, LogOut, ChevronDown
} from 'lucide-react';
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

// Define the Category Structure
type CategoryId = 'VESSEL' | 'YARD' | 'GATE';

interface CategoryConfig {
  id: CategoryId;
  label: string;
  icon: React.ElementType;
  tabs: { id: TabType; label: string; icon: React.ElementType }[];
}

const CATEGORIES: CategoryConfig[] = [
  {
    id: 'VESSEL',
    label: 'KHAI THÁC TÀU',
    icon: Ship,
    tabs: [
      { id: 'BERTH', label: 'Kế hoạch Cầu Bến', icon: Anchor },
      { id: 'SHIP_OPS', label: 'Làm hàng & Thiết bị', icon: PackageCheck },
      { id: 'TALLY_SHIP_YARD', label: 'Đối chiếu Tàu-Bãi', icon: Scale },
    ]
  },
  {
    id: 'YARD',
    label: 'QUẢN LÝ KHO BÃI',
    icon: Layers,
    tabs: [
      { id: 'YARD_OPS', label: 'Sơ đồ Bãi & Thiết bị', icon: Container },
      { id: 'STORAGE', label: 'Tra cứu Tồn kho', icon: Database },
      { id: 'CARGO_DIST', label: 'Phân bổ hàng hóa', icon: Settings },
    ]
  },
  {
    id: 'GATE',
    label: 'GIAO NHẬN & CỔNG',
    icon: Truck,
    tabs: [
      { id: 'GATE_OPS', label: 'Điều hành Cổng', icon: ArrowRightLeft },
      { id: 'WEIGH', label: 'Trạm Cân Điện Tử', icon: Scale },
      { id: 'TALLY', label: 'Sổ Kiểm Đếm', icon: Clipboard },
    ]
  }
];

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('VESSEL');
  const [activeTab, setActiveTab] = useState<TabType>('BERTH');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // State to track which categories are expanded (Default all open)
  const [expandedCategories, setExpandedCategories] = useState<CategoryId[]>(['VESSEL', 'YARD', 'GATE']);

  const toggleCategory = (catId: CategoryId) => {
    setExpandedCategories(prev => 
      prev.includes(catId) 
        ? prev.filter(id => id !== catId) // Collapse
        : [...prev, catId] // Expand
    );
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans overflow-hidden">
      
      {/* SIDEBAR NAVIGATION */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-slate-900 text-slate-300 flex flex-col transition-all duration-300 shadow-xl z-50 flex-shrink-0`}>
        
        {/* Sidebar Header */}
        <div className="h-14 flex items-center px-4 border-b border-slate-700/50 bg-slate-950">
          <div className="bg-blue-600 p-1.5 rounded-lg mr-3 flex-shrink-0">
             <Monitor className="text-white" size={20} />
          </div>
          {isSidebarOpen && (
             <div className="overflow-hidden whitespace-nowrap">
                <h1 className="text-sm font-black text-white tracking-wide uppercase">Cảng Thông Minh</h1>
                <p className="text-[10px] text-slate-400">Port Operations System</p>
             </div>
          )}
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
           {CATEGORIES.map((cat) => {
             const isExpanded = expandedCategories.includes(cat.id);
             
             return (
               <div key={cat.id} className="mb-2">
                  {/* Category Header (Clickable for Expand/Collapse) */}
                  {isSidebarOpen ? (
                    <button 
                      onClick={() => toggleCategory(cat.id)}
                      className="w-full flex items-center justify-between px-4 py-2 text-[10px] font-bold uppercase text-slate-500 tracking-wider hover:text-slate-300 transition-colors group"
                    >
                      <span className="group-hover:text-white">{cat.label}</span>
                      {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                  ) : (
                    <div className="flex justify-center py-2">
                       <div className="h-px w-6 bg-slate-700"></div>
                    </div>
                  )}

                  {/* Sub-tabs List (Hidden if collapsed, unless sidebar is minimized then we typically show icons or hide them too. Here we hide them to be cleaner) */}
                  {/* Logic: If sidebar is closed, always show icons. If sidebar is open, respect isExpanded state */}
                  <div className={`flex flex-col gap-0.5 px-2 overflow-hidden transition-all duration-300 ${isSidebarOpen && !isExpanded ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'}`}>
                     {cat.tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setActiveCategory(cat.id); }}
                            title={tab.label}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all group relative
                              ${isActive 
                                ? 'bg-blue-600 text-white shadow-md font-bold' 
                                : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                              }
                            `}
                          >
                             <Icon size={18} className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
                             {isSidebarOpen && <span className="whitespace-nowrap overflow-hidden text-ellipsis">{tab.label}</span>}
                             
                             {/* Active Indicator for collapsed mode */}
                             {!isSidebarOpen && isActive && (
                               <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full"></div>
                             )}
                          </button>
                        );
                     })}
                  </div>
               </div>
             );
           })}
        </div>

        {/* User Footer */}
        <div className="border-t border-slate-800 p-3 bg-slate-950">
           <div className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
              <div className="flex items-center gap-2 overflow-hidden">
                 <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white ring-2 ring-slate-600 flex-shrink-0">
                    QA
                 </div>
                 {isSidebarOpen && (
                   <div className="whitespace-nowrap overflow-hidden">
                      <p className="text-xs font-bold text-white truncate">Quản Trị Viên</p>
                      <p className="text-[10px] text-green-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
                      </p>
                   </div>
                 )}
              </div>
              {isSidebarOpen && (
                <button className="text-slate-500 hover:text-white transition-colors">
                  <LogOut size={16} />
                </button>
              )}
           </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-100">
        
        {/* Slim Top Bar */}
        <div className="h-10 bg-white border-b border-slate-200 flex items-center justify-between px-4 flex-shrink-0 shadow-sm z-40">
           <button 
             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
             className="text-slate-500 hover:text-slate-800 transition-colors"
           >
             <Menu size={18} />
           </button>
           
           <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-bold text-slate-700">{CATEGORIES.find(c => c.id === activeCategory)?.label}</span>
              <ChevronRight size={14} />
              <span className="text-blue-600 font-bold">{CATEGORIES.find(c => c.id === activeCategory)?.tabs.find(t => t.id === activeTab)?.label}</span>
           </div>
           
           <div className="text-[10px] font-mono text-slate-400">v2.5.0</div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-3">
           <div className="bg-white rounded-lg shadow-sm border border-slate-200 min-h-full">
               {/* Pass minimal props to enforce compact mode where applicable */}
               {activeTab === 'BERTH' && <BerthSchedule />}
               {activeTab === 'SHIP_OPS' && <CargoHandlingStatus />}
               {activeTab === 'TALLY' && <BulkTallyDelivery />}
               {activeTab === 'WEIGH' && <EquipmentTable type="weigh_station" />}
               {activeTab === 'GATE_OPS' && <GateOperations />}
               {activeTab === 'YARD_OPS' && <YardGeneralOps />}
               {activeTab === 'STORAGE' && <YardStorage />}
               {activeTab === 'TALLY_SHIP_YARD' && <TallyComparison />}
               {activeTab === 'CARGO_DIST' && <CargoDistribution />}
           </div>
        </div>

      </div>
    </div>
  );
};

export default App;
