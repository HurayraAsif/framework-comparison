# Developer Experience Notes

## Astro

### Setup difficulty

Astro project setup was straightforward using the official project creation command. The minimal template was selected to avoid unnecessary starter code.

### Routing clarity

Astro routing was clear for the required pages. The homepage was implemented with `index.astro`, the product listing page with `products.astro`, and product detail pages with `products/[id].astro`.

### Data loading clarity

The local JSON dataset was imported directly into Astro pages. This was simple and suitable for the controlled Product Explorer application.

### Interactivity implementation

Static rendering was straightforward, but the search/filter functionality required extra attention because the first implementation only changed the URL and did not filter products correctly. A client-side script was added to make search and category filtering work directly in the browser.

### State handling

The favorite button was implemented as a local interactive component. This fulfilled the required local state interaction for the experimental application.

### Code readability

The Astro code is readable because page structure, components, and styling are separated in a clear way.

### Documentation quality

Astro’s project structure and routing model were understandable. Extra care was needed for client-side interactivity inside an otherwise static page.

### Build process

The production build completed successfully. The build generated static pages for the product listing and product detail routes.

### Learning curve

Astro was manageable for the Product Explorer application. The main learning point was understanding when static Astro markup is enough and when client-side JavaScript is required.

## SvelteKit

### Setup difficulty

SvelteKit project setup was straightforward using the official Svelte CLI. The minimal template was selected to avoid unnecessary demo code and to keep the implementation controlled.

### Routing clarity

SvelteKit routing was clear for the required route structure. The homepage was implemented with `src/routes/+page.svelte`, the product listing page with `src/routes/products/+page.svelte`, and the product detail page with `src/routes/products/[id]/+page.svelte`

### Data loading clarity

The local JSON dataset was placed inside `src/lib/data/products.json` and imported directly into the required pages. This made the data source easy to reuse without introducing external API dependency.

### Interactivity implementation

Search and category filtering were implemented directly on the client side using Svelte state. Compared with the Astro implementation, the interactive filtering behavior felt more direct because Svelte automatically updates the visible product list when state values change.

### State handling

The favorite button was implemented using local client-side state and localStorage. This fulfilled the required local interaction without adding backend persistence or unnecessary application complexity.

### Code readability

The SvelteKit implementation was readable because routes, reusable components, and global styling were separated clearly. Product cards and the favorite button were implemented as reusable Svelte components.

### Documentation quality

The SvelteKit route structure and component model were understandable after the project was created. The main implementation work involved mapping the required application routes and features into the SvelteKit file structure.

### Build process

The production build completed successfully. The preview server also worked correctly, and the homepage, product listing page, filtering behavior, product detail pages, and favorite interaction were verified.

### Learning curve

SvelteKit was manageable for the Product Explorer application. The main learning point was understanding the relationship between route files, component files, and reactive client-side state.

## Qwik

### Routing clarity

Qwik routing was understandable after inspecting the project structure. The homepage was implemented with `src/routes/index.tsx`, the product listing page with `src/routes/products/index.tsx`, and the product detail page with `src/routes/products/[id]/index.tsx`.

### Data loading clarity

The local JSON dataset was copied into the Qwik project and imported directly into the route components. This made the shared product data reusable without requiring a backend API.

### State handling

Client-side search and category filtering were implemented with Qwik signals. The favorite button used localStorage to preserve selected products across browser sessions. This fulfilled the required local interaction without adding backend persistence or unnecessary application complexity.

### Code readability

The Qwik implementation became readable after separating the layout, product card, favorite button, product listing page, and product detail page into separate files. The main complexity came from Qwik-specific syntax and client-side state handling.

### Documentation quality

The Qwik project setup was understandable, but some framework-specific details required extra attention, especially route structure, component imports, signal usage, and build behavior. After these issues were fixed, the implementation process became manageable.

### Build process

The Qwik build required more troubleshooting than Astro and SvelteKit. Initial errors came from unsupported imports, lint issues, and styling mismatches. After replacing unsupported imports, fixing component code, and aligning the UI structure with the Astro and SvelteKit versions, the final build passed successfully.

Qwik final build and local preview passed.

### Learning curve

Qwik had the highest learning curve among the three implementations so far because its routing structure, signal-based state handling, and resumability-oriented model required more adjustment. However, once the project structure was clear, the Product Explorer application could be implemented with the same core features as the Astro and SvelteKit versions.

## Implementation Checkpoint

Astro, SvelteKit, and Qwik were implemented using the same Product Explorer application requirements. All three implementations use the same dataset, same product images, same route structure, same main features, and no external UI libraries.

Final route structure:

- /
- /products
- /products/[id]

Final feature set:

- Homepage
- Product listing from local JSON data
- Search input
- Category filtering
- Product detail page
- Favorite button using local state/localStorage
- Shared visual structure using simple CSS

Final build and preview status:

- Astro: passed
- SvelteKit: passed
- Qwik: passed
