// 商品类型
export interface Product {
  id: string;    // 商品ID
  name: string;  // 商品名称
  code: string;  // 商品编号
  category: string; // 商品分类
  price: number; // 商品价格
  stock: number; // 商品库存
}

// 商品表单数据类型
export interface ProductFormData {
  name: string; // 商品名称
  code: string; // 商品编号
  category: string; // 商品分类
  price: number; // 商品价格
  stock: number; // 商品库存

} 