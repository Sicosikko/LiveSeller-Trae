import React, { useState } from "react";
import WebView from "@/components/webview/WebView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark, Globe, History, Settings } from "lucide-react";

const WebViewPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("browser");
  const [currentUrl, setCurrentUrl] = useState("https://www.google.com");
  const [bookmarks, setBookmarks] = useState([
    { id: 1, title: "Google", url: "https://www.google.com" },
    { id: 2, title: "WhatsApp Web", url: "https://web.whatsapp.com" }
  ]);
  
  const handleAddBookmark = () => {
    const title = prompt("Digite um título para o favorito:");
    if (title) {
      setBookmarks([
        ...bookmarks,
        { id: Date.now(), title, url: currentUrl }
      ]);
    }
  };
  
  const handleOpenBookmark = (url: string) => {
    setCurrentUrl(url);
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">WebView</h1>
          <p className="text-muted-foreground">
            Navegue na web sem sair da plataforma LiveSeller
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bookmark className="h-5 w-5" />
                Favoritos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {bookmarks.map(bookmark => (
                  <Button 
                    key={bookmark.id}
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => handleOpenBookmark(bookmark.url)}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    {bookmark.title}
                  </Button>
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={handleAddBookmark}
                >
                  Adicionar Favorito
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="homepage">Página Inicial</Label>
                  <Input 
                    id="homepage" 
                    defaultValue="https://www.google.com" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Permissões</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="allow-cookies" defaultChecked />
                      <Label htmlFor="allow-cookies">Permitir cookies</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="allow-popups" />
                      <Label htmlFor="allow-popups">Permitir popups</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="browser">
                <Globe className="h-4 w-4 mr-2" />
                Navegador
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="h-4 w-4 mr-2" />
                Histórico
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="browser">
              <WebView 
                initialUrl={currentUrl} 
                height={600} 
              />
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Navegação</CardTitle>
                  <CardDescription>
                    Páginas visitadas recentemente
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8 text-muted-foreground">
                    O histórico de navegação será implementado em breve.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default WebViewPage;