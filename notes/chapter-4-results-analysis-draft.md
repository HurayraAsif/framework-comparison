# Chapter 4: Results and Analysis

## 4.1 Introduction

This chapter presents the experimental results of the comparison between Astro, SvelteKit, and Qwik. The comparison is based on the controlled Product Explorer application that was implemented separately in all three frameworks. Each implementation used the same product dataset, similar page structure, similar visual design, and the same functional requirements. The tested pages were the homepage, the product listing page, and a product detail page.

The purpose of this chapter is to evaluate how the three frameworks behaved in the implemented prototype. The focus is not only on final page performance, but also on build output, browser JavaScript delivery, Lighthouse audit results, and developer experience. These areas are important because disappearing frameworks are mainly concerned with reducing unnecessary client-side JavaScript and improving the relationship between server-generated output and browser-side interactivity.

The results are organized into four main measurement areas. First, the production build output is examined to compare build time, generated output size, and JavaScript/CSS output. Second, browser Network tab observations are used to compare JavaScript delivery for the tested pages. Third, Lighthouse desktop audit results are presented for Performance, Accessibility, Best Practices, and SEO. Finally, developer experience is evaluated qualitatively based on the implementation process.

The results in this chapter should be interpreted as findings from this specific thesis prototype. They should not be treated as universal benchmark results for Astro, SvelteKit, or Qwik. However, they provide useful evidence for understanding how the frameworks behave under the same controlled implementation conditions.

## 4.2 Production Build Output Results

The first measurement area was the production build output of the three implementations. Each framework project was built locally using the same machine and the same PowerShell-based measurement approach. Before each build measurement, the previous production output folder was removed to make the build output measurement cleaner.

The build command used for all three frameworks was `npm run build`. All three implementations completed the production build successfully.

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

In this measurement run, SvelteKit had the fastest build time at 4.59 seconds. Astro completed in 6.61 seconds, while Qwik had the longest build time at 11.83 seconds. The Qwik build still completed successfully, including type checking and lint checking, but it required more time than the other two implementations.

The total output folder sizes were also measured.

| Framework | Output folder measured                          | Output file count |   Output size | Output size approx. |
| --------- | ----------------------------------------------- | ----------------: | ------------: | ------------------: |
| Astro     | `astro-product-explorer/dist`                   |                34 | 135,079 bytes |          131.91 KiB |
| SvelteKit | `sveltekit-product-explorer/.svelte-kit/output` |                62 | 538,105 bytes |          525.49 KiB |
| Qwik      | `qwik-product-explorer/dist`                    |                56 | 152,653 bytes |          149.08 KiB |

Astro produced the smallest measured output folder, with 34 files and a total size of 135,079 bytes. Qwik produced a slightly larger measured output folder with 56 files and 152,653 bytes. SvelteKit produced the largest measured output folder, with 62 files and 538,105 bytes. This difference is partly related to the structure of SvelteKit’s generated `.svelte-kit/output` folder, which contains generated client and server output artifacts.

The JavaScript and CSS output were measured separately.

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

Astro did not produce separate measured JavaScript or CSS files in the `dist` folder for this implementation. This supports the expectation that Astro can produce a highly static output when client-side interactivity is limited or not required. In this prototype, Astro generated 17 static pages and produced the smallest measured production output.

SvelteKit produced the largest JavaScript output among the three implementations. It generated 35 JavaScript files with a total measured JavaScript size of 503,578 bytes. It also produced 8 CSS files with a total size of 13,038 bytes. This does not mean that all of this output is necessarily loaded on every page, but it shows that the generated production output was larger and more complex than Astro and Qwik in this implementation.

Qwik also generated 35 JavaScript files, but the total measured JavaScript size was much smaller than SvelteKit, at 96,401 bytes. It generated one CSS file with a size of 5,319 bytes. This result is consistent with Qwik’s architecture, which emphasizes fine-grained lazy loading and resumability. However, the Qwik build time was the longest in this measurement run.

Overall, the production build output results show that Astro produced the smallest and simplest static output for this prototype. SvelteKit produced the fastest build time but the largest measured output folder and JavaScript output. Qwik produced a relatively small JavaScript output compared with SvelteKit, but required the longest build time.

## 4.3 Browser JavaScript Delivery Results

The second measurement area was browser JavaScript delivery. While the build output results show the generated files after production build, the Network tab results show what the browser actually requested and transferred during page loading. This distinction is important because a framework may generate JavaScript files during build, but not every generated file is necessarily loaded on every page.

The measurements were collected using the Chrome DevTools Network tab. The JavaScript filter was selected, browser cache was disabled, and each tested page was loaded under local production-preview conditions. The tested pages were the homepage `/`, the product listing page `/products`, and the product detail page `/products/1`.

| Framework | Page        | JS requests | JS transferred | Total transferred | Notes                                                  |
| --------- | ----------- | ----------: | -------------: | ----------------: | ------------------------------------------------------ |
| Astro     | /           |           0 |         0.0 kB |            2.7 kB | Production preview, JS filter selected, cache disabled |
| Astro     | /products   |           0 |         0.0 kB |           21.4 kB | Production preview, JS filter selected, cache disabled |
| Astro     | /products/1 |           0 |         0.0 kB |            4.1 kB | Production preview, JS filter selected, cache disabled |
| SvelteKit | /           |           9 |        35.2 kB |           39.9 kB | Production preview, JS filter selected, cache disabled |
| SvelteKit | /products   |          10 |        37.4 kB |           59.3 kB | Production preview, JS filter selected, cache disabled |
| SvelteKit | /products/1 |          10 |        37.4 kB |           43.3 kB | Production preview, JS filter selected, cache disabled |
| Qwik      | /           |          11 |        38.7 kB |           46.4 kB | Production preview, JS filter selected, cache disabled |
| Qwik      | /products   |          16 |        43.8 kB |           72.8 kB | Production preview, JS filter selected, cache disabled |
| Qwik      | /products/1 |          14 |        40.9 kB |           49.8 kB | Production preview, JS filter selected, cache disabled |

The results show a clear difference between Astro and the other two frameworks. Astro loaded no separate JavaScript files on any of the three tested pages. The JavaScript request count was 0 for the homepage, product listing page, and product detail page. This result is consistent with Astro’s static-first approach in this prototype. Because the implemented Astro pages did not require a large client-side application runtime for the tested page loads, the browser did not request separate JavaScript files.

The total transferred size for Astro was also low. The homepage transferred 2.7 kB, the product listing page transferred 21.4 kB, and the product detail page transferred 4.1 kB. The larger value for `/products` is expected because the product listing page contains more product data and image references than the homepage or a single product detail page.

SvelteKit loaded JavaScript on all tested pages. The homepage loaded 9 JavaScript requests with 35.2 kB transferred. Both `/products` and `/products/1` loaded 10 JavaScript requests, with 37.4 kB transferred. The total transferred size was 39.9 kB for `/`, 59.3 kB for `/products`, and 43.3 kB for `/products/1`. This indicates that SvelteKit delivered a consistent client-side JavaScript payload across the tested pages.

Qwik also loaded JavaScript on all tested pages. The homepage loaded 11 JavaScript requests with 38.7 kB transferred. The product listing page loaded 16 JavaScript requests with 43.8 kB transferred. The product detail page loaded 14 JavaScript requests with 40.9 kB transferred. Qwik transferred slightly more JavaScript than SvelteKit in these Network tab measurements, although its build output JavaScript size was smaller than SvelteKit’s total generated JavaScript output.

The difference between build output and browser transfer is important. Qwik generated a smaller total JavaScript output folder than SvelteKit, but the tested browser page loads still transferred a comparable or slightly larger amount of JavaScript than SvelteKit. This suggests that build output size alone is not enough to evaluate JavaScript delivery. Browser-level measurements are necessary because they show the actual request behavior during page loading.

Overall, Astro delivered the lowest amount of JavaScript in the Network tab measurements. SvelteKit and Qwik both delivered client-side JavaScript for the tested pages, with Qwik showing a higher number of JavaScript requests and slightly higher transferred JavaScript size in this specific implementation. However, these results should be interpreted within the scope of the implemented Product Explorer prototype and not as universal framework rankings.

## 4.4 Lighthouse Results

The third measurement area was Lighthouse desktop auditing. Lighthouse was used to evaluate the tested pages across four categories: Performance, Accessibility, Best Practices, and SEO. The purpose of this measurement was to observe whether the three implementations showed measurable differences under the same local production-preview conditions.

The audits were collected manually in Chrome DevTools using Navigation mode and Desktop device settings. The selected categories were Performance, Accessibility, Best Practices, and SEO. The PWA category was not selected because progressive web application behavior was outside the scope of this thesis prototype.

| Framework | Page        | Performance | Accessibility | Best Practices | SEO |
| --------- | ----------- | ----------: | ------------: | -------------: | --: |
| Astro     | /           |         100 |           100 |            100 |  90 |
| Astro     | /products   |         100 |            93 |            100 |  91 |
| Astro     | /products/1 |         100 |            85 |            100 |  91 |
| SvelteKit | /           |         100 |           100 |            100 |  91 |
| SvelteKit | /products   |         100 |            93 |            100 |  92 |
| SvelteKit | /products/1 |         100 |            90 |            100 |  92 |
| Qwik      | /           |         100 |            91 |            100 |  82 |
| Qwik      | /products   |         100 |            91 |            100 |  83 |
| Qwik      | /products/1 |         100 |            86 |            100 |  83 |

All three implementations achieved a Performance score of 100 on all three tested pages. This result shows that, under the local production-preview conditions and with the controlled Product Explorer application, Lighthouse did not identify a performance disadvantage for any of the three frameworks. The application is small, uses local data, and has limited interactivity, so the high Performance scores should not be interpreted as proof that all three frameworks perform equally in larger real-world applications.

The Best Practices score was also 100 for all tested pages across Astro, SvelteKit, and Qwik. This indicates that the implemented pages did not trigger major Lighthouse best-practice warnings during the tested runs.

The Accessibility results showed more variation. On the homepage, Astro and SvelteKit both achieved an Accessibility score of 100, while Qwik scored 91. On the product listing page, Astro and SvelteKit scored 93, while Qwik scored 91. On the product detail page, SvelteKit achieved the highest Accessibility score with 90, followed by Qwik with 86 and Astro with 85. These differences are likely caused by small implementation-level details, such as button labeling, heading structure, image attributes, link text, and interactive control markup.

The SEO results also showed differences between the frameworks. Astro scored between 90 and 91, while SvelteKit scored between 91 and 92. Qwik scored lower, with 82 on the homepage and 83 on both product pages. This suggests that the Qwik implementation may require additional document-level metadata or SEO-related improvements to match the Astro and SvelteKit implementations more closely. However, this result reflects the current prototype implementation rather than the inherent SEO capability of Qwik as a framework.

Overall, the Lighthouse results show that all three implementations performed very well in terms of desktop Performance and Best Practices. The main differences appeared in Accessibility and SEO. These differences are useful for the thesis because they show that framework comparison should not focus only on JavaScript size or performance metrics. Implementation details such as markup quality, metadata, accessibility attributes, and page structure can also influence evaluation results.

## 4.5 Developer Experience Results

The fourth evaluation area was developer experience. Unlike the previous measurements, developer experience is not a runtime metric. It is a qualitative assessment based on the implementation process of the same Product Explorer application in Astro, SvelteKit, and Qwik.

The developer experience evaluation considered setup difficulty, routing clarity, data handling, interactivity implementation, state handling, code readability, documentation clarity, build process, and learning curve. Each framework was scored from 1 to 5, where 1 indicates a very difficult experience and 5 indicates a very smooth experience.

| Framework | Developer experience score | Summary                                                                                                                                                                     |
| --------- | -------------------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Astro     |                          5 | The simplest and most stable implementation experience for this prototype. Static routing, page generation, and build behavior were straightforward.                        |
| SvelteKit |                          4 | Good developer experience with clear routing and component structure. Some build/output behavior required interpretation because of adapter-auto and `.svelte-kit/output`.  |
| Qwik      |                          3 | Functional in the end, but more difficult during implementation. Extra friction came from Qwik-specific syntax, client-side behavior, build warnings, and debugging issues. |

Astro received the highest developer-experience score. Its project structure was easy to understand, and the implementation matched the Product Explorer requirements naturally. The application mainly consisted of static pages, a product listing page, and product detail pages. Astro handled this type of static content-oriented application structure very directly. The build process was also straightforward and generated the expected static pages successfully.

SvelteKit also provided a good developer experience. The routing model was clear, reusable components were easy to structure, and client-side interactivity was straightforward to implement using Svelte state. Compared with Astro, SvelteKit felt more application-oriented and flexible for interactive behavior. However, the generated output structure was more complex because of `.svelte-kit/output`, and the adapter-auto warning required interpretation. The warning did not prevent the build from passing, but it showed that a specific deployment adapter would be needed for an actual production deployment target.

Qwik had the most difficult implementation process in this prototype. The final application worked correctly, including routing, product listing, search, category filtering, detail pages, and the favorite button. However, more troubleshooting was required compared with Astro and SvelteKit. Initial build issues came from an unsupported import, lint errors, and Qwik-specific warnings. The implementation also required more attention when using browser-only APIs such as `localStorage`, because these must be handled carefully in a framework that supports server-side rendering and resumability.

The lower Qwik score does not mean that Qwik is generally a weak framework. Instead, it reflects the practical implementation experience of this specific prototype. Qwik introduces a different mental model, especially around resumability, signals, and client-side execution. For a small controlled application, this made the implementation less direct than Astro and SvelteKit.

Overall, Astro provided the smoothest development process for this prototype, SvelteKit offered a balanced and productive experience, and Qwik required the most framework-specific adjustment. This qualitative result is important because framework comparison is not only about final performance results. A framework must also be evaluated by how understandable, stable, and maintainable it is during development.

## 4.6 Cross-Framework Comparison

After examining the individual result areas, the findings can be compared across the three frameworks. The comparison shows that each framework had a different strength in the controlled Product Explorer prototype.

Astro produced the smallest measured output folder and delivered no separate JavaScript files in the browser Network tab for the tested pages. This was the clearest result in the experiment. Astro’s output was highly static, and the browser did not request additional JavaScript files for the homepage, product listing page, or product detail page. This makes Astro especially suitable for this type of content-oriented application where most pages can be generated statically and client-side interactivity is limited.

SvelteKit had the fastest measured build time in this run. It also achieved strong Lighthouse scores and had the highest SEO scores among the three implementations. However, SvelteKit produced the largest measured output folder and the largest generated JavaScript output in the build-output measurement. In the Network tab measurement, SvelteKit loaded JavaScript on all tested pages, but the transferred JavaScript size remained consistent across the pages.

Qwik produced a relatively small generated JavaScript output compared with SvelteKit. Its total measured JavaScript output was much lower than SvelteKit’s build JavaScript output. However, in the browser Network tab results, Qwik still loaded JavaScript on all tested pages and transferred slightly more JavaScript than SvelteKit in this specific implementation. Qwik also had the longest build time and the lowest developer-experience score in the implementation process.

The Lighthouse Performance results were identical across the three frameworks. All tested pages achieved a Performance score of 100. This shows that, for this small local prototype, Lighthouse Performance was not sensitive enough to separate the frameworks. The application was small, the data was local, and the tested pages were not computationally heavy. Therefore, the more useful differences appeared in JavaScript delivery, output structure, SEO, Accessibility, and developer experience.

The results also show that build output size and browser JavaScript transfer should not be treated as the same measurement. For example, Qwik generated much less total JavaScript than SvelteKit in the output folder, but Qwik transferred slightly more JavaScript than SvelteKit during the tested page loads. This means that both build-level and browser-level measurements are necessary for a fairer comparison.

Overall, Astro showed the strongest result for JavaScript reduction in this prototype. SvelteKit showed the smoothest balance between developer experience, build speed, and Lighthouse scores. Qwik demonstrated a smaller generated JavaScript output than SvelteKit, but its implementation was more complex and its browser transfer result was not lower in this specific experiment.

## 4.7 Discussion

The results of this experiment show that the three frameworks approach the problem of reducing client-side JavaScript in different ways. Although all three implementations used the same Product Explorer application, the measured outputs and development experience were not the same.

Astro showed the clearest JavaScript reduction in this prototype. It produced the smallest measured output folder and loaded no separate JavaScript files in the browser Network tab for the tested pages. This result is important because the application was mainly content-oriented: a homepage, product listing page, and product detail pages. For this type of application, Astro’s static-first approach fits naturally. The framework allowed the application to be generated as mostly static output without requiring a large client-side runtime during initial page loading.

SvelteKit behaved differently. It generated a larger output folder and delivered JavaScript on every tested page. However, it also had the fastest measured build time and strong Lighthouse results. The implementation process was also relatively smooth. This suggests that SvelteKit provides a practical balance between conventional full-stack application structure and frontend interactivity. In this prototype, SvelteKit did not minimize JavaScript as strongly as Astro, but it provided a clear and productive development model.

Qwik produced a smaller total generated JavaScript output than SvelteKit, but the browser Network tab showed that it still transferred JavaScript on all tested pages. In this specific implementation, Qwik transferred slightly more JavaScript than SvelteKit during page loading. This does not mean that Qwik’s resumability model is ineffective. Instead, it shows that the benefits of resumability may depend heavily on implementation details, page structure, interactivity patterns, and how the application is built. The Product Explorer prototype is small, so it may not fully expose the advantages that Qwik is designed to provide in larger or more interactive applications.

The Lighthouse results also require careful interpretation. All three frameworks achieved a Performance score of 100 on all tested pages. This means that Lighthouse Performance did not provide a meaningful separation between the frameworks in this experiment. The application was small, used local data, and was tested under local production-preview conditions. Therefore, the JavaScript delivery results and build output measurements were more useful for identifying differences than the Lighthouse Performance score alone.

The Accessibility and SEO results showed that framework choice is not the only factor that affects evaluation results. Qwik had lower SEO scores than Astro and SvelteKit, but this was likely caused by implementation-level metadata and document structure rather than the framework itself. Similarly, the Accessibility differences were likely affected by small markup decisions, such as labels, headings, image attributes, and button text. This shows that performance-focused framework comparison should still consider basic HTML quality, accessibility, and metadata.

Another important finding is that build output size and browser-delivered JavaScript are separate concerns. A framework may generate many files during build, but not all files are loaded on every page. Similarly, a smaller total JavaScript output does not automatically mean lower JavaScript transfer for a specific route. For this reason, the experiment used both build-level and browser-level measurements.

From a developer-experience perspective, Astro was the easiest framework to implement for this prototype, followed by SvelteKit and then Qwik. This result matters because a framework’s practical value is not only determined by runtime behavior. If a framework requires more debugging, more framework-specific knowledge, or more careful handling of client-side behavior, then this affects the overall development cost.

Overall, the results suggest that Astro is the strongest fit for a mostly static product-explorer application with limited client-side interactivity. SvelteKit is a strong general-purpose choice that provides a good balance between developer experience and application flexibility. Qwik is architecturally interesting and produced a smaller generated JavaScript output than SvelteKit, but in this small prototype its practical benefits were less visible and its implementation complexity was higher.

## 4.8 Summary

This chapter presented the experimental results of the Product Explorer comparison across Astro, SvelteKit, and Qwik. The results were organized around four evaluation areas: production build output, browser JavaScript delivery, Lighthouse audit results, and developer experience.

The production build output results showed clear differences between the three frameworks. Astro produced the smallest measured output folder and did not generate separate JavaScript or CSS files in the measured `dist` folder. SvelteKit had the fastest build time but produced the largest measured output folder and JavaScript output. Qwik produced a relatively small JavaScript output compared with SvelteKit, but its build time was the longest.

The browser Network tab results showed that Astro delivered no separate JavaScript files on the tested pages. SvelteKit and Qwik both delivered JavaScript on all tested routes. In this prototype, Qwik transferred slightly more JavaScript than SvelteKit during the tested page loads, even though its total generated JavaScript output was smaller.

The Lighthouse results showed that all three frameworks achieved a Performance score of 100 on the tested desktop pages. Therefore, Lighthouse Performance did not strongly distinguish the frameworks in this small local prototype. More visible differences appeared in Accessibility and SEO, where Astro and SvelteKit generally scored higher than Qwik.

The developer-experience evaluation showed that Astro was the easiest implementation for this prototype, followed by SvelteKit and Qwik. Astro matched the mostly static nature of the Product Explorer application very naturally. SvelteKit provided a clear and productive development model, while Qwik required more troubleshooting and framework-specific adjustment.

Overall, the results suggest that Astro was the strongest fit for this controlled, mostly static product-explorer prototype. SvelteKit provided a balanced general-purpose development experience with strong Lighthouse results. Qwik demonstrated a smaller generated JavaScript output than SvelteKit, but its practical advantages were less visible in this small application and its implementation process was more complex.

The next chapter discusses these findings in relation to the research question and the broader idea of disappearing frameworks.
