import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Menu, Share, Search, Plus, Minus, LocateFixed, Map, Book, PieChart, User, X, Calendar, Thermometer, Footprints, Camera, FileEdit, ArrowRight, Battery, BatteryCharging, ChevronLeft } from 'lucide-react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import { geoCentroid, geoBounds } from 'd3-geo';

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

const cityTranslations: Record<string, string> = {
  'Beijing': '北京', 'Tokyo': '东京', 'Paris': '巴黎', 'London': '伦敦', 'New York': '纽约',
  'Washington': '华盛顿', 'Moscow': '莫斯科', 'Berlin': '柏林', 'Rome': '罗马', 'Madrid': '马德里',
  'Seoul': '首尔', 'Bangkok': '曼谷', 'Singapore': '新加坡', 'Kuala Lumpur': '吉隆坡', 'Jakarta': '雅加达',
  'Manila': '马尼拉', 'Hanoi': '河内', 'New Delhi': '新德里', 'Sydney': '悉尼', 'Melbourne': '墨尔本',
  'Los Angeles': '洛杉矶', 'Chicago': '芝加哥', 'Toronto': '多伦多', 'Vancouver': '温哥华', 'Dubai': '迪拜',
  'Istanbul': '伊斯坦布尔', 'Cairo': '开罗', 'Cape Town': '开普敦', 'Rio de Janeiro': '里约热内卢',
  'Sao Paulo': '圣保罗', 'Buenos Aires': '布宜诺斯艾利斯', 'Mexico City': '墨西哥城', 'Shanghai': '上海',
  'Guangzhou': '广州', 'Shenzhen': '深圳', 'Hong Kong': '香港', 'Taipei': '台北', 'Macau': '澳门',
  'Osaka': '大阪', 'Kyoto': '京都', 'San Francisco': '旧金山', 'Seattle': '西雅图', 'Boston': '波士顿',
  'Las Vegas': '拉斯维加斯', 'Miami': '迈阿密', 'Amsterdam': '阿姆斯特丹', 'Vienna': '维也纳', 'Prague': '布拉格',
  'Budapest': '布达佩斯', 'Warsaw': '华沙', 'Stockholm': '斯德哥尔摩', 'Oslo': '奥斯陆', 'Copenhagen': '哥本哈根',
  'Helsinki': '赫尔辛基', 'Athens': '雅典', 'Lisbon': '里斯本', 'Dublin': '都柏林', 'Brussels': '布鲁塞尔',
  'Geneva': '日内瓦', 'Zurich': '苏黎世', 'Munich': '慕尼黑', 'Frankfurt': '法兰克福', 'Milan': '米兰',
  'Venice': '威尼斯', 'Florence': '佛罗伦萨', 'Barcelona': '巴塞罗那', 'Mumbai': '孟买', 'Delhi': '德里',
  'Bangalore': '班加罗尔', 'Kolkata': '加尔各答', 'Chennai': '钦奈', 'Karachi': '卡拉奇', 'Lahore': '拉合尔',
  'Dhaka': '达卡', 'Colombo': '科伦坡', 'Kathmandu': '加德满都', 'Tehran': '德黑兰', 'Baghdad': '巴格达',
  'Riyadh': '利雅得', 'Jeddah': '吉达', 'Mecca': '麦加', 'Medina': '麦地那', 'Amman': '安曼', 'Beirut': '贝鲁特',
  'Damascus': '大马士革', 'Jerusalem': '耶路撒冷', 'Tel Aviv': '特拉维夫', 'Ankara': '安卡拉', 'Johannesburg': '约翰内斯堡',
  'Pretoria': '比勒陀利亚', 'Nairobi': '内罗毕', 'Addis Ababa': '亚的斯亚贝巴', 'Lagos': '拉各斯', 'Abuja': '阿布贾',
  'Accra': '阿克拉', 'Dakar': '达喀尔', 'Casablanca': '卡萨布兰卡', 'Algiers': '阿尔及尔', 'Tunis': '突尼斯',
  'Tripoli': '的黎波里', 'Bogota': '波哥大', 'Lima': '利马', 'Santiago': '圣地亚哥', 'Caracas': '加拉加斯',
  'Quito': '基多', 'La Paz': '拉巴斯', 'Asuncion': '亚松森', 'Montevideo': '蒙得维的亚', 'Havana': '哈瓦那',
  'San Juan': '圣胡安', 'Kingston': '金斯敦', 'Port-au-Prince': '太子港', 'Santo Domingo': '圣多明各',
  'Guatemala City': '危地马拉城', 'San Salvador': '圣萨尔瓦多', 'Tegucigalpa': '特古西加尔巴', 'Managua': '马那瓜',
  'San Jose': '圣何塞', 'Panama City': '巴拿马城',
  'Chengdu': '成都', 'Chongqing': '重庆', 'Hangzhou': '杭州', 'Wuhan': '武汉',
  'Xi\'an': '西安', 'Xian': '西安', 'Suzhou': '苏州', 'Tianjin': '天津', 'Nanjing': '南京',
  'Changsha': '长沙', 'Zhengzhou': '郑州', 'Dongguan': '东莞', 'Qingdao': '青岛',
  'Shenyang': '沈阳', 'Ningbo': '宁波', 'Kunming': '昆明', 'Wuxi': '无锡',
  'Foshan': '佛山', 'Hefei': '合肥', 'Dalian': '大连', 'Fuzhou': '福州',
  'Xiamen': '厦门', 'Harbin': '哈尔滨', 'Jinan': '济南', 'Wenzhou': '温州',
  'Nanning': '南宁', 'Changchun': '长春', 'Quanzhou': '泉州', 'Shijiazhuang': '石家庄',
  'Guiyang': '贵阳', 'Nanchang': '南昌', 'Taiyuan': '太原', 'Yantai': '烟台',
  'Jiaxing': '嘉兴', 'Nantong': '南通', 'Xuzhou': '徐州', 'Weifang': '潍坊',
  'Linyi': '临沂', 'Tangshan': '唐山', 'Baoding': '保定', 'Luoyang': '洛阳',
  'Lanzhou': '兰州', 'Haikou': '海口', 'Sanya': '三亚', 'Hohhot': '呼和浩特',
  'Urumqi': '乌鲁木齐', 'Yinchuan': '银川', 'Xining': '西宁', 'Lhasa': '拉萨',
  'Zhongshan': '中山', 'Shantou': '汕头', 'Zhanjiang': '湛江', 'Jiangmen': '江门',
  'Zhuhai': '珠海', 'Huizhou': '惠州', 'Zibo': '淄博', 'Jining': '济宁',
  'Taizhou': '台州', 'Shaoxing': '绍兴', 'Jinhua': '金华', 'Huzhou': '湖州',
  'Zhoushan': '舟山', 'Wuhu': '芜湖', 'Bengbu': '蚌埠', 'Putian': '莆田',
  'Zhangzhou': '漳州', 'Ganzhou': '赣州', 'Jiujiang': '九江', 'Yichang': '宜昌',
  'Xiangyang': '襄阳', 'Jingzhou': '荆州', 'Hengyang': '衡阳', 'Yueyang': '岳阳',
  'Changde': '常德', 'Zhuzhou': '株洲', 'Xiangtan': '湘潭', 'Mianyang': '绵阳',
  'Nanchong': '南充', 'Yibin': '宜宾', 'Zunyi': '遵义', 'Qujing': '曲靖',
  'Dali': '大理', 'Lijiang': '丽江', 'Guilin': '桂林', 'Liuzhou': '柳州',
  'Beihai': '北海', 'Baotou': '包头', 'Ordos': '鄂尔多斯', 'Kashgar': '喀什',
  'Kowloon': '九龙'
};

const translateCityName = (name: string) => {
  return cityTranslations[name] || name;
};

const VISITED_COUNTRIES = ['CN', 'JP', 'FR'];
const TRAVEL_ROUTES = [
  { startLat: 39.9042, startLng: 116.4074, endLat: 35.6762, endLng: 139.6503, name: '北京 -> 东京' },
  { startLat: 35.6762, startLng: 139.6503, endLat: 48.8566, endLng: 2.3522, name: '东京 -> 巴黎' }
];
const VISITED_CITIES = [
  { lat: 39.9042, lng: 116.4074, name: '北京', date: '2023-05-01', image: 'https://picsum.photos/seed/beijing/100/100' },
  { lat: 35.6762, lng: 139.6503, name: '东京', date: '2023-08-15', image: 'https://picsum.photos/seed/tokyo/100/100' },
  { lat: 48.8566, lng: 2.3522, name: '巴黎', date: '2024-02-10', image: 'https://picsum.photos/seed/paris/100/100' }
];

const getPolygonAltitude = (d: any) => VISITED_COUNTRIES.includes(d.properties.ISO_A2) ? 0.015 : 0.005;
const getPolygonCapColor = (d: any) => VISITED_COUNTRIES.includes(d.properties.ISO_A2) ? 'rgba(251, 191, 36, 0.25)' : 'rgba(0, 0, 0, 0)';
const getPolygonSideColor = (d: any) => VISITED_COUNTRIES.includes(d.properties.ISO_A2) ? 'rgba(251, 191, 36, 0.1)' : 'rgba(0, 0, 0, 0)';
const getPolygonStrokeColor = () => 'rgba(255, 255, 255, 0.8)';
const getArcStartLat = (d: any) => d.startLat;
const getArcStartLng = (d: any) => d.startLng;
const getArcEndLat = (d: any) => d.endLat;
const getArcEndLng = (d: any) => d.endLng;
const getArcColor = () => '#fbbf24';
const getRingColor = () => '#fbbf24';
const getLabelLat = (d: any) => d.lat;
const getLabelLng = (d: any) => d.lng;
const getLabelText = (d: any) => d.name;
const getLabelColor = () => 'rgba(255, 255, 255, 0.95)';

interface MapScreenProps {
  onNavigate: (screen: string) => void;
}

export default function MapScreen({ onNavigate }: MapScreenProps) {
  const [showCapsule, setShowCapsule] = useState(false);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('3d');
  const [countries, setCountries] = useState({ features: [] });
  const [allCities, setAllCities] = useState<any[]>([]);
  const [countryLabels, setCountryLabels] = useState<any[]>([]);
  const [focusedCountryCities, setFocusedCountryCities] = useState<any[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [powerSaving, setPowerSaving] = useState(false);
  
  const [lodLevel, setLodLevel] = useState<'high' | 'medium' | 'low'>('high');
  const lodLevelRef = useRef<'high' | 'medium' | 'low'>('high');

  const htmlElements = useMemo(() => {
    return [...focusedCountryCities, ...VISITED_CITIES.map(c => ({ ...c, isPhoto: true }))];
  }, [focusedCountryCities]);

  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedCity((prev: any) => ({ ...prev, image: event.target.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    Promise.all([
      fetchWithCache('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson'),
      fetchWithCache('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_populated_places_simple.geojson')
    ]).then(([countriesData, citiesData]) => {
      const processedCountries = {
        ...countriesData,
        features: countriesData.features.map((feat: any) => {
          const [[minLng, minLat], [maxLng, maxLat]] = geoBounds(feat);
          const area = (maxLng - minLng) * (maxLat - minLat);
          return { ...feat, properties: { ...feat.properties, bboxArea: area } };
        })
      };
      setCountries(processedCountries);
      setAllCities(citiesData.features);

      const labels = processedCountries.features.map((feat: any) => {
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

  const handleGlobeClick = useCallback(({ lat, lng }: { lat: number, lng: number }) => {
    if (!globeRef.current) return;
    const currentAlt = globeRef.current.pointOfView().altitude;
    
    if (currentAlt > 1.5) {
      // Zoom to country
      globeRef.current.pointOfView({ lat, lng, altitude: 0.8 }, 1000);
    } else if (currentAlt > 0.5) {
      // Zoom to city
      globeRef.current.pointOfView({ lat, lng, altitude: 0.4 }, 1000);
    } else {
      // Reset
      globeRef.current.pointOfView({ lat, lng, altitude: 2.5 }, 1000);
      setShowCapsule(false);
      setFocusedCountryCities([]);
    }
  }, []);

  const handleCityClick = useCallback(async (d: any) => {
    if (globeRef.current) {
      // Use a slightly higher altitude (0.35) for better texture quality while still zooming into the region,
      // and a longer duration (1500ms) for a smoother transition.
      globeRef.current.pointOfView({ lat: d.lat, lng: d.lng, altitude: 0.35 }, 1500);
    }
    setSelectedCity(d);
    setTimeout(() => setShowCapsule(true), 1200);
    
    try {
      const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${d.lat}&longitude=${d.lng}&localityLanguage=zh`);
      const data = await res.json();
      const betterName = data.city || data.locality || data.principalSubdivision;
      if (betterName && betterName !== d.name) {
        setSelectedCity((prev: any) => prev?.lat === d.lat ? { ...prev, name: betterName } : prev);
      }
    } catch (e) {
      console.error('Failed to fetch city name', e);
    }
  }, []);

  const handlePolygonClick = useCallback((polygon: any, event: any, { lat, lng }: any) => {
    const iso = polygon.properties.ISO_A2;
    const countryCities = allCities
      .filter(c => c.properties.iso_a2 === iso)
      .sort((a, b) => b.properties.pop_max - a.properties.pop_max)
      .slice(0, 15)
      .map(c => ({
        lat: c.geometry.coordinates[1],
        lng: c.geometry.coordinates[0],
        name: translateCityName(c.properties.name),
        isCity: true
      }));
    setFocusedCountryCities(countryCities);

    const [cLng, cLat] = geoCentroid(polygon);
    const [[minLng, minLat], [maxLng, maxLat]] = geoBounds(polygon);
    
    const lngDiff = maxLng - minLng;
    const latDiff = maxLat - minLat;
    const maxDiff = Math.max(lngDiff, latDiff);
    
    let altitude = maxDiff / 40;
    if (altitude < 0.3) altitude = 0.3;
    if (altitude > 1.5) altitude = 1.5;

    globeRef.current.pointOfView({ lat: cLat, lng: cLng, altitude }, 1000);
  }, [allCities]);

  const handleZoom = useCallback(({ altitude }: { altitude: number }) => {
    let newLevel: 'high' | 'medium' | 'low' = 'high';
    if (altitude <= 0.8) newLevel = 'low';
    else if (altitude <= 1.5) newLevel = 'medium';
    
    if (newLevel !== lodLevelRef.current) {
      lodLevelRef.current = newLevel;
      setLodLevel(newLevel);
    }
  }, []);

  const visiblePolygons = useMemo(() => {
    if (!countries.features) return [];
    if (lodLevel === 'high') {
      return countries.features.filter((f: any) => f.properties.bboxArea > 50 || VISITED_COUNTRIES.includes(f.properties.ISO_A2));
    } else if (lodLevel === 'medium') {
      return countries.features.filter((f: any) => f.properties.bboxArea > 5 || VISITED_COUNTRIES.includes(f.properties.ISO_A2));
    }
    return countries.features;
  }, [countries.features, lodLevel]);

  const visibleLabels = useMemo(() => {
    if (lodLevel === 'high') {
      return countryLabels.filter((l: any) => VISITED_COUNTRIES.includes(l.iso));
    }
    return countryLabels;
  }, [countryLabels, lodLevel]);

  const htmlElement = useCallback((d: any) => {
    const el = document.createElement('div');
    el.setAttribute('data-city-id', `${d.lat},${d.lng}`);
    if (d.isPhoto) {
      el.innerHTML = `
        <div style="transform: translate(-50%, -100%); pointer-events: auto; cursor: pointer; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);" class="city-marker is-photo hover:scale-110 group z-10">
          <div class="city-marker-bg" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(4px); padding: 3px; border-radius: 8px; box-shadow: 0 8px 20px rgba(0,0,0,0.4); position: relative; border: 2px solid #fbbf24; transition: all 0.3s;">
            <img src="${d.image}" class="city-marker-img" style="width: 36px; height: 36px; border-radius: 4px; object-fit: cover; transition: all 0.3s;" referrerPolicy="no-referrer" />
            <div class="city-marker-arrow" style="position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid #fbbf24; transition: all 0.3s;"></div>
          </div>
        </div>
      `;
      el.onclick = () => handleCityClick(d);
    } else {
      el.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; transform: translate(-50%, -50%); pointer-events: auto; cursor: pointer; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);" class="city-marker hover:scale-110 group z-10">
          <span class="city-marker-bg" style="font-size: 11px; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); padding: 2px 6px; border-radius: 6px; color: rgba(255,255,255,0.95); border: 1px solid rgba(255,255,255,0.2); white-space: nowrap; box-shadow: 0 4px 6px rgba(0,0,0,0.3); display: flex; align-items: center; gap: 4px; font-family: serif; letter-spacing: 0.05em; transition: all 0.3s;">
            <span class="city-marker-text">${d.name}</span>
          </span>
          <div class="city-marker-dot" style="width: 6px; height: 6px; background: #fbbf24; border-radius: 50%; margin-top: 4px; box-shadow: 0 0 10px rgba(251,191,36,0.8); border: 1px solid rgba(255,255,255,0.8); transition: all 0.3s;"></div>
        </div>
      `;
      el.onclick = () => handleCityClick(d);
    }
    return el;
  }, [handleCityClick]);

  return (
    <div className={`bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-serif min-h-screen flex flex-col overflow-hidden max-w-md mx-auto shadow-2xl relative lod-${lodLevel}`}>
      
      {/* Dynamic styles for selected city */}
      <style>
        {`
          /* LOD Styles */
          .lod-high .city-marker-text { display: none !important; }
          .lod-high .city-marker-dot { transform: scale(0.6); }
          .lod-high .city-marker-img { width: 24px !important; height: 24px !important; }
          
          .lod-medium .city-marker-text { font-size: 9px !important; padding: 1px 4px !important; }
          .lod-medium .city-marker-img { width: 30px !important; height: 30px !important; }

          /* Selected City Styles */
          [data-city-id="${selectedCity?.lat},${selectedCity?.lng}"] .city-marker.is-photo {
            transform: translate(-50%, -100%) scale(1.3) !important;
            z-index: 50 !important;
          }
          [data-city-id="${selectedCity?.lat},${selectedCity?.lng}"] .city-marker:not(.is-photo) {
            transform: translate(-50%, -50%) scale(1.3) !important;
            z-index: 50 !important;
          }
          [data-city-id="${selectedCity?.lat},${selectedCity?.lng}"] .city-marker-bg {
            background: rgba(239, 68, 68, 0.95) !important;
            border-color: rgba(255,255,255,0.8) !important;
            color: #fff !important;
            box-shadow: 0 8px 24px rgba(239, 68, 68, 0.5) !important;
          }
          [data-city-id="${selectedCity?.lat},${selectedCity?.lng}"] .city-marker-text {
            font-size: 14px !important;
            font-weight: bold !important;
          }
          [data-city-id="${selectedCity?.lat},${selectedCity?.lng}"] .city-marker-dot {
            background: #ef4444 !important;
            box-shadow: 0 0 16px rgba(239, 68, 68, 0.9) !important;
            border: 2px solid #fff !important;
            width: 10px !important;
            height: 10px !important;
          }
          [data-city-id="${selectedCity?.lat},${selectedCity?.lng}"] .city-marker-img {
            width: 48px !important;
            height: 48px !important;
          }
          [data-city-id="${selectedCity?.lat},${selectedCity?.lng}"] .city-marker-arrow {
            border-top-color: #ef4444 !important;
          }
        `}
      </style>

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
                bumpImageUrl={powerSaving ? "" : "//unpkg.com/three-globe/example/img/earth-topology.png"}
                polygonsData={visiblePolygons}
                polygonAltitude={getPolygonAltitude}
                polygonCapColor={getPolygonCapColor}
                polygonSideColor={getPolygonSideColor}
                polygonStrokeColor={getPolygonStrokeColor}
                showAtmosphere={!powerSaving}
                atmosphereColor="#38bdf8"
                atmosphereAltitude={0.15}
                arcsData={TRAVEL_ROUTES}
                arcStartLat={getArcStartLat}
                arcStartLng={getArcStartLng}
                arcEndLat={getArcEndLat}
                arcEndLng={getArcEndLng}
                arcColor={getArcColor}
                arcDashLength={0.4}
                arcDashGap={0.2}
                arcDashAnimateTime={2000}
                arcAltitudeAutoScale={0.3}
                ringsData={VISITED_CITIES}
                ringColor={getRingColor}
                ringMaxRadius={2}
                ringPropagationSpeed={1}
                ringRepeatPeriod={1000}
                onPolygonClick={handlePolygonClick}
                onGlobeClick={handleGlobeClick}
                onZoom={handleZoom}
                labelsData={visibleLabels}
                labelLat={getLabelLat}
                labelLng={getLabelLng}
                labelText={getLabelText}
                labelSize={1.2}
                labelDotRadius={0.2}
                labelColor={getLabelColor}
                labelResolution={2}
                htmlElementsData={htmlElements}
                htmlElement={htmlElement}
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
          <button 
            onClick={() => setPowerSaving(!powerSaving)}
            className={`glass-panel pointer-events-auto w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-colors ${powerSaving ? 'text-green-500 bg-green-50/80 dark:bg-green-900/30' : 'text-slate-700 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50'}`}
            title="省电模式"
          >
            {powerSaving ? <Battery className="w-6 h-6" /> : <BatteryCharging className="w-6 h-6" />}
          </button>
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
              <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url("${selectedCity?.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjiySU5xf0w-u4bMu4MudixiQU2qhZLtKvXQjgGtDm5-uOWORrNW-0xjRnDYBFtZonLw1A21V3jRjYHgaliRqRiAPgTd2dmMK7nVssVnHLiuKWDO51zy0LacW27qvqwhOU0PMjO_ehjPW4pjoo21ydFXe1hKWdD9h2w-i8Xrhsmi-3lBTXckMmTNNLJdNILO-IwkH96tp-cf2uPk2Zokrc7zaN5vVLLeXWV-OGQaAPsnNoo4tC-7qJrxvTbHzE8-ONVVmcAvTcfg'}")`}}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <button onClick={() => setShowCapsule(false)} className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/40 transition-colors z-10">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 text-white">
                <h2 className="text-3xl font-bold tracking-tight font-serif">{selectedCity?.name || '未知城市'}</h2>
                <div className="flex items-center gap-1 text-white/90 text-sm font-medium mt-1 font-serif">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedCity?.date || '未记录日期'}</span>
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
                <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleImageUpload} />
                <button onClick={() => fileInputRef.current?.click()} className="group relative flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-[#E8E1D9]/30 dark:bg-white/5 hover:bg-[#D48C84]/10 transition-all duration-300 border border-transparent hover:border-[#D48C84]/20">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-white/10 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Camera className="w-6 h-6 text-[#D48C84]" />
                  </div>
                  <div className="text-center">
                    <span className="block text-slate-800 dark:text-slate-100 font-semibold text-sm font-serif">相册</span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-serif">上传照片</span>
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
