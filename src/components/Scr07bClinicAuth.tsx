import React from 'react';
import { ArrowLeft, Share2, MoreHorizontal, MessageSquare, HelpCircle, ShieldCheck, Heart } from 'lucide-react';

interface Props {
  onCancel: () => void;
  onAuthorize: () => void;
  isCompleted: boolean;
}

export const Scr07bClinicAuth: React.FC<Props> = ({ onCancel, onAuthorize, isCompleted }) => {
  return (
    <div className="min-h-full bg-slate-50 flex flex-col justify-between relative pb-20">
      {/* Top Bar */}
      <div className="bg-white px-4 pt-3 pb-3 flex items-center justify-between border-b border-slate-100 sticky top-0 z-20 shadow-2xs">
        <button
          onClick={onCancel}
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px] font-bold">
            診
          </div>
          <h1 className="text-sm font-bold text-slate-900 truncate max-w-[180px]">
            陳宏麟診所 <span className="text-xs text-slate-500 font-normal">醫療院所</span>
          </h1>
        </div>

        <button className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors">
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Banner header background */}
        <div className="h-28 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700"></div>

        {/* Profile Card View */}
        <div className="-mt-12 px-4 mb-4">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 text-center relative">
            {/* Clinic Logo Emblem */}
            <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-md mx-auto -mt-16 flex items-center justify-center p-2">
              <div className="w-full h-full rounded-full border border-sky-100 flex flex-col items-center justify-center bg-sky-50 p-1">
                <div className="text-2xl font-bold text-sky-600 flex items-center">
                  <span className="text-emerald-500">+</span>
                </div>
                <span className="text-[8px] font-bold text-sky-800 tracking-tighter">SAMUEL CHEN</span>
              </div>
            </div>

            <h2 className="text-lg font-bold text-slate-900 mt-2">
              陳宏麟診所 <span className="text-xs text-slate-500 font-normal">醫療院所</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              72 位追蹤者 • 10 篇發問數
            </p>

            {/* Action Bar Buttons */}
            <div className="flex items-center justify-center gap-2">
              <button className="px-4 py-2 border border-orange-300 text-orange-600 hover:bg-orange-50 font-bold text-xs rounded-full flex items-center gap-1 transition-colors">
                <MessageSquare className="w-3.5 h-3.5" />
                訊息
              </button>

              <button className="px-4 py-2 border border-orange-300 text-orange-600 hover:bg-orange-50 font-bold text-xs rounded-full flex items-center gap-1 transition-colors">
                <HelpCircle className="w-3.5 h-3.5" />
                發問
              </button>

              {/* Data Authorization Button */}
              <button
                onClick={onAuthorize}
                disabled={isCompleted}
                className={`px-4 py-2 font-bold text-xs rounded-full flex items-center gap-1 transition-all ${
                  isCompleted
                    ? 'bg-slate-200 text-slate-500 border border-slate-300 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600 text-white border border-orange-500 shadow-xs active:scale-95'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isCompleted ? '已完成授權' : '數據授權'}</span>
              </button>

              <button className="w-8 h-8 border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white border-b border-slate-200 flex">
          <button className="flex-1 py-3 text-xs font-bold text-slate-500 hover:text-slate-800">
            關於我
          </button>
          <button className="flex-1 py-3 text-xs font-bold text-orange-600 border-b-2 border-orange-500">
            討論區
          </button>
        </div>

        {/* Tag Filters */}
        <div className="p-3 bg-slate-50 border-b border-slate-200/60 overflow-x-auto flex gap-2 scrollbar-none">
          {['健康促進', '自我保健', '照顧問題', '日常養生', '飲食營養'].map((tag, i) => (
            <span
              key={i}
              className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap font-medium ${
                i === 0
                  ? 'bg-slate-200 text-slate-800 font-bold'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Posts Feed */}
        <div className="p-3 space-y-3">
          {/* Post 1 */}
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs">
                  👤
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800">Anita</span>
                  <span className="text-[10px] text-slate-400 block">2025/12/10 16:13 • 陳宏麟診所</span>
                </div>
              </div>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                專家回應
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">陳醫師今天有看診嗎？</h3>
            <p className="text-xs text-slate-600 mb-3">陳醫師今天有看診嗎？我想詢問慢病連續處方箋領藥相關問題。</p>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-rose-500" /> 3 回應</span>
              <span>23 次觀看</span>
            </div>
          </div>

          {/* Post 2 */}
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs">
                👤
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800">匿名</span>
                <span className="text-[10px] text-slate-400 block">2025/12/02 15:07</span>
              </div>
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">最近血壓偏高，怎麼辦？</h3>
            <p className="text-xs text-slate-600">最近早上量血壓比較高，該如何調整生活作息或回診？</p>
          </div>
        </div>
      </div>

      {/* Floating Ask Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-10">
        <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold text-sm shadow-xl hover:bg-orange-600 transition-all active:scale-95 flex items-center gap-2">
          <HelpCircle className="w-4 h-4" />
          <span>發問</span>
        </button>
      </div>
    </div>
  );
};
