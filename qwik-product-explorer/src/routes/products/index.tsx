import { component$, useSignal } from "@builder.io/qwik";
import ProductCard from "~/components/ProductCard";
import productsData from "~/data/products.json";
import type { Product } from "~/types";

const products = productsData as Product[];

const categories = [
  ...new Set(products.map((product) => product.category)),
].sort();

export default component$(() => {
  const searchQuery = useSignal("");
  const activeCategory = useSignal("all");

  const filteredProducts = products.filter((product) => {
    const searchText =
      `${product.name} ${product.category} ${product.description}`.toLowerCase();
    const matchesSearch = searchText.includes(
      searchQuery.value.toLowerCase().trim(),
    );
    const matchesCategory =
      activeCategory.value === "all" ||
      product.category === activeCategory.value;

    return matchesSearch && matchesCategory;
  });

  return (
    <div class="products-page">
      <h1>Products</h1>

      <div class="filters-container">
        <div class="search-box">
          <input
            type="text"
            placeholder="Search products..."
            aria-label="Search products"
            value={searchQuery.value}
            onInput$={(_, element) => {
              searchQuery.value = element.value;
            }}
          />
        </div>

        <div class="category-filters" aria-label="Product categories">
          <button
            type="button"
            class={
              activeCategory.value === "all"
                ? "category-btn active"
                : "category-btn"
            }
            onClick$={() => {
              activeCategory.value = "all";
            }}
          >
            All Categories
          </button>

          {categories.map((category) => (
            <button
              key={category}
              type="button"
              class={
                activeCategory.value === category
                  ? "category-btn active"
                  : "category-btn"
              }
              onClick$={() => {
                activeCategory.value = category;
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div class="results-info">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {filteredProducts.length > 0 ? (
        <div class="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div class="no-results">
          <p>No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
});
