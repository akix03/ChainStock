'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import ProductTable from '@/components/ProductTable';
import ProductForm from '@/components/ProductForm';

export default function ProductsPage() {
  // 商品列表
  const [products, setProducts] = useState<Product[]>([]);
  // 是否打开表单
  const [isFormOpen, setIsFormOpen] = useState(false);
  // 编辑的商品
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    // 获取产品列表
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Expected an array but got:', data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  // 添加商品
  const handleAddProduct = async (product: Product) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      const newProduct = await response.json();
      setProducts([...products, newProduct]);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  // 编辑商品
  const handleEditProduct = async (product: Product) => {
    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      const updatedProduct = await response.json();
      setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
      setEditingProduct(null);
    } catch (error) {
      console.error('Failed to edit product:', error);
    }
  };

  // 删除商品
  const handleDeleteProduct = async (id: string) => {
    try {
      await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  // 返回商品管理页面
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">商品管理</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          添加商品
        </button>
      </div>

      <ProductTable
        products={products}
        onEdit={setEditingProduct}
        onDelete={handleDeleteProduct}
      />

      {(isFormOpen || editingProduct) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <ProductForm
            onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingProduct(null);
            }}
            initialData={editingProduct}
          />
        </div>
      )}
    </div>
  );
} 