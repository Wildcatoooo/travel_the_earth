import { ArrowLeft, Settings, PlaneTakeoff, Globe, Flame, Mountain, Lock, Umbrella, Landmark, Car, Camera, Home, Map, Trophy, User } from 'lucide-react';

interface AchievementsScreenProps {
  onNavigate: (screen: string) => void;
}

export default function AchievementsScreen({ onNavigate }: AchievementsScreenProps) {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto shadow-2xl bg-white dark:bg-[#111a21]">
      <div className="flex items-center px-6 pt-12 pb-4 justify-between bg-white/80 dark:bg-[#111a21]/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-100 dark:border-slate-800">
        <button onClick={() => onNavigate('feed')} className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-slate-100">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-wide flex-1 text-center">成就榜</h2>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-slate-100">
          <Settings className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex flex-col gap-4 px-6 py-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium tracking-widest mb-1">当前进度</p>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">探索者等级 4 - <span className="text-primary">旅行家</span></h1>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-primary">35%</span>
          </div>
        </div>
        <div className="relative h-4 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-morandi-blue to-primary shadow-[0_0_15px_rgba(25,144,230,0.3)] transition-all duration-1000 ease-out" style={{width: '35%'}}></div>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal text-right">已解锁 12/34 个徽章</p>
      </div>
      
      <div className="flex-1 bg-slate-50/50 dark:bg-[#162028] rounded-t-3xl border-t border-slate-100 dark:border-slate-800">
        <h3 className="text-slate-900 dark:text-slate-100 tracking-wide text-xl font-bold px-6 pt-8 pb-4">我的里程碑</h3>
        <div className="grid grid-cols-2 gap-4 px-6 pb-24">
          
          <div className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white dark:bg-[#1a2632] shadow-[0_4px_20px_-2px_rgba(25,144,230,0.1)] border border-slate-100 dark:border-slate-800 hover:border-morandi-mint/50 transition-all cursor-pointer">
            <div className="relative flex items-center justify-center size-20 rounded-full bg-morandi-mint/20 text-morandi-mint ring-4 ring-morandi-mint/10 group-hover:scale-105 transition-transform">
              <PlaneTakeoff className="w-10 h-10" />
              <div className="absolute -bottom-1 -right-1 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white dark:border-[#1a2632]">新</div>
            </div>
            <div className="text-center">
              <p className="text-slate-900 dark:text-slate-100 text-base font-bold leading-tight mb-1">首次飞行</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">10月12日 解锁</p>
            </div>
          </div>
          
          <div className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white dark:bg-[#1a2632] shadow-[0_4px_20px_-2px_rgba(25,144,230,0.1)] border border-slate-100 dark:border-slate-800 hover:border-morandi-blue/50 transition-all cursor-pointer">
            <div className="flex items-center justify-center size-20 rounded-full bg-morandi-blue/20 text-morandi-blue ring-4 ring-morandi-blue/10 group-hover:scale-105 transition-transform">
              <Globe className="w-10 h-10" />
            </div>
            <div className="text-center">
              <p className="text-slate-900 dark:text-slate-100 text-base font-bold leading-tight mb-1">全球探险家</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">5 个国家</p>
            </div>
          </div>
          
          <div className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white dark:bg-[#1a2632] shadow-[0_4px_20px_-2px_rgba(25,144,230,0.1)] border border-slate-100 dark:border-slate-800 hover:border-morandi-coral/50 transition-all cursor-pointer">
            <div className="flex items-center justify-center size-20 rounded-full bg-morandi-coral/20 text-morandi-coral ring-4 ring-morandi-coral/10 group-hover:scale-105 transition-transform">
              <Flame className="w-10 h-10" />
            </div>
            <div className="text-center">
              <p className="text-slate-900 dark:text-slate-100 text-base font-bold leading-tight mb-1">热门地标</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">穿越赤道</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-slate-50 dark:bg-[#162028] border border-dashed border-slate-200 dark:border-slate-700 opacity-80">
            <div className="flex items-center justify-center size-20 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 ring-4 ring-slate-50 dark:ring-slate-700/50 grayscale">
              <Mountain className="w-10 h-10" />
            </div>
            <div className="text-center">
              <p className="text-slate-400 dark:text-slate-500 text-base font-medium leading-tight mb-1">高山攀登者</p>
              <p className="text-slate-300 dark:text-slate-600 text-xs font-medium flex items-center justify-center gap-1">
                <Lock className="w-3.5 h-3.5" /> 未解锁
              </p>
            </div>
          </div>
          
          <div className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white dark:bg-[#1a2632] shadow-[0_4px_20px_-2px_rgba(25,144,230,0.1)] border border-slate-100 dark:border-slate-800 hover:border-morandi-sand/50 transition-all cursor-pointer">
            <div className="flex items-center justify-center size-20 rounded-full bg-morandi-sand/30 text-[#C1A58D] ring-4 ring-morandi-sand/20 group-hover:scale-105 transition-transform">
              <Umbrella className="w-10 h-10" />
            </div>
            <div className="text-center">
              <p className="text-slate-900 dark:text-slate-100 text-base font-bold leading-tight mb-1">跳岛者</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">3 座岛屿</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-slate-50 dark:bg-[#162028] border border-dashed border-slate-200 dark:border-slate-700 opacity-80">
            <div className="flex items-center justify-center size-20 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 ring-4 ring-slate-50 dark:ring-slate-700/50 grayscale">
              <Landmark className="w-10 h-10" />
            </div>
            <div className="text-center">
              <p className="text-slate-400 dark:text-slate-500 text-base font-medium leading-tight mb-1">文化爱好者</p>
              <p className="text-slate-300 dark:text-slate-600 text-xs font-medium flex items-center justify-center gap-1">
                <Lock className="w-3.5 h-3.5" /> 未解锁
              </p>
            </div>
          </div>
          
          <div className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white dark:bg-[#1a2632] shadow-[0_4px_20px_-2px_rgba(25,144,230,0.1)] border border-slate-100 dark:border-slate-800 hover:border-morandi-slate/50 transition-all cursor-pointer">
            <div className="flex items-center justify-center size-20 rounded-full bg-morandi-slate/20 text-morandi-slate ring-4 ring-morandi-slate/10 group-hover:scale-105 transition-transform">
              <Car className="w-10 h-10" />
            </div>
            <div className="text-center">
              <p className="text-slate-900 dark:text-slate-100 text-base font-bold leading-tight mb-1">公路旅行</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">行驶 1000km</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-slate-50 dark:bg-[#162028] border border-dashed border-slate-200 dark:border-slate-700 opacity-80">
            <div className="flex items-center justify-center size-20 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 ring-4 ring-slate-50 dark:ring-slate-700/50 grayscale">
              <Camera className="w-10 h-10" />
            </div>
            <div className="text-center">
              <p className="text-slate-400 dark:text-slate-500 text-base font-medium leading-tight mb-1">摄影达人</p>
              <p className="text-slate-300 dark:text-slate-600 text-xs font-medium flex items-center justify-center gap-1">
                <Lock className="w-3.5 h-3.5" /> 未解锁
              </p>
            </div>
          </div>
          
        </div>
      </div>
      
      <div className="fixed bottom-0 w-full max-w-md bg-white dark:bg-[#111a21] border-t border-slate-100 dark:border-slate-800 pb-5 pt-3 px-6 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)] z-20">
        <div className="flex justify-between items-center text-xs">
          <button onClick={() => onNavigate('feed')} className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-primary transition-colors">
            <Home className="w-6 h-6" />
            <span className="font-medium tracking-wide">首页</span>
          </button>
          <button onClick={() => onNavigate('map')} className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-primary transition-colors">
            <Map className="w-6 h-6" />
            <span className="font-medium tracking-wide">地图</span>
          </button>
          <button onClick={() => onNavigate('achievements')} className="flex flex-col items-center justify-center gap-1 text-primary">
            <div className="relative">
              <Trophy className="w-6 h-6 fill-current" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            </div>
            <span className="font-bold tracking-wide">成就</span>
          </button>
          <button onClick={() => onNavigate('achievements')} className="flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-primary transition-colors">
            <User className="w-6 h-6" />
            <span className="font-medium tracking-wide">我的</span>
          </button>
        </div>
      </div>
    </div>
  );
}
