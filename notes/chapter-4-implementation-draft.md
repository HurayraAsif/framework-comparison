# Chapter 4: Implementation

## 4.1 Introduction

This chapter describes the implementation of the Product Explorer prototype in Astro, SvelteKit, and Qwik. The purpose of the implementation was to create three comparable versions of the same application so that the frameworks could later be evaluated under controlled conditions.

The implementation focused on a small but realistic product browsing scenario. Each framework version included the same general pages, the same product data, similar visual design, and comparable user-facing functionality. This was necessary to reduce differences caused by application design and to make the later evaluation more focused on framework behavior.

The prototype was intentionally kept limited in scope. It did not include backend services, authentication, shopping cart functionality, payment features, related products, or external UI component libraries. This helped keep the implementation focused on routing, data rendering, basic interactivity, and client-side JavaScript behavior.

## 4.2 Application Requirements

The Product Explorer application was designed around a shared set of functional and structural requirements. These requirements were applied to all three framework implementations.

The application included three main routes:

| Route         | Purpose                                                             |
| ------------- | ------------------------------------------------------------------- |
| `/`           | Homepage introducing the Product Explorer application               |
| `/products`   | Product listing page with product cards and filtering functionality |
| `/products/1` | Product detail page for one selected product                        |

Each implementation had to display product information from the same dataset. The product data included attributes such as product title, category, rating, price, image reference, and description. The same dataset was used across the three implementations to avoid differences caused by different content.

The product listing page included product cards and basic filtering or search functionality. The product detail page displayed more detailed information for a selected product. A heart-style favorite button was also included to represent a small interactive feature. This feature was implemented on the client side and used browser storage behavior where needed.

The visual design was kept simple and comparable across the frameworks. The layout used a plain header/navigation structure, product cards, and responsive CSS styling. The purpose was not to create a complex commercial interface, but to create a fair and repeatable prototype for framework comparison.

## 4.3 Shared Dataset and Assets

A shared product dataset was used to keep the implementations consistent. The dataset was stored in the project structure as a JSON file and reused across the framework versions. This helped ensure that each implementation rendered the same product information.

The shared dataset supported the homepage, product listing page, and product detail page. The listing page used the dataset to display multiple products, while the detail page used the product identifier in the route to display one selected product.

Shared visual assets were also used to keep the appearance comparable. Product images were represented consistently across the implementations. The same general layout, spacing, navigation style, and product-card structure were used as far as possible within each framework.

Using shared data and similar assets was important for the fairness of the implementation. If each framework version used different content, different routes, or different visual structures, the later comparison would be less reliable. Therefore, the application scope and content were kept aligned across Astro, SvelteKit, and Qwik.

## 4.4 Astro Implementation

The Astro implementation was created as a static-first version of the Product Explorer application. Astro’s file-based routing was used to create the required pages. The homepage, product listing page, and product detail page were implemented using Astro page files and reusable components.

The Astro version used components for repeated interface elements such as product cards and the favorite button. The product listing page rendered product information from the shared dataset, and the product detail page used the selected product route to display individual product information.

Astro’s implementation style matched the mostly static nature of the prototype. Most product information could be rendered as HTML at build time. This made Astro suitable for creating a simple product browsing experience with minimal client-side behavior.

The favorite button represented the main interactive element. Because this behavior required client-side interaction, it was handled separately from the static page content. This allowed the Astro implementation to keep most of the application static while still supporting a small interactive feature.

Overall, the Astro implementation was direct and structurally simple. The framework’s static-first approach matched the prototype requirements well because the application mainly displayed product data and required only limited interactivity.

## 4.5 SvelteKit Implementation

The SvelteKit implementation was created using SvelteKit’s routing and component structure. The required pages were implemented through SvelteKit route files. The homepage, product listing page, and product detail page followed the same route structure used in the other framework versions.

Reusable Svelte components were used for interface elements such as product cards and the favorite button. The shared product data was loaded into the SvelteKit application and used to render the product listing and product detail views.

SvelteKit made the interactive parts of the prototype straightforward to implement. Search, filtering, and favorite-button behavior could be handled using Svelte’s component state and reactive structure. This allowed the interface to update clearly when users interacted with the page.

The SvelteKit version followed the same visual structure as the other implementations. The navigation, product cards, product information, and responsive layout were kept comparable to the Astro and Qwik versions.

Overall, the SvelteKit implementation provided a balanced structure for this prototype. It supported reusable components and client-side interactivity clearly, while still allowing the application to follow the same controlled requirements as the other framework versions.

## 4.6 Qwik Implementation

The Qwik implementation was created using Qwik’s component model and routing approach. The same Product Explorer pages were implemented: homepage, product listing page, and product detail page. The Qwik version used the shared product data and followed the same functional scope as the Astro and SvelteKit implementations.

Qwik components were used to organize the interface. Product cards, page layouts, and interactive elements were implemented in a way that matched the structure of the other versions. The product listing page displayed the shared product data, and the product detail page rendered information for the selected product.

The favorite button and other interactive behavior required careful handling because Qwik uses a different execution model from more traditional client-side frameworks. Browser-only APIs such as `localStorage` had to be handled in a way that respected client-side execution.

The Qwik implementation also required more framework-specific adjustment during development. Its syntax and execution model differed from the Astro and SvelteKit implementations. However, the final version fulfilled the required prototype scope and provided the same main user-facing functionality.

Overall, the Qwik implementation demonstrated how the same product browsing scenario could be built using Qwik’s resumability-oriented framework model. Although the implementation required more adjustment, it remained functionally comparable to the Astro and SvelteKit versions.

## 4.7 Implementation Consistency Across Frameworks

A major goal of the implementation phase was to keep the three framework versions as consistent as possible. This was necessary because the later evaluation depended on comparing similar applications rather than three unrelated projects.

The same main routes were implemented in all three frameworks. Each version included a homepage, a product listing page, and a product detail page. The same product dataset was used, and the visual structure was kept similar across the implementations.

The same general feature scope was also maintained. Each version displayed product information, supported a listing page, included a product detail page, and provided a small favorite-button interaction. No implementation added major extra features such as a shopping cart, authentication, backend data fetching, payment flow, or external UI library.

Some framework-specific differences were unavoidable. Astro, SvelteKit, and Qwik use different routing systems, component syntax, build outputs, and client-side execution models. Therefore, the internal implementation details were not identical. However, the user-facing application structure and functional requirements were kept as close as possible.

This consistency made it possible to use the three implementations as a controlled basis for the later evaluation. The purpose of this chapter is therefore limited to documenting the implemented application structure and the framework-specific implementation choices. The measurement results and their interpretation are presented separately in the following chapters.

## 4.8 Summary

This chapter described the implementation of the Product Explorer prototype in Astro, SvelteKit, and Qwik. The same general application requirements were applied to all three implementations, including a homepage, product listing page, product detail page, shared product data, similar visual design, and limited client-side interactivity.

The Astro implementation followed a static-first approach and matched the mostly static content structure of the prototype well. The SvelteKit implementation provided clear routing, reusable components, and straightforward state handling for interactive features. The Qwik implementation fulfilled the same application requirements while using a different framework model based on resumability and framework-specific client-side behavior.

The next chapter evaluates the completed implementations using the measurement categories defined for this thesis. This separation keeps the implementation chapter focused on how the applications were built, while the following chapter focuses on the measured outcomes.
