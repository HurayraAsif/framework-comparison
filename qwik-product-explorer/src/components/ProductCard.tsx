import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { Product } from "~/types";

interface ProductCardProps {
  product: Product;
}

export default component$<ProductCardProps>(({ product }) => {
  return (
    <article class="product-card">
      <div class="product-card-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div class="product-card-content">
        <h2>{product.name}</h2>
        <p class="category">{product.category}</p>
        <p class="description">{product.description}</p>

        <div class="product-meta">
          <span class="rating">★ {product.rating}</span>
          <span class="price">${product.price.toFixed(2)}</span>
        </div>

        <Link href={`/products/${product.id}`} class="view-details">
          View Details
        </Link>
      </div>
    </article>
  );
});
