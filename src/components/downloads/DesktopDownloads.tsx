
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Computer } from "lucide-react";

const DesktopDownloads: React.FC = () => {
  const desktopApps = [
    {
      platform: "Windows",
      icon: "🪟",
      version: "1.0.0",
      fileName: "LiveSeller-Setup-1.0.0.exe",
      size: "68.5 MB",
      requirements: "Windows 10 ou superior",
      url: "https://downloads.liveseller.com/desktop/windows/LiveSeller-Setup-1.0.0.exe"
    },
    {
      platform: "macOS",
      icon: "🍎",
      version: "1.0.0",
      fileName: "LiveSeller-1.0.0.dmg",
      size: "72.3 MB",
      requirements: "macOS 10.15 (Catalina) ou superior",
      url: "https://downloads.liveseller.com/desktop/macos/LiveSeller-1.0.0.dmg"
    },
    {
      platform: "Linux",
      icon: "🐧",
      version: "1.0.0",
      fileName: "LiveSeller-1.0.0.AppImage",
      size: "65.8 MB",
      requirements: "Principais distribuições Linux",
      url: "https://downloads.liveseller.com/desktop/linux/LiveSeller-1.0.0.AppImage"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Aplicativos para Desktop</h2>
        <p className="text-muted-foreground">
          Instale o LiveSeller diretamente em seu computador para uma experiência completa
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {desktopApps.map((app) => (
          <Card key={app.platform} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{app.icon}</span>
                  <span>{app.platform}</span>
                </CardTitle>
                <Badge variant="outline">{app.version}</Badge>
              </div>
              <CardDescription>{app.requirements}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{app.fileName}</span>
                <span>{app.size}</span>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 p-3">
              <Button className="w-full gap-2" size="sm" asChild>
                <a href={app.url} download>
                  <Download className="h-4 w-4" />
                  <span>Download para {app.platform}</span>
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="rounded-lg border bg-card p-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <Computer className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Por que baixar o aplicativo desktop?</h3>
            <ul className="text-sm space-y-1 text-muted-foreground list-disc pl-5">
              <li>Receba notificações mesmo quando o navegador estiver fechado</li>
              <li>Acesso rápido diretamente de sua área de trabalho</li>
              <li>Melhor desempenho para grandes volumes de mensagens</li>
              <li>Funciona mesmo quando sua internet estiver instável</li>
              <li>Recursos integrados ao sistema operacional</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopDownloads;
