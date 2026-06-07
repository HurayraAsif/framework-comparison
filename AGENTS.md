# Thesis Project Instructions for Codex

This repository is for a master thesis comparing Astro, SvelteKit, and Qwik.

Thesis topic:
A Comparative Study of Disappearing Frameworks: Astro, SvelteKit, and Qwik

The goal is to implement the same Product Explorer application in three frameworks and compare JavaScript delivery, performance, and developer experience.

## Main rule

Do not change the methodology, application scope, route structure, dataset structure, or feature list without explicit permission.

## Frameworks

The three implementations are:

- astro-product-explorer
- sveltekit-product-explorer
- qwik-product-explorer

Each framework must implement the same visible application.

## Required routes

Each implementation must use these routes:

- /
- /products
- /products/[id]

## Required features

Each implementation must include:

- Homepage
- Product list generated from local JSON data
- Search/filter input on the product listing page
- Product detail page
- Favorite button using local state
- Consistent visual layout across all three implementations

Use “favorite button”, not “counter button”.

## Shared resources

Use the shared dataset from:

shared-data/products.json

Use shared assets from:

shared-assets/

Do not create different product data for different frameworks.

## Styling rules

Use a consistent visual layout across all implementations.

Do not use large third-party UI libraries such as Material UI, Bootstrap component libraries, Tailwind UI kits, or shadcn.

Simple CSS is preferred.

The goal is not to build a beautiful commercial product. The goal is to build a controlled thesis application.

## Fairness rules

Do not optimize one framework more aggressively than the others.

Do not add extra features to one implementation.

Do not remove features from one implementation.

Do not use framework-specific shortcuts if they change the visible behavior or comparison fairness.

Framework-specific syntax and file structure are allowed, but visible functionality must remain equivalent.

## Development rules

Use npm where possible.

Run the relevant build command before saying an implementation is complete.

When changing files, explain:

1. Which files were changed
2. Why they were changed
3. How to test the change
4. Whether the change affects fairness between frameworks

## Measurement preparation

Do not run official thesis measurements until all three applications are complete and visually/functionally equivalent.

Official measurements will be done later using Lighthouse and Chrome DevTools according to the methodology chapter.
