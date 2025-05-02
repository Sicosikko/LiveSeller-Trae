import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Plus, Search, Filter, Tags, Edit, Trash2, Check } from "lucide-react";
import { Product, ProductCategory, productService } from "@/services/catalog/productService";
import ProductForm from "./ProductForm";

const ProductCatalog: React.FC = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [productsData, categoriesData] = await Promise.all([
      productService.getProducts(),
      productService.getCategories()
    ]);
    setProducts(productsData);
    setCategories(categoriesData);
    setLoading(false);
  };

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setIsAddingProduct(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsAddingProduct(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await productService.deleteProduct(productId);
      toast("Produto removido", {
        description: "O produto foi removido com sucesso do catálogo."
      });
      loadData();
    } catch (error) {
      toast("Erro", {
        description: "Ocorreu um erro ao remover o produto."
      });
    }
  };

  const handleProductSave = async (product: Partial<Product>) => {
    try {
      await productService.saveProduct(product);
      toast("Produto salvo", {
        description: "O produto foi salvo com sucesso no catálogo."
      });
      setIsAddingProduct(false);
      loadData();
    } catch (error) {
      toast("Erro", {
        description: "Ocorreu um erro ao salvar o produto."
      });
    }
  };

  const handleSaveCategory = async (name: string, description: string) => {
    try {
      await productService.saveCategory({ name, description });
      toast("Categoria criada", {
        description: "A categoria foi criada com sucesso."
      });
      loadData();
    } catch (error) {
      toast("Erro", {
        description: "Ocorreu um erro ao criar a categoria."
      });
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
                         
    const matchesCategory = filterCategory === "" || product.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (isAddingProduct) {
    return (
      <ProductForm 
        product={currentProduct} 
        categories={categories}
        onSave={handleProductSave} 
        onCancel={() => setIsAddingProduct(false)}
      />
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" /> 
            Catálogo de Produtos
          </CardTitle>
          <CardDescription>
            Gerencie seu catálogo de produtos para o WhatsApp Business
          </CardDescription>
        </div>
        <Button onClick={handleAddProduct}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Produto
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="categories">Categorias</TabsTrigger>
          </TabsList>
          <TabsContent value="products" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 pb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <span>
                      {filterCategory ? 
                        categories.find(c => c.id === filterCategory)?.name || "Categoria" 
                        : "Todas categorias"}
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_categories">Todas categorias</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id || "default"}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">Carregando produtos...</TableCell>
                    </TableRow>
                  ) : filteredProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        {searchTerm || filterCategory ? 
                          "Nenhum produto encontrado com os filtros aplicados." : 
                          "Nenhum produto cadastrado. Clique em 'Novo Produto' para adicionar."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProducts.map(product => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {product.imageUrl && (
                              <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="h-10 w-10 rounded-md object-cover"
                              />
                            )}
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {categories.find(c => c.id === product.category)?.name || "-"}
                        </TableCell>
                        <TableCell>
                          R$ {product.price.toFixed(2)}
                        </TableCell>
                        <TableCell>{product.sku}</TableCell>
                        <TableCell>
                          {product.inStock ? (
                            <Badge className="bg-green-500">Em Estoque</Badge>
                          ) : (
                            <Badge variant="outline">Esgotado</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Nova Categoria</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const name = (form.elements.namedItem("categoryName") as HTMLInputElement).value;
                    const description = (form.elements.namedItem("categoryDescription") as HTMLInputElement).value;
                    handleSaveCategory(name, description);
                    form.reset();
                  }}>
                    <div className="space-y-2">
                      <Label htmlFor="categoryName">Nome da Categoria</Label>
                      <Input id="categoryName" name="categoryName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="categoryDescription">Descrição</Label>
                      <Input id="categoryDescription" name="categoryDescription" />
                    </div>
                    <Button type="submit" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Categoria
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Tags className="h-4 w-4" /> 
                      Categorias Existentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <p>Carregando categorias...</p>
                    ) : categories.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        Nenhuma categoria cadastrada. Adicione sua primeira categoria utilizando o formulário.
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {categories.map(category => (
                          <li key={category.id} className="border p-2 rounded-md">
                            <div className="font-medium">{category.name}</div>
                            {category.description && (
                              <div className="text-sm text-muted-foreground">{category.description}</div>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProductCatalog;
