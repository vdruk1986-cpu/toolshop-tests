import { test, expect } from "@playwright/test";


interface Product { id: string; name: string; price: number }
const laptop: Product = { id: '1', name: 'Laptop', price: 999.99 };
const phone: Product = { id: '2', name: 'Phone', price: 499.99 };
const tablet: Product = { id: '3', name: 'Tablet', price: 299.99 };

const products: Product[] = [laptop, phone, tablet];
    
function getProductsCheaperThan(price: number): Product[] {
  return products.filter((product: Product) => product.price < price);
}



test('returns products cheaper than price', () => {
  expect(getProductsCheaperThan(500)).toEqual([phone, tablet]);
});


test('excludes product with price equal to limit 299.99', () => {
  expect(getProductsCheaperThan(299.99)).toEqual([]);
});

test('returns empty list when nothing is cheaper than 300.00', () => {
  expect(getProductsCheaperThan(300.00)).toEqual([tablet]);
});