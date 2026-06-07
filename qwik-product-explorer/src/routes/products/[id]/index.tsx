import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import FavoriteButton from "~/components/FavoriteButton";
import productsData from "~/data/products.json";
import type { Product } from "~/types";

const products = productsData as Product[];

export default component$(() => {
  const location = useLocation();
  const product = products.find(
    (item) => item.id.toString() === location.params.id,
  );

  if (!product) {
    return (
      <div class="product-detail">
        <h1>Product not found</h1>
        <Link href="/products" class="btn-secondary">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div class="product-detail">
      <div class="breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/products">Products</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div class="detail-container">
        <div class="product-image-section">
          <img src={product.image} alt={product.name} />
        </div>

        <div class="product-details-section">
          <div class="detail-header">
            <div>
              <h1>{product.name}</h1>
              <p class="category">{product.category}</p>
            </div>

            <FavoriteButton productId={product.id} />
          </div>

          <div class="rating-price">
            <span class="rating">★ {product.rating} / 5</span>
            <span class="price">${product.price.toFixed(2)}</span>
          </div>

          <div class="description-block">
            <h2>About This Product</h2>
            <p>{product.description}</p>
          </div>

          <div class="actions">
            <Link href="/products" class="btn-secondary">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});
