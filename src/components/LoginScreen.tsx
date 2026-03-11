import { ArrowLeft, UserCircle, Camera, User, Lock, EyeOff, ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onNavigate: (screen: string) => void;
}

export default function LoginScreen({ onNavigate }: LoginScreenProps) {
  return (
    <div className="w-full max-w-md h-full min-h-screen flex flex-col relative overflow-hidden bg-background-light dark:bg-background-dark shadow-2xl shadow-primary/5">
      <header className="flex items-center justify-between p-6 z-10">
        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-sm font-semibold tracking-wide text-primary/80 uppercase">登录</div>
        <div className="w-10"></div>
      </header>
      
      <main className="flex-1 flex flex-col px-8 pb-8 pt-4">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="relative group cursor-pointer">
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-lg relative overflow-hidden">
              <UserCircle className="w-16 h-16 text-primary opacity-80 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute bottom-1 right-1 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-sm">
                <Camera className="w-4 h-4" />
              </div>
            </div>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white tracking-tight text-center">欢迎回来</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400 text-center max-w-[240px] leading-relaxed text-sm">输入您的详细信息以继续旅程。</p>
        </div>
        
        <form className="flex flex-col gap-5 w-full mt-2">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1" htmlFor="username">用户名</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400 dark:text-slate-500">
                <User className="w-5 h-5" />
              </span>
              <input className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm" id="username" placeholder="请输入用户名" type="text" />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1" htmlFor="password">密码</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400 dark:text-slate-500">
                <Lock className="w-5 h-5" />
              </span>
              <input className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm" id="password" placeholder="••••••••" type="password" />
              <button className="absolute right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" type="button">
                <EyeOff className="w-5 h-5" />
              </button>
            </div>
            <div className="flex justify-end pt-1">
              <a className="text-sm font-medium text-primary hover:text-primary/80 transition-colors" href="#">忘记密码？</a>
            </div>
          </div>
          
          <div className="pt-4">
            <button 
              onClick={() => onNavigate('feed')}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-2xl py-4 shadow-lg shadow-primary/25 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2" 
              type="button"
            >
              <span>登录</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
        
        <div className="mt-8 flex flex-col items-center gap-6">
          <div className="relative w-full text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <span className="relative bg-background-light dark:bg-background-dark px-4 text-sm text-slate-500 dark:text-slate-400 font-medium">其他登录方式</span>
          </div>
          
          <div className="flex gap-4">
            <button className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group">
              <img alt="Google" className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUbg2HQ5zjPynVwglgCU8pVw94zdKRYfHISm0fUCyWM2H6MvIQ1Tlxt9rMLxHbT_L1OQeg-dMRP9sA_HbFdlqvTaBRY0OPKpwUJmNuMHNM9rKWNPBmJ7PHm0Dtm_oHASPMicOnVOi2JwWQJyEtnnBeVvhXQPLkIKx91pxDwZIGbQvBbFlfVrvFgrhPSw3fpucKBqlheTtA-Vk0o7n1-fN8wbvgh3YeAM-lkC3RLpc1BxQrpKCJJfHEdlWm-_2eOS84rrpqAXjIiw" />
            </button>
            <button className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group">
              <img alt="Apple" className="w-6 h-6 dark:invert opacity-70 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlQrsvUQI4mqLpJ0Vh-GvWG7eQzGipekbpFhzHYkYJUzJdACwweWFOZMrQ2yp1yjKfJTOvyJXRFtriYrMLQZu-olMdPZzzsvPdpJuaPG4vlfycP_Vo_e6tZrIISnMhSXbQ4xhPY7MTB6Nv7HzZIMgm4NZbpBhaeGW-wBMF9HcC7u5EbC2vtsi5ZZXZdrrMAgLQtz-lbqN7uJzWjtcJUtWXK5rBvZYlXxVkuaWVZV6388zIKPsK8VBB8PkX2eG4YeA_XIfXytLd1w" />
            </button>
            <button className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group">
              <img alt="Facebook" className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6vc4-cxj_bdxYDetfBRRtwXE-0oRiGUOgj5dXUWt5E30KlEBGWm0aTUKf6s6R0EDhqjRvdI8RbEI_ZXTR9QxFohJ_ecmYv0NL4GCXpSRMGPnv8kStGi7U3iOdAQnIbazQZPIeAvgPlpSa_6a9cdrvXyEdo5Sn6l6wXhMv8lOOYxoabuMNC-JlOX01ylNw5otdhoRhXhG1U4vR3b_p0Ei5yhVdwYysCs25l7OjdQU0E6M8rubUtRUe4p-T5syM88E0TunTvdujjw" />
            </button>
          </div>
        </div>
        
        <div className="mt-auto pt-8 pb-2 text-center">
          <p className="text-slate-600 dark:text-slate-400">
            还没有账号？ 
            <a className="font-bold text-primary hover:text-primary/80 transition-colors" href="#">立即注册</a>
          </p>
        </div>
      </main>
      
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-100/30 dark:bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
    </div>
  );
}
