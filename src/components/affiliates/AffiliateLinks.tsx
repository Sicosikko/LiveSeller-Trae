
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAffiliate } from "@/hooks/use-affiliate";

const AffiliateLinks: React.FC = () => {
  const { toast } = useToast();
  const { affiliateId, createAffiliateLink } = useAffiliate();
  const [customSlug, setCustomSlug] = useState("");
  const [linkType, setLinkType] = useState("homepage");
  
  const baseUrl = window.location.origin;
  const defaultLink = `${baseUrl}/?ref=${affiliateId}`;
  
  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast("Link copiado!", {
      description: "O link foi copiado para a área de transferência"
    });
  };
  
  const handleCreateLink = () => {
    if (customSlug.trim() === "") {
      toast("Erro", {
        description: "Digite um slug personalizado válido"
      });
      return;
    }
    
    createAffiliateLink(customSlug, linkType);
    setCustomSlug("");
  };
  
  const predefinedLinks = [
    {
      name: "Link Padrão",
      url: defaultLink,
      description: "Redirecionamento para a página inicial"
    },
    {
      name: "Link para Planos",
      url: `${baseUrl}/pricing/?ref=${affiliateId}`,
      description: "Direciona para a página de planos"
    },
    {
      name: "Link para Demonstração",
      url: `${baseUrl}/demo/?ref=${affiliateId}`,
      description: "Direciona para a página de demonstração"
    }
  ];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Seus Links de Afiliado</CardTitle>
          <CardDescription>
            Compartilhe estes links para ganhar comissões nas vendas realizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predefinedLinks.map((link, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 border rounded-md">
                <div className="space-y-1 max-w-[70%]">
                  <p className="font-medium">{link.name}</p>
                  <p className="text-sm text-muted-foreground">{link.description}</p>
                  <p className="text-xs break-all text-muted-foreground">{link.url}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="shrink-0"
                  onClick={() => handleCopyLink(link.url)}
                >
                  <Copy className="h-4 w-4 mr-2" /> Copiar
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Criar Link Personalizado</CardTitle>
          <CardDescription>
            Crie links com URLs personalizadas para suas campanhas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="link-type">Tipo de Link</Label>
              <select
                id="link-type"
                className="w-full p-2 border rounded-md bg-background"
                value={linkType}
                onChange={(e) => setLinkType(e.target.value)}
              >
                <option value="homepage">Página Inicial</option>
                <option value="pricing">Página de Planos</option>
                <option value="features">Funcionalidades</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="custom-slug">Slug Personalizado</Label>
              <div className="flex gap-2">
                <Input
                  id="custom-slug"
                  placeholder="minha-campanha"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value)}
                />
                <Button type="button" onClick={handleCreateLink}>
                  <Plus className="h-4 w-4 mr-2" /> Criar
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Resultado: {baseUrl}/{linkType}/?ref={affiliateId}-{customSlug || "[slug]"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AffiliateLinks;
