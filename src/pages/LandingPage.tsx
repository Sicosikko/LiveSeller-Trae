
import React from "react";
import { Link } from "react-router-dom";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import AffiliatePromotion from "@/components/landing/AffiliatePromotion";
import PricingPlans from "@/components/pricing/PricingPlans";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DesktopDownloads from "@/components/downloads/DesktopDownloads";
import MobileDownloads from "@/components/downloads/MobileDownloads";
import LanguageSwitcher from "@/components/landing/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const LandingPage: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-primary">LiveSeller</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#home" className="text-sm">{t('landing.home')}</a>
              <a href="#features" className="text-sm">{t('landing.features')}</a>
              <a href="#pricing" className="text-sm">{t('landing.pricing')}</a>
              <a href="#affiliates" className="text-sm">{t('landing.affiliates')}</a>
              <a href="#downloads" className="text-sm">{t('landing.downloads')}</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <div className="hidden md:flex space-x-2">
              <Link to="/auth/login">
                <Button variant="outline">{t('auth.login')}</Button>
              </Link>
              <Link to="/auth/register">
                <Button>{t('auth.signUp')}</Button>
              </Link>
            </div>
            <Button variant="outline" className="md:hidden">Menu</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {t('landing.hero.title')} <span className="text-primary">WhatsApp</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('landing.hero.subtitle')}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth/register">
              <Button size="lg">{t('landing.hero.cta.primary')}</Button>
            </Link>
            <a href="#pricing">
              <Button variant="outline" size="lg">{t('landing.hero.cta.secondary')}</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center">{t('landing.features.title')}</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-background p-6 rounded-lg border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary text-xl">🤖</span>
              </div>
              <h3 className="text-xl font-medium mb-2">{t('landing.features.automated.title')}</h3>
              <p className="text-muted-foreground">
                {t('landing.features.automated.description')}
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-background p-6 rounded-lg border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary text-xl">📊</span>
              </div>
              <h3 className="text-xl font-medium mb-2">{t('landing.features.analytics.title')}</h3>
              <p className="text-muted-foreground">
                {t('landing.features.analytics.description')}
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-background p-6 rounded-lg border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary text-xl">🛒</span>
              </div>
              <h3 className="text-xl font-medium mb-2">{t('landing.features.catalog.title')}</h3>
              <p className="text-muted-foreground">
                {t('landing.features.catalog.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-background border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('landing.pricing.title')}</h2>
          <PricingPlans />
        </div>
      </section>

      {/* Affiliate Promotion Section */}
      <section id="affiliates" className="border-t">
        <AffiliatePromotion />
      </section>

      {/* Downloads Section */}
      <section id="downloads" className="py-16 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-center">{t('landing.downloads.title')}</h2>
              <p className="text-lg text-muted-foreground text-center">
                {t('landing.downloads.subtitle')}
              </p>
            </div>

            <Tabs defaultValue="desktop" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="desktop">Desktop</TabsTrigger>
                <TabsTrigger value="mobile">Mobile</TabsTrigger>
              </TabsList>
              <TabsContent value="desktop" className="pt-6">
                <DesktopDownloads />
              </TabsContent>
              <TabsContent value="mobile" className="pt-6">
                <MobileDownloads />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('landing.cta.title')}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            {t('landing.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth/register">
              <Button size="lg" variant="secondary">{t('landing.cta.primary')}</Button>
            </Link>
            <a href="#pricing">
              <Button size="lg" variant="outline" className="border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                {t('landing.cta.secondary')}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-medium mb-4">{t('landing.footer.product')}</h3>
              <ul className="space-y-2">
                <li><a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">{t('landing.footer.pricing')}</a></li>
                <li><a href="#downloads" className="text-sm text-muted-foreground hover:text-foreground">{t('landing.footer.downloads')}</a></li>
                <li><Link to="/platform-status" className="text-sm text-muted-foreground hover:text-foreground">{t('landing.footer.status')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">{t('landing.footer.resources')}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">{t('landing.footer.blog')}</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">{t('landing.footer.tutorials')}</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">{t('landing.footer.api')}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">{t('landing.footer.company')}</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">{t('landing.footer.about')}</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">{t('landing.footer.careers')}</a></li>
                <li><a href="#affiliates" className="text-sm text-muted-foreground hover:text-foreground">{t('landing.footer.affiliates')}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">{t('landing.footer.legal')}</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">{t('legal.termsOfService')}</Link></li>
                <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">{t('legal.privacyPolicy')}</Link></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">{t('landing.footer.cookies')}</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LiveSeller. {t('landing.footer.rights')}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
