import { useState } from 'react';
import { ScreenId, TaskState, BloodPressureData } from './types';
import { Scr00Landing } from './components/Scr00Landing';
import { Scr01Onboarding } from './components/Scr01Onboarding';
import { Scr02Nickname } from './components/Scr02Nickname';
import { Scr03Home } from './components/Scr03Home';
import { Scr04ExpertList } from './components/Scr04ExpertList';
import { Scr05QrScanner } from './components/Scr05QrScanner';
import { Scr06ActivityHub } from './components/Scr06ActivityHub';
import { Scr07aMedicalAuth } from './components/Scr07aMedicalAuth';
import { Scr07bClinicAuth } from './components/Scr07bClinicAuth';
import { Scr08BloodPressure } from './components/Scr08BloodPressure';
import { Scr09CourseDialog } from './components/Scr09CourseDialog';
import { ScreenSwitcherBar } from './components/ScreenSwitcherBar';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('SCR-01');
  const [phone, setPhone] = useState('0912345678');
  const [nickname, setNickname] = useState('王小明');
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  // Global Task State
  const [tasks, setTasks] = useState<TaskState>({
    task1Completed: false, // 授權流程-南投縣醫師公會
    task2Completed: false, // 授權流程-診所
    task3Completed: false, // 量測血壓
    task4Completed: false, // 社會處方燈任務
  });

  // Latest Blood Pressure measurement state
  const [_bpData, setBpData] = useState<BloodPressureData | null>(null);

  // Handlers for Task Completions
  const handleCompleteTask1 = () => {
    setTasks((prev) => ({ ...prev, task1Completed: true }));
    setCurrentScreen('SCR-06');
  };

  const handleCompleteTask2 = () => {
    setTasks((prev) => ({ ...prev, task2Completed: true }));
    setCurrentScreen('SCR-06');
  };

  const handleCompleteTask3 = (data: BloodPressureData) => {
    setBpData(data);
    setTasks((prev) => ({ ...prev, task3Completed: true }));
    setCurrentScreen('SCR-06');
  };

  const handleCompleteTask4 = () => {
    setTasks((prev) => ({ ...prev, task4Completed: true }));
    setCurrentScreen('SCR-06');
  };

  // Reset tasks state
  const handleResetTasks = () => {
    setTasks({
      task1Completed: false,
      task2Completed: false,
      task3Completed: false,
      task4Completed: false,
    });
  };

  const completedCount = 
    (tasks.task1Completed ? 1 : 0) +
    (tasks.task2Completed ? 1 : 0) +
    (tasks.task3Completed ? 1 : 0) +
    (tasks.task4Completed ? 1 : 0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-800 font-sans flex flex-col">
      {/* Top Prototype Control Toolbar */}
      <ScreenSwitcherBar
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        tasks={tasks}
        onResetTasks={handleResetTasks}
        isMobileFrame={isMobileFrame}
        setIsMobileFrame={setIsMobileFrame}
      />

      {/* Main Prototype View Area */}
      <div className="flex-1 flex items-center justify-center p-0 sm:p-4 overflow-hidden">
        <div
          className={`w-full transition-all duration-300 ${
            isMobileFrame
              ? 'max-w-[420px] h-[860px] max-h-[92vh] rounded-[42px] border-[10px] border-slate-800 shadow-2xl relative overflow-hidden bg-white ring-1 ring-slate-700/50 flex flex-col'
              : 'max-w-md min-h-[800px] h-full bg-white shadow-xl relative flex flex-col'
          }`}
        >
          {/* Simulated Mobile Camera Notch (only when mobile frame active) */}
          {isMobileFrame && (
            <div className="w-full bg-slate-900 h-6 flex items-center justify-center shrink-0 z-30 select-none">
              <div className="w-24 h-4 bg-slate-950 rounded-b-xl flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                <div className="w-8 h-1 rounded-full bg-slate-800"></div>
              </div>
            </div>
          )}

          {/* Screen Router */}
          <div className="flex-1 overflow-y-auto relative bg-slate-50 flex flex-col">
            {currentScreen === 'SCR-00' && (
              <Scr00Landing
                onLoginRegister={() => setCurrentScreen('SCR-01')}
                onSkipToHome={() => setCurrentScreen('SCR-03')}
              />
            )}

            {currentScreen === 'SCR-01' && (
              <Scr01Onboarding
                phone={phone}
                setPhone={setPhone}
                onNavigateNext={() => setCurrentScreen('SCR-02')}
                onNavigateBack={() => setCurrentScreen('SCR-00')}
              />
            )}

            {currentScreen === 'SCR-02' && (
              <Scr02Nickname
                nickname={nickname}
                setNickname={setNickname}
                onNavigateNext={() => setCurrentScreen('SCR-03')}
              />
            )}

            {currentScreen === 'SCR-03' && (
              <Scr03Home
                onNavigate={setCurrentScreen}
                completedTasksCount={completedCount}
              />
            )}

            {currentScreen === 'SCR-04' && (
              <Scr04ExpertList onNavigate={setCurrentScreen} />
            )}

            {currentScreen === 'SCR-05' && (
              <Scr05QrScanner
                onNavigateBack={() => setCurrentScreen('SCR-04')}
                onScanSuccess={() => setCurrentScreen('SCR-06')}
              />
            )}

            {currentScreen === 'SCR-06' && (
              <Scr06ActivityHub
                tasks={tasks}
                onNavigate={setCurrentScreen}
                onNavigateBackHome={() => setCurrentScreen('SCR-03')}
              />
            )}

            {currentScreen === 'SCR-07A' && (
              <Scr07aMedicalAuth
                onCancel={() => setCurrentScreen('SCR-06')}
                onAuthorize={handleCompleteTask1}
                isCompleted={tasks.task1Completed}
              />
            )}

            {currentScreen === 'SCR-07B' && (
              <Scr07bClinicAuth
                onCancel={() => setCurrentScreen('SCR-06')}
                onAuthorize={handleCompleteTask2}
                isCompleted={tasks.task2Completed}
              />
            )}

            {currentScreen === 'SCR-08' && (
              <Scr08BloodPressure
                onCancel={() => setCurrentScreen('SCR-06')}
                onComplete={handleCompleteTask3}
              />
            )}

            {currentScreen === 'SCR-09' && (
              <Scr09CourseDialog
                onCancel={() => setCurrentScreen('SCR-06')}
                onRegister={handleCompleteTask4}
                isCompleted={tasks.task4Completed}
              />
            )}
          </div>

          {/* Simulated Home Bar at bottom of Mobile frame */}
          {isMobileFrame && (
            <div className="w-full bg-white pt-1.5 pb-2 flex items-center justify-center shrink-0 z-30 border-t border-slate-100">
              <div className="w-28 h-1 bg-slate-300 rounded-full"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
