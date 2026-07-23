import React, { useState } from 'react';
import { ArrowLeft, Image as ImageIcon, QrCode, Sparkles } from 'lucide-react';
import { ScreenId } from '../types';

interface Props {
  onNavigateBack: () => void;
  onScanSuccess: () => void;
}

export const Scr05QrScanner: React.FC<Props> = ({ onNavigateBack, onScanSuccess }) => {
  const [activeTab, setActiveTab] = useState<'scan' | 'myQr'>('scan');
  const [isScanning, setIsScanning] = useState(false);

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onScanSuccess(); // Routes to SCR-06 (Activity Hub)
    }, 600);
  };

  return (
    <div className="min-h-full bg-slate-900 text-white flex flex-col justify-between">
      {/* Top Header Bar */}
      <div className="bg-white text-slate-900 px-4 pt-3 pb-3 flex items-center justify-between border-b border-slate-100">
        <button
          onClick={onNavigateBack}
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-bold">行動條碼掃描</h1>
        <div className="w-9"></div> {/* Spacer for centering */}
      </div>

      {/* Sub-tabs: 掃描 / 我的條碼 */}
      <div className="bg-slate-800 flex border-b border-slate-700">
        <button
          onClick={() => setActiveTab('scan')}
          className={`flex-1 py-3 text-sm font-bold relative transition-colors ${
            activeTab === 'scan' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          掃描
          {activeTab === 'scan' && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-slate-900"></span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('myQr')}
          className={`flex-1 py-3 text-sm font-bold transition-colors ${
            activeTab === 'myQr' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          我的條碼
        </button>
      </div>

      {/* Main Viewfinder / My QR Area */}
      {activeTab === 'scan' ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
          {/* Viewfinder Overlay Frame */}
          <div
            onClick={handleSimulateScan}
            className="w-72 h-72 rounded-3xl border-2 border-dashed border-orange-400/80 bg-slate-800/80 backdrop-blur-xs flex flex-col items-center justify-center relative overflow-hidden cursor-pointer group shadow-2xl"
          >
            {/* Corner Bracket Graphic Accents */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-4 border-l-4 border-orange-500 rounded-tl-lg"></div>
            <div className="absolute top-3 right-3 w-6 h-6 border-t-4 border-r-4 border-orange-500 rounded-tr-lg"></div>
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-4 border-l-4 border-orange-500 rounded-bl-lg"></div>
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-4 border-r-4 border-orange-500 rounded-br-lg"></div>

            {/* Scanning Line Animation */}
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_15px_#f97316] animate-bounce my-auto top-0 bottom-0"></div>

            <QrCode className="w-16 h-16 text-orange-400/70 mb-3 group-hover:scale-110 transition-transform" />
            <p className="text-xs font-semibold text-slate-300 text-center px-4">
              {isScanning ? (
                <span className="text-orange-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-4 h-4 animate-spin" /> 辨識中，進入深耕計畫...
                </span>
              ) : (
                '請對準南投深耕計畫 QR Code\n或點擊此處進行模擬掃描'
              )}
            </p>
          </div>

          <p className="text-xs text-slate-400 mt-4 text-center">
            將相機對準條碼即可自動辨識
          </p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white p-6 rounded-3xl shadow-xl text-slate-900 mb-4">
            <QrCode className="w-48 h-48 text-slate-800" />
            <p className="text-xs font-bold text-slate-500 mt-2">王小明 (南投縣居民條碼)</p>
          </div>
          <p className="text-xs text-slate-400">供護理師與醫事人員掃描驗證</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="p-6 space-y-3 bg-slate-900">
        <button
          onClick={handleSimulateScan}
          className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
        >
          <ImageIcon className="w-5 h-5" />
          <span>從照片輸入 (掃描計畫條碼)</span>
        </button>

        <button
          onClick={onNavigateBack}
          className="w-full py-2.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors text-center"
        >
          其它方式加入親友
        </button>
      </div>
    </div>
  );
};
