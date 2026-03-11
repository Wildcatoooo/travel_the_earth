/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import FeedScreen from './components/FeedScreen';
import DiaryDetailScreen from './components/DiaryDetailScreen';
import FootprintsScreen from './components/FootprintsScreen';
import MapScreen from './components/MapScreen';
import AchievementsScreen from './components/AchievementsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  const navigate = (screen: string) => {
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full min-h-screen bg-slate-100 dark:bg-slate-900 flex justify-center">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 min-h-screen shadow-2xl relative overflow-x-hidden">
        {currentScreen === 'login' && <LoginScreen onNavigate={navigate} />}
        {currentScreen === 'feed' && <FeedScreen onNavigate={navigate} />}
        {currentScreen === 'diary' && <DiaryDetailScreen onNavigate={navigate} />}
        {currentScreen === 'footprints' && <FootprintsScreen onNavigate={navigate} />}
        {currentScreen === 'map' && <MapScreen onNavigate={navigate} />}
        {currentScreen === 'achievements' && <AchievementsScreen onNavigate={navigate} />}
      </div>
    </div>
  );
}
