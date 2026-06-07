# Network JavaScript Results

## Purpose

This file records browser-level JavaScript delivery measurements for the three Product Explorer implementations: Astro, SvelteKit, and Qwik.

The purpose of this file is to document the measured Network-tab evidence used later in the evaluation chapter. This file focuses on measured browser requests and transferred data. Broader interpretation is kept for the evaluation chapter.

## Measurement Method

The measurements were collected manually using the Chrome DevTools Network tab.

The following method was used:

1. Start the production preview server for one framework implementation.
2. Open the tested route in Chrome.
3. Open Chrome DevTools and select the Network tab.
4. Disable browser cache.
5. Select the JavaScript filter.
6. Reload the tested route.
7. Record the number of JavaScript requests and the transferred JavaScript size shown in the Network tab.
8. Repeat the same process for all tested routes and frameworks.

The tested routes were:

| Route         | Description          |
| ------------- | -------------------- |
| `/`           | Homepage             |
| `/products`   | Product listing page |
| `/products/1` | Product detail page  |

The measurements were collected using local production preview builds. Browser cache was disabled during the measurements.

## Network JavaScript Results

| Framework | Page          | JS requests | JS transferred | Total transferred | Notes                                                          |
| --------- | ------------- | ----------: | -------------: | ----------------: | -------------------------------------------------------------- |
| Astro     | `/`           |           0 |         0.0 kB |            2.7 kB | Production preview, JavaScript filter selected, cache disabled |
| Astro     | `/products`   |           0 |         0.0 kB |           21.4 kB | Production preview, JavaScript filter selected, cache disabled |
| Astro     | `/products/1` |           0 |         0.0 kB |            4.1 kB | Production preview, JavaScript filter selected, cache disabled |
| SvelteKit | `/`           |           9 |        35.2 kB |           39.9 kB | Production preview, JavaScript filter selected, cache disabled |
| SvelteKit | `/products`   |          10 |        37.4 kB |           59.3 kB | Production preview, JavaScript filter selected, cache disabled |
| SvelteKit | `/products/1` |          10 |        37.4 kB |           43.3 kB | Production preview, JavaScript filter selected, cache disabled |
| Qwik      | `/`           |          11 |        38.7 kB |           46.4 kB | Production preview, JavaScript filter selected, cache disabled |
| Qwik      | `/products`   |          16 |        43.8 kB |           72.8 kB | Production preview, JavaScript filter selected, cache disabled |
| Qwik      | `/products/1` |          14 |        40.9 kB |           49.8 kB | Production preview, JavaScript filter selected, cache disabled |

## Observations

Astro did not load separate JavaScript files on any of the three tested routes. The measured JavaScript request count was 0 for the homepage, product listing page, and product detail page.

SvelteKit loaded JavaScript on all tested routes. The homepage loaded 9 JavaScript requests, while the product listing page and product detail page each loaded 10 JavaScript requests.

Qwik also loaded JavaScript on all tested routes. The product listing page had the highest measured JavaScript request count among the tested Qwik routes, with 16 JavaScript requests.

In this Network-tab measurement, Astro transferred the least JavaScript because no separate JavaScript files were loaded. SvelteKit and Qwik both transferred JavaScript during page loading. Qwik transferred slightly more JavaScript than SvelteKit on the tested routes in this implementation.

## Notes

The Astro Network measurement was repeated after reloading each route with the JavaScript filter active and browser cache disabled. This was done to ensure that the recorded Astro result reflected the actual page-load behavior under the selected Network-tab conditions.

These measurements should be interpreted as local browser-level measurements for the controlled Product Explorer thesis prototype. They are not universal benchmark results for Astro, SvelteKit, or Qwik.

The same product dataset, similar route structure, comparable visual design, and similar functional requirements were used across all three implementations to support a fair comparison.
