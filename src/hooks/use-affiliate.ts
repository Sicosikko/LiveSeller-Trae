
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/contexts/AppContext';
import { v4 as uuidv4 } from 'uuid';

// Types for affiliate system
interface AffiliateStats {
  visitors: number;
  conversions: number;
  conversionRate: number;
  earnings: number;
  pendingPayments: number;
  totalPaid: number;
}

interface Referral {
  id: string;
  email: string;
  createdAt: string;
  status: 'active' | 'trial' | 'pending' | 'cancelled';
  plan: string;
  commission: number;
}

interface PaymentMethod {
  id: string;
  type: 'pix' | 'bank' | 'wallet';
  name: string;
  details: string;
  isDefault: boolean;
}

interface Payout {
  id: string;
  date: string;
  method: string;
  status: 'completed' | 'pending' | 'processing';
  amount: number;
}

// Mock data for demo purposes
const defaultStats: AffiliateStats = {
  visitors: 0,
  conversions: 0,
  conversionRate: 0,
  earnings: 0,
  pendingPayments: 0,
  totalPaid: 0
};

const mockReferrals: Referral[] = [];
const mockPaymentMethods: PaymentMethod[] = [];
const mockPayouts: Payout[] = [];

export function useAffiliate() {
  const { toast } = useToast();
  const { isConnected, user } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingReferrals, setIsLoadingReferrals] = useState(false);
  const [isLoadingPayments, setIsLoadingPayments] = useState(false);
  const [isAffiliate, setIsAffiliate] = useState(false);
  const [affiliateId, setAffiliateId] = useState('');
  const [affiliateStats, setAffiliateStats] = useState<AffiliateStats>(defaultStats);
  const [referrals, setReferrals] = useState<Referral[]>(mockReferrals);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [payouts, setPayouts] = useState<Payout[]>(mockPayouts);
  const [pendingBalance, setPendingBalance] = useState(0);
  
  // Load affiliate data
  useEffect(() => {
    const loadAffiliateData = async () => {
      try {
        setIsLoading(true);
        
        // In a real implementation, this would fetch data from Supabase
        // For demo purposes, we'll simulate a delay and check localStorage
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const storedAffiliateStatus = localStorage.getItem('affiliate-status');
        const isAffiliateUser = storedAffiliateStatus === 'active';
        
        if (isAffiliateUser) {
          const storedAffiliateId = localStorage.getItem('affiliate-id') || generateAffiliateId();
          const storedStats = JSON.parse(localStorage.getItem('affiliate-stats') || 'null');
          
          setIsAffiliate(true);
          setAffiliateId(storedAffiliateId);
          
          if (storedStats) {
            setAffiliateStats(storedStats);
          } else {
            // Generate random stats for demo
            const randomStats = {
              visitors: Math.floor(Math.random() * 100),
              conversions: Math.floor(Math.random() * 20),
              conversionRate: parseFloat((Math.random() * 10).toFixed(1)),
              earnings: parseFloat((Math.random() * 1000).toFixed(2)),
              pendingPayments: parseFloat((Math.random() * 500).toFixed(2)),
              totalPaid: parseFloat((Math.random() * 2000).toFixed(2))
            };
            
            setAffiliateStats(randomStats);
            localStorage.setItem('affiliate-stats', JSON.stringify(randomStats));
          }
          
          setPendingBalance(parseFloat((Math.random() * 500).toFixed(2)));
        }
        
      } catch (error) {
        console.error('Error loading affiliate data:', error);
        toast({
          title: 'Erro ao carregar dados',
          description: 'Não foi possível carregar seus dados de afiliado',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (isConnected) {
      loadAffiliateData();
    } else {
      setIsLoading(false);
    }
  }, [isConnected, toast]);
  
  // Generate affiliate ID
  const generateAffiliateId = () => {
    const id = uuidv4().split('-')[0];
    localStorage.setItem('affiliate-id', id);
    return id;
  };
  
  // Become an affiliate
  const becomeAffiliate = async () => {
    try {
      // In a real implementation, this would create an affiliate record in Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newAffiliateId = generateAffiliateId();
      
      // Create initial stats
      const initialStats = {
        visitors: 0,
        conversions: 0,
        conversionRate: 0,
        earnings: 0,
        pendingPayments: 0,
        totalPaid: 0
      };
      
      // Save to localStorage for demo purposes
      localStorage.setItem('affiliate-status', 'active');
      localStorage.setItem('affiliate-stats', JSON.stringify(initialStats));
      
      setIsAffiliate(true);
      setAffiliateId(newAffiliateId);
      setAffiliateStats(initialStats);
      
      toast({
        title: 'Parabéns!',
        description: 'Você agora é um afiliado do LiveSeller.'
      });
      
    } catch (error) {
      console.error('Error becoming affiliate:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível processar sua solicitação',
        variant: 'destructive'
      });
    }
  };
  
  // Load referrals
  const loadReferrals = async () => {
    try {
      setIsLoadingReferrals(true);
      
      // In a real implementation, this would fetch data from Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate some mock referrals for demo
      const mockReferralData: Referral[] = [];
      
      if (isAffiliate && affiliateStats.conversions > 0) {
        for (let i = 0; i < affiliateStats.conversions; i++) {
          const plans = ['Básico', 'Pro', 'Enterprise'];
          const statuses: Array<'active' | 'trial' | 'pending' | 'cancelled'> = ['active', 'trial', 'pending', 'cancelled'];
          const randomPlan = plans[Math.floor(Math.random() * plans.length)];
          const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
          const randomCommission = parseFloat((Math.random() * 100).toFixed(2));
          
          mockReferralData.push({
            id: uuidv4(),
            email: `usuario${Math.floor(Math.random() * 1000)}@example.com`,
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            status: randomStatus,
            plan: randomPlan,
            commission: randomCommission
          });
        }
      }
      
      setReferrals(mockReferralData);
      
    } catch (error) {
      console.error('Error loading referrals:', error);
    } finally {
      setIsLoadingReferrals(false);
    }
  };
  
  // Load payment methods and history
  const loadPayments = async () => {
    try {
      setIsLoadingPayments(true);
      
      // In a real implementation, this would fetch data from Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock payment methods
      const mockMethodsData: PaymentMethod[] = [
        {
          id: '1',
          type: 'pix',
          name: 'PIX',
          details: 'Chave PIX: email@exemplo.com',
          isDefault: true
        },
        {
          id: '2',
          type: 'bank',
          name: 'Transferência Bancária',
          details: 'Banco 123 • Ag: 0001 • CC: 12345-6',
          isDefault: false
        }
      ];
      
      // Mock payment history
      const mockPayoutsData: Payout[] = [];
      
      if (isAffiliate && affiliateStats.totalPaid > 0) {
        for (let i = 0; i < 3; i++) {
          const randomAmount = parseFloat((Math.random() * 300).toFixed(2));
          const randomDate = new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString();
          const methods = ['PIX', 'Transferência Bancária'];
          const randomMethod = methods[Math.floor(Math.random() * methods.length)];
          
          mockPayoutsData.push({
            id: uuidv4(),
            date: randomDate,
            method: randomMethod,
            status: 'completed',
            amount: randomAmount
          });
        }
      }
      
      setPaymentMethods(mockMethodsData);
      setPayouts(mockPayoutsData);
      
    } catch (error) {
      console.error('Error loading payments data:', error);
    } finally {
      setIsLoadingPayments(false);
    }
  };
  
  // Create affiliate link
  const createAffiliateLink = (slug: string, type: string) => {
    try {
      // In a real implementation, this would create a record in Supabase
      
      toast({
        title: 'Link criado com sucesso',
        description: `Seu link personalizado foi criado e está pronto para uso.`
      });
      
    } catch (error) {
      console.error('Error creating affiliate link:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível criar o link',
        variant: 'destructive'
      });
    }
  };
  
  // Add payment method
  const addPaymentMethod = () => {
    // In a real implementation, this would open a modal to add payment details
    
    toast({
      title: 'Funcionalidade em desenvolvimento',
      description: 'Esta funcionalidade estará disponível em breve.'
    });
  };
  
  // Load referrals and payments when affiliate status changes
  useEffect(() => {
    if (isAffiliate && !isLoading) {
      loadReferrals();
      loadPayments();
    }
  }, [isAffiliate, isLoading]);
  
  return {
    isLoading,
    isLoadingReferrals,
    isLoadingPayments,
    isAffiliate,
    affiliateId,
    affiliateStats,
    referrals,
    paymentMethods,
    payouts,
    pendingBalance,
    becomeAffiliate,
    createAffiliateLink,
    addPaymentMethod
  };
}
