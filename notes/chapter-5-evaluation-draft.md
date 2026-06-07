# Chapter 5: Evaluation

## 5.1 Introduction

This chapter presents the evaluation results of the three Product Explorer implementations developed in Astro, SvelteKit, and Qwik. The evaluation is based on the same controlled application scenario, the same local JSON dataset, the same route structure, and comparable functional requirements. The tested routes were the homepage `/`, the product listing page `/products`, and one product detail page `/products/1`.

The purpose of this chapter is to compare how the three implementations behaved after completion. The evaluation focuses on four areas: production build output, browser JavaScript delivery, Lighthouse audit results, and developer experience. These areas were selected because disappearing frameworks are concerned not only with final page performance, but also with reducing unnecessary client-side JavaScript, simplifying rendering output, and maintaining practical development usability.

The results should be interpreted as findings from this specific thesis prototype. They do not represent universal benchmark results for Astro, SvelteKit, or Qwik. However, because the same application specification and measurement procedure were applied to all three implementations, the results provide useful evidence for comparing framework behavior under controlled conditions.

## 5.2 Production Build Output Evaluation

The first evaluation area was production build output. Each implementation was built locally using the same machine and the same measurement approach. Before each build measurement, the previous production output folder was removed to avoid measuring old build artifacts. The build command used for all three implementations was `npm run build`.

All three implementations completed the production build successfully.

| Framework | Build command   | Build status |
| --------- | --------------- | ------------ |
| Astro     | `npm run build` | Passed       |
| SvelteKit | `npm run build` | Passed       |
| Qwik      | `npm run build` | Passed       |

The measured build times were as follows.

| Framework |    Build time |
| --------- | ------------: |
| Astro     |  6.61 seconds |
| SvelteKit |  4.59 seconds |
| Qwik      | 11.83 seconds |

SvelteKit had the fastest measured build time at 4.59 seconds. Astro completed in 6.61 seconds, while Qwik had the longest build time at 11.83 seconds. The Qwik build completed successfully, including type checking and lint checking, but required more time than the other two implementations in this run.

The total measured output folder sizes were also different across the frameworks.

| Framework | Output folder measured                          | Output file count |   Output size | Output size approx. |
| --------- | ----------------------------------------------- | ----------------: | ------------: | ------------------: |
| Astro     | `astro-product-explorer/dist`                   |                34 | 135,079 bytes |          131.91 KiB |
| SvelteKit | `sveltekit-product-explorer/.svelte-kit/output` |                62 | 538,105 bytes |          525.49 KiB |
| Qwik      | `qwik-product-explorer/dist`                    |                56 | 152,653 bytes |          149.08 KiB |

Astro produced the smallest measured output folder, with 34 files and a total size of 135,079 bytes. Qwik produced a slightly larger output folder, with 56 files and 152,653 bytes. SvelteKit produced the largest measured output folder, with 62 files and 538,105 bytes. This difference is partly related to the structure of SvelteKit’s `.svelte-kit/output` folder, which includes generated client and server output artifacts.

The JavaScript and CSS build output were measured separately.

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

Astro did not produce separate measured JavaScript or CSS files in the `dist` folder for this implementation. This result reflects the mostly static nature of the Astro implementation. SvelteKit generated the largest JavaScript output, with 35 JavaScript files and 503,578 bytes. Qwik generated the same number of JavaScript files as SvelteKit, but the total measured JavaScript size was much smaller at 96,401 bytes.

Overall, Astro produced the smallest and simplest measured production output. SvelteKit had the fastest build time but the largest generated output. Qwik produced a smaller JavaScript output than SvelteKit, but had the longest measured build time.

## 5.3 Browser JavaScript Delivery Evaluation

The second evaluation area was browser JavaScript delivery. This measurement is different from build output measurement because it shows what the browser actually requested and transferred during page loading. A framework may generate many JavaScript files during build, but not all generated files are necessarily loaded on every route.

The measurements were collected using the Chrome DevTools Network tab. The JavaScript filter was selected, browser cache was disabled, and each tested route was loaded under local production-preview conditions.

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

Astro loaded no separate JavaScript files on any of the three tested routes. The JavaScript request count was 0 for the homepage, product listing page, and product detail page. This was the clearest JavaScript-delivery difference in the experiment and reflects Astro’s static-first behavior in this specific implementation.

SvelteKit loaded JavaScript on all tested routes. The homepage loaded 9 JavaScript requests with 35.2 kB transferred. The product listing page and product detail page each loaded 10 JavaScript requests with 37.4 kB transferred. This indicates a consistent client-side JavaScript payload across the tested SvelteKit pages.

Qwik also loaded JavaScript on all tested routes. The homepage loaded 11 JavaScript requests with 38.7 kB transferred. The product listing page loaded 16 JavaScript requests with 43.8 kB transferred, while the product detail page loaded 14 JavaScript requests with 40.9 kB transferred.

The browser-level result is important because Qwik generated less total JavaScript output than SvelteKit in the build output measurement, but transferred slightly more JavaScript than SvelteKit during the tested page loads. This shows that build output size and browser-delivered JavaScript are separate measurements. For this reason, both build-level and Network-tab measurements are needed for a fairer evaluation.

Overall, Astro delivered the least browser JavaScript in this prototype. SvelteKit and Qwik both delivered client-side JavaScript for the tested routes, with Qwik showing a higher number of JavaScript requests and slightly higher transferred JavaScript size in this specific implementation.

## 5.4 Lighthouse Evaluation

The third evaluation area was Lighthouse desktop auditing. Lighthouse was used to measure Performance, Accessibility, Best Practices, and SEO for the three tested routes. The audits were collected manually in Chrome DevTools using Navigation mode and Desktop device settings. Each route was tested three times, and the results were stable across repeated runs.

The average Lighthouse scores across the tested routes are shown below.

| Framework | Avg. Performance | Avg. Accessibility | Avg. Best Practices | Avg. SEO |
| --------- | ---------------: | -----------------: | ------------------: | -------: |
| Astro     |           100.00 |              92.67 |              100.00 |    90.67 |
| SvelteKit |           100.00 |              94.33 |              100.00 |    91.67 |
| Qwik      |           100.00 |              89.33 |              100.00 |    82.67 |

All three implementations achieved an average Performance score of 100.00. This means that Lighthouse Performance did not separate the frameworks in this controlled desktop test. The application was small, used local data, and had limited interaction complexity, so this result should not be interpreted as proof that the frameworks would perform identically in larger production applications.

All three implementations also achieved an average Best Practices score of 100.00. This indicates that the tested pages did not trigger major Lighthouse best-practice warnings during the repeated desktop audits.

The main differences appeared in Accessibility and SEO. SvelteKit achieved the highest average Accessibility score at 94.33 and the highest average SEO score at 91.67. Astro followed closely, with an average Accessibility score of 92.67 and an average SEO score of 90.67. Qwik had lower average scores in these two categories, with 89.33 for Accessibility and 82.67 for SEO.

These differences are likely connected to implementation-level details such as page metadata, semantic structure, image attributes, button labeling, link text, and heading structure. Therefore, the Lighthouse results should not be interpreted as evidence that one framework is inherently more accessible or more SEO-friendly than another. Instead, they show how the current implementations behaved under the same audit conditions.

Overall, Lighthouse confirmed that all three implementations performed very well in Performance and Best Practices. The more useful differences appeared in Accessibility and SEO, where SvelteKit scored highest overall, Astro remained close, and Qwik showed lower results in this prototype.

## 5.5 Developer Experience Evaluation

The fourth evaluation area was developer experience. Unlike the previous measurements, developer experience is not a runtime metric. It is a qualitative assessment based on the process of implementing the same Product Explorer application in Astro, SvelteKit, and Qwik.

The evaluation considered setup difficulty, routing clarity, data handling, interactivity implementation, state handling, code readability, documentation clarity, build process, and learning curve. Each framework was scored from 1 to 5, where 1 indicates a very difficult experience and 5 indicates a very smooth experience.

| Framework | Developer experience score | Summary                                                                                                                                                                     |
| --------- | -------------------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Astro     |                          5 | The simplest and most stable implementation experience for this prototype. Static routing, page generation, and build behavior were straightforward.                        |
| SvelteKit |                          4 | Good developer experience with clear routing and component structure. Some build/output behavior required interpretation because of adapter-auto and `.svelte-kit/output`.  |
| Qwik      |                          3 | Functional in the end, but more difficult during implementation. Extra friction came from Qwik-specific syntax, client-side behavior, build warnings, and debugging issues. |

Astro received the highest developer-experience score. Its project structure was easy to understand, and the implementation matched the mostly static Product Explorer requirements naturally. The routing, page generation, and build behavior were straightforward for this prototype.

SvelteKit also provided a good developer experience. Its routing model was clear, reusable components were easy to organize, and client-side interactivity was straightforward to implement using Svelte state. The main additional complexity came from interpreting the generated `.svelte-kit/output` structure and the adapter-auto warning. The warning did not prevent a successful build, but it indicated that a specific deployment adapter would be needed for a real production target.

Qwik required the most troubleshooting during implementation. The final application worked correctly, including routing, product listing, search, category filtering, product detail pages, and the favorite button. However, implementation required more framework-specific adjustment. Issues included Qwik-specific syntax, build warnings, lint-related corrections, and careful handling of browser-only APIs such as `localStorage`.

The lower Qwik developer-experience score does not mean that Qwik is generally weak. It reflects the implementation experience of this specific prototype. Qwik uses a different mental model around resumability, signals, and client-side execution. For this small application, that mental model made implementation less direct than Astro and SvelteKit.

Overall, Astro provided the smoothest development process for this prototype, SvelteKit offered a balanced and productive experience, and Qwik required the most framework-specific adjustment.

## 5.6 Summary

This chapter evaluated the Product Explorer implementations across four areas: production build output, browser JavaScript delivery, Lighthouse results, and developer experience.

The production build output results showed that Astro produced the smallest measured output folder. SvelteKit had the fastest build time but generated the largest measured output. Qwik generated less total JavaScript than SvelteKit, but had the longest measured build time.

The browser Network tab results showed that Astro delivered no separate JavaScript files on the tested pages. SvelteKit and Qwik both delivered JavaScript on all tested routes. In this prototype, Qwik transferred slightly more JavaScript than SvelteKit during page loading, even though its total generated JavaScript output was smaller.

The Lighthouse results showed that all three frameworks achieved perfect Performance and Best Practices scores under the tested desktop conditions. Differences appeared mainly in Accessibility and SEO. SvelteKit achieved the highest average scores in these categories, Astro followed closely, and Qwik scored lower in this implementation.

The developer-experience evaluation showed that Astro was the easiest implementation for this prototype, followed by SvelteKit and Qwik. This result is important because framework comparison should consider not only technical output, but also the practical effort required to implement and maintain the application.

Overall, Astro showed the strongest result for JavaScript reduction in this controlled prototype. SvelteKit provided the strongest balance of build speed, Lighthouse scores, and developer experience. Qwik demonstrated a smaller generated JavaScript output than SvelteKit, but its browser JavaScript transfer was not lower in this specific implementation and its development process required more framework-specific troubleshooting.

The next chapter discusses these findings in relation to the research question and the broader concept of disappearing frameworks.
