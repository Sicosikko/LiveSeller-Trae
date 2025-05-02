
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QRCode } from 'react-qrcode';
import { Smartphone } from "lucide-react";

// Simple QRCode component to avoid dependency issues
const QRCodeFallback: React.FC<{value: string, size: number}> = ({value, size}) => {
  return (
    <div className="w-full aspect-square bg-white flex items-center justify-center rounded-md p-4 border">
      <div className="text-center">
        <div className="text-4xl mb-2">📱</div>
        <div className="text-xs text-gray-500">QR Code para download</div>
      </div>
    </div>
  )
}

const MobileDownloads: React.FC = () => {
  const mobileApps = [
    {
      platform: "iOS",
      icon: "📱",
      version: "1.0.0",
      size: "45.2 MB",
      requirements: "iOS 14.0 ou superior",
      url: "https://apps.apple.com/app/liveseller/id000000000",
      qrValue: "https://apps.apple.com/app/liveseller/id000000000",
      badge: "/download-badges/app-store-badge.svg"
    },
    {
      platform: "Android",
      icon: "🤖",
      version: "1.0.0",
      size: "38.7 MB",
      requirements: "Android 7.0 ou superior",
      url: "https://play.google.com/store/apps/details?id=com.liveseller.app",
      qrValue: "https://play.google.com/store/apps/details?id=com.liveseller.app",
      badge: "/download-badges/google-play-badge.svg"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Aplicativos Móveis</h2>
        <p className="text-muted-foreground">
          Baixe o LiveSeller para seu smartphone ou tablet
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mobileApps.map((app) => (
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
            <CardContent className="pb-0">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3 flex justify-center">
                  <QRCodeFallback value={app.qrValue} size={120} />
                </div>
                <div className="md:w-2/3 space-y-3">
                  <div className="text-sm">
                    <div className="mb-1"><strong>Tamanho:</strong> {app.size}</div>
                    <div><strong>Compatibilidade:</strong> {app.requirements}</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button asChild variant="outline" className="w-full" size="sm">
                      <a href={app.url} target="_blank" rel="noopener noreferrer">
                        Abrir na loja de aplicativos
                      </a>
                    </Button>
                    <div className="h-10 flex items-center justify-center">
                      <img 
                        src={app.badge} 
                        alt={`Download para ${app.platform}`}
                        className="h-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 p-3 text-xs text-center">
              <p className="text-muted-foreground w-full">
                Escaneie o QR code ou clique no botão para baixar
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="rounded-lg border bg-card p-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <Smartphone className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">Recursos dos aplicativos móveis</h3>
            <ul className="text-sm space-y-1 text-muted-foreground list-disc pl-5">
              <li>Gerenciamento completo dos atendimentos em qualquer lugar</li>
              <li>Notificações em tempo real de novas mensagens</li>
              <li>Sincronização com o calendário do dispositivo</li>
              <li>Utilização da câmera para escaneamento de códigos QR</li>
              <li>Modo offline com sincronização automática</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDownloads;
