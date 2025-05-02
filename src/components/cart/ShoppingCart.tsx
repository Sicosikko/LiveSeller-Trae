import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart as ShoppingCartIcon, Trash2, Plus, Minus, Check, ShoppingBag } from "lucide-react";
import { CartItem, ShoppingCart as ShoppingCartType, shoppingCartService } from "@/services/cart/shoppingCartService";
import { Product, productService } from "@/services/catalog/productService";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const ShoppingCart: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [cart, setCart] = useState<ShoppingCartType | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (user?.id) {
      loadCart();
      loadProducts();
    }
  }, [user?.id]);

  const loadCart = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    const cartData = await shoppingCartService.getActiveCart(user.id);
    setCart(cartData);
    setLoading(false);
  };

  const loadProducts = async () => {
    const productsData = await productService.getProducts();
    setProducts(productsData.filter(p => p.inStock));
  };

  const handleAddToCart = async () => {
    if (!cart || !selectedProduct || quantity <= 0) return;
    
    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;
    
    try {
      await shoppingCartService.addToCart(
        cart.id,
        product.id,
        quantity,
        product.price
      );
      
      toast("Produto adicionado", {
        description: `${quantity}x ${product.name} adicionado ao carrinho.`
      });
      
      setSelectedProduct("");
      setQuantity(1);
      loadCart();
    } catch (error) {
      toast("Erro", {
        description: "Ocorreu um erro ao adicionar o produto ao carrinho."
      });
    }
  };

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await handleRemoveItem(itemId);
      return;
    }
    
    try {
      await shoppingCartService.updateItemQuantity(itemId, newQuantity);
      loadCart();
    } catch (error) {
      toast("Erro", {
        description: "Ocorreu um erro ao atualizar a quantidade."
      });
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await shoppingCartService.removeFromCart(itemId);
      toast("Item removido", {
        description: "Item removido do carrinho."
      });
      loadCart();
    } catch (error) {
      toast("Erro", {
        description: "Ocorreu um erro ao remover o item."
      });
    }
  };

  const handleClearCart = async () => {
    if (!cart) return;
    
    try {
      await shoppingCartService.clearCart(cart.id);
      toast("Carrinho esvaziado", {
        description: "Carrinho esvaziado com sucesso."
      });
      loadCart();
    } catch (error) {
      toast("Erro", {
        description: "Ocorreu um erro ao esvaziar o carrinho."
      });
    }
  };

  const handleCheckout = async () => {
    if (!cart) return;
    
    try {
      await shoppingCartService.completeCart(cart.id);
      toast("Pedido finalizado", {
        description: "Seu pedido foi finalizado com sucesso!"
      });
      loadCart();
    } catch (error) {
      toast("Erro", {
        description: "Ocorreu um erro ao finalizar o pedido."
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCartIcon className="h-5 w-5" /> 
          Carrinho de Compras
        </CardTitle>
        <CardDescription>
          Gerencie os itens no carrinho do cliente
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="space-y-2 col-span-1 md:col-span-2">
            <label className="text-sm font-medium">Produto</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">Selecione um produto</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} - R$ {product.price.toFixed(2)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <div className="w-20">
              <label className="text-sm font-medium">Qtd</label>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
            </div>
            <Button 
              onClick={handleAddToCart}
              disabled={!selectedProduct || quantity <= 0}
              className="flex-1 self-end"
            >
              <Plus className="h-4 w-4 mr-1" />
              Adicionar
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Preço Unit.</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead className="w-[80px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Carregando carrinho...
                  </TableCell>
                </TableRow>
              ) : !cart || cart.items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <ShoppingBag className="h-10 w-10 text-muted-foreground opacity-20" />
                      <p>O carrinho está vazio</p>
                      <p className="text-sm text-muted-foreground">
                        Adicione produtos utilizando o formulário acima
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                cart.items.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-medium">{item.product?.name || "Produto"}</div>
                      {item.product?.sku && (
                        <div className="text-xs text-muted-foreground">
                          SKU: {item.product.sku}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>R$ {item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
              
              {cart && cart.items.length > 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-semibold">
                    Total:
                  </TableCell>
                  <TableCell className="font-semibold">
                    R$ {cart.total.toFixed(2)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      
      {cart && cart.items.length > 0 && (
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleClearCart}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Esvaziar carrinho
          </Button>
          <Button 
            onClick={handleCheckout}
            className="gap-2"
          >
            <Check className="h-4 w-4" />
            Finalizar Pedido
            <Badge className="ml-2 bg-white text-primary">
              R$ {cart.total.toFixed(2)}
            </Badge>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ShoppingCart;
