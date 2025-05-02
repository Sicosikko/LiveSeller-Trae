
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.liveseller.app',
  appName: 'liveseller',
  webDir: 'dist',
  server: {
    url: 'https://app.liveseller.com?forceHideBadge=true',
    cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1E3A8A",
      androidScaleType: "CENTER_CROP"
    },
    StatusBar: {
      style: "light",
      backgroundColor: "#1E3A8A"
    }
  }
};

export default config;
