export type ScreenId = 
  | 'SCR-00' // Landing / Welcome Screen
  | 'SCR-01' // Phone Onboarding & OTP
  | 'SCR-02' // Nickname Setup
  | 'SCR-03' // App Home Screen
  | 'SCR-04' // Expert List Screen
  | 'SCR-05' // QR Scanner Screen
  | 'SCR-06' // Main Activity Hub: Nantou Project
  | 'SCR-07A' // Medical Association Data Authorization
  | 'SCR-07B' // Clinic Data Authorization
  | 'SCR-08' // Blood Pressure Measurement Modal
  | 'SCR-09'; // Social Prescribing Course Dialog

export interface TaskState {
  task1Completed: boolean; // 授權流程-南投縣醫師公會
  task2Completed: boolean; // 授權流程-診所
  task3Completed: boolean; // 量測血壓
  task4Completed: boolean; // 社會處方燈任務
}

export interface UserProfile {
  phone: string;
  nickname: string;
}

export interface BloodPressureData {
  systolic: string;  // 收縮壓
  diastolic: string; // 舒張壓
  pulse: string;     // 心律
  date: string;
  note: string;
}
