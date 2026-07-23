import React from 'react';
import { BookOpen, Activity, Stethoscope, MessageSquare, Users } from 'lucide-react';
import { ScreenId } from '../types';

interface Props {
  activeTab: 'course' | 'data' | 'expert' | 'message' | 'community';
  onNavigate: (screen: ScreenId) => void;
}

export const BottomNavBar: React.FC<Props> = ({ activeTab, onNavigate }) => {
  return (
    <div className="bg-white border-t border-slate-200 sticky bottom-0 z-20 px-2 py-2 flex items-center justify-around shadow-xs shrink-0 w-full select-none">
      {/* 課程 */}
      <button
        onClick={() => onNavigate('SCR-03')}
        className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
          activeTab === 'course'
            ? 'text-orange-600 bg-orange-50 font-bold'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <BookOpen className="w-5 h-5" />
        <span className="text-[10px] leading-none">課程</span>
      </button>

      {/* 健康數據 */}
      <button
        className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
          activeTab === 'data'
            ? 'text-orange-600 bg-orange-50 font-bold'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Activity className="w-5 h-5" />
        <span className="text-[10px] leading-none">健康數據</span>
      </button>

      {/* 找專家 */}
      <button
        onClick={() => onNavigate('SCR-04')}
        className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
          activeTab === 'expert'
            ? 'text-orange-600 bg-orange-50 font-bold'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Stethoscope className="w-5 h-5" />
        <span className="text-[10px] leading-none">找專家</span>
      </button>

      {/* 訊息 */}
      <button
        className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all relative ${
          activeTab === 'message'
            ? 'text-orange-600 bg-orange-50 font-bold'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold px-1 min-w-[14px] h-3.5 rounded-full flex items-center justify-center">
            7
          </span>
        </div>
        <span className="text-[10px] leading-none">訊息</span>
      </button>

      {/* 討論區 */}
      <button
        className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
          activeTab === 'community'
            ? 'text-orange-600 bg-orange-50 font-bold'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Users className="w-5 h-5" />
        <span className="text-[10px] leading-none">討論區</span>
      </button>
    </div>
  );
};
