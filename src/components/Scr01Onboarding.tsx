import React, { useState, useEffect } from 'react';
import { ArrowLeft, Delete, ShieldCheck, CheckCircle2, ChevronRight, Lock, UserCheck } from 'lucide-react';

interface Props {
  phone: string;
  setPhone: (val: string) => void;
  onNavigateNext: () => void;
  onNavigateBack?: () => void;
}

export const Scr01Onboarding: React.FC<Props> = ({
  phone,
  setPhone,
  onNavigateNext,
  onNavigateBack,
}) => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const [showOtherLoginModal, setShowOtherLoginModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [activeInput, setActiveInput] = useState<'phone' | 'otp'>('phone');
  const [focusedOtpIdx, setFocusedOtpIdx] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOtpSent && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isOtpSent, countdown]);

  const handleSendSms = () => {
    if (phone.length < 10) return;
    setIsOtpSent(true);
    setActiveInput('otp');
    setCountdown(60);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto move focus
    if (val && index < 5) {
      setFocusedOtpIdx(index + 1);
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.join('').length === 6 || otp.filter(Boolean).length >= 4) {
      onNavigateNext();
    }
  };

  // Virtual Keypad press handler
  const handleKeypadPress = (key: string) => {
    if (activeInput === 'phone' && !isOtpSent) {
      if (key === 'backspace') {
        setPhone(phone.slice(0, -1));
      } else if (phone.length < 10 && /^\d$/.test(key)) {
        setPhone(phone + key);
      }
    } else if (activeInput === 'otp' || isOtpSent) {
      if (key === 'backspace') {
        const newOtp = [...otp];
        if (newOtp[focusedOtpIdx]) {
          newOtp[focusedOtpIdx] = '';
        } else if (focusedOtpIdx > 0) {
          newOtp[focusedOtpIdx - 1] = '';
          setFocusedOtpIdx(focusedOtpIdx - 1);
        }
        setOtp(newOtp);
      } else if (/^\d$/.test(key)) {
        const newOtp = [...otp];
        newOtp[focusedOtpIdx] = key;
        setOtp(newOtp);
        if (focusedOtpIdx < 5) {
          setFocusedOtpIdx(focusedOtpIdx + 1);
          const nextInput = document.getElementById(`otp-input-${focusedOtpIdx + 1}`);
          nextInput?.focus();
        }
      }
    }
  };

  const keypadLayout = [
    [
      { num: '1', sub: '' },
      { num: '2', sub: 'ABC' },
      { num: '3', sub: 'DEF' },
    ],
    [
      { num: '4', sub: 'GHI' },
      { num: '5', sub: 'JKL' },
      { num: '6', sub: 'MNO' },
    ],
    [
      { num: '7', sub: 'PQRS' },
      { num: '8', sub: 'TUV' },
      { num: '9', sub: 'WXYZ' },
    ],
    [
      { num: '', sub: '' },
      { num: '0', sub: '' },
      { num: 'DEL', sub: '' },
    ],
  ];

  return (
    <div className="min-h-full bg-white flex flex-col justify-between relative select-none">
      {/* Top Header Bar */}
      <div className="pt-4 px-5">
        <div className="flex items-center justify-between py-2 mb-4">
          <button
            onClick={() => {
              if (isOtpSent) {
                setIsOtpSent(false);
                setActiveInput('phone');
              } else if (onNavigateBack) {
                onNavigateBack();
              }
            }}
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-700 bg-white hover:bg-slate-50 active:scale-95 transition-all shadow-2xs"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 text-slate-800" />
          </button>
          
          <h1 className="text-xl font-black text-slate-900 tracking-tight">登入 / 註冊</h1>
          
          <div className="w-10 h-10 opacity-0 pointer-events-none" />
        </div>

        {/* Subtitle Message */}
        <p className="text-slate-400 font-medium text-sm leading-snug mb-6 px-1">
          {isOtpSent ? (
            <span>簡訊驗證碼已發送至 <strong className="text-slate-700 font-bold">{phone}</strong>，請輸入驗證碼。</span>
          ) : (
            <span>您的手機號碼就是會員帳號,請先輸入您的手機號碼以驗證</span>
          )}
        </p>

        {/* Form Body */}
        {!isOtpSent ? (
          <div>
            {/* Phone Input Box (IMG_8646 Style) */}
            <div
              onClick={() => setActiveInput('phone')}
              className={`rounded-full border-2 p-1.5 px-3 flex items-center bg-white transition-all cursor-text ${
                activeInput === 'phone' ? 'border-orange-500 shadow-sm' : 'border-orange-400/80'
              }`}
            >
              {/* Taiwan Flag & Country Code */}
              <div className="flex items-center gap-2 pr-3 border-r border-slate-200 shrink-0 select-none">
                <span className="text-xl leading-none">🇹🇼</span>
                <span className="font-extrabold text-slate-800 text-base">+886</span>
              </div>

              {/* Input Field */}
              <input
                type="tel"
                maxLength={10}
                value={phone}
                onFocus={() => setActiveInput('phone')}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="請輸入手機號碼"
                className="w-full pl-3 pr-2 py-2 text-base font-bold text-slate-900 bg-transparent placeholder:text-slate-300 focus:outline-none tracking-wider"
              />
            </div>

            {/* Validation Message */}
            <div className="h-6 mt-1.5 px-2">
              {phone.length < 10 ? (
                <p className="text-red-500 text-xs font-medium animate-in fade-in duration-150">
                  尚未輸入完整手機號碼
                </p>
              ) : (
                <p className="text-emerald-600 text-xs font-semibold flex items-center gap-1 animate-in fade-in duration-150">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>手機號碼格式正確</span>
                </p>
              )}
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleSendSms}
              disabled={phone.length < 10}
              className={`w-full py-3.5 rounded-full font-extrabold text-base transition-all mt-4 shadow-sm flex items-center justify-center gap-1.5 ${
                phone.length >= 10
                  ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/25 active:scale-[0.99] cursor-pointer'
                  : 'bg-slate-300 text-white cursor-not-allowed'
              }`}
            >
              <span>登入 / 註冊</span>
            </button>

            {/* Secondary Link Row */}
            <div className="mt-6 flex items-center justify-between text-sm px-1">
              <button
                type="button"
                onClick={() => setShowOtherLoginModal(true)}
                className="text-slate-500 font-bold hover:text-slate-800 transition-colors underline underline-offset-4 decoration-slate-300"
              >
                其他方式登入
              </button>

              <button
                type="button"
                onClick={() => setShowForgotPasswordModal(true)}
                className="text-amber-600 font-bold hover:text-amber-700 transition-colors"
              >
                忘記密碼
              </button>
            </div>
          </div>
        ) : (
          /* OTP Section */
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-2xl flex items-center justify-between text-xs font-semibold text-orange-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-600" />
                <span>簡訊驗證碼已發送</span>
              </div>
              <button
                onClick={() => {
                  setIsOtpSent(false);
                  setActiveInput('phone');
                }}
                className="text-orange-600 underline font-bold"
              >
                修改手機號碼
              </button>
            </div>

            {/* 6 Digit Input Boxes */}
            <div>
              <div className="flex items-center justify-between mb-2 px-1">
                <label className="text-xs font-bold text-slate-700">6 位數驗證碼</label>
                <span className="text-xs font-mono font-bold text-orange-600">
                  {countdown > 0 ? `${countdown}s 秒後可重發` : ''}
                </span>
              </div>

              <div className="flex gap-2 justify-between">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onFocus={() => {
                      setActiveInput('otp');
                      setFocusedOtpIdx(idx);
                    }}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className={`w-11 h-13 text-center text-xl font-extrabold rounded-xl border-2 transition-all ${
                      focusedOtpIdx === idx && activeInput === 'otp'
                        ? 'border-orange-500 bg-orange-50/30 text-orange-600 shadow-xs ring-2 ring-orange-400/20'
                        : 'border-slate-200 bg-slate-50 text-slate-900'
                    }`}
                  />
                ))}
              </div>
            </div>

            {countdown === 0 && (
              <button
                onClick={handleSendSms}
                className="text-xs text-orange-600 font-bold underline block text-right w-full"
              >
                重新發送驗證碼
              </button>
            )}

            <button
              onClick={handleVerify}
              disabled={otp.filter(Boolean).length < 4}
              className={`w-full py-3.5 rounded-full text-white font-extrabold text-base transition-all flex items-center justify-center gap-2 shadow-md ${
                otp.filter(Boolean).length >= 4
                  ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/25 active:scale-[0.99]'
                  : 'bg-slate-300 cursor-not-allowed'
              }`}
            >
              <ShieldCheck className="w-5 h-5" />
              <span>驗證並登入</span>
            </button>
          </div>
        )}
      </div>

      {/* On-screen Custom Numeric Keypad (IMG_8646 Style) */}
      <div className="bg-slate-200/80 backdrop-blur-md pt-3 pb-6 px-3 border-t border-slate-300/60 rounded-t-3xl mt-6 shadow-inner">
        <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
          {keypadLayout.map((row, rIdx) =>
            row.map((item, cIdx) => {
              if (item.num === '') {
                return <div key={`${rIdx}-${cIdx}`} className="h-12" />;
              }

              if (item.num === 'DEL') {
                return (
                  <button
                    key={`${rIdx}-${cIdx}`}
                    onClick={() => handleKeypadPress('backspace')}
                    className="h-12 rounded-xl bg-slate-300/80 hover:bg-slate-300 active:bg-slate-400 flex items-center justify-center text-slate-700 transition-colors shadow-2xs"
                    aria-label="Delete"
                  >
                    <Delete className="w-6 h-6" />
                  </button>
                );
              }

              return (
                <button
                  key={`${rIdx}-${cIdx}`}
                  onClick={() => handleKeypadPress(item.num)}
                  className="h-12 rounded-xl bg-white hover:bg-slate-50 active:bg-orange-100 flex flex-col items-center justify-center text-slate-900 transition-all shadow-2xs border border-slate-100 active:scale-95"
                >
                  <span className="text-xl font-black leading-none">{item.num}</span>
                  {item.sub ? (
                    <span className="text-[9px] font-bold text-slate-400 tracking-wider mt-0.5 uppercase">
                      {item.sub}
                    </span>
                  ) : null}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Modal: Other Login Methods */}
      {showOtherLoginModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-in slide-in-from-bottom duration-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">其他登入方式</h3>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowOtherLoginModal(false);
                  onNavigateNext();
                }}
                className="w-full py-3 px-4 bg-emerald-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors"
              >
                <span>使用 LINE 帳號快速登入</span>
              </button>

              <button
                onClick={() => {
                  setShowOtherLoginModal(false);
                  onNavigateNext();
                }}
                className="w-full py-3 px-4 bg-slate-900 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
              >
                <span>使用 Apple ID 登入</span>
              </button>

              <button
                onClick={() => setShowOtherLoginModal(false)}
                className="w-full py-2.5 text-xs font-bold text-slate-400 hover:text-slate-600 mt-2"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Forgot Password */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-in slide-in-from-bottom duration-200 text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">忘記密碼</h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              請在上方輸入您註冊的手機號碼，系統將發送重設驗證碼至您的手機。
            </p>
            <button
              onClick={() => {
                setShowForgotPasswordModal(false);
                if (phone.length === 10) {
                  handleSendSms();
                }
              }}
              className="w-full py-3 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-colors"
            >
              {phone.length === 10 ? '發送簡訊重設碼' : '回到輸入手機號碼'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
