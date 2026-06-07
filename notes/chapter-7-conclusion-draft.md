# Chapter 7: Conclusion

## 7.1 Summary of the Thesis

This thesis compared three modern web frameworks that are associated with the idea of disappearing frameworks: Astro, SvelteKit, and Qwik. The aim was to examine how these frameworks differ in architecture, JavaScript delivery, production build output, Lighthouse audit results, and developer experience when they are used to build the same controlled prototype application.

To support a fair comparison, a Product Explorer prototype was implemented separately in all three frameworks. Each implementation followed the same application scope: a homepage, a product listing page, a product detail page, shared product data, comparable visual design, and limited client-side interactivity. This controlled structure made it possible to compare the frameworks without adding unrelated application complexity.

The evaluation was based on four categories: production build output, browser JavaScript delivery, Lighthouse desktop audit results, and developer experience scoring. The results were presented in Chapter 5 and interpreted in Chapter 6. This final chapter now summarizes the main findings, answers the research questions, identifies the contribution of the thesis, and outlines limitations and possible future work.

The findings show that no single framework was best in every category. Astro showed the clearest reduction of browser-side JavaScript and matched the mostly static prototype particularly well. SvelteKit provided the strongest general development balance, combining productive implementation, fast build time, and strong audit results. Qwik demonstrated a distinct architectural model based on resumability, although its practical advantages were less visible in this small prototype.

## 7.2 Answer to Research Question 1

**RQ1: What defines disappearing frameworks, and how do they differ from traditional single-page applications?**

Disappearing frameworks can be understood as frameworks that try to reduce the visible runtime cost of the framework in the browser. Their purpose is not only to provide a development structure, but also to reduce unnecessary client-side JavaScript and browser-side execution.

Traditional single-page applications usually depend heavily on JavaScript running in the browser. They often require the browser to download, parse, execute, and hydrate a significant amount of JavaScript before the application becomes fully interactive. This can increase page weight and create performance costs, especially on slower devices or networks.

Disappearing frameworks try to address this problem through approaches such as static generation, server-side rendering, islands architecture, compiler-based optimization, partial hydration, or resumability. These approaches move more work to build time or server-side rendering and aim to send only the JavaScript that is needed for the current page or interaction.

Therefore, the main difference between disappearing frameworks and traditional SPAs is their treatment of JavaScript. Traditional SPAs often assume that the application runs mainly in the browser, while disappearing frameworks try to make the framework less visible in the final user experience by reducing unnecessary client-side work.

## 7.3 Answer to Research Question 2

**RQ2: How do Astro, SvelteKit, and Qwik differ architecturally?**

Astro, SvelteKit, and Qwik represent different architectural approaches to modern web development.

Astro follows a static-first model and is strongly connected to the islands architecture. It can generate mostly static HTML and add client-side JavaScript only where interactive components are required. This makes Astro suitable for content-focused and mostly static applications where minimizing JavaScript is a priority.

SvelteKit is a full application framework based on Svelte’s compiler-oriented model. It provides routing, components, data handling, and different rendering options. Instead of focusing only on minimal JavaScript by default, SvelteKit offers a balanced framework structure for building interactive web applications.

Qwik follows a resumability-oriented architecture. Its goal is to avoid traditional hydration by allowing the application to resume in the browser when interaction is needed. This makes Qwik conceptually different from both Astro and SvelteKit because it focuses on delayed execution and resumability as core architectural principles.

The comparison shows that the three frameworks should not be understood as identical solutions. Astro emphasizes static-first delivery and minimal JavaScript. SvelteKit emphasizes a productive full-framework development model. Qwik emphasizes resumability and delayed JavaScript execution.

## 7.4 Answer to Research Question 3

**RQ3: How much JavaScript do Astro, SvelteKit, and Qwik deliver for the same controlled Product Explorer application?**

The JavaScript delivery results showed a clear difference between generated JavaScript output and browser-loaded JavaScript.

In the production build output measurement, Astro generated no separate measured JavaScript files for this implementation. SvelteKit generated the largest measured JavaScript output, while Qwik generated less total JavaScript output than SvelteKit.

However, the browser Network-tab measurements showed what was actually requested during page loading. In these measurements, Astro loaded no JavaScript requests on the tested routes. SvelteKit loaded JavaScript on all tested routes, and Qwik also loaded JavaScript on all tested routes.

This means that Astro delivered the least JavaScript to the browser in the controlled Product Explorer prototype. Qwik generated less JavaScript output than SvelteKit in the build-output measurement, but this did not result in lower browser JavaScript delivery during the measured page loads.

This finding is important because it shows that build output and browser delivery should be evaluated separately. A framework can generate a smaller JavaScript output folder but still load several JavaScript files in the browser. For this reason, the thesis considered both generated output and actual browser requests.

## 7.5 Answer to Research Question 4

**RQ4: How do the frameworks compare in terms of build output, browser JavaScript delivery, and Lighthouse audit results?**

The build output comparison showed different characteristics for each framework. Astro produced the smallest measured output folder. SvelteKit produced the largest measured output folder, but it also had the fastest measured build time. Qwik produced an output folder size close to Astro, but it had the longest measured build time in this prototype.

The browser JavaScript delivery comparison showed Astro as the clearest JavaScript-reduction case in this study. It loaded no separate JavaScript files on the tested routes. SvelteKit and Qwik both loaded JavaScript files during page visits.

The Lighthouse results showed that all three implementations performed very well in the tested desktop environment. Astro, SvelteKit, and Qwik achieved perfect Performance and Best Practices scores across the tested routes. Differences were mainly visible in Accessibility and SEO. SvelteKit had the highest average values in these categories, Astro followed closely, and Qwik recorded lower SEO and Accessibility values in this implementation.

The answer to this research question is therefore not a single overall winner. Astro was strongest in output simplicity and browser JavaScript reduction. SvelteKit showed the most balanced audit and build-time profile. Qwik demonstrated an advanced architectural model and smaller generated JavaScript output than SvelteKit, but it did not outperform the other implementations in browser JavaScript delivery or developer experience for this prototype.

## 7.6 Answer to Research Question 5

**RQ5: How do developer experience and implementation complexity differ between Astro, SvelteKit, and Qwik?**

The developer experience evaluation showed that Astro was the easiest framework to use for this prototype. Its static-first model matched the Product Explorer application well. The routing, page structure, component organization, and build process were direct and easy to manage.

SvelteKit also provided a strong development experience. Its routing model and component structure were clear, and interactive behavior such as search, filtering, and favorite-button functionality was comfortable to implement using Svelte’s state handling.

Qwik required the most framework-specific adjustment. Its execution model, syntax, and handling of browser-only behavior required more care during implementation. The final prototype worked successfully, but the development process involved more troubleshooting and a steeper learning curve.

The answer to this research question is that developer experience depends strongly on application type and framework familiarity. For this small product browsing prototype, Astro was the simplest to implement, SvelteKit offered a balanced and productive development model, and Qwik required more effort because of its different architectural approach.

## 7.7 Answer to Research Question 6

**RQ6: Which framework provides the best practical balance of performance, JavaScript reduction, and usability for the controlled prototype?**

For this controlled Product Explorer prototype, Astro provided the strongest result for JavaScript reduction and simplicity. It produced the smallest measured output folder, delivered no separate JavaScript files on the tested routes, and provided the highest developer experience score.

SvelteKit provided the strongest general-purpose balance. It had the fastest measured build time, strong Lighthouse results, and a productive development experience. Although it delivered more JavaScript than Astro, it remained practical and efficient for implementing the required application features.

Qwik demonstrated the most distinct architectural approach. Its resumability model is important from a framework-design perspective, and it generated less JavaScript output than SvelteKit in the build measurement. However, in this small prototype, Qwik did not show a clear advantage in browser JavaScript delivery and required more implementation effort.

The best practical choice therefore depends on the project priority. If the goal is to minimize browser JavaScript in a mostly static application, Astro is the strongest choice in this study. If the goal is a balanced framework for interactive application development, SvelteKit is the most practical option. If the goal is to explore resumability and delayed execution, Qwik provides the most distinctive architectural model, although its advantages may become clearer in larger and more interactive applications.

## 7.8 Main Contributions

This thesis contributes a structured comparison of Astro, SvelteKit, and Qwik using the same controlled prototype application. Instead of comparing the frameworks only theoretically, the thesis implemented the same Product Explorer application in all three frameworks and evaluated them using practical measurement categories.

The first contribution is the implementation of comparable framework prototypes. Each implementation used the same general route structure, shared product data, similar visual design, and similar functional requirements.

The second contribution is the measurement comparison. The thesis collected evidence from production build output, browser JavaScript delivery, Lighthouse audits, and developer experience scoring.

The third contribution is the interpretation of framework trade-offs. The thesis shows that disappearing-framework behavior cannot be evaluated through one metric alone. Build output, browser JavaScript delivery, audit results, and developer experience each reveal a different aspect of framework behavior.

The fourth contribution is a practical comparison for developers and researchers. For this prototype, Astro was strongest for JavaScript reduction, SvelteKit was strongest as a balanced development option, and Qwik represented an advanced architectural model whose advantages may require larger or more interactive applications to become fully visible.

## 7.9 Limitations

This thesis has several limitations.

First, the prototype was small. It included a homepage, product listing page, and product detail page, but it did not include authentication, backend communication, complex state management, shopping cart behavior, or advanced user interaction. Larger applications may produce different results.

Second, the measurements were collected on a local machine and in a local browser environment. Build times, transferred sizes, and Lighthouse scores may vary depending on hardware, operating system, browser version, Lighthouse version, screen size, and network conditions.

Third, the browser Network-tab measurements were collected manually. Although the same process was followed for all frameworks, manual measurements can still introduce small inconsistencies.

Fourth, the developer experience evaluation was qualitative. It was based on the implementation process of this thesis prototype and may differ for developers with different levels of experience or different familiarity with the frameworks.

Fifth, the implementations were designed to be comparable, but they could not be completely identical internally. Astro, SvelteKit, and Qwik use different routing systems, component models, rendering strategies, and build tools. Some differences are therefore caused by framework architecture, while others may be influenced by implementation choices.

These limitations mean that the findings should be understood as evidence from a controlled prototype rather than as universal benchmark results for all possible applications.

## 7.10 Future Work

Future research could extend this thesis in several ways.

First, the comparison could be repeated with a larger and more complex application. A future prototype could include user authentication, backend data fetching, form submission, shopping cart behavior, pagination, and more complex state management.

Second, future work could include additional performance metrics such as Time to Interactive, Interaction to Next Paint, hydration cost, CPU usage, memory usage, and energy consumption. These metrics would provide a deeper understanding of runtime behavior.

Third, the evaluation could be repeated using automated test scripts instead of manual browser measurements. This would improve repeatability and reduce the risk of manual recording differences.

Fourth, the comparison could include real deployment environments instead of local preview servers. Testing deployed applications would make the results more realistic for production use cases.

Fifth, future research could compare more frameworks and rendering models. Additional frameworks such as Next.js, Nuxt, SolidStart, Remix, or Marko could provide a broader view of the modern web framework landscape.

Finally, future work could evaluate developer experience using multiple participants. This would make the qualitative developer experience results more reliable and less dependent on one developer’s implementation process.

## 7.11 Final Conclusion

This thesis showed that Astro, SvelteKit, and Qwik approach modern web development from different architectural perspectives. All three frameworks were able to implement the same Product Explorer prototype successfully, but they differed in JavaScript delivery, build output, Lighthouse results, and developer experience.

Astro was the clearest example of JavaScript reduction in this controlled prototype. Its static-first model matched the application structure well, and it delivered no separate JavaScript files on the tested routes. This made Astro particularly suitable for the mostly static Product Explorer application.

SvelteKit represented the strongest general-purpose balance in this study. It supported interactive application features with a clear development model, achieved strong Lighthouse results, and recorded the fastest measured build time in the evaluation.

Qwik represented the most distinctive architectural approach because of its resumability model. However, in this small prototype, its advantages were less visible in browser JavaScript delivery, and the implementation required more framework-specific effort.

The overall conclusion is that disappearing frameworks should not be evaluated through a single measurement. A fair comparison must consider architecture, generated output, browser JavaScript delivery, audit results, and developer experience together. In this controlled prototype, Astro showed the clearest JavaScript reduction, SvelteKit provided the strongest general development balance, and Qwik demonstrated a promising architectural direction for applications where resumability may become more relevant.
