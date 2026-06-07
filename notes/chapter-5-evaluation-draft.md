# Chapter 5: Evaluation

## 5.1 Introduction

This chapter presents the evaluation results of the three Product Explorer implementations developed in Astro, SvelteKit, and Qwik. Chapter 4 described how the three implementations were built and how consistency was maintained across the framework versions. This chapter now presents the measured outcomes of those implementations.

The evaluation focuses on four areas: production build output, browser JavaScript delivery, Lighthouse audit results, and developer experience. These areas were selected because the thesis compares not only final page behavior, but also generated output, browser-side JavaScript delivery, and the practical implementation effort required by each framework.

The tested routes were the homepage `/`, the product listing page `/products`, and one product detail page `/products/1`. These routes were selected because they represent the main structure of the Product Explorer prototype and were available in all three implementations.

The results in this chapter support the empirical part of the research questions, especially the questions related to JavaScript delivery, build output, performance-related audit results, and developer experience. The chapter presents the results in a descriptive form. Their broader meaning for disappearing-framework behavior is discussed in Chapter 6, and the direct answers to the research questions are provided in Chapter 7.

The measurements should be understood as results from this specific controlled prototype. They are not universal benchmark results for Astro, SvelteKit, or Qwik. However, because the same application scope, route structure, product data, and measurement procedure were used across the three implementations, the results provide a consistent basis for comparison.

## 5.2 Production Build Output

The first evaluation area was production build output. Each implementation was built locally using the same machine and the same measurement approach. Before each build measurement, the previous production output folder was removed so that old build artifacts were not included in the measured output. The production build command used for all three implementations was `npm run build`.

All three implementations completed the production build successfully.

| Framework | Build command   | Build status |
| --------- | --------------- | ------------ |
| Astro     | `npm run build` | Passed       |
| SvelteKit | `npm run build` | Passed       |
| Qwik      | `npm run build` | Passed       |

The measured build times are shown below.

| Framework |    Build time |
| --------- | ------------: |
| Astro     |  6.61 seconds |
| SvelteKit |  4.59 seconds |
| Qwik      | 11.83 seconds |

SvelteKit recorded the shortest build time in this measurement run, with 4.59 seconds. Astro completed the build in 6.61 seconds. Qwik recorded the longest build time, with 11.83 seconds. The Qwik build still completed successfully, including type checking and lint checking.

The total measured output folder sizes were also recorded.

| Framework | Output folder measured                          | Output file count |   Output size | Output size approx. |
| --------- | ----------------------------------------------- | ----------------: | ------------: | ------------------: |
| Astro     | `astro-product-explorer/dist`                   |                34 | 135,079 bytes |          131.91 KiB |
| SvelteKit | `sveltekit-product-explorer/.svelte-kit/output` |                62 | 538,105 bytes |          525.49 KiB |
| Qwik      | `qwik-product-explorer/dist`                    |                56 | 152,653 bytes |          149.08 KiB |

Astro had the smallest measured output folder, with 34 files and a total size of 135,079 bytes. Qwik had a larger measured output folder than Astro, with 56 files and 152,653 bytes. SvelteKit had the largest measured output folder, with 62 files and 538,105 bytes. The SvelteKit measurement used the `.svelte-kit/output` folder, which includes generated client and server output artifacts.

JavaScript and CSS output were measured separately to show how much of the generated output was related to browser-side assets.

| Framework | JavaScript file count | JavaScript size | JavaScript size approx. |
| --------- | --------------------: | --------------: | ----------------------: |
| Astro     |                     0 |         0 bytes |                0.00 KiB |
| SvelteKit |                    35 |   503,578 bytes |              491.78 KiB |
| Qwik      |                    35 |    96,401 bytes |               94.14 KiB |

| Framework | CSS file count |     CSS size | CSS size approx. |
| --------- | -------------: | -----------: | ---------------: |
| Astro     |              0 |      0 bytes |         0.00 KiB |
| SvelteKit |              8 | 13,038 bytes |        12.73 KiB |
| Qwik      |              1 |  5,319 bytes |         5.19 KiB |

In the measured output folders, Astro did not produce separate measured JavaScript or CSS files for this implementation. SvelteKit generated 35 JavaScript files with a total measured JavaScript size of 503,578 bytes. Qwik also generated 35 JavaScript files, but the total measured JavaScript size was 96,401 bytes. For CSS output, SvelteKit generated 8 measured CSS files, while Qwik generated 1 measured CSS file.

These results show the generated production output for the three implementations. The browser-level JavaScript delivery results are presented separately in the next section because generated output and browser-loaded output are not necessarily the same measurement.

## 5.3 Browser JavaScript Delivery

The second evaluation area was browser JavaScript delivery. This measurement records what the browser requested and transferred during page loading. It is separate from the production build output measurement because not all generated JavaScript files are necessarily loaded on every route.

The measurements were collected using the Chrome DevTools Network tab. The JavaScript filter was selected, browser cache was disabled, and each route was tested under local production-preview conditions.

| Framework | Page          | JS requests | JS transferred | Total transferred | Notes                                                  |
| --------- | ------------- | ----------: | -------------: | ----------------: | ------------------------------------------------------ |
| Astro     | `/`           |           0 |         0.0 kB |            2.7 kB | Production preview, JS filter selected, cache disabled |
| Astro     | `/products`   |           0 |         0.0 kB |           21.4 kB | Production preview, JS filter selected, cache disabled |
| Astro     | `/products/1` |           0 |         0.0 kB |            4.1 kB | Production preview, JS filter selected, cache disabled |
| SvelteKit | `/`           |           9 |        35.2 kB |           39.9 kB | Production preview, JS filter selected, cache disabled |
| SvelteKit | `/products`   |          10 |        37.4 kB |           59.3 kB | Production preview, JS filter selected, cache disabled |
| SvelteKit | `/products/1` |          10 |        37.4 kB |           43.3 kB | Production preview, JS filter selected, cache disabled |
| Qwik      | `/`           |          11 |        38.7 kB |           46.4 kB | Production preview, JS filter selected, cache disabled |
| Qwik      | `/products`   |          16 |        43.8 kB |           72.8 kB | Production preview, JS filter selected, cache disabled |
| Qwik      | `/products/1` |          14 |        40.9 kB |           49.8 kB | Production preview, JS filter selected, cache disabled |

Astro recorded 0 JavaScript requests on all three tested routes. The recorded JavaScript transfer size was also 0.0 kB for the homepage, product listing page, and product detail page.

SvelteKit recorded JavaScript requests on all tested routes. The homepage loaded 9 JavaScript requests with 35.2 kB transferred. The product listing page and product detail page each loaded 10 JavaScript requests with 37.4 kB transferred.

Qwik also recorded JavaScript requests on all tested routes. The homepage loaded 11 JavaScript requests with 38.7 kB transferred. The product listing page loaded 16 JavaScript requests with 43.8 kB transferred. The product detail page loaded 14 JavaScript requests with 40.9 kB transferred.

The Network-tab measurements show that the browser-loaded JavaScript results differed from the build-output JavaScript results. Qwik generated less total JavaScript output than SvelteKit in the build-output measurement, but Qwik recorded more JavaScript requests and slightly higher JavaScript transfer values than SvelteKit in the tested browser page loads. This distinction is relevant for the later discussion because build output and browser delivery describe different parts of framework behavior.

## 5.4 Lighthouse Audit Results

The third evaluation area was Lighthouse desktop auditing. Lighthouse was used to evaluate Performance, Accessibility, Best Practices, and SEO for the three tested routes. The audits were collected manually in Chrome DevTools using Navigation mode and Desktop device settings. Each route was tested under the same local production-preview conditions.

The route-level Lighthouse scores are shown below.

| Framework | Page          | Performance | Accessibility | Best Practices | SEO |
| --------- | ------------- | ----------: | ------------: | -------------: | --: |
| Astro     | `/`           |         100 |           100 |            100 |  90 |
| Astro     | `/products`   |         100 |            93 |            100 |  91 |
| Astro     | `/products/1` |         100 |            85 |            100 |  91 |
| SvelteKit | `/`           |         100 |           100 |            100 |  91 |
| SvelteKit | `/products`   |         100 |            93 |            100 |  92 |
| SvelteKit | `/products/1` |         100 |            90 |            100 |  92 |
| Qwik      | `/`           |         100 |            91 |            100 |  82 |
| Qwik      | `/products`   |         100 |            91 |            100 |  83 |
| Qwik      | `/products/1` |         100 |            86 |            100 |  83 |

The average Lighthouse scores across the tested routes are shown below.

| Framework | Avg. Performance | Avg. Accessibility | Avg. Best Practices | Avg. SEO |
| --------- | ---------------: | -----------------: | ------------------: | -------: |
| Astro     |           100.00 |              92.67 |              100.00 |    90.67 |
| SvelteKit |           100.00 |              94.33 |              100.00 |    91.67 |
| Qwik      |           100.00 |              89.33 |              100.00 |    82.67 |

All three implementations achieved a Performance score of 100 on all tested routes. As a result, the average Performance score was 100.00 for Astro, SvelteKit, and Qwik. All three implementations also achieved a Best Practices score of 100 on all tested routes, giving each framework an average Best Practices score of 100.00.

The Accessibility scores showed more variation. Astro recorded Accessibility scores of 100, 93, and 85 across the tested routes, resulting in an average of 92.67. SvelteKit recorded 100, 93, and 90, resulting in an average of 94.33. Qwik recorded 91, 91, and 86, resulting in an average of 89.33.

The SEO scores also varied between the implementations. Astro recorded SEO scores of 90, 91, and 91, resulting in an average of 90.67. SvelteKit recorded 91, 92, and 92, resulting in an average of 91.67. Qwik recorded 82, 83, and 83, resulting in an average of 82.67.

These Lighthouse results describe the audited behavior of the implemented prototype pages under the selected desktop test conditions. The interpretation of why the Accessibility and SEO scores differ is discussed in Chapter 6, where implementation-level factors such as metadata, semantic structure, labels, image attributes, and heading structure are considered.

## 5.5 Developer Experience Results

The fourth evaluation area was developer experience. This evaluation is qualitative rather than runtime-based. It records the practical implementation experience of building the same Product Explorer prototype in Astro, SvelteKit, and Qwik.

The developer experience evaluation considered setup difficulty, routing clarity, data handling, interactivity implementation, state handling, code readability, documentation clarity, build process, and learning curve. Each framework was scored from 1 to 5, where 1 indicates a very difficult implementation experience and 5 indicates a very smooth implementation experience.

| Framework | Developer experience score | Summary                                                                                                                                                                                                |
| --------- | -------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Astro     |                          5 | The implementation process was direct for this mostly static prototype. Routing, page generation, and build behavior were straightforward.                                                             |
| SvelteKit |                          4 | The implementation process was clear and productive. Routing and component structure were understandable, although the generated output structure and adapter-related message required interpretation. |
| Qwik      |                          3 | The implementation was completed successfully, but it required more framework-specific adjustment, especially around syntax, browser-only behavior, build warnings, and debugging.                     |

Astro received a developer experience score of 5. The project structure was easy to follow, and the implementation matched the mostly static Product Explorer requirements. The route structure, page generation, reusable components, and build process were direct for this prototype.

SvelteKit received a developer experience score of 4. Its routing model and component organization were clear, and interactive behavior was straightforward to implement using Svelte state. The main additional complexity came from interpreting the `.svelte-kit/output` structure and the adapter-related message that appeared during the build process.

Qwik received a developer experience score of 3. The final implementation worked, including routing, product listing, filtering, product detail pages, and the favorite button. However, the process required more framework-specific adjustment. The main issues were related to Qwik-specific syntax, build warnings, lint-related corrections, debugging, and careful handling of browser-only APIs such as `localStorage`.

These scores record the implementation experience for this specific prototype and developer context. They should not be interpreted as universal developer experience ratings for the frameworks. The broader meaning of these results is discussed in Chapter 6.

## 5.6 Summary

This chapter presented the evaluation results for the Astro, SvelteKit, and Qwik implementations of the Product Explorer prototype. The results were organized around four areas: production build output, browser JavaScript delivery, Lighthouse audit results, and developer experience.

The production build output results recorded differences in build time, output folder size, JavaScript output, and CSS output. SvelteKit had the shortest measured build time, Astro had the smallest measured output folder, and Qwik had a smaller measured JavaScript output than SvelteKit.

The browser JavaScript delivery results recorded the JavaScript requests and transfer sizes observed in the Chrome DevTools Network tab. Astro recorded 0 JavaScript requests on all tested routes. SvelteKit and Qwik both recorded JavaScript requests on all tested routes, with Qwik recording a higher number of JavaScript requests than SvelteKit in this measurement.

The Lighthouse audit results recorded high scores across the tested implementations. Performance and Best Practices were 100 for all frameworks and routes. Differences were visible mainly in Accessibility and SEO.

The developer experience results recorded different levels of implementation effort. Astro received the highest score in this prototype, followed by SvelteKit and Qwik. These scores reflect the implementation process of the controlled Product Explorer application and are interpreted further in the next chapter.

The purpose of this chapter was to present the measured and recorded results in a structured form. Chapter 6 discusses what these results mean for the comparison of disappearing-framework behavior, and Chapter 7 uses the results to answer the research questions directly.
