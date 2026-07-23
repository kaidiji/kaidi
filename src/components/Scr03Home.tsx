import React from 'react';
import { 
  Settings, Search, Bell, ChevronRight
} from 'lucide-react';
import { ScreenId } from '../types';
import { BottomNavBar } from './BottomNavBar';

interface Props {
  onNavigate: (screen: ScreenId) => void;
  completedTasksCount: number;
}

export const Scr03Home: React.FC<Props> = ({ onNavigate, completedTasksCount }) => {
  return (
    <div className="min-h-full bg-slate-50 flex flex-col justify-between">
      {/* Top Bar */}
      <div className="bg-white px-4 pt-3 pb-3 sticky top-0 z-10 border-b border-slate-100 shadow-xs">
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200">
            <Settings className="w-5 h-5" />
          </button>

          {/* Search bar */}
          <div className="flex-1 relative flex items-center">
            <Search className="w-4 h-4 absolute left-3 text-slate-400" />
            <input
              type="text"
              readOnly
              placeholder="健康問題找解答..."
              className="w-full pl-9 pr-3 py-2 bg-slate-100 rounded-full text-xs text-slate-700 placeholder-slate-400 focus:outline-none"
            />
          </div>

          <button className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 relative hover:bg-slate-200">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500"></span>
          </button>
        </div>
      </div>

      {/* Main Content Scroll Container */}
      <div className="flex-1 p-4 space-y-5 overflow-y-auto">
        {/* Banner Carousel */}
        <div className="relative bg-gradient-to-r from-orange-100 via-amber-50 to-orange-50 rounded-2xl p-4 border border-orange-200 shadow-xs overflow-hidden">
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            長照積分
          </div>
          <div className="flex gap-3 items-center">
            <div className="flex-1">
              <span className="text-xs font-semibold text-orange-700 block mb-1">
                我吸不到氣！
              </span>
              <h3 className="text-sm font-bold text-slate-900 leading-snug mb-1">
                從評估到處理 掌握照顧現場常見呼吸喘問題
              </h3>
              <div className="flex flex-wrap gap-1 mb-2">
                <span className="text-[10px] bg-white/80 text-orange-800 px-1.5 py-0.5 rounded border border-orange-200">減喘技巧</span>
                <span className="text-[10px] bg-white/80 text-orange-800 px-1.5 py-0.5 rounded border border-orange-200">呼吸設備使用</span>
              </div>
              <span className="inline-block text-[11px] font-bold bg-orange-500 text-white px-2.5 py-0.5 rounded-full shadow-xs">
                免費報名 拿1積分
              </span>
            </div>
            <div className="w-20 h-20 bg-orange-200/60 rounded-xl flex items-center justify-center text-2xl shrink-0 overflow-hidden">
              🩺
            </div>
          </div>
          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-3">
            <span className="w-2 h-1 bg-slate-300 rounded-full"></span>
            <span className="w-6 h-1 bg-orange-500 rounded-full"></span>
            <span className="w-2 h-1 bg-slate-300 rounded-full"></span>
            <span className="w-2 h-1 bg-slate-300 rounded-full"></span>
          </div>
        </div>

        {/* Section: Professional Channels 專業頻道 */}
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-3">專業頻道</h2>
          <div className="grid grid-cols-5 gap-2">
            <button className="bg-white p-2.5 rounded-2xl border border-slate-100 shadow-2xs flex flex-col items-center justify-center gap-1.5 hover:border-orange-200">
              <span className="text-2xl">🧠</span>
              <span className="text-[11px] font-bold text-slate-800 leading-tight">失智<br/>照護</span>
            </button>
            <button className="bg-white p-2.5 rounded-2xl border border-slate-100 shadow-2xs flex flex-col items-center justify-center gap-1.5 hover:border-orange-200">
              <span className="text-2xl">🏃</span>
              <span className="text-[11px] font-bold text-slate-800 leading-tight">全銀<br/>運動</span>
            </button>
            <button className="bg-white p-2.5 rounded-2xl border border-slate-100 shadow-2xs flex flex-col items-center justify-center gap-1.5 hover:border-orange-200">
              <span className="text-2xl">🎓</span>
              <span className="text-[11px] font-bold text-slate-800 leading-tight">長照<br/>積分</span>
            </button>
            <button className="bg-white p-2.5 rounded-2xl border border-slate-100 shadow-2xs flex flex-col items-center justify-center gap-1.5 hover:border-orange-200">
              <span className="text-2xl">📍</span>
              <span className="text-[11px] font-bold text-slate-800 leading-tight">社區<br/>據點</span>
            </button>
            <button className="bg-orange-500 text-white p-2.5 rounded-2xl shadow-xs flex flex-col items-center justify-center gap-1.5 hover:bg-orange-600 transition-all">
              <span className="text-2xl">🤖</span>
              <span className="text-[11px] font-bold leading-tight">AI<br/>問答</span>
            </button>
          </div>
        </div>

        {/* Section: Nantou Project Activity Entrance (我的報名 / 深耕計畫) */}
        <div 
          onClick={() => onNavigate('SCR-06')}
          className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs flex items-center justify-between cursor-pointer hover:bg-emerald-50/50 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-base shadow-xs">
              南
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  南投縣深耕計畫 (我的報名)
                </h3>
                {completedTasksCount > 0 && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">
                    {completedTasksCount}/4 完成
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">血壓量測、DCSI風險評估與醫療數據授權</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
        </div>

        {/* Popular Courses 熱門課程 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-slate-900">熱門課程</h2>
            <button className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-0.5 font-medium">
              全部課程 <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {/* Course Card 1 */}
            <div className="min-w-[240px] bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden shrink-0">
              <div className="h-28 bg-emerald-100 p-3 flex flex-col justify-between relative">
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md self-start">
                  失智症特輯
                </span>
                <span className="text-xs font-bold text-emerald-900 line-clamp-2">
                  走過生命旅程的每個選擇
                </span>
                <span className="absolute bottom-2 right-2 bg-slate-900/70 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                  套組
                </span>
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-slate-800 line-clamp-1 mb-1">
                  理解未來，送給自己與失智家人舒適自在的生活
                </p>
                <p className="text-[11px] text-slate-500">7位重量級專家 • 6個失智家庭經歷</p>
              </div>
            </div>

            {/* Course Card 2 */}
            <div 
              onClick={() => onNavigate('SCR-09')}
              className="min-w-[240px] bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden shrink-0 cursor-pointer hover:border-orange-300 transition-all"
            >
              <div className="h-28 bg-purple-100 p-3 flex flex-col justify-between relative">
                <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md self-start">
                  7月健康特輯
                </span>
                <span className="text-xs font-bold text-purple-900 line-clamp-2">
                  肝好、胃好，身體自然好
                </span>
                <span className="absolute bottom-2 right-2 bg-purple-600 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                  LIVE
                </span>
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-slate-800 line-clamp-1 mb-1">
                  排便習慣大解析，遠離便秘與痔瘡困擾
                </p>
                <p className="text-[11px] text-orange-600 font-semibold">每週上午10-11點 線上開課！</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav Bar (5 Tabs) */}
      <BottomNavBar activeTab="course" onNavigate={onNavigate} />
    </div>
  );
};
