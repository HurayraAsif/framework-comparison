import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <section class="hero">
        <h1>Product Explorer</h1>
        <p>
          Discover our curated collection of workspace and office products
          designed for productivity and comfort.
        </p>
        <Link href="/products" class="btn-primary">
          Browse Products
        </Link>
      </section>

      <section class="features-section">
        <h2>Features</h2>

        <div class="features-grid">
          <div class="feature">
            <h3>Wide Selection</h3>
            <p>
              Explore 15 carefully selected products across multiple categories.
            </p>
          </div>

          <div class="feature">
            <h3>Search &amp; Filter</h3>
            <p>Find products by name, category, or description.</p>
          </div>

          <div class="feature">
            <h3>Save Favorites</h3>
            <p>Mark your favorite products and keep them for later.</p>
          </div>
        </div>
      </section>
    </>
  );
});
