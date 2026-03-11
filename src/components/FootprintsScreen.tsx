import { ArrowLeft, MoreVertical, Heart, MapPin, Camera, Image, Map, Book, User } from 'lucide-react';

interface FootprintsScreenProps {
  onNavigate: (screen: string) => void;
}

export default function FootprintsScreen({ onNavigate }: FootprintsScreenProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto shadow-2xl bg-[#fdfcf8] dark:bg-[#1c1c1a]">
      <header className="sticky top-0 z-20 flex items-center justify-between px-5 py-4 bg-[#fdfcf8]/90 dark:bg-[#1c1c1a]/90 backdrop-blur-md">
        <button onClick={() => onNavigate('feed')} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-800 dark:text-slate-100" />
        </button>
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-wide font-serif">我的足迹</h1>
        <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <MoreVertical className="w-6 h-6 text-slate-800 dark:text-slate-100" />
        </button>
      </header>
      
      <div className="px-5 pb-2">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          <button className="flex-shrink-0 px-5 py-2 rounded-full bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-medium shadow-sm font-serif tracking-wide">
            全部回忆
          </button>
          <button className="flex-shrink-0 px-5 py-2 rounded-full bg-[#e4dcd3] dark:bg-[#2a2a28] text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-[#a89f91]/20 dark:hover:bg-[#2a2a28]/80 transition-colors font-serif tracking-wide">
            收藏
          </button>
          <button className="flex-shrink-0 px-5 py-2 rounded-full bg-[#e4dcd3] dark:bg-[#2a2a28] text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-[#a89f91]/20 dark:hover:bg-[#2a2a28]/80 transition-colors font-serif tracking-wide">
            欧洲 '23
          </button>
          <button className="flex-shrink-0 px-5 py-2 rounded-full bg-[#e4dcd3] dark:bg-[#2a2a28] text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-[#a89f91]/20 dark:hover:bg-[#2a2a28]/80 transition-colors font-serif tracking-wide">
            日本之旅
          </button>
        </div>
      </div>
      
      <main className="flex-1 px-4 py-4">
        <div className="masonry-grid">
          <div className="masonry-item group cursor-pointer" onClick={() => onNavigate('diary')}>
            <div className="bg-white dark:bg-[#2a2a28] p-3 pb-5 rounded shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:-translate-y-1">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-sm bg-gray-200 relative mb-3">
                <img alt="Eiffel Tower view in Paris" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX1qIGXSXWRKDbWwaLESZDXBc5PyG0ykQGbvNJPcV7I6kifQy93W0fkqohIz29_vEVTScpREm8amqHSEXsuqPInim6SmZS3mwkMx0tPVXfWYURzDV_E6qpj94To0FIKqw4EtxzuMgowEnEHWtk1T7i8FA1rjEprg9bxBnzgJ6B2ullazWJazMRpsvKgJdEAExlQ42i8YxHnybj_yDxjU6tcwyneBT74JVN2mwsUhZ2KpR0wERaLNw3Erx_UOWv4PWZ83DHofrdTQ" />
                <div className="absolute top-2 right-2 bg-black/20 backdrop-blur-sm rounded-full p-1">
                  <Heart className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
              <div className="px-1">
                <h3 className="font-serif font-bold text-slate-800 dark:text-slate-100 text-base leading-tight tracking-wide">巴黎之日</h3>
                <div className="flex items-center gap-1 mt-2 text-[#a89f91] dark:text-slate-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">法国</span>
                </div>
                <p className="text-xs text-slate-500 mt-2 font-serif italic">"咖啡与可颂..."</p>
              </div>
            </div>
          </div>
          
          <div className="masonry-item group cursor-pointer" onClick={() => onNavigate('diary')}>
            <div className="bg-white dark:bg-[#2a2a28] p-3 pb-5 rounded shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:-translate-y-1">
              <div className="aspect-square w-full overflow-hidden rounded-sm bg-gray-200 relative mb-3">
                <img alt="Traditional Kyoto street" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwWZg3KWm6Bdp5T5mYxhYyC7XCwerAzbrd1_rp2UO3XsgRiWP5MZ78InyZUUIPWc6jtKx6nnEJSov30FDpaoA5p0lJIjqJj9RAyEW8R_m_1aPFxwFs1VQVOqaKAyYpHFmaX6z4l7im1U-UmD6dmi5RxfLMrlHqjvu9ctWqu2uHhsWHdMpHmlC5v9vAnUUWMbdlJaJFHFDlW9qEWLN0vhQI2miUA_1AMTVSrdlcJbJ2ihHm6TXZYbvbxDWRGulHnImLCMCB10aNxw" />
              </div>
              <div className="px-1">
                <h3 className="font-serif font-bold text-slate-800 dark:text-slate-100 text-base leading-tight tracking-wide">京都街道</h3>
                <div className="flex items-center gap-1 mt-2 text-[#a89f91] dark:text-slate-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">日本</span>
                </div>
                <p className="text-xs text-slate-500 mt-2 font-serif italic">2023年10月12日</p>
              </div>
            </div>
          </div>
          
          <div className="masonry-item group cursor-pointer">
            <div className="bg-white dark:bg-[#2a2a28] p-3 pb-5 rounded shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:-translate-y-1">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-sm bg-gray-200 relative mb-3">
                <img alt="Snowy mountain peaks in the Alps" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH6e7g8ZqXPT73W7M6M3f-KerdgA99mAoZHu5ElbqUaglbnTUwSZ2K_x3uW6greruf1dU3iDUCjDF0A6iURtG9zSyfReQZ-PUrsLfvNn63PxyoPa5H0GVLNymYC2RgpLajqUUtfPB5csN1BzYSPou295OI-v1Cth8dUXJsZ_ECFT_6LdbgGk2J2-Dj44eqlVeKYrKeu0Wft7rcINdmVN0ZNk344MGTJUgdrfd6FaVyUGHSEetP16kxSN5SDS10eSelq_nDNRKrFg" />
              </div>
              <div className="px-1">
                <h3 className="font-serif font-bold text-slate-800 dark:text-slate-100 text-base leading-tight tracking-wide">晨间徒步</h3>
                <div className="flex items-center gap-1 mt-2 text-[#a89f91] dark:text-slate-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">瑞士阿尔卑斯</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="masonry-item group cursor-pointer">
            <div className="bg-white dark:bg-[#2a2a28] p-3 pb-5 rounded shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:-translate-y-1">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-sm bg-gray-200 relative mb-3">
                <img alt="Venice canal with gondola" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH28W2m0vJYahSlBhI5UNDjLGiVIBl45Z3Pdc1bYXunFef-XQmby9tLSoDxsbY7c7lYE4ep2CA8IfEkY4_o9LgKtHWGC1AWH0Doavv1s9AoSFdcvD7VGpi16FTIjkaZcylQ-3NZLrDJ5SSHtEk8ZpzBCZn9bNlsJqmpXlFisT7bpqAz70DYzs1VlviriruGcSl_dAsL4ODdq3OJ83syMmEZfYx72dvdf_thEW80xzu3pfU9vyyIoNQ6G7JDVsvDz-e9pp8yLVorQ" />
              </div>
              <div className="px-1">
                <h3 className="font-serif font-bold text-slate-800 dark:text-slate-100 text-base leading-tight tracking-wide">运河之梦</h3>
                <div className="flex items-center gap-1 mt-2 text-[#a89f91] dark:text-slate-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">意大利</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="masonry-item group cursor-pointer">
            <div className="bg-white dark:bg-[#2a2a28] p-3 pb-5 rounded shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:-translate-y-1">
              <div className="aspect-square w-full overflow-hidden rounded-sm bg-gray-200 relative mb-3">
                <img alt="Bangkok street food market" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEOOXObg6v37X38iYVngTOP-FX8w8EB-xEo99M5EFGylX65YJ3G0_qHfFVH7K_0V7do8oUUKXhSZCT83SV7Eyu1jotDAO9L-8CzDA1hLFLDWRDcjakMUknJ_Q8Eeo-E6O6K7byKx0XooSIQo4TY7PkJ0M8jjpl6LWMGzEBKC6tPuCjddsOBP0mhGR752-is4ZwGWTbWUS7n36AMwAwpWcl25wG8d-PxjmAC6q0foaI3u6JZDktSTxSLs2yqL9nTI-eAViQXz1uSQ" />
                <div className="absolute top-2 right-2 bg-black/20 backdrop-blur-sm rounded-full p-1">
                  <Heart className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
              <div className="px-1">
                <h3 className="font-serif font-bold text-slate-800 dark:text-slate-100 text-base leading-tight tracking-wide">曼谷夜市</h3>
                <div className="flex items-center gap-1 mt-2 text-[#a89f91] dark:text-slate-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">泰国</span>
                </div>
                <p className="text-xs text-slate-500 mt-2 font-serif italic">热辣与甜蜜</p>
              </div>
            </div>
          </div>
          
          <div className="masonry-item group cursor-pointer">
            <div className="bg-white dark:bg-[#2a2a28] p-3 pb-5 rounded shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:-translate-y-1">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-sm bg-gray-200 relative mb-3">
                <img alt="Matterhorn mountain view" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDswNRbZUu8EYTdzD55l5X-ziU-YBOa_22GkJNW2iuTidmDDXJxZzsgvXB3bMTWuNIqn9y_1SqSW5rpTwzteibnyiWC6Gf2WYs7kkD4Li8EVHOvSBCwWz-9yeMdZ8jldnky28CdHUtMyXYJl6jF3FrvPfTeg7ksTNxNrLysO3lqiN0X96Z9k8PN7ms-byImmWk_oTX_JoJgE9sJaUhpOPM4UoI1JIJwCSDXruznw1kUZ76Be_UAMEk-UC2d7OA3gLrmHR081yq9Q" />
              </div>
              <div className="px-1">
                <h3 className="font-serif font-bold text-slate-800 dark:text-slate-100 text-base leading-tight tracking-wide">马特洪峰</h3>
                <div className="flex items-center gap-1 mt-2 text-[#a89f91] dark:text-slate-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">瑞士</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <div className="sticky bottom-20 flex justify-end px-5 pointer-events-none z-10">
        <button className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#7d9d9c] text-white shadow-lg shadow-[#7d9d9c]/30 hover:bg-[#7d9d9c]/90 transition-transform active:scale-95">
          <Camera className="w-7 h-7" />
        </button>
      </div>
      
      <nav className="sticky bottom-0 z-20 w-full border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#2a2a28]/95 backdrop-blur-md px-6 pb-6 pt-3">
        <div className="flex justify-between items-end">
          <button onClick={() => onNavigate('footprints')} className="flex flex-col items-center gap-1 text-[#7d9d9c] group">
            <div className="p-1 rounded-xl bg-[#7d9d9c]/10 dark:bg-[#7d9d9c]/20 transition-colors">
              <Image className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold font-serif tracking-wider">相册</span>
          </button>
          <button onClick={() => onNavigate('map')} className="flex flex-col items-center gap-1 text-[#a89f91] hover:text-[#7d9d9c] transition-colors group">
            <Map className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-medium font-serif tracking-wider">地图</span>
          </button>
          <button onClick={() => onNavigate('diary')} className="flex flex-col items-center gap-1 text-[#a89f91] hover:text-[#7d9d9c] transition-colors group">
            <Book className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-medium font-serif tracking-wider">日记</span>
          </button>
          <button onClick={() => onNavigate('achievements')} className="flex flex-col items-center gap-1 text-[#a89f91] hover:text-[#7d9d9c] transition-colors group">
            <User className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-medium font-serif tracking-wider">我的</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
