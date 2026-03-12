import { ArrowLeft, Leaf, Sun, MapPin, Map, ChevronRight, Play, Pause, Pen } from 'lucide-react';
import { useState } from 'react';

interface DiaryDetailScreenProps {
  onNavigate: (screen: string) => void;
}

export default function DiaryDetailScreen({ onNavigate }: DiaryDetailScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative mx-auto flex h-full min-h-screen w-full max-w-md flex-col overflow-hidden bg-background-light dark:bg-background-dark shadow-2xl ring-1 ring-black/5">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] dark:bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] mix-blend-multiply dark:mix-blend-overlay"></div>
      <div className="absolute -top-12 -right-12 z-0 size-48 rounded-full bg-morandi-green/10 blur-3xl"></div>
      <div className="absolute top-32 -left-12 z-0 size-32 rounded-full bg-primary/10 blur-2xl"></div>
      
      <div className="relative z-10 flex items-center justify-between p-4 pb-2 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0">
        <button onClick={() => onNavigate('feed')} className="group flex size-10 items-center justify-center rounded-full bg-white/50 hover:bg-white dark:bg-white/10 dark:hover:bg-white/20 transition-colors shadow-sm ring-1 ring-slate-900/5">
          <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-slate-200" />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-morandi-blue dark:text-slate-400 font-sans">2023年10月12日</span>
          <h2 className="text-slate-800 dark:text-slate-100 text-sm font-semibold tracking-wide">旅行日记</h2>
        </div>
        <button className="flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:text-primary-300 transition-colors">
          <span className="text-sm font-bold tracking-wide">保存</span>
        </button>
      </div>
      
      <main className="relative z-10 flex-1 overflow-y-auto pb-12">
        <div className="px-6 pt-6 pb-2">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-4 h-4 text-morandi-green" />
                <span className="text-xs font-bold uppercase tracking-wider text-morandi-green">自然漫步</span>
              </div>
              <h1 className="font-serif font-bold text-3xl leading-tight text-slate-800 dark:text-slate-100">
                京都的清晨
              </h1>
            </div>
            <div className="flex flex-col items-end gap-1 pt-1">
              <div className="flex items-center gap-1.5 text-morandi-blue dark:text-slate-400">
                <Sun className="w-4 h-4" />
                <span className="text-xs font-medium font-sans">18°C</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <MapPin className="w-3.5 h-3.5" />
                <span>日本京都</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 p-6 pt-4">
          <div className="group relative overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 shadow-sm ring-4 ring-white dark:ring-slate-700 rotate-[-2deg] transition-transform hover:rotate-0 hover:z-20 hover:scale-105 duration-300">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="aspect-[3/4] w-full bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC6nZhy0DJE0Fy9s0GZrMCb0GBiw6SYrukurEx26YGgcQzLfaYktWBaAcVUF0Ceusnzk2XLQ_2JsO9bfyezQJH13LOdxA5-rja6iwR7p9zSqmWN7sKO5XCRC1casQAwhyQ9VwLCH5r0AJIg2gzIWtOfDAinep-FD5EtwK4mczYCdmi9ii41YVFj_ke_ddMQZ7AdtRy7-SFoWEInG55bFX-bzqf-MWbeZeOqJazX65fkqXboy5fDGiNkQyGtphsKWyVtyfGKy58nxA")'}}></div>
            <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[12px] text-white font-medium drop-shadow-md">祗园花见小路</span>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800 shadow-sm ring-4 ring-white dark:ring-slate-700 rotate-[3deg] transition-transform hover:rotate-0 hover:z-20 hover:scale-105 duration-300 mt-6">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="aspect-[3/4] w-full bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAAzwWUDFw6svMp7vChXFqy3ySO1wjCAHxXom_lsH3qX_ZZDo6rB_2dg_kYzntJtktVuTpMcYAkg6QL3B8yoltmoNotyWKKA6jP8ER12qG9Nv74WJ8HZ6ljda2vKG0igPAAAbMZud1TF7hDxlofmivNsj0rl0zJGsq5-pKS-UXNKHhp1IX0SV_S1VIyVWtH6UWpIGwOuI6-YbZWGA6B4LaRO1XB3w2SP0-sXhrHFnAdPwk3uC05EYT3wAeOKUW7lDf5stsp34PG9w")'}}></div>
            <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[12px] text-white font-medium drop-shadow-md">手打抹茶</span>
            </div>
          </div>
        </div>
        
        <div className="px-6 pb-8 relative">
          <span className="absolute -top-2 left-2 font-serif text-6xl text-morandi-clay/20 select-none">“</span>
          <div className="ruled-paper font-serif text-lg text-slate-700 dark:text-slate-300 pt-1 tracking-wide text-justify">
            <p className="mb-8 indent-8">
              清晨的空气带着一丝凉意，我漫步在祗园狭窄的街道上。那些古老的木造町屋静静地伫立着，仿佛在诉说着几个世纪以来的故事。阳光透过云层洒下，斑驳的光影在石板路上跳动。
            </p>
            <p className="mb-8 indent-8">
              在一条幽深的小巷里，我寻得了一间隐秘的茶室。烘焙茶叶的清香透过竹制的推拉门飘散出来，引我步入那个时间仿佛凝固的世界。
            </p>
            <p className="indent-8">
              瓷杯轻碰的脆响，低声细语的交谈，交织成<span 
                onClick={togglePlay}
                className="text-primary font-medium cursor-pointer hover:underline decoration-primary/50 underline-offset-4 transition-all"
                title="点击播放录音"
              >一曲宁静的旋律</span>，这份平和将永远留存在我的记忆深处。
            </p>
          </div>
        </div>
        
        <div className="px-6 pb-6">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-morandi-green/10 px-3 py-1 text-xs font-medium text-morandi-green ring-1 ring-inset ring-morandi-green/20">
              #京都旅行
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
              #2023足迹
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-morandi-clay/10 px-3 py-1 text-xs font-medium text-morandi-clay ring-1 ring-inset ring-morandi-clay/20">
              #美好回忆
            </span>
          </div>
        </div>
        
        <div className="px-6 pb-8">
          <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 ring-1 ring-black/5">
            <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/20 backdrop-blur-sm absolute top-0 w-full z-10 border-b border-black/5">
              <div className="flex items-center gap-2">
                <div className="bg-primary p-1.5 rounded-full text-white">
                  <Map className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">足迹已记录</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
            <div className="h-32 w-full bg-cover bg-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAjiySU5xf0w-u4bMu4MudixiQU2qhZLtKvXQjgGtDm5-uOWORrNW-0xjRnDYBFtZonLw1A21V3jRjYHgaliRqRiAPgTd2dmMK7nVssVnHLiuKWDO51zy0LacW27qvqwhOU0PMjO_ehjPW4pjoo21ydFXe1hKWdD9h2w-i8Xrhsmi-3lBTXckMmTNNLJdNILO-IwkH96tp-cf2uPk2Zokrc7zaN5vVLLeXWV-OGQaAPsnNoo4tC-7qJrxvTbHzE8-ONVVmcAvTcfg")'}}>
            </div>
          </div>
        </div>
        
        <div className="mx-6 p-3 rounded-xl bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 flex items-center gap-3">
          <button 
            onClick={togglePlay}
            className="size-10 flex-none rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:bg-primary/90 transition"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <div className="flex-1">
            <div className={`h-8 flex items-center gap-0.5 justify-start ${isPlaying ? 'opacity-100' : 'opacity-50'} transition-opacity`}>
              <div className={`w-1 h-3 bg-slate-800 dark:bg-slate-200 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}></div>
              <div className={`w-1 h-5 bg-slate-800 dark:bg-slate-200 rounded-full ${isPlaying ? 'animate-pulse delay-75' : ''}`}></div>
              <div className={`w-1 h-4 bg-slate-800 dark:bg-slate-200 rounded-full ${isPlaying ? 'animate-pulse delay-100' : ''}`}></div>
              <div className={`w-1 h-6 bg-slate-800 dark:bg-slate-200 rounded-full ${isPlaying ? 'animate-pulse delay-150' : ''}`}></div>
              <div className={`w-1 h-3 bg-slate-800 dark:bg-slate-200 rounded-full ${isPlaying ? 'animate-pulse delay-200' : ''}`}></div>
              <div className={`w-1 h-5 bg-slate-800 dark:bg-slate-200 rounded-full ${isPlaying ? 'animate-pulse delay-100' : ''}`}></div>
              <div className="w-1 h-4 bg-primary rounded-full"></div>
              <div className="w-1 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
              <div className="w-1 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
              <div className="w-1 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-500">00:42</span>
        </div>
      </main>
      
      <div className="absolute bottom-6 right-6 z-20">
        <button className="flex size-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-xl hover:bg-slate-800 transition-transform hover:scale-105 active:scale-95 dark:bg-primary dark:text-white">
          <Pen className="w-6 h-6" />
        </button>
      </div>
      
      <div className="absolute bottom-0 left-0 p-4 pointer-events-none opacity-20 z-0">
        <Leaf className="w-16 h-16 text-morandi-green rotate-45" />
      </div>
    </div>
  );
}
