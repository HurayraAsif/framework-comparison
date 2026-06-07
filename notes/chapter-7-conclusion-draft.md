# Chapter 7: Conclusion

## 7.1 Summary of the Thesis

This thesis compared three modern web frameworks that are associated with the idea of disappearing frameworks: Astro, SvelteKit, and Qwik. The main goal was to understand how these frameworks differ in architecture, JavaScript delivery, production output, Lighthouse audit results, and developer experience when used to build the same controlled prototype application.

To make the comparison fair, the thesis used a Product Explorer prototype that was implemented separately in all three frameworks. Each implementation followed the same general requirements: a homepage, a product listing page, a product detail page, shared product data, comparable visual design, and limited client-side interactivity. The application was intentionally kept small and focused so that the evaluation could concentrate on framework behavior rather than unrelated application features.

The evaluation used four main types of evidence: production build output measurements, browser JavaScript delivery measurements from Chrome DevTools, Lighthouse desktop audit results, and qualitative developer experience scoring. These measurements were then interpreted in the discussion chapter to identify the practical strengths and trade-offs of each framework.

The results showed that no single framework was best in every category. Astro was strongest in browser JavaScript reduction and implementation simplicity for this prototype. SvelteKit provided the best overall balance between build speed, Lighthouse results, and developer experience. Qwik demonstrated a distinct architectural model based on resumability, but its benefits were less visible in this small controlled prototype.

## 7.2 Answer to Research Question 1

**RQ1: What defines disappearing frameworks, and how do they differ from traditional single-page applications?**

Disappearing frameworks can be understood as frameworks that try to reduce the visible runtime cost of the framework in the browser. Their goal is not only to help developers build applications, but also to minimize the amount of unnecessary JavaScript sent to and executed by the client.

Traditional single-page applications usually depend heavily on client-side JavaScript. They often require the browser to download, parse, execute, and hydrate a significant amount of JavaScript before the application becomes fully interactive. This can increase page weight, delay interactivity, and create performance problems, especially on slower networks or lower-end devices.

Disappearing frameworks address these problems by using strategies such as static generation, server-side rendering, islands architecture, compiler-based optimization, partial hydration, or resumability. These approaches move more work away from the browser and attempt to send only the JavaScript that is necessary for the current page or interaction.

Therefore, disappearing frameworks differ from traditional SPAs mainly in their treatment of JavaScript. Instead of assuming that the full application must run in the browser, they try to reduce client-side execution and make the framework less visible in the final user experience.

## 7.3 Answer to Research Question 2

**RQ2: How do Astro, SvelteKit, and Qwik differ architecturally?**

Astro, SvelteKit, and Qwik represent different architectural approaches to modern web development.

Astro follows a static-first model and is strongly associated with the islands architecture. In this model, pages can be generated mostly as static HTML, while interactive components can be added only where needed. This makes Astro well suited for content-focused or mostly static applications where JavaScript should be minimized.

SvelteKit is a full application framework built around Svelte’s compiler-based approach. It supports routing, components, data loading, and different rendering strategies. Instead of focusing only on zero JavaScript by default, SvelteKit provides a balanced development model for building interactive applications with a clear component structure.

Qwik follows a resumability-oriented architecture. Its goal is to avoid traditional hydration by allowing the application to resume execution in the browser when needed. This model is conceptually different from both Astro and SvelteKit because it focuses on delaying execution and making interactivity available without the same hydration process used by many JavaScript frameworks.

The comparison shows that these frameworks should not be treated as identical solutions. Astro emphasizes static-first delivery and minimal JavaScript. SvelteKit emphasizes a balanced application framework supported by compiler optimization. Qwik emphasizes resumability and delayed execution.

## 7.4 Answer to Research Question 3

**RQ3: How much JavaScript do Astro, SvelteKit, and Qwik deliver for the same controlled Product Explorer application?**

The JavaScript delivery results showed a clear difference between build output and browser-delivered JavaScript.

In the measured production output, Astro generated no separate JavaScript files for this implementation. SvelteKit generated the largest measured JavaScript output, while Qwik generated less total JavaScript output than SvelteKit. This showed that Qwik’s generated JavaScript output was smaller than SvelteKit’s in the build measurement.

However, the browser Network-tab measurements gave a more practical view of what the browser actually loaded during page visits. In these measurements, Astro loaded zero JavaScript requests on all tested routes. SvelteKit loaded JavaScript on every tested route, and Qwik also loaded JavaScript on every tested route.

This means that Astro delivered the least JavaScript to the browser in this controlled prototype. Qwik generated less JavaScript output than SvelteKit in the build results, but it did not transfer less JavaScript than SvelteKit during the measured browser page loads.

This finding is important because it shows that build output alone is not enough to evaluate JavaScript delivery. A framework may generate a smaller JavaScript output folder, but the browser may still request several JavaScript files during page loading. Therefore, both generated output and actual browser delivery must be considered.

## 7.5 Answer to Research Question 4

**RQ4: How do the frameworks compare in terms of build output, browser JavaScript delivery, and Lighthouse audit results?**

The build output comparison showed different strengths for each framework. Astro produced the smallest measured output folder. SvelteKit produced the largest measured output folder, but it also had the fastest measured build time. Qwik produced an output folder size close to Astro, but it had the longest measured build time in this prototype.

The browser JavaScript delivery comparison showed Astro as the strongest framework for JavaScript reduction in this controlled case. It loaded no separate JavaScript files on the tested routes. SvelteKit and Qwik both loaded JavaScript files during page visits.

The Lighthouse results showed that all three frameworks performed very well in the controlled desktop tests. Astro, SvelteKit, and Qwik all achieved perfect Performance and Best Practices scores across the tested routes. The main differences appeared in Accessibility and SEO. SvelteKit had the highest overall average in these two categories, Astro followed closely, and Qwik scored lower in this implementation.

The result of this research question is that each framework performed best in a different area. Astro was strongest for output simplicity and browser JavaScript reduction. SvelteKit was strongest for build time and overall Lighthouse balance. Qwik showed a modern architectural model and smaller generated JavaScript output than SvelteKit, but it did not outperform the others in browser JavaScript delivery or developer experience in this prototype.

## 7.6 Answer to Research Question 5

**RQ5: How do developer experience and implementation complexity differ between Astro, SvelteKit, and Qwik?**

The developer experience evaluation showed that Astro was the easiest framework to use for this prototype. Its static-first structure matched the Product Explorer application well. The routing, page structure, and component organization were direct and easy to understand.

SvelteKit also provided a strong developer experience. It offered clear routing, reusable components, and straightforward state handling. Search, filtering, and favorite-button behavior were comfortable to implement using Svelte’s component model.

Qwik required the most framework-specific adjustment. Its execution model, syntax, and handling of browser-only behavior required more care during implementation. The final implementation worked successfully, but the development process involved more troubleshooting and a steeper learning curve.

The conclusion for this research question is that developer experience depends strongly on application type and developer familiarity. For this small product browsing prototype, Astro provided the simplest experience, SvelteKit provided a balanced and productive experience, and Qwik required more effort because of its different architectural model.

## 7.7 Answer to Research Question 6

**RQ6: Which framework provides the best practical balance of performance, JavaScript reduction, and usability for the controlled prototype?**

For this controlled Product Explorer prototype, Astro provided the strongest practical result for JavaScript reduction and simplicity. It produced the smallest measured output folder, delivered no separate JavaScript files on the tested routes, and provided the highest developer experience score.

SvelteKit provided the best balanced full-framework experience. It had the fastest measured build time, strong Lighthouse scores, and a good developer experience. Although it delivered more JavaScript than Astro, it remained practical, clear, and productive for building the prototype.

Qwik demonstrated the most distinct architectural approach. Its resumability model is important from a framework-design perspective, and it generated less JavaScript output than SvelteKit in the build measurement. However, in this small prototype, Qwik did not show a clear advantage in browser JavaScript delivery and required more implementation effort.

Therefore, the best practical framework depends on the priority. If the main goal is to minimize browser JavaScript in a mostly static application, Astro is the strongest choice in this study. If the goal is a balanced developer experience with strong framework structure, SvelteKit is the strongest practical option. If the goal is to explore resumability and delayed execution, Qwik provides the most distinctive architectural model, although its advantages may be clearer in larger and more interactive applications.

## 7.8 Main Contributions

This thesis contributes a structured comparison of Astro, SvelteKit, and Qwik using the same controlled prototype application. Instead of comparing the frameworks only at a theoretical level, the thesis implemented the same Product Explorer application in all three frameworks and evaluated them using practical measurement categories.

The first contribution is the implementation of comparable framework prototypes. Each implementation used the same general route structure, shared product data, similar visual design, and similar functional requirements.

The second contribution is the measurement comparison. The thesis collected evidence from production build output, browser JavaScript delivery, Lighthouse audits, and developer experience scoring.

The third contribution is the interpretation of trade-offs between the frameworks. The thesis shows that disappearing-framework behavior cannot be judged by one metric alone. Build output, browser delivery, performance audits, and developer experience each reveal different aspects of framework behavior.

The fourth contribution is a practical conclusion for developers and researchers. For this prototype, Astro was strongest for JavaScript reduction, SvelteKit was strongest as a balanced development option, and Qwik represented an advanced architectural model whose benefits may require more complex applications to become fully visible.

## 7.9 Limitations

This thesis has several limitations.

First, the prototype was small. It included only a homepage, product listing page, and product detail page. Larger applications with authentication, backend communication, complex state management, and richer interactivity may produce different results.

Second, the measurements were collected on a local machine and in a local browser environment. Build times, transferred sizes, and Lighthouse scores may vary on different hardware, operating systems, browsers, Lighthouse versions, or network conditions.

Third, the Network-tab measurements were collected manually. Although the same process was followed for all frameworks, manual measurement can introduce small inconsistencies.

Fourth, the developer experience evaluation was qualitative. It was based on the implementation process of this thesis prototype and may differ for developers with different experience levels.

Fifth, the implementations were designed to be comparable, but they could not be completely identical internally. Astro, SvelteKit, and Qwik use different routing systems, component models, rendering strategies, and build tools. Therefore, some differences are caused by framework architecture and some by implementation choices.

These limitations mean that the thesis findings should be interpreted as evidence from a controlled prototype, not as universal benchmark results for all possible applications.

## 7.10 Future Work

Future research could extend this thesis in several ways.

First, the comparison could be repeated with a larger and more complex application. A future prototype could include user authentication, backend data fetching, form submission, shopping cart behavior, pagination, and more complex state management.

Second, future work could include additional performance metrics such as Time to Interactive, Interaction to Next Paint, hydration cost, CPU usage, memory usage, and energy consumption. These metrics would provide a deeper understanding of runtime behavior.

Third, the evaluation could be repeated using automated test scripts rather than manual browser measurements. This would improve repeatability and reduce the risk of manual recording differences.

Fourth, the comparison could include real deployment environments instead of local preview servers. Testing on deployed applications would make the results more realistic for production use cases.

Fifth, future research could compare more frameworks and rendering models. Additional frameworks such as Next.js, Nuxt, SolidStart, Remix, or Marko could provide a broader view of the modern web framework landscape.

Finally, future work could evaluate developer experience using multiple participants. This would make the qualitative developer experience results more reliable and less dependent on one developer’s implementation process.

## 7.11 Final Conclusion

This thesis showed that Astro, SvelteKit, and Qwik approach modern web development from different architectural perspectives. All three frameworks can be used to build the same Product Explorer prototype successfully, but they differ in JavaScript delivery, build output, Lighthouse results, and developer experience.

Astro was the clearest example of JavaScript reduction in this controlled prototype. It produced the smallest measured output folder, delivered no separate JavaScript files on the tested routes, and offered the simplest implementation experience.

SvelteKit provided the strongest balanced experience. It achieved strong Lighthouse results, had the fastest measured build time, and offered a productive development model for implementing interactive application features.

Qwik represented the most distinctive architectural approach because of its resumability model. However, in this small prototype, its advantages were less visible in browser JavaScript delivery and it required more framework-specific implementation effort.

The overall conclusion is that disappearing frameworks should not be evaluated through a single measurement. A fair comparison must consider architecture, generated output, actual browser JavaScript delivery, performance audits, and developer experience together. In this thesis prototype, Astro was strongest for JavaScript reduction, SvelteKit was strongest for balanced practical development, and Qwik showed a promising architectural direction that may be better evaluated in larger and more interactive applications.
