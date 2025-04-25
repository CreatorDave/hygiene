import axios from 'axios';

const BASE_URL = 'https://world.openfoodfacts.org';

// Types for Open Food Facts API responses
export interface Product {
  code: string;
  product_name: string;
  brands?: string;
  nutrition_grades?: string;
  ingredients_analysis_tags?: string[];
  allergens_tags?: string[];
  labels_tags?: string[];
  additives_n?: number;
  image_small_url?: string;
  nutriments?: {
    fiber_100g?: number;
    sugars_100g?: number;
    [key: string]: any;
  };
}

interface SearchResponse {
  products: Product[];
}

// Simple in-memory cache
const cache: Record<string, Product[]> = {};

/**
 * Fetch products by a free-text search query
 */
export async function searchProductsByName(query: string): Promise<Product[]> {
  const cacheKey = `search_${query}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const url = `${BASE_URL}/cgi/search.pl?search_terms=${encodeURIComponent(query)}` +
              `&search_simple=1&action=process&json=1&page_size=20`;

  try {
    const response = await axios.get<SearchResponse>(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'HealthShopApp - React - Version 1.0'
      }
    });
    const products = response.data.products || [];
    cache[cacheKey] = products;
    return products;
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

/**
 * Fetch products high in fiber
 */
export async function getHighFiberProducts(): Promise<Product[]> {
  const cacheKey = 'highFiber';
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const url = `${BASE_URL}/api/v2/search?` +
              `fiber_100g%3E=5&fields=code,product_name,brands,nutrition_grades,` +
              `ingredients_analysis_tags,allergens_tags,labels_tags,image_small_url,additives_n,nutriments` +
              `&page_size=10`;

  try {
    const response = await axios.get<SearchResponse>(url);
    const products = response.data.products || [];
    cache[cacheKey] = products;
    return products;
  } catch (error) {
    console.error('Error fetching high fiber products:', error);
    return [];
  }
}

/**
 * Fetch products low in sugar
 */
export async function getLowSugarProducts(): Promise<Product[]> {
  const cacheKey = 'lowSugar';
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const url = `${BASE_URL}/api/v2/search?` +
              `sugars_100g%3C=5&fields=code,product_name,brands,nutrition_grades,` +
              `ingredients_analysis_tags,allergens_tags,labels_tags,image_small_url,additives_n,nutriments` +
              `&page_size=10`;

  try {
    const response = await axios.get<SearchResponse>(url);
    const products = response.data.products || [];
    cache[cacheKey] = products;
    return products;
  } catch (error) {
    console.error('Error fetching low sugar products:', error);
    return [];
  }
}

/**
 * Fetch products with omega-3
 */
export async function getOmega3Products(): Promise<Product[]> {
  const cacheKey = 'omega3';
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  try {
    const products = await searchProductsByName('omega 3');
    const omegaProducts = products.filter(p => {
      const name = p.product_name?.toLowerCase() || '';
      const ingredients = p.ingredients_analysis_tags?.join(' ')?.toLowerCase() || '';
      return name.includes('omega') || ingredients.includes('omega');
    });
    cache[cacheKey] = omegaProducts;
    return omegaProducts;
  } catch (error) {
    console.error('Error fetching omega-3 products:', error);
    return [];
  }
} 