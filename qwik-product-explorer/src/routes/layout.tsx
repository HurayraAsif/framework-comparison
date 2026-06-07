import { component$, Slot } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <header class="site-header">
        <nav class="nav">
          <Link href="/" class="brand">
            Product Explorer
          </Link>

          <div class="nav-links">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
          </div>
        </nav>
      </header>

      <main class="main-content">
        <Slot />
      </main>
    </>
  );
});
