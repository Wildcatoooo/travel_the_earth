import { Footprints, Bell, Plus, MapPin, Heart, MessageCircle, Bookmark, Home, Compass, Map, User, Search } from 'lucide-react';

interface FeedScreenProps {
  onNavigate: (screen: string) => void;
}

export default function FeedScreen({ onNavigate }: FeedScreenProps) {
  return (
    <div className="bg-background-light dark:bg-background-dark text-text-main dark:text-slate-200 min-h-screen flex flex-col overflow-x-hidden antialiased selection:bg-primary/20">
      <header className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-5 pt-12 pb-4 flex items-center justify-between border-b border-stone-100 dark:border-stone-800 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-light dark:bg-surface-dark flex items-center justify-center shadow-sm text-primary">
            <Footprints className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-text-main dark:text-slate-100">好友旅行动态</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full text-text-subtle hover:bg-primary/5 hover:text-primary transition-colors">
            <Bell className="w-6 h-6" />
          </button>
          <div className="w-9 h-9 rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden border-2 border-white dark:border-stone-600">
            <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3lH8Bg9FNNSL0Q1IDuRURQFD-YIOYQZwoV94viFEZlLSXFTCy_J79Mil701YZpDn5JCF7Z0IVMf55y8TjmwbRAXyQNrt1d0tEMQGmoZR1SdvKgbMwhbXL4144CXVmBFgWxwRZOPm4VNZKoLGfltsI8LIcZmkWpUlOi31ZfPqVoMzLPFI-TShL4ffttsi4szeImKcxhtrILoosCkWTPSL8KZTfQguxaktDOTNAmO2iazUv_f8R0-0ias-yhUz-cJGlQZ6puDbuqQ" />
          </div>
        </div>
      </header>
      
      <main className="flex-1 w-full max-w-md mx-auto pb-24 px-4 pt-2">
        <section className="py-4 overflow-x-auto no-scrollbar">
          <div className="flex items-start gap-4 min-w-max px-1">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-primary/40 flex items-center justify-center bg-white dark:bg-surface-dark text-primary cursor-pointer hover:bg-primary/5 transition-colors">
                <Plus className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-text-subtle dark:text-slate-400">我的旅行</span>
            </div>
            
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-primary to-orange-300">
                <div className="w-full h-full rounded-full border-2 border-white dark:border-background-dark overflow-hidden">
                  <img alt="Friend avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU8v9jIVvksWwXMuJa6QQXPFWIHNXKycxuSt9aMQnD_tudjVSUD6vcEloWKKj9ooJkGPSmxcmA54q_qQbe144hSrYV2_jE9ohVEe1-MXREbO0MF-PZ1ajJCGy6cwmVzXmMOwXcENTbvzlythKUoJCegpuTF5nxNLe_gzcw5pWGvTqOwllWzNJcedobKdZpXqUHkhWbb3X5UjfkV3-VgYA1ekda_YbZkRbimaISnXQGKJwzjCsH7F2t6Pv--UApYCmLJqTwpXBdBw" />
                </div>
              </div>
              <span className="text-xs font-medium text-text-main dark:text-slate-300 group-hover:text-primary transition-colors">陈苏菲</span>
            </div>
            
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-primary to-orange-300">
                <div className="w-full h-full rounded-full border-2 border-white dark:border-background-dark overflow-hidden">
                  <img alt="Friend avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxqNzF1TzdQiKcf5h553q9cTsSkb3GYSAjxhjh4a0X3Ch8g5P-lHULziojA5Tnqx6Qjep6bzb29SQc305kZg_7h4NcrCGFiokKKU-v1QKdwwN7qbawsPinmZfVt00huEh31v7s6ADSDV_1jjXcM4SDvwrkDl3BWuTfTi_0YjgCsoRklx5F3UkZMTeuBr188oxu39cBE3Y0O7wU56snAbtO-tFcwahEmwRAqokwmdF2zCVfjzaDmDDi0CXTmpcFfmw4U-n2XOlrLg" />
                </div>
              </div>
              <span className="text-xs font-medium text-text-main dark:text-slate-300 group-hover:text-primary transition-colors">李奥纳多</span>
            </div>
            
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
              <div className="w-16 h-16 rounded-full p-[2px] bg-stone-200 dark:bg-stone-700">
                <div className="w-full h-full rounded-full border-2 border-white dark:border-background-dark overflow-hidden">
                  <img alt="Friend avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuT16lBdn0ynwXQ3KOpEBWGXY317Ma2x7s-RQqoSHjxxUy9Z1Ldl9Ys0a-tinwjIz_jlg_Uq0k7Njr_ZVh5mgR2AMGQvON2ryrQUFpuj6vzqZb6yExIQx9aQlA9UPqr3o_a2HrMQ4h3p19nQH6pbt6jxX-jPVbwL4LiQSHsjX2Hgp0Zgm3G3afjzow5WO7InJ5d86i9zMetv-ftZcSSX4y1SJNQiMAQxLArjsKYDg-NZ3eJBpMrfHNB1PIajCYiepJwzzyLlxXww" />
                </div>
              </div>
              <span className="text-xs font-medium text-text-subtle dark:text-slate-500 group-hover:text-primary transition-colors">艾莎</span>
            </div>
          </div>
        </section>
        
        <div className="flex flex-col gap-6 mt-2">
          <article className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_-2px_rgba(238,75,43,0.05)] transition-shadow duration-300 border border-stone-100 dark:border-stone-800">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjmb-LrPWKc5wtUa_OpxkJm-VDLnmbPao6KKzcMfP29HdqYLPtpP62rALkU8USFtZmQE50yQCpXiTI_Rf0huQHAKYbFcwadmgBOuA-ipQCcruBv2tyuII16cTxH44067JhFcBygpNuou8zCGOEvflL2Y7p-Z5XOBrknegmbwZrpVDiL4x3lCA_zeZ4MPCwpyrK6oLKQdRb_8RzXcByt8AIDYDDl8aXhqj9j2AXLWoRMfQccFsVFa_fwcu0TyfVoZIyQoy39JgKrQ" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-text-main dark:text-slate-200">陈苏菲</h3>
                  <p className="text-xs text-primary font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    日本京都
                  </p>
                </div>
              </div>
              <span className="text-xs text-text-subtle dark:text-slate-500">2小时前</span>
            </div>
            
            <div className="relative group cursor-pointer" onClick={() => onNavigate('diary')}>
              <div className="bg-white p-3 pb-8 shadow-sm rounded-sm transform -rotate-1 transition-transform duration-500 group-hover:rotate-0 mb-4 border border-stone-100 dark:border-stone-700 dark:bg-stone-800">
                <div className="w-full aspect-[4/3] overflow-hidden bg-stone-200 dark:bg-stone-700">
                  <img alt="Kyoto Bamboo Forest" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpJ3hRkZlrak7wMZ9Q_eEdmOUg897Jai28oPSvYsx76Z06dNC44LamtvXZ3umqC2wG6uL5Nsen9L7OqyydqhQt6RgVxOKJybkJPylUZErXqgNx9PXydipLVTPxaTZ1Jcyrlp7YZICTezqWfUJAR4W6vOegKhmqUo1E16RIevxil6rezXRweLP9-X2T4MdodNWZfOuutN6OQgOriYJRYzpAKejDOVSHwpogJiklvxB5j8M6ltPiDwi8L6u747I2CxlBYf22fJd61Q" />
                </div>
                <div className="mt-3 px-1">
                  <p className="font-serif text-sm text-text-subtle dark:text-slate-400 font-medium tracking-wide">岚山的晨间漫步 🎋</p>
                </div>
              </div>
              <p className="text-text-main dark:text-slate-300 text-sm leading-relaxed mb-4 pl-1">
                今天早晨的竹林简直如梦似幻。在人群涌入之前抵达，静静聆听风吹过竹叶的沙沙声。这就是宁静的定义。
              </p>
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
              <div className="flex gap-4">
                <button className="flex items-center gap-1.5 text-text-subtle hover:text-primary transition-colors group">
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">124</span>
                </button>
                <button className="flex items-center gap-1.5 text-text-subtle hover:text-primary transition-colors group">
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">18</span>
                </button>
              </div>
              <button className="text-text-subtle hover:text-primary transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </article>
          
          <article className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_-2px_rgba(238,75,43,0.05)] transition-shadow duration-300 border border-stone-100 dark:border-stone-800">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwZ0jonmVx_tISuP2snE4C74EEIeJVMuvY55VdEGcJVLZKw5Fa5M3TsXR16Vu-NFsJ2XUUm7BglUy58yLWCSf6cMXZq0ZdnSmwU3g87-DPg3LPscMRpsjRpJmxPliStfJvVaUpGhMLhwUDdnbnU7WGXXu-_SK-v-edl3I2EqpwvgB6wRjVSK-ff78VONXrn4y6DwL8D1M3DHxCXuTk4mEg8OFBWlRXDw28xaQvZiPoa9RTcSIPGeklsxllJC0_JoZuk_Qm8HEOSQ" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-text-main dark:text-slate-200">李奥纳多</h3>
                  <p className="text-xs text-primary font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    意大利阿玛菲海岸
                  </p>
                </div>
              </div>
              <span className="text-xs text-text-subtle dark:text-slate-500">5小时前</span>
            </div>
            
            <div className="relative group cursor-pointer">
              <div className="bg-white p-3 pb-8 shadow-sm rounded-sm transform rotate-1 transition-transform duration-500 group-hover:rotate-0 mb-4 border border-stone-100 dark:border-stone-700 dark:bg-stone-800">
                <div className="w-full aspect-square overflow-hidden bg-stone-200 dark:bg-stone-700">
                  <img alt="Positano Coastline" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtVvFP1K48uoGE_sQyyK5E9Pyn53fFCFGeFXJmFaDIX5G3aFKxxa5O0hnFBiZWtDXuZA-ET5SRTzQBeoEt2Mgom7NvIFDlCZpUVr2kwbtHNiAyscCaoIlZuDoR_BXCzy9jQPIji3jzldP9VYR7u52UJ3MnJtMT19QG1J06XHtvfrI4Vs9Wn89lVKq3t3DJpi-_UAUzBeNv2VzuaO5BBk68I6sgmrusKRu3MWgpoTnxRDspheRegboq8MI_d9VJ7XvgXZvHZN8gLg" />
                </div>
                <div className="mt-3 px-1">
                  <p className="font-serif text-sm text-text-subtle dark:text-slate-400 font-medium tracking-wide">柠檬雪酪与海景 🍋</p>
                </div>
              </div>
              <p className="text-text-main dark:text-slate-300 text-sm leading-relaxed mb-4 pl-1">
                发现了这个隐秘的角落，有着最棒的柠檬雪酪。光是为了这个景色，爬那些楼梯也是值得的。
              </p>
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
              <div className="flex gap-4">
                <button className="flex items-center gap-1.5 text-primary transition-colors group">
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform fill-current" />
                  <span className="text-xs font-medium">89</span>
                </button>
                <button className="flex items-center gap-1.5 text-text-subtle hover:text-primary transition-colors group">
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">6</span>
                </button>
              </div>
              <button className="text-text-subtle hover:text-primary transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </article>
          
          <article className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_-2px_rgba(238,75,43,0.05)] transition-shadow duration-300 border border-stone-100 dark:border-stone-800">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGRrTqxH-ZSbQ1aMX9jbDJ5titvE9z3f6i-kWeoshyXGtNNcVR_jDLrhPXGWsxBTGJhVlKruiyZ4hbUXTiq0dJcVf2G664KJ2kbsYT5hrIFsvbpVd9Nl31cHjNaDyzUdHMebNZJwUXIC50WcDQ-XSWCMtYp5hZpYxBmcaKfpIkKg4_23qupq6M8ApxbK4AAoGAIS97zl0_Xpv0s6dblb2XIDFFN0Bx5YqxfxpTqza0zzr-IfoxtKYMXFZnHtw_xWWDBy1Nrpq5VQ" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-text-main dark:text-slate-200">艾莎</h3>
                  <p className="text-xs text-primary font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    摩洛哥马拉喀什
                  </p>
                </div>
              </div>
              <span className="text-xs text-text-subtle dark:text-slate-500">昨天</span>
            </div>
            
            <div className="relative group cursor-pointer">
              <div className="bg-white p-3 pb-8 shadow-sm rounded-sm transform -rotate-2 transition-transform duration-500 group-hover:rotate-0 mb-4 border border-stone-100 dark:border-stone-700 dark:bg-stone-800">
                <div className="w-full aspect-[16/9] overflow-hidden bg-stone-200 dark:bg-stone-700">
                  <img alt="Marrakech Market Spices" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXVBLAbW-qM9t7Y_WxNGR6m4SrFIGAK0CE8eH06dKrVePdIr4DOUD1cgKm25MN_K9dbN85f3xrbBsA8HEzMwkKjGg53qLlY2ZSKA5nDOy2ceYldnWaEPbNhfCOtG-orG4ShFVVFLK-YpjZ0Mv3hN84uzRWWVqZolFnQ8EORjX7qNkDAL7QyjL4KbHPJgTyD_T_V777ryHZ4KQkYJ4Y0Wjfuq8oPAksLiTwJUFp7Nat27Ra6IZ8-9wwMcn_KtLpgP6MXA8J9BaFWQ" />
                </div>
                <div className="mt-3 px-1">
                  <p className="font-serif text-sm text-text-subtle dark:text-slate-400 font-medium tracking-wide">露天市场的色彩 🌶️</p>
                </div>
              </div>
              <p className="text-text-main dark:text-slate-300 text-sm leading-relaxed mb-4 pl-1">
                在露天市场迷路也是一种魅力。空气中弥漫着孜然和藏红花的香气。
              </p>
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
              <div className="flex gap-4">
                <button className="flex items-center gap-1.5 text-text-subtle hover:text-primary transition-colors group">
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">210</span>
                </button>
                <button className="flex items-center gap-1.5 text-text-subtle hover:text-primary transition-colors group">
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">42</span>
                </button>
              </div>
              <button className="text-text-subtle hover:text-primary transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </article>
        </div>
      </main>
      
      <nav className="fixed bottom-0 w-full max-w-md bg-surface-light dark:bg-surface-dark border-t border-stone-100 dark:border-stone-800 pb-[env(safe-area-inset-bottom)] pt-2 z-40">
        <div className="flex justify-around items-center px-2 pb-4 pt-2">
          <button onClick={() => onNavigate('feed')} className="flex flex-col items-center gap-1 text-primary group">
            <div className="p-1 rounded-full group-hover:bg-primary/10 transition-colors">
              <Home className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-medium">主页</span>
          </button>
          
          <button onClick={() => onNavigate('map')} className="flex flex-col items-center gap-1 text-text-subtle dark:text-slate-500 hover:text-primary transition-colors group">
            <div className="p-1 rounded-full group-hover:bg-primary/10 transition-colors">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-medium">探索</span>
          </button>
          
          <button onClick={() => onNavigate('diary')} className="flex flex-col items-center gap-1 text-primary -mt-8 shadow-lg shadow-primary/20 rounded-full bg-surface-light dark:bg-surface-dark p-1">
            <div className="bg-primary text-white w-12 h-12 flex items-center justify-center rounded-full hover:scale-105 transition-transform">
              <Plus className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-medium">日记</span>
          </button>
          
          <button onClick={() => onNavigate('footprints')} className="flex flex-col items-center gap-1 text-text-subtle dark:text-slate-500 hover:text-primary transition-colors group">
            <div className="p-1 rounded-full group-hover:bg-primary/10 transition-colors">
              <Map className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-medium">地图</span>
          </button>
          
          <button onClick={() => onNavigate('achievements')} className="flex flex-col items-center gap-1 text-text-subtle dark:text-slate-500 hover:text-primary transition-colors group">
            <div className="p-1 rounded-full group-hover:bg-primary/10 transition-colors">
              <User className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-medium">我的</span>
          </button>
        </div>
      </nav>
      
      <button className="fixed right-6 bottom-24 w-12 h-12 bg-white dark:bg-surface-dark text-text-main dark:text-slate-200 rounded-full shadow-lg border border-stone-100 dark:border-stone-700 flex items-center justify-center z-30 hover:bg-stone-50 transition-colors">
        <Search className="w-6 h-6" />
      </button>
    </div>
  );
}
