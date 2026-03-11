import { useState, useRef, useEffect, useMemo } from 'react';
import { Menu, Share, Search, Plus, Minus, LocateFixed, Map, Book, PieChart, User, X, Calendar, Thermometer, Footprints, Camera, FileEdit, ArrowRight } from 'lucide-react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import { geoCentroid } from 'd3-geo';

// Local Database Cache implementation using Browser Cache API
const fetchWithCache = async (url: string) => {
  try {
    const cache = await caches.open('globe-offline-data');
    const cachedResponse = await cache.match(url);
    
    if (cachedResponse) {
      console.log('Loaded from local cache:', url);
      return cachedResponse.json();
    }

    console.log('Fetching from network and caching:', url);
    const response = await fetch(url);
    if (response.ok) {
      await cache.put(url, response.clone());
    }
    return response.json();
  } catch (error) {
    console.error('Cache fetch failed, falling back to network', error);
    const res = await fetch(url);
    return res.json();
  }
};

const getCountryName = (isoA2: string, defaultName: string) => {
  try {
    if (!isoA2 || isoA2 === '-99') return defaultName;
    const regionNames = new Intl.DisplayNames(['zh-CN'], { type: 'region' });
    return regionNames.of(isoA2) || defaultName;
  } catch (e) {
    return defaultName;
  }
};

const getFlagEmoji = (countryCode: string) => {
  if (!countryCode || countryCode === '-99') return '🏳️';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char =>  127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

interface MapScreenProps {
  onNavigate: (screen: string) => void;
}

export default function MapScreen({ onNavigate }: MapScreenProps) {
  const [showCapsule, setShowCapsule] = useState(false);
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('3d');
  const [zoomLevel, setZoomLevel] = useState<'global' | 'country' | 'city'>('global');
  const [countries, setCountries] = useState({ features: [] });
  const [allCities, setAllCities] = useState<any[]>([]);
  const [countryLabels, setCountryLabels] = useState<any[]>([]);
  const [focusedCountryCities, setFocusedCountryCities] = useState<any[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>();

  useEffect(() => {
    Promise.all([
      fetchWithCache('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson'),
      fetchWithCache('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_populated_places_simple.geojson')
    ]).then(([countriesData, citiesData]) => {
      setCountries(countriesData);
      setAllCities(citiesData.features);

      const labels = countriesData.features.map((feat: any) => {
        const [lng, lat] = geoCentroid(feat);
        const iso = feat.properties.ISO_A2;
        return {
          lat,
          lng,
          name: getCountryName(iso, feat.properties.NAME),
          flag: getFlagEmoji(iso),
          iso: iso
        };
      });
      setCountryLabels(labels);
    });
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      });
      
      const observer = new ResizeObserver((entries) => {
        setDimensions({
          width: entries[0].contentRect.width,
          height: entries[0].contentRect.height
        });
      });
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [viewMode]);

  const handleGlobeClick = ({ lat, lng }: { lat: number, lng: number }) => {
    if (!globeRef.current) return;
    const currentAlt = globeRef.current.pointOfView().altitude;
    
    if (currentAlt > 1.5) {
      // Zoom to country
      globeRef.current.pointOfView({ lat, lng, altitude: 0.8 }, 1000);
      setZoomLevel('country');
    } else if (currentAlt > 0.5) {
      // Zoom to city
      globeRef.current.pointOfView({ lat, lng, altitude: 0.2 }, 1000);
      setZoomLevel('city');
      setTimeout(() => setShowCapsule(true), 1000);
    } else {
      // Reset
      globeRef.current.pointOfView({ lat, lng, altitude: 2.5 }, 1000);
      setZoomLevel('global');
      setShowCapsule(false);
      setFocusedCountryCities([]);
    }
  };

  const handlePolygonClick = (polygon: any, event: any, { lat, lng }: any) => {
    const iso = polygon.properties.ISO_A2;
    const countryCities = allCities.filter(c => c.properties.iso_a2 === iso).map(c => ({
      lat: c.geometry.coordinates[1],
      lng: c.geometry.coordinates[0],
      name: c.properties.name,
      isCity: true
    }));
    setFocusedCountryCities(countryCities);

    const [cLng, cLat] = geoCentroid(polygon);
    globeRef.current.pointOfView({ lat: cLat, lng: cLng, altitude: 0.8 }, 1000);
    setZoomLevel('country');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-serif min-h-screen flex flex-col overflow-hidden max-w-md mx-auto shadow-2xl relative">
      
      {/* Main Map View */}
      <div className="relative flex-1 w-full overflow-hidden bg-slate-200 dark:bg-slate-800" ref={containerRef}>
        {viewMode === '2d' ? (
          <>
            <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCpEOP6ZBBn9uzqxaSzeco5XpWm4MhrLbEpcuTwgeEDSkq89JnYm-zm5_d0kD4mXLup7_5baDYJWZ9DCCCajkxHOppTxE2jzmsfSEFefp546hbetXnteJN82MvBEdWOqphIeQ4khLsifvCW8mFQdXmFyvRfhH2MJWKrcSHFCsAIzwLE5_zNtg2EEEJ_hIuDkUjPLvFxKEn7Xkbnl1u4T_Ra814f5kcs0ptMX540UHEGrYbtZFdPqlE4wGjRMPaMQyXznL_mW9rHeg')"}}>
              <div className="absolute inset-0 bg-primary/5 mix-blend-overlay"></div>
            </div>
            
            <div className="absolute top-[40%] left-[35%] z-0 group cursor-pointer" onClick={() => setShowCapsule(true)}>
              <div className="relative">
                <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(25,144,230,0.6)] border-2 border-white dark:border-slate-900 z-10 relative"></div>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-primary/50"></div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold py-1 px-3 rounded-lg shadow-lg flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    法国，巴黎
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute top-[48%] left-[65%] z-0 group cursor-pointer" onClick={() => setShowCapsule(true)}>
              <div className="relative">
                <div className="w-3 h-3 bg-orange-400 rounded-full shadow-[0_0_15px_rgba(251,146,60,0.6)] border-2 border-white dark:border-slate-900 z-10 relative"></div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold py-1 px-3 rounded-lg shadow-lg flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    日本，东京
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 w-full h-full bg-[#050505]">
            {dimensions.width > 0 && (
              <Globe
                ref={globeRef}
                width={dimensions.width}
                height={dimensions.height}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                polygonsData={countries.features}
                polygonAltitude={0.005}
                polygonCapColor={() => 'rgba(0, 0, 0, 0)'}
                polygonSideColor={() => 'rgba(0, 0, 0, 0)'}
                polygonStrokeColor={() => 'rgba(255, 255, 255, 0.3)'}
                showAtmosphere={true}
                atmosphereColor="#38bdf8"
                atmosphereAltitude={0.15}
                onPolygonClick={handlePolygonClick}
                onGlobeClick={handleGlobeClick}
                onZoom={({ altitude }: any) => {
                  if (altitude > 1.2 && zoomLevel !== 'global') {
                    setZoomLevel('global');
                    setFocusedCountryCities([]);
                  }
                  else if (altitude <= 1.2 && altitude > 0.4 && zoomLevel !== 'country') setZoomLevel('country');
                  else if (altitude <= 0.4 && zoomLevel !== 'city') setZoomLevel('city');
                }}
                labelsData={zoomLevel === 'global' ? countryLabels : []}
                labelLat={(d: any) => d.lat}
                labelLng={(d: any) => d.lng}
                labelText={(d: any) => `${d.flag} ${d.name}`}
                labelSize={1.2}
                labelDotRadius={0.2}
                labelColor={() => 'rgba(255, 255, 255, 0.95)'}
                labelResolution={2}
                htmlElementsData={zoomLevel !== 'global' ? focusedCountryCities : []}
                htmlElement={(d: any) => {
                  const el = document.createElement('div');
                  el.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; transform: translate(-50%, -50%); pointer-events: none; transition: all 0.3s;">
                      <span style="font-size: 11px; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); padding: 2px 6px; border-radius: 6px; color: rgba(255,255,255,0.95); border: 1px solid rgba(255,255,255,0.2); white-space: nowrap; box-shadow: 0 4px 6px rgba(0,0,0,0.3); display: flex; align-items: center; gap: 4px; font-family: serif; letter-spacing: 0.05em;">
                        <span>${d.name}</span>
                      </span>
                      <div style="width: 6px; height: 6px; background: #fbbf24; border-radius: 50%; margin-top: 4px; box-shadow: 0 0 10px rgba(251,191,36,0.8); border: 1px solid rgba(255,255,255,0.8);"></div>
                    </div>
                  `;
                  return el;
                }}
                backgroundColor="rgba(0,0,0,0)"
              />
            )}
          </div>
        )}
        
        <div className="absolute top-0 left-0 right-0 z-10 px-4 pt-12 pb-4 flex items-center justify-between pointer-events-none">
          <div className="glass-panel pointer-events-auto rounded-full p-2 shadow-sm">
            <button className="flex items-center justify-center w-10 h-10 text-slate-700 dark:text-slate-200 hover:text-primary transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white drop-shadow-md bg-white/80 dark:bg-black/40 px-6 py-1.5 rounded-full backdrop-blur-sm tracking-widest">寰宇足迹</h1>
          <div className="glass-panel pointer-events-auto rounded-full p-2 shadow-sm">
            <button className="flex items-center justify-center w-10 h-10 text-slate-700 dark:text-slate-200 hover:text-primary transition-colors">
              <Share className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="absolute top-28 left-4 right-4 z-10 pointer-events-none">
          <div className="glass-panel pointer-events-auto rounded-xl flex items-center p-1 shadow-lg max-w-md mx-auto">
            <div className="pl-3 pr-2 text-primary">
              <Search className="w-5 h-5" />
            </div>
            <input className="w-full bg-transparent border-none focus:outline-none text-slate-800 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 py-3 text-sm font-medium tracking-wide" placeholder="搜索去过的地方..." type="text" />
          </div>
        </div>
        
        <div className="absolute right-4 bottom-32 flex flex-col gap-3 z-10 pointer-events-none">
          <div className="glass-panel pointer-events-auto rounded-xl flex flex-col overflow-hidden shadow-lg">
            <button className="w-12 h-12 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-200/50 dark:border-slate-700/50">
              <Plus className="w-6 h-6" />
            </button>
            <button className="w-12 h-12 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors">
              <Minus className="w-6 h-6" />
            </button>
          </div>
          <button className="glass-panel pointer-events-auto w-12 h-12 rounded-xl flex items-center justify-center text-primary shadow-lg hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors">
            <LocateFixed className="w-6 h-6" />
          </button>
        </div>
        
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none w-full max-w-[200px]">
          <div className="glass-panel pointer-events-auto rounded-full p-1.5 flex shadow-lg">
            <button 
              onClick={() => setViewMode('2d')}
              className={`flex-1 py-2 px-4 rounded-full shadow-sm text-xs font-bold tracking-wide transition-all ${viewMode === '2d' ? 'bg-primary text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-white/30 dark:hover:bg-slate-700/30'}`}>
              2D 视图
            </button>
            <button 
              onClick={() => setViewMode('3d')}
              className={`flex-1 py-2 px-4 rounded-full shadow-sm text-xs font-bold tracking-wide transition-all ${viewMode === '3d' ? 'bg-primary text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-white/30 dark:hover:bg-slate-700/30'}`}>
              3D 视图
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-surface-light dark:bg-surface-dark border-t border-slate-100 dark:border-slate-800 px-6 pb-6 pt-3 shadow-[0_-5px_20px_rgba(0,0,0,0.03)] z-20">
        <div className="flex justify-between items-end gap-2 max-w-md mx-auto">
          <button onClick={() => onNavigate('map')} className="flex flex-1 flex-col items-center justify-end gap-1.5 text-primary group">
            <div className="flex h-8 items-center justify-center transition-transform group-active:scale-95">
              <Map className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold tracking-tight">地图</span>
          </button>
          <button onClick={() => onNavigate('diary')} className="flex flex-1 flex-col items-center justify-end gap-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors group">
            <div className="flex h-8 items-center justify-center transition-transform group-active:scale-95">
              <Book className="w-7 h-7" />
            </div>
            <span className="text-xs font-medium tracking-tight">日记</span>
          </button>
          <div className="relative -top-8">
            <button onClick={() => onNavigate('diary')} className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all">
              <Plus className="w-8 h-8" />
            </button>
          </div>
          <button onClick={() => onNavigate('achievements')} className="flex flex-1 flex-col items-center justify-end gap-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors group">
            <div className="flex h-8 items-center justify-center transition-transform group-active:scale-95">
              <PieChart className="w-7 h-7" />
            </div>
            <span className="text-xs font-medium tracking-tight">统计</span>
          </button>
          <button onClick={() => onNavigate('achievements')} className="flex flex-1 flex-col items-center justify-end gap-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors group">
            <div className="flex h-8 items-center justify-center transition-transform group-active:scale-95">
              <User className="w-7 h-7" />
            </div>
            <span className="text-xs font-medium tracking-tight">我的</span>
          </button>
        </div>
      </div>

      {/* Time Capsule Modal Overlay */}
      {showCapsule && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end pointer-events-none p-4 pb-8 h-full bg-gradient-to-t from-black/60 to-transparent">
          <div className="pointer-events-auto w-full max-w-sm mx-auto bg-white/85 dark:bg-[#2C2A29]/85 backdrop-blur-xl rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-white/60 dark:border-white/10 overflow-hidden transform transition-all duration-500 ease-out">
            <div className="relative h-48 w-full">
              <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAjiySU5xf0w-u4bMu4MudixiQU2qhZLtKvXQjgGtDm5-uOWORrNW-0xjRnDYBFtZonLw1A21V3jRjYHgaliRqRiAPgTd2dmMK7nVssVnHLiuKWDO51zy0LacW27qvqwhOU0PMjO_ehjPW4pjoo21ydFXe1hKWdD9h2w-i8Xrhsmi-3lBTXckMmTNNLJdNILO-IwkH96tp-cf2uPk2Zokrc7zaN5vVLLeXWV-OGQaAPsnNoo4tC-7qJrxvTbHzE8-ONVVmcAvTcfg")'}}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <button onClick={() => setShowCapsule(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/40 transition-colors">
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 text-white">
                <h2 className="text-3xl font-bold tracking-tight font-serif">京都</h2>
                <div className="flex items-center gap-1 text-white/90 text-sm font-medium mt-1 font-serif">
                  <Calendar className="w-4 h-4" />
                  <span>2023年4月10日 - 4月15日</span>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-5">
              <div className="flex items-center justify-between mb-6 border-b border-slate-200 dark:border-white/10 pb-4">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold font-serif">气温</span>
                  <div className="flex items-center gap-1 text-slate-800 dark:text-slate-100 font-medium font-serif">
                    <Thermometer className="w-4 h-4 text-[#A4B4B9]" />
                    <span>18°C</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold font-serif">步数</span>
                  <div className="flex items-center gap-1 text-slate-800 dark:text-slate-100 font-medium font-serif">
                    <Footprints className="w-4 h-4 text-[#9BA898]" />
                    <span>12,403</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <button onClick={() => onNavigate('footprints')} className="group relative flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-[#E8E1D9]/30 dark:bg-white/5 hover:bg-[#D48C84]/10 transition-all duration-300 border border-transparent hover:border-[#D48C84]/20">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-white/10 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Camera className="w-6 h-6 text-[#D48C84]" />
                  </div>
                  <div className="text-center">
                    <span className="block text-slate-800 dark:text-slate-100 font-semibold text-sm font-serif">相册</span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-serif">24 个记忆</span>
                  </div>
                </button>
                <button onClick={() => onNavigate('diary')} className="group relative flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-[#E8E1D9]/30 dark:bg-white/5 hover:bg-[#D48C84]/10 transition-all duration-300 border border-transparent hover:border-[#D48C84]/20">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-white/10 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FileEdit className="w-6 h-6 text-[#D48C84]" />
                  </div>
                  <div className="text-center">
                    <span className="block text-slate-800 dark:text-slate-100 font-semibold text-sm font-serif">日记</span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-serif">3 篇记录</span>
                  </div>
                </button>
              </div>
              
              <button onClick={() => onNavigate('diary')} className="w-full mt-2 bg-slate-800 dark:bg-slate-700 text-white dark:text-white py-3.5 rounded-xl text-sm font-semibold shadow-lg shadow-slate-300/50 dark:shadow-black/50 hover:bg-[#D48C84] hover:shadow-[0_0_20px_rgba(212,140,132,0.3)] transition-all duration-300 flex items-center justify-center gap-2 group font-serif">
                <span>开启时光胶囊</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
