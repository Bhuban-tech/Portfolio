import { WindowManagerProvider, useWindowManager } from './context/WindowManager';
import { LoginScreen } from './components/xp/LoginScreen';
import { Desktop } from './components/xp/Desktop';
import { BootScreen } from './components/xp/BootScreen';
import { AnimatePresence } from 'framer-motion';

import { ShutdownScreen } from './components/xp/ShutdownScreen';

const BhubanBhandariOS = () => {
  const { isLoggedIn, isBooting, completeBoot, isShuttingDown } = useWindowManager();

  if (isShuttingDown) {
    return <ShutdownScreen />;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isBooting ? (
          <BootScreen key="boot" onComplete={completeBoot} />
        ) : !isLoggedIn ? (
          <LoginScreen key="login" />
        ) : (
          <Desktop key="desktop" />
        )}
      </AnimatePresence>
    </>
  );
};

function App() {
  return (
    <WindowManagerProvider>
      <BhubanBhandariOS />
    </WindowManagerProvider>
  )
}

export default App
