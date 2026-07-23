import React from 'react';
import { 
  Search, Scan, MoreVertical, Map
} from 'lucide-react';
import { ScreenId } from '../types';
import { BottomNavBar } from './BottomNavBar';

interface Props {
  onNavigate: (screen: ScreenId) => void;
}

export const Scr04ExpertList: React.FC<Props> = ({ onNavigate }) => {
  const experts = [
    {
      id: 1,
      name: 'Wa 邦尼 人工智慧',
      category: '健康服務',
      followers: '106,176 位追蹤者',
      questions: '11,226 篇發問數',
      avatarBg: 'bg-amber-100 text-amber-700',
      emoji: '🐰',
    },
    {
      id: 2,
      name: '照亮失智路',
      category: '健康服務',
      followers: '33,001 位追蹤者',
      questions: '16,777 篇發問數',
      avatarBg: 'bg-emerald-100 text-emerald-800',
      emoji: '🧠',
    },
    {
      id: 3,
      name: '全銀運動',
      category: '健康服務',
      followers: '26,235 位追蹤者',
      questions: '27,900 篇發問數',
      avatarBg: 'bg-purple-100 text-purple-800',
      emoji: '🏃',
    },
    {
      id: 4,
      name: 'Wa 長照積分專業課程',
      category: '健康服務',
      followers: '26,151 位追蹤者',
      questions: '13,655 篇發問數',
      avatarBg: 'bg-orange-100 text-orange-800',
      emoji: '🎓',
    },
    {
      id: 5,
      name: '守護星兒愛無限',
      category: '健康服務',
      followers: '9,425 位追蹤者',
      questions: '412 篇發問數',
      avatarBg: 'bg-yellow-100 text-yellow-800',
      emoji: '⭐',
    },
  ];

  return (
    <div className="min-h-full bg-slate-50 flex flex-col justify-between">
      {/* Header */}
      <div className="bg-white px-4 pt-3 pb-3 border-b border-slate-100 sticky top-0 z-10 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <button className="text-slate-600 hover:text-slate-900">
            <Map className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-slate-900">專家名單</h1>
          <button className="text-slate-600 hover:text-slate-900">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar with Far Right QR Scan Icon */}
        <div className="flex items-center gap-2">
          <div className="flex-1 relative flex items-center">
            <Search className="w-4 h-4 absolute left-3 text-slate-400" />
            <input
              type="text"
              readOnly
              placeholder="搜尋更多專家"
              className="w-full pl-9 pr-3 py-2 bg-slate-100 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none"
            />
          </div>

          {/* QR Scan Icon [ ] -> Tapping routes to SCR-05 */}
          <button
            onClick={() => onNavigate('SCR-05')}
            title="掃描行動條碼"
            className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-orange-100 text-slate-700 hover:text-orange-600 flex items-center justify-center transition-all shrink-0 active:scale-95"
          >
            <Scan className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Expert List */}
      <div className="flex-1 p-3 space-y-2 overflow-y-auto">
        {experts.map((item) => (
          <div
            key={item.id}
            className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-2xs flex items-center justify-between gap-3 hover:border-slate-200 transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-12 h-12 rounded-full ${item.avatarBg} flex items-center justify-center text-xl shrink-0 font-bold border border-white shadow-2xs`}
              >
                {item.emoji}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-slate-900 truncate">
                  {item.name}
                </h3>
                <span className="inline-block text-[10px] text-slate-400 mb-0.5">
                  {item.category}
                </span>
                <p className="text-[11px] text-slate-500 truncate">
                  {item.followers} • {item.questions}
                </p>
              </div>
            </div>

            <button className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-full shrink-0 transition-colors">
              訊息
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Nav Bar - Active tab on "找專家" */}
      <BottomNavBar activeTab="expert" onNavigate={onNavigate} />
    </div>
  );
};
