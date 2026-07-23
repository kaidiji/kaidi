import React from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck, HeartPulse, Sparkles, Award } from 'lucide-react';
import { ScreenId, TaskState } from '../types';

interface Props {
  tasks: TaskState;
  onNavigate: (screen: ScreenId) => void;
  onNavigateBackHome: () => void;
}

export const Scr06ActivityHub: React.FC<Props> = ({ tasks, onNavigate, onNavigateBackHome }) => {
  const completedCount = 
    (tasks.task1Completed ? 1 : 0) +
    (tasks.task2Completed ? 1 : 0) +
    (tasks.task3Completed ? 1 : 0) +
    (tasks.task4Completed ? 1 : 0);

  const isAllCompleted = completedCount === 4;

  return (
    <div className="min-h-full bg-slate-50 flex flex-col justify-between">
      {/* Top Header Bar */}
      <div className="bg-white px-4 pt-3 pb-3 flex items-center justify-between border-b border-slate-100 sticky top-0 z-10 shadow-2xs">
        <button
          onClick={onNavigateBackHome}
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-bold text-slate-900">南投縣深耕計畫</h1>
        <div className="w-9"></div> {/* Spacer for symmetry */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-5 space-y-6 overflow-y-auto">
        {/* Banner Card */}
        <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white p-5 rounded-3xl shadow-lg relative overflow-hidden">
          {/* Subtle background graphics */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="absolute top-2 right-4 text-emerald-300/30 text-6xl font-black">
            Nantou
          </div>

          <div className="relative z-10">
            <span className="inline-block bg-white/20 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-2">
              全齡照護任務
            </span>
            <h2 className="text-xl font-extrabold mb-1 tracking-tight">南投縣深耕計畫</h2>
            <p className="text-xs text-emerald-100 leading-relaxed font-medium mb-4">
              本次需要大家完成一次血壓量測並做完風險評估（DCSI）
            </p>

            {/* Progress Meter */}
            <div className="bg-emerald-950/40 p-3 rounded-2xl border border-white/10 backdrop-blur-xs">
              <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                <span className="text-emerald-200">計畫總進度</span>
                <span className="text-white font-mono">{completedCount} / 4 已完成</span>
              </div>
              <div className="w-full bg-emerald-900/60 h-2.5 rounded-full overflow-hidden p-0.5 border border-emerald-700/50">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-500 shadow-xs"
                  style={{ width: `${(completedCount / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Celebration Notice if all tasks completed */}
        {isAllCompleted && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-900">恭喜！已完成所有計畫任務</h3>
              <p className="text-xs text-amber-700">您已成功授權數據並完成血壓量測與社會處方課程報名。</p>
            </div>
          </div>
        )}

        {/* Tasks List Section */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>待完成任務項目</span>
            </h3>
            <span className="text-xs text-slate-400">點擊按鈕執行</span>
          </div>

          <div className="space-y-3.5">
            {/* Task 1: 授權流程-南投縣醫師公會 */}
            <button
              onClick={() => !tasks.task1Completed && onNavigate('SCR-07A')}
              disabled={tasks.task1Completed}
              style={{
                backgroundColor: tasks.task1Completed ? '#9E9E9E' : '#4CAF50',
              }}
              className={`w-full py-4 px-5 rounded-2xl text-white font-bold text-sm shadow-md flex items-center justify-between transition-all active:scale-[0.99] ${
                tasks.task1Completed ? 'cursor-not-allowed opacity-90' : 'hover:brightness-105 shadow-green-500/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span>
                  {tasks.task1Completed ? '南投縣醫師公會已授權' : '授權流程-南投縣醫師公會'}
                </span>
              </div>
              {tasks.task1Completed && <CheckCircle2 className="w-5 h-5 shrink-0 text-white/90" />}
            </button>

            {/* Task 2: 授權流程-診所 */}
            <button
              onClick={() => !tasks.task2Completed && onNavigate('SCR-07B')}
              disabled={tasks.task2Completed}
              style={{
                backgroundColor: tasks.task2Completed ? '#9E9E9E' : '#4CAF50',
              }}
              className={`w-full py-4 px-5 rounded-2xl text-white font-bold text-sm shadow-md flex items-center justify-between transition-all active:scale-[0.99] ${
                tasks.task2Completed ? 'cursor-not-allowed opacity-90' : 'hover:brightness-105 shadow-green-500/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span>
                  {tasks.task2Completed ? '診所已授權' : '授權流程-診所'}
                </span>
              </div>
              {tasks.task2Completed && <CheckCircle2 className="w-5 h-5 shrink-0 text-white/90" />}
            </button>

            {/* Task 3: 量測血壓 */}
            <button
              onClick={() => !tasks.task3Completed && onNavigate('SCR-08')}
              disabled={tasks.task3Completed}
              style={{
                backgroundColor: tasks.task3Completed ? '#9E9E9E' : '#4CAF50',
              }}
              className={`w-full py-4 px-5 rounded-2xl text-white font-bold text-sm shadow-md flex items-center justify-between transition-all active:scale-[0.99] ${
                tasks.task3Completed ? 'cursor-not-allowed opacity-90' : 'hover:brightness-105 shadow-green-500/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <HeartPulse className="w-5 h-5 shrink-0" />
                <span>
                  {tasks.task3Completed ? '已量測成功' : '量測血壓'}
                </span>
              </div>
              {tasks.task3Completed && <CheckCircle2 className="w-5 h-5 shrink-0 text-white/90" />}
            </button>

            {/* Task 4: 社會處方燈任務 */}
            <button
              onClick={() => !tasks.task4Completed && onNavigate('SCR-09')}
              disabled={tasks.task4Completed}
              style={{
                backgroundColor: tasks.task4Completed ? '#9E9E9E' : '#4CAF50',
              }}
              className={`w-full py-4 px-5 rounded-2xl text-white font-bold text-sm shadow-md flex items-center justify-between transition-all active:scale-[0.99] ${
                tasks.task4Completed ? 'cursor-not-allowed opacity-90' : 'hover:brightness-105 shadow-green-500/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 shrink-0" />
                <span>
                  {tasks.task4Completed ? '已報名' : '社會處方燈任務'}
                </span>
              </div>
              {tasks.task4Completed && <CheckCircle2 className="w-5 h-5 shrink-0 text-white/90" />}
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 bg-white border-t border-slate-100 text-center text-xs text-slate-400">
        南投縣衛生局 • 醫療院所深耕擴大照護計畫
      </div>
    </div>
  );
};
