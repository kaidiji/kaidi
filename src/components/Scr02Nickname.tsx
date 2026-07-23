import React from 'react';
import { User, ArrowRight } from 'lucide-react';

interface Props {
  nickname: string;
  setNickname: (val: string) => void;
  onNavigateNext: () => void;
}

export const Scr02Nickname: React.FC<Props> = ({ nickname, setNickname, onNavigateNext }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) setNickname('王小明');
    onNavigateNext();
  };

  return (
    <div className="min-h-full bg-slate-50 flex flex-col justify-center p-6">
      <div className="w-full max-w-sm mx-auto">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mx-auto mb-4">
            <User className="w-8 h-8" />
          </div>

          <h2 className="text-xl font-bold text-slate-900 text-center mb-1">設定您的專屬暱稱</h2>
          <p className="text-xs text-slate-500 text-center mb-6">
            名稱將會顯示於專家問答、社區活動與個人健康記錄中。
          </p>

          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-600 mb-2">
              暱稱 / 姓名
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="請輸入暱稱 (例如: 王小明)"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
          >
            <span>進入 App</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>

      <div className="text-center text-xs text-slate-400 py-4">
        您可以隨時在設定頁面修改暱稱
      </div>
    </div>
  );
};
