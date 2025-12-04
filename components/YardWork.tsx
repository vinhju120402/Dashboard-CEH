import React from 'react';
import { Search, Filter } from 'lucide-react';

export const YardWork: React.FC = () => {
  // Dummy data for yard jobs
  const yardJobs = [
    { id: 1, container: 'TCLU4589210', iso: '45G1', block: 'A', location: 'A-05-02-04', type: 'Hạ bãi (Hàng nhập)', equipment: 'RTG-01', vehicle: 'XĐK-105', status: 'processing', startTime: '10:15' },
    { id: 2, container: 'MSCU9821234', iso: '22G1', block: 'B', location: 'B-12-04-01', type: 'Giao xe (Hàng xuất)', equipment: 'RTG-03', vehicle: 'XĐK-202', status: 'pending', startTime: '--' },
    { id: 3, container: 'PONU1234567', iso: '45G1', block: 'C', location: 'C-01-01-02', type: 'Đảo chuyển', equipment: 'RST-02', vehicle: '--', status: 'completed', startTime: '09:30' },
    { id: 4, container: 'CMAU1122334', iso: '22G1', block: 'A', location: 'A-02-03-01', type: 'Nâng chuyển', equipment: 'RTG-01', vehicle: 'XNB-05', status: 'pending', startTime: '--' },
    { id: 5, container: 'SUDU5566778', iso: '42G1', block: 'D', location: 'D-08-05-03', type: 'Hạ bãi (Hàng nhập)', equipment: 'RTG-04', vehicle: 'XĐK-110', status: 'processing', startTime: '10:20' },
    { id: 6, container: 'HLCU9988776', iso: '45G1', block: 'B', location: 'B-10-02-05', type: 'Giao xe (Hàng xuất)', equipment: 'RTG-03', vehicle: 'XĐK-115', status: 'pending', startTime: '--' },
    { id: 7, container: 'OOLU4455667', iso: '22G1', block: 'E', location: 'E-05-01-01', type: 'Đóng hàng', equipment: 'RST-01', vehicle: '--', status: 'processing', startTime: '10:00' },
  ];

  return (
    <div className="flex flex-col gap-4 animate-fadeIn">
      {/* Control & Filter Bar */}
      <div className="bg-white border border-gray-200 p-4 rounded-sm shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-4">
            
            {/* Job Type Filter */}
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 font-medium mb-1">Loại công việc</label>
              <div className="relative">
                <select className="border border-gray-300 rounded-sm px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-blue-500 bg-white w-40">
                  <option value="">Tất cả</option>
                  <option value="import">Hạ bãi (Hàng nhập)</option>
                  <option value="export">Giao xe (Hàng xuất)</option>
                  <option value="shift">Đảo chuyển</option>
                </select>
              </div>
            </div>

             {/* Status Filter */}
             <div className="flex flex-col">
              <label className="text-xs text-gray-500 font-medium mb-1">Trạng thái</label>
              <div className="relative">
                <select className="border border-gray-300 rounded-sm px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-blue-500 bg-white w-32">
                  <option value="">Tất cả</option>
                  <option value="processing">Đang thực hiện</option>
                  <option value="pending">Chờ xử lý</option>
                  <option value="completed">Hoàn thành</option>
                </select>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-1 px-3 py-1.5 border border-orange-400 text-orange-500 text-xs font-medium rounded hover:bg-orange-50 transition-colors self-start md:self-center">
             <Search size={14} />
             <span>Nạp dữ liệu</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 border border-gray-200 rounded-sm shadow-sm flex items-center justify-between">
            <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Tổng công việc</p>
                <p className="text-2xl font-bold text-slate-700">142</p>
            </div>
        </div>
        <div className="bg-white p-4 border border-gray-200 rounded-sm shadow-sm flex items-center justify-between">
            <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Đang thực hiện</p>
                <p className="text-2xl font-bold text-blue-600">8</p>
            </div>
        </div>
        <div className="bg-white p-4 border border-gray-200 rounded-sm shadow-sm flex items-center justify-between">
            <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Chờ xử lý</p>
                <p className="text-2xl font-bold text-orange-500">24</p>
            </div>
        </div>
      </div>

      {/* Job List Table */}
      <div className="w-full overflow-x-auto border border-gray-200 rounded-sm bg-white">
        <table className="w-full border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-[#e3effa] text-[#103a71] text-xs font-bold uppercase">
              <th className="py-3 px-4 border-r border-white w-12 text-center">STT</th>
              <th className="py-3 px-4 border-r border-white text-left">Số Container</th>
              <th className="py-3 px-4 border-r border-white text-center w-20">ISO</th>
              <th className="py-3 px-4 border-r border-white text-left">Vị trí (Block-Bay-Row-Tier)</th>
              <th className="py-3 px-4 border-r border-white text-left">Thiết bị bãi</th>
              <th className="py-3 px-4 border-r border-white text-left">Phương tiện</th>
              <th className="py-3 px-4 border-r border-white text-left">Tác nghiệp</th>
              <th className="py-3 px-4 border-r border-white text-center">Bắt đầu</th>
              <th className="py-3 px-4 text-center">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {yardJobs.map((job, index) => (
              <tr key={job.id} className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-[#f9fafb]'}`}>
                <td className="py-3 px-4 text-center text-gray-500">{index + 1}</td>
                <td className="py-3 px-4 font-bold text-blue-900">{job.container}</td>
                <td className="py-3 px-4 text-center">{job.iso}</td>
                <td className="py-3 px-4 font-mono text-xs">{job.location}</td>
                <td className="py-3 px-4">{job.equipment}</td>
                <td className="py-3 px-4">{job.vehicle}</td>
                <td className="py-3 px-4">{job.type}</td>
                <td className="py-3 px-4 text-center">{job.startTime}</td>
                <td className="py-3 px-4 text-center">
                    <span className={`text-[11px] font-bold px-2 py-1 rounded border ${
                        job.status === 'processing' 
                            ? 'bg-blue-50 text-blue-600 border-blue-200' 
                            : job.status === 'completed'
                            ? 'bg-green-50 text-green-600 border-green-200'
                            : 'bg-orange-50 text-orange-500 border-orange-200'
                    }`}>
                        {job.status === 'processing' ? 'ĐANG THỰC HIỆN' : job.status === 'completed' ? 'HOÀN THÀNH' : 'CHỜ XỬ LÝ'}
                    </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};