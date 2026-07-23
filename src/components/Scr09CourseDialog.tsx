import React from 'react';
import { ArrowLeft, Home, Share2, Play, Users, Star } from 'lucide-react';

interface Props {
  onCancel: () => void;
  onRegister: () => void;
  isCompleted: boolean;
}

export const Scr09CourseDialog: React.FC<Props> = ({ onCancel, onRegister, isCompleted }) => {
  return (
    <div className="min-h-full bg-slate-900/60 backdrop-blur-xs flex flex-col justify-between relative overflow-hidden">
      {/* Background Page Content (Live Course View) */}
      <div className="flex-1 overflow-y-auto bg-slate-100 opacity-60 pointer-events-none">
        {/* Top bar */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 text-slate-700" />
            </button>
            <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <Home className="w-4 h-4 text-slate-700" />
            </button>
          </div>
          <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
            <Share2 className="w-4 h-4 text-slate-700" />
          </button>
        </div>

        {/* Hero Poster */}
        <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 text-white p-6 relative">
          <div className="flex items-center gap-2 mb-2 text-purple-300 text-xs font-bold">
            <span>全銀運動 × WaCare</span>
            <span className="bg-purple-600/80 px-2 py-0.5 rounded-full text-white text-[10px]">7月健康特輯</span>
          </div>
          <h1 className="text-2xl font-black text-amber-300 mb-2">肝好、胃好，身體自然好</h1>
          <p className="text-xs text-purple-200 mb-4">從消化、排便到肝臟保養 一次學會守護健康的關鍵方法</p>
          <div className="bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full inline-block">
            ★ 每週上午10-11點 線上開課！
          </div>
        </div>

        {/* Course Info */}
        <div className="p-4 bg-white">
          <h2 className="text-base font-bold text-slate-900 mb-2">LIVE 課程列表</h2>
          <div className="flex gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div className="w-24 h-16 bg-purple-200 rounded-xl flex items-center justify-center text-purple-700 font-bold text-xs shrink-0 relative">
              <Play className="w-6 h-6 fill-purple-600" />
              <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1 rounded">60:00</span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 leading-snug">
                排便習慣大解析，遠離便秘與痔瘡困擾
              </h3>
              <p className="text-[10px] text-slate-500 mt-1">主講專家: 腸胃科專業醫師</p>
            </div>
          </div>
        </div>
      </div>

      {/* Foreground Dialog Modal Overlay */}
      <div className="absolute inset-0 z-30 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-sm w-full border border-slate-100 text-center animate-in zoom-in-95 duration-200">
          
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6 fill-orange-500" />
          </div>

          <h3 className="text-lg font-black text-orange-500 mb-2">確認報名</h3>
          
          <p className="text-xs text-slate-600 leading-relaxed mb-6 whitespace-pre-line">
            報名後即有參與 LIVE 課程資格{'\n'}您確認要報名課程？
          </p>

          <div className="flex gap-3">
            {/* Cancel Button */}
            <button
              onClick={onCancel}
              className="flex-1 py-3 border border-orange-400 text-orange-600 font-bold text-sm rounded-xl hover:bg-orange-50 transition-colors"
            >
              取消
            </button>

            {/* Confirm Register Button */}
            <button
              onClick={onRegister}
              disabled={isCompleted}
              className={`flex-1 py-3 font-bold text-sm rounded-xl shadow-md transition-all active:scale-95 ${
                isCompleted
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20'
              }`}
            >
              {isCompleted ? '已完成報名' : '報名'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
