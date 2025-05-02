
class DeviceManager {
  private deviceId: string;

  constructor() {
    this.deviceId = this.getDeviceId();
  }

  getDeviceId(): string {
    // Verificar se já existe um deviceId no localStorage
    let deviceId = localStorage.getItem('whatzapp_device_id');
    
    // Se não existir, criar um novo
    if (!deviceId) {
      deviceId = `device_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
      localStorage.setItem('whatzapp_device_id', deviceId);
    }
    
    return deviceId;
  }
  
  getPlatformInfo(): object {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isElectron = /Electron/i.test(navigator.userAgent);
    const isWhatzAppMobile = /WhatzAppMobile/i.test(navigator.userAgent);
    const isWhatzAppElectron = /WhatzAppElectron/i.test(navigator.userAgent);
    
    // Check for standalone mode in a cross-browser compatible way
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches || 
      // Safari specific property
      (window.navigator as any).standalone === true;
    
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      isMobile,
      isElectron,
      isWhatzAppMobile,
      isWhatzAppElectron,
      isStandalone,
      language: navigator.language,
      vendor: navigator.vendor,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      devicePixelRatio: window.devicePixelRatio,
      connection: 'connection' in navigator ? 
        // @ts-ignore - Propriedade connection não está definida no tipo Navigator
        { effectiveType: navigator.connection?.effectiveType, rtt: navigator.connection?.rtt } : 
        null
    };
  }
}

export default DeviceManager;
