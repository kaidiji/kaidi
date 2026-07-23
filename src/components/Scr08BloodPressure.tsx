import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Camera, Bluetooth, ArrowLeft } from 'lucide-react';
import { BloodPressureData } from '../types';

interface Props {
  onCancel: () => void;
  onComplete: (data: BloodPressureData) => void;
}

export const Scr08BloodPressure: React.FC<Props> = ({ onCancel, onComplete }) => {
  const [activeField, setActiveField] = useState<'systolic' | 'diastolic' | 'pulse'>('systolic');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [pulse, setPulse] = useState('');
  const [note, setNote] = useState('');
  const [timestamp, setTimestamp] = useState('2026/07/22 20:07');
  
  // Date Picker state matching IMG_8647
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerDateIdx, setPickerDateIdx] = useState(3); // Default '今天'
  const [pickerAmPm, setPickerAmPm] = useState<'上午' | '下午'>('上午');
  const [pickerHour, setPickerHour] = useState('9');
  const [pickerMinute, setPickerMinute] = useState('10');

  const dateList = [
    { label: '7月20日 週一', dateStr: '2026/07/20' },
    { label: '7月21日 週二', dateStr: '2026/07/21' },
    { label: '7月22日 週三', dateStr: '2026/07/22' },
    { label: '今天', dateStr: '2026/07/23' },
    { label: '7月24日 週五', dateStr: '2026/07/24' },
    { label: '7月25日 週六', dateStr: '2026/07/25' },
    { label: '7月26日 週日', dateStr: '2026/07/26' },
  ];

  const amPmList: ('上午' | '下午')[] = ['上午', '下午'];
  const hourList = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const minuteList = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  const handleConfirmDate = () => {
    const selectedDate = dateList[pickerDateIdx].dateStr;
    let hourNum = parseInt(pickerHour, 10);
    if (pickerAmPm === '下午' && hourNum < 12) hourNum += 12;
    if (pickerAmPm === '上午' && hourNum === 12) hourNum = 0;
    const formattedHour = String(hourNum).padStart(2, '0');
    const formattedMin = pickerMinute.padStart(2, '0');
    setTimestamp(`${selectedDate} ${formattedHour}:${formattedMin}`);
    setShowDatePicker(false);
  };

  const handleKeypadPress = (val: string) => {
    if (val === 'DEL') {
      if (activeField === 'systolic') setSystolic((prev) => prev.slice(0, -1));
      if (activeField === 'diastolic') setDiastolic((prev) => prev.slice(0, -1));
      if (activeField === 'pulse') setPulse((prev) => prev.slice(0, -1));
    } else {
      if (activeField === 'systolic' && systolic.length < 3) {
        const next = systolic + val;
        setSystolic(next);
        if (next.length === 3) setActiveField('diastolic');
      } else if (activeField === 'diastolic' && diastolic.length < 3) {
        const next = diastolic + val;
        setDiastolic(next);
        if (next.length >= 2) setActiveField('pulse');
      } else if (activeField === 'pulse' && pulse.length < 3) {
        setPulse((prev) => prev + val);
      }
    }
  };

  // All 3 fields must be filled to enable "完成" button
  const isFormValid = systolic.trim().length > 0 && diastolic.trim().length > 0 && pulse.trim().length > 0;

  const handleComplete = () => {
    if (!isFormValid) return;
    onComplete({
      systolic,
      diastolic,
      pulse,
      date: timestamp,
      note,
    });
  };

  const handlePhotoUpload = () => {
    // Auto-fill realistic blood pressure reading via simulated photo recognition
    setSystolic('118');
    setDiastolic('78');
    setPulse('70');
  };

  const handleBluetoothUpload = () => {
    // Auto-fill realistic reading via simulated bluetooth device
    setSystolic('122');
    setDiastolic('82');
    setPulse('74');
  };

  return (
    <div className="h-full overflow-hidden bg-slate-900/40 backdrop-blur-xs p-2 sm:p-3 flex flex-col justify-center select-none">
      <div className="bg-white rounded-3xl p-3.5 sm:p-4 shadow-2xl max-w-md w-full mx-auto border border-slate-100 animate-in zoom-in-95 duration-150">
        
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onCancel}
            className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回深耕計畫</span>
          </button>
          <span className="text-[10px] bg-slate-100 text-slate-500 font-mono px-2 py-0.5 rounded-full font-bold">
            SCR-08
          </span>
        </div>

        {/* Title Header */}
        <div className="flex items-center justify-center gap-1.5 text-slate-900 mb-2">
          <h2 className="text-lg font-black tracking-tight">請測量您的血壓</h2>
          <HelpCircle className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
        </div>

        {/* Timestamp Selector */}
        <div className="relative mb-2.5">
          <button
            type="button"
            onClick={() => setShowDatePicker(true)}
            className="w-full py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs font-bold text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <span>{timestamp}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* Metric Input Grid (3 boxes) */}
        <div className="grid grid-cols-3 gap-2 mb-2.5">
          {/* Box 1: 收縮壓 */}
          <div
            onClick={() => setActiveField('systolic')}
            className={`p-2 rounded-xl text-center border-2 cursor-pointer transition-all ${
              activeField === 'systolic'
                ? 'border-orange-500 bg-orange-50/30 shadow-xs'
                : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
            }`}
          >
            <span className="text-[11px] font-bold text-slate-600 block mb-0.5">收縮壓</span>
            <div className="h-6 flex items-center justify-center font-mono">
              {systolic ? (
                <span className="text-lg font-extrabold text-slate-900">{systolic}</span>
              ) : (
                <span className="text-lg font-bold text-slate-300">120</span>
              )}
            </div>
            <span className="text-[9px] font-semibold text-slate-400">mmHg</span>
          </div>

          {/* Box 2: 舒張壓 */}
          <div
            onClick={() => setActiveField('diastolic')}
            className={`p-2 rounded-xl text-center border-2 cursor-pointer transition-all ${
              activeField === 'diastolic'
                ? 'border-orange-500 bg-orange-50/30 shadow-xs'
                : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
            }`}
          >
            <span className="text-[11px] font-bold text-slate-600 block mb-0.5">舒張壓</span>
            <div className="h-6 flex items-center justify-center font-mono">
              {diastolic ? (
                <span className="text-lg font-extrabold text-slate-900">{diastolic}</span>
              ) : (
                <span className="text-lg font-bold text-slate-300">80</span>
              )}
            </div>
            <span className="text-[9px] font-semibold text-slate-400">mmHg</span>
          </div>

          {/* Box 3: 心律 */}
          <div
            onClick={() => setActiveField('pulse')}
            className={`p-2 rounded-xl text-center border-2 cursor-pointer transition-all ${
              activeField === 'pulse'
                ? 'border-orange-500 bg-orange-50/30 shadow-xs'
                : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
            }`}
          >
            <span className="text-[11px] font-bold text-slate-600 block mb-0.5">心律</span>
            <div className="h-6 flex items-center justify-center font-mono">
              {pulse ? (
                <span className="text-lg font-extrabold text-slate-900">{pulse}</span>
              ) : (
                <span className="text-lg font-bold text-slate-300">72</span>
              )}
            </div>
            <span className="text-[9px] font-semibold text-slate-400">次/分</span>
          </div>
        </div>

        {/* Custom On-screen Numeric Keypad */}
        <div className="bg-slate-100/80 p-2 rounded-xl mb-2.5">
          <div className="grid grid-cols-3 gap-1.5">
            {['7', '8', '9', '4', '5', '6', '1', '2', '3'].map((num) => (
              <button
                key={num}
                onClick={() => handleKeypadPress(num)}
                className="py-1.5 bg-white hover:bg-slate-50 active:bg-orange-100 text-slate-900 font-bold text-lg rounded-lg shadow-2xs active:scale-95 transition-all text-center leading-none"
              >
                {num}
              </button>
            ))}
            <div></div>
            <button
              onClick={() => handleKeypadPress('0')}
              className="py-1.5 bg-white hover:bg-slate-50 active:bg-orange-100 text-slate-900 font-bold text-lg rounded-lg shadow-2xs active:scale-95 transition-all text-center leading-none"
            >
              0
            </button>
            <button
              onClick={() => handleKeypadPress('DEL')}
              className="py-1.5 bg-white hover:bg-red-50 text-red-600 font-bold text-xs rounded-lg shadow-2xs active:scale-95 transition-all text-center leading-none"
            >
              刪除
            </button>
          </div>
        </div>

        {/* Extra Actions Row (拍照上傳 / 藍芽上傳) */}
        <div className="grid grid-cols-2 gap-2 mb-1.5">
          <button
            onClick={handlePhotoUpload}
            className="py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>拍照上傳</span>
          </button>

          <button
            onClick={handleBluetoothUpload}
            className="py-1.5 bg-white border border-orange-400 text-orange-600 hover:bg-orange-50 font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <Bluetooth className="w-3.5 h-3.5" />
            <span>藍芽上傳</span>
          </button>
        </div>

        {/* Link */}
        <div className="text-right mb-2">
          <a href="#help" className="text-[10px] text-orange-500 hover:underline font-medium">
            ① 使用說明
          </a>
        </div>

        {/* Note Field (Max 100 Chars) */}
        <div className="mb-3 relative">
          <input
            type="text"
            value={note}
            maxLength={100}
            onChange={(e) => setNote(e.target.value)}
            placeholder="備註（最多 100 個字）"
            className="w-full pl-3 pr-12 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-orange-500 font-medium"
          />
          <span className="absolute right-2.5 top-2 text-[10px] text-slate-400 font-mono">
            {note.length}/100
          </span>
        </div>

        {/* Bottom Action Buttons (取消 / 完成) */}
        <div className="flex gap-2.5">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 border border-orange-400 text-orange-600 font-bold text-xs sm:text-sm rounded-xl hover:bg-orange-50 transition-colors"
          >
            取消
          </button>

          <button
            onClick={handleComplete}
            disabled={!isFormValid}
            className={`flex-1 py-2.5 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs ${
              isFormValid
                ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/25 active:scale-95 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            完成
          </button>
        </div>
      </div>

      {/* Date/Time Picker Modal (IMG_8647) */}
      {showDatePicker && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-150">
          <div className="bg-white rounded-t-3xl p-4 shadow-2xl w-full max-w-md mx-auto border-t border-slate-200 animate-in slide-in-from-bottom duration-200">
            {/* Header with 取消 / 確認 */}
            <div className="flex items-center justify-between px-2 pb-3 border-b border-slate-100 mb-2">
              <button
                type="button"
                onClick={() => setShowDatePicker(false)}
                className="text-orange-500 font-bold text-sm hover:text-orange-600 transition-colors"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleConfirmDate}
                className="text-orange-500 font-bold text-sm hover:text-orange-600 transition-colors"
              >
                確認
              </button>
            </div>

            {/* iOS Style Wheel Picker Columns */}
            <div className="relative h-48 overflow-hidden my-2 flex items-center justify-center">
              {/* Highlight selection bar in center */}
              <div className="absolute left-2 right-2 h-10 bg-slate-100 rounded-xl pointer-events-none z-0 border border-slate-200/60" />

              <div className="grid grid-cols-4 w-full h-full text-center z-10">
                {/* Col 1: Date */}
                <div className="h-full overflow-y-auto scrollbar-none py-16 snap-y snap-mandatory">
                  {dateList.map((item, idx) => (
                    <div
                      key={item.dateStr}
                      onClick={() => setPickerDateIdx(idx)}
                      className={`h-10 flex items-center justify-center text-xs snap-center cursor-pointer transition-all ${
                        pickerDateIdx === idx
                          ? 'text-slate-900 font-bold text-sm'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>

                {/* Col 2: AM/PM */}
                <div className="h-full overflow-y-auto scrollbar-none py-16 snap-y snap-mandatory">
                  {amPmList.map((ampm) => (
                    <div
                      key={ampm}
                      onClick={() => setPickerAmPm(ampm)}
                      className={`h-10 flex items-center justify-center text-xs snap-center cursor-pointer transition-all ${
                        pickerAmPm === ampm
                          ? 'text-slate-900 font-bold text-sm'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {ampm}
                    </div>
                  ))}
                </div>

                {/* Col 3: Hour */}
                <div className="h-full overflow-y-auto scrollbar-none py-16 snap-y snap-mandatory">
                  {hourList.map((hr) => (
                    <div
                      key={hr}
                      onClick={() => setPickerHour(hr)}
                      className={`h-10 flex items-center justify-center text-xs snap-center cursor-pointer transition-all ${
                        pickerHour === hr
                          ? 'text-slate-900 font-bold text-sm'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {hr}
                    </div>
                  ))}
                </div>

                {/* Col 4: Minute */}
                <div className="h-full overflow-y-auto scrollbar-none py-16 snap-y snap-mandatory">
                  {minuteList.map((min) => (
                    <div
                      key={min}
                      onClick={() => setPickerMinute(min)}
                      className={`h-10 flex items-center justify-center text-xs snap-center cursor-pointer transition-all ${
                        pickerMinute === min
                          ? 'text-slate-900 font-bold text-sm'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      {min}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
