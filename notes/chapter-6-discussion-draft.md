# Chapter 6: Discussion

## 6.1 Introduction

This chapter discusses the findings from the evaluation of the three Product Explorer implementations developed in Astro, SvelteKit, and Qwik. While Chapter 5 presented the measured results, this chapter interprets what those results mean in relation to the research objective of comparing disappearing-framework behavior in a controlled prototype.

The discussion focuses on the practical meaning of the results rather than repeating all measurement tables. The main areas discussed are production build output, browser JavaScript delivery, Lighthouse results, developer experience, and the broader implications for disappearing frameworks.

The findings should be understood within the limits of this thesis prototype. The Product Explorer application was intentionally small, used local JSON data, and avoided complex backend or application features. Therefore, the results provide evidence for this controlled scenario, but they should not be treated as universal conclusions about Astro, SvelteKit, or Qwik in all production contexts.

## 6.2 Build Output and Framework Structure

The build output results showed clear differences between the three frameworks. Astro produced the smallest measured output folder, while SvelteKit produced the largest measured output folder. Qwik produced an output size close to Astro but required the longest measured build time.

This result suggests that framework architecture has a visible effect on generated production artifacts. Astro’s output was small and simple because the application mainly consisted of static pages with limited client-side behavior. This matched Astro’s static-first design and made the generated output easy to understand.

SvelteKit had the fastest measured build time, but its output folder was larger because the measured `.svelte-kit/output` directory included generated client and server artifacts. This does not necessarily mean that SvelteKit is inefficient. Instead, it reflects the structure of the selected output folder and the framework’s broader application model.

Qwik generated less total JavaScript output than SvelteKit, but its build process took longer in this measurement. This shows that smaller generated JavaScript output does not automatically mean a simpler or faster build process. Build time depends on framework tooling, checks, optimization steps, and generated artifact structure.

Overall, the build output results show that each framework optimizes for a different development and delivery model. Astro produced the simplest measured build output, SvelteKit provided a fast build with a larger generated structure, and Qwik produced relatively small JavaScript output but required more build time in this prototype.

## 6.3 Browser JavaScript Delivery

The browser Network-tab results were one of the most important findings of the evaluation. Astro delivered no separate JavaScript files on the tested routes. This made Astro the strongest implementation in terms of browser JavaScript reduction for this specific prototype.

This finding is important because disappearing frameworks are partly concerned with reducing unnecessary JavaScript in the browser. In this controlled application, Astro achieved this most clearly. The pages were mostly static, and Astro’s implementation allowed the browser to load the content without separate JavaScript files for the tested routes.

SvelteKit and Qwik both delivered JavaScript on all tested routes. SvelteKit transferred a consistent JavaScript payload across the homepage, listing page, and detail page. Qwik transferred slightly more JavaScript than SvelteKit in the measured page loads, even though Qwik generated less total JavaScript in the build output measurement.

This difference shows why build output and browser-delivered JavaScript must be evaluated separately. A framework may generate less total JavaScript during build, but the browser may still request multiple JavaScript files during page loading. Therefore, judging framework behavior only from build artifacts would be incomplete.

In this prototype, Qwik’s resumability-oriented model did not lead to lower browser JavaScript transfer than SvelteKit. However, this does not mean that Qwik’s model has no value. Qwik’s benefits may become more visible in larger applications with more complex interactivity, delayed execution, and more advanced user interaction patterns. The Product Explorer prototype was intentionally small and may not fully expose those advantages.

## 6.4 Lighthouse Findings

The Lighthouse results showed that all three implementations achieved perfect Performance and Best Practices scores in the controlled desktop tests. This indicates that Lighthouse Performance did not separate the frameworks in this prototype.

This result should be interpreted carefully. The application was small, used local data, and was tested through local production preview servers. Under these conditions, all three frameworks were able to achieve excellent Lighthouse Performance results. Therefore, Lighthouse alone was not enough to identify meaningful performance differences between the implementations.

The more visible Lighthouse differences appeared in Accessibility and SEO. SvelteKit achieved the highest average scores in these two categories, Astro followed closely, and Qwik scored lower in this implementation.

These differences are likely caused by implementation-level details rather than framework capability alone. Accessibility and SEO scores can be influenced by heading order, semantic HTML, labels, button names, link text, metadata, and image attributes. Because these details are controlled by the developer, the scores should not be interpreted as proof that one framework is inherently more accessible or more SEO-friendly than another.

The Lighthouse results therefore support one important conclusion: for small controlled applications, framework choice alone may not strongly affect Lighthouse Performance scores. Implementation quality and markup details may have a stronger effect on Accessibility and SEO results.

## 6.5 Developer Experience and Practical Trade-offs

The developer experience evaluation showed a practical difference between the three implementations. Astro was the simplest implementation experience, SvelteKit provided a strong and balanced developer experience, and Qwik required the most framework-specific adjustment.

Astro was well suited to the Product Explorer prototype because the application was mostly content-oriented and static. The routing model, page structure, and component organization were straightforward. This made Astro efficient for building a simple product browsing application with limited interactivity.

SvelteKit offered a good balance between structure and interactivity. Its component model, routing system, and state handling made it comfortable to implement search, filtering, product cards, and favorite-button behavior. Although the output folder and adapter-related message required interpretation, the overall development process remained clear.

Qwik required more effort because its mental model differs from more familiar frontend frameworks. The implementation required attention to Qwik-specific syntax, client-side execution, signals, and browser-only APIs such as `localStorage`. The final implementation worked, but the development process involved more troubleshooting.

This finding highlights an important trade-off. A framework may offer advanced architectural ideas, but those ideas can also increase learning effort. For a small prototype, the simplest framework may provide the best practical experience. For larger or more interactive applications, the trade-off may change.

## 6.6 Implications for Disappearing Frameworks

The results show that the concept of a disappearing framework should not be judged by one metric alone. A framework can “disappear” in different ways: by reducing browser JavaScript, by generating static HTML, by delaying JavaScript execution, or by making runtime behavior less visible to the user.

In this prototype, Astro most clearly demonstrated the disappearing-framework idea at the browser level because it delivered no separate JavaScript files on the tested routes. This made the final pages lightweight and simple from the browser’s perspective.

SvelteKit did not disappear in the same way because it delivered JavaScript to the browser. However, it performed very well in Lighthouse and provided a strong developer experience. This suggests that practical framework value is not only about reducing JavaScript; it is also about developer productivity, routing clarity, maintainability, and implementation speed.

Qwik represents a different interpretation of the disappearing-framework idea. Its model focuses on resumability and delayed execution rather than simply producing no JavaScript. In this prototype, that model did not produce lower browser JavaScript transfer than the other JavaScript-delivering implementation. However, Qwik’s architecture may be more relevant in applications where fine-grained interactivity and delayed execution become more important.

Therefore, the findings suggest that disappearing frameworks should be evaluated through multiple dimensions. JavaScript reduction is important, but it should be considered together with build output, actual browser requests, developer experience, application complexity, and the type of interactivity required.

## 6.7 Threats to Validity

Several limitations affect the interpretation of this study.

First, the prototype was small. It included only a homepage, product listing page, and product detail page. Larger applications with authentication, backend data fetching, complex state management, and more interactive user flows may produce different results.

Second, the measurements were collected on one local machine and one browser environment. Build times, transferred sizes, and Lighthouse scores may vary depending on hardware, browser version, Lighthouse version, operating system, and local conditions.

Third, the Network-tab measurements were collected manually. Although the same procedure was followed for each framework, manual measurement can still introduce small inconsistencies.

Fourth, the implementations were designed to be comparable, but they could not be completely identical. Astro, SvelteKit, and Qwik have different routing systems, component models, build tools, and client-side execution patterns. Some differences in output are therefore partly caused by framework architecture and partly by implementation choices.

Fifth, the developer experience score is qualitative. It reflects the implementation process of this thesis prototype and the developer’s experience during the project. Other developers with different levels of experience may score the frameworks differently.

These limitations do not invalidate the results, but they define the scope of interpretation. The findings should be understood as evidence from a controlled prototype rather than as general benchmark claims.

## 6.8 Summary

This chapter discussed the meaning of the evaluation results presented in Chapter 5. The discussion showed that the three frameworks differ not only in measured output, but also in architectural behavior and implementation trade-offs.

Astro demonstrated the clearest reduction of browser-side JavaScript in the controlled Product Explorer prototype. This was consistent with its static-first approach and made it well suited to the mostly static structure of the application.

SvelteKit showed a balanced profile in the evaluation. It combined fast build time, strong Lighthouse results, and a clear development experience, while still delivering JavaScript to the browser on the tested routes.

Qwik represented a different architectural model based on resumability and delayed execution. In this prototype, however, those architectural ideas did not produce lower browser JavaScript delivery than the other JavaScript-delivering implementation.

The discussion also showed that framework comparison should not depend on one measurement only. Build output, browser JavaScript delivery, Lighthouse audit results, and developer experience each describe a different part of the comparison.Chapter 7 uses these findings to answer the research questions directly and to present the final thesis conclusion.
