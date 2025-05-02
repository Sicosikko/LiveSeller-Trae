
import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, ShoppingBag } from "lucide-react";
import { Product, ProductCategory } from "@/services/catalog/productService";

interface ProductFormProps {
  product: Product | null;
  categories: ProductCategory[];
  onSave: (product: Partial<Product>) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  product, 
  categories,
  onSave, 
  onCancel 
}) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Partial<Product>>({
    defaultValues: product || {
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      category: categories.length > 0 ? categories[0]?.id || 'default' : 'default', // Ensure we have a default non-empty value
      inStock: true,
      sku: '',
    }
  });

  // Set up form values for Select components that don't work directly with register
  React.useEffect(() => {
    if (product) {
      setValue('category', product.category || 'default'); // Ensure non-empty value
      setValue('inStock', product.inStock);
    }
  }, [product, setValue]);

  const watchInStock = watch('inStock');

  const onSubmit = (data: Partial<Product>) => {
    onSave({
      ...data,
      id: product?.id, // Keep the ID if editing
      price: Number(data.price) // Ensure price is a number
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar
          </Button>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" /> 
            {product ? 'Editar Produto' : 'Novo Produto'}
          </CardTitle>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Produto *</Label>
              <Input 
                id="name" 
                {...register("name", { required: "Nome é obrigatório" })}
                error={!!errors.name}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">SKU/Código *</Label>
              <Input 
                id="sku" 
                {...register("sku", { required: "SKU é obrigatório" })}
                error={!!errors.sku}
              />
              {errors.sku && (
                <p className="text-sm text-destructive">{errors.sku.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$) *</Label>
              <Input 
                id="price" 
                type="number"
                step="0.01"
                min="0"
                {...register("price", { 
                  required: "Preço é obrigatório",
                  min: { value: 0, message: "Preço deve ser maior que zero" }
                })}
                error={!!errors.price}
              />
              {errors.price && (
                <p className="text-sm text-destructive">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria *</Label>
              <Select 
                value={watch('category')} 
                onValueChange={value => setValue('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.length > 0 ? (
                    categories.map(category => (
                      <SelectItem key={category.id} value={category.id || 'default'}>
                        {category.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="default">Categoria Padrão</SelectItem>
                  )}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-destructive">{errors.category.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea 
              id="description" 
              {...register("description")}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL da Imagem</Label>
            <Input 
              id="imageUrl" 
              type="url"
              {...register("imageUrl")}
              placeholder="https://..."
            />
            <p className="text-xs text-muted-foreground">
              Insira uma URL válida de imagem para o produto
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="inStock"
              checked={watchInStock}
              onCheckedChange={value => setValue('inStock', value)}
            />
            <Label htmlFor="inStock">Produto em estoque</Label>
          </div>

          {product && (
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                ID: {product.id}<br />
                Criado em: {new Date(product.createdAt).toLocaleString()}<br />
                Última atualização: {new Date(product.updatedAt).toLocaleString()}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={onCancel}>Cancelar</Button>
          <Button type="submit" className="gap-2">
            <Save className="h-4 w-4" />
            Salvar Produto
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProductForm;
