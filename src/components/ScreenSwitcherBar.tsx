import React, { useState } from 'react';
import { ScreenId, TaskState } from '../types';
import { RefreshCw, Smartphone, Monitor, Eye, Layers } from 'lucide-react';

interface Props {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  tasks: TaskState;
  onResetTasks: () => void;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
}

export const ScreenSwitcherBar: React.FC<Props> = ({
  currentScreen,
  onNavigate,
  tasks,
  onResetTasks,
  isMobileFrame,
  setIsMobileFrame,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const screens: { id: ScreenId; label: string }[] = [
    { id: 'SCR-00', label: 'SCR-00 Landing / Welcome Modal' },
    { id: 'SCR-01', label: 'SCR-01 Phone Onboarding & OTP' },
    { id: 'SCR-02', label: 'SCR-02 Nickname Setup' },
    { id: 'SCR-03', label: 'SCR-03 App Home Screen' },
    { id: 'SCR-04', label: 'SCR-04 Expert List Screen' },
    { id: 'SCR-05', label: 'SCR-05 QR Scanner Screen' },
    { id: 'SCR-06', label: 'SCR-06 Main Activity Hub (南投計畫)' },
    { id: 'SCR-07A', label: 'SCR-07A 醫師公會數據授權' },
    { id: 'SCR-07B', label: 'SCR-07B 診所數據授權' },
    { id: 'SCR-08', label: 'SCR-08 血壓量測 Modal' },
    { id: 'SCR-09', label: 'SCR-09 社會處方燈報名 Dialog' },
  ];

  const completedCount = 
    (tasks.task1Completed ? 1 : 0) +
    (tasks.task2Completed ? 1 : 0) +
    (tasks.task3Completed ? 1 : 0) +
    (tasks.task4Completed ? 1 : 0);

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800 px-3 py-2 text-xs z-50 flex items-center justify-between gap-2 shadow-md">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 shrink-0 transition-colors"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>原型切換器</span>
          <span className="bg-orange-700 font-mono text-[10px] px-1.5 py-0.2 rounded-full">
            {currentScreen}
          </span>
        </button>

        {/* Task completion badge */}
        <div className="bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
          <span className="text-slate-400">深耕任務:</span>
          <span className="text-emerald-400 font-bold font-mono">{completedCount}/4 完成</span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {/* Reset tasks button */}
        <button
          onClick={onResetTasks}
          title="重設任務狀態 (全部變回綠色 Active)"
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2 py-1 rounded-md flex items-center gap-1 transition-colors text-[11px]"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="hidden sm:inline">重置任務</span>
        </button>

        {/* Device Frame Toggle */}
        <button
          onClick={() => setIsMobileFrame(!isMobileFrame)}
          title="切換手機外框視角"
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2 py-1 rounded-md flex items-center gap-1 transition-colors text-[11px]"
        >
          {isMobileFrame ? (
            <>
              <Monitor className="w-3 h-3 text-sky-400" />
              <span className="hidden sm:inline">全螢幕</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3 h-3 text-orange-400" />
              <span className="hidden sm:inline">手機框</span>
            </>
          )}
        </button>
      </div>

      {/* Screen selector modal drawer */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-5 shadow-2xl text-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
              <h3 className="font-bold text-sm text-orange-400 flex items-center gap-2">
                <Eye className="w-4 h-4" /> 快速切換深耕計畫原型頁面
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white text-xs bg-slate-800 px-2 py-1 rounded-md"
              >
                ✕ 關閉
              </button>
            </div>

            <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
              {screens.map((scr) => (
                <button
                  key={scr.id}
                  onClick={() => {
                    onNavigate(scr.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl font-medium text-xs flex items-center justify-between transition-all ${
                    currentScreen === scr.id
                      ? 'bg-orange-500 text-white font-bold shadow-md'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span>{scr.label}</span>
                  {currentScreen === scr.id && (
                    <span className="text-[10px] bg-orange-700 px-2 py-0.5 rounded-full font-bold">
                      當前頁面
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
              <span>點擊任一頁面即可跳轉進行測試</span>
              <button
                onClick={onResetTasks}
                className="text-orange-400 hover:underline font-semibold"
              >
                重設 4 大任務狀態
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
