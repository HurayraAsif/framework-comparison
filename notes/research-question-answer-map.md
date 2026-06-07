# Research Question Answer Map

## Purpose

This file maps the final research questions to the thesis chapters and summarizes how each question is answered. It is used as a planning document for writing the conclusion chapter and for keeping the thesis structure consistent.

The goal is to avoid repetition between the evaluation, discussion, and conclusion chapters. Chapter 5 presents measured results, Chapter 6 interprets the meaning of the results, and Chapter 7 gives direct final answers to the research questions.

## Final Research Questions

The thesis is guided by the following research questions:

**RQ1:** What defines disappearing frameworks, and how do they differ from traditional single-page applications?

**RQ2:** How do Astro, SvelteKit, and Qwik differ architecturally?

**RQ3:** How much JavaScript do Astro, SvelteKit, and Qwik deliver for the same controlled Product Explorer application?

**RQ4:** How do the frameworks compare in terms of build output, browser JavaScript delivery, and Lighthouse audit results?

**RQ5:** How do developer experience and implementation complexity differ between Astro, SvelteKit, and Qwik?

**RQ6:** Which framework provides the best practical balance of performance, JavaScript reduction, and usability for the controlled prototype?

## Alignment Note

The original thesis proposal mentioned metrics such as TTI, LCP, bundle size, hydration cost, WebPageTest, and bundle analyzers. During the actual implementation, the empirical evaluation was narrowed to measurements that were collected consistently for all three implementations.

The final empirical comparison is therefore based on:

- production build output,
- browser JavaScript delivery using Chrome DevTools Network tab,
- Lighthouse desktop audit scores,
- developer experience scoring.

The thesis should not claim direct TTI or hydration-cost measurements unless those measurements are added later. The final research questions are therefore aligned with the evidence that was actually collected.

## RQ1: What defines disappearing frameworks, and how do they differ from traditional single-page applications?

### Main chapters answering this question

- Chapter 1: Introduction
- Chapter 2: Literature Review
- Chapter 6: Discussion
- Chapter 7: Conclusion

### Evidence type

This question is answered mainly through literature review and conceptual comparison.

### Short answer

Disappearing frameworks are modern web frameworks that aim to reduce the visible runtime cost of the framework in the browser. They try to reduce unnecessary client-side JavaScript, avoid or limit hydration, and deliver only the JavaScript needed for interactivity.

Traditional single-page applications usually rely more heavily on client-side JavaScript. They often send a larger JavaScript bundle to the browser and require hydration or client-side rendering before the application becomes fully interactive.

Disappearing frameworks differ from traditional SPAs because they try to move more work to build time or server-side rendering and reduce the amount of framework code executed by the browser.

### Final conclusion direction

The thesis should conclude that disappearing frameworks are not defined by one single technique. They can use different strategies, such as static generation, islands architecture, compiler-based rendering, or resumability. Their shared goal is to reduce unnecessary browser-side JavaScript while preserving modern development features.

## RQ2: How do Astro, SvelteKit, and Qwik differ architecturally?

### Main chapters answering this question

- Chapter 2: Literature Review
- Chapter 4: Implementation
- Chapter 6: Discussion
- Chapter 7: Conclusion

### Evidence type

This question is answered through literature review and implementation experience.

### Short answer

Astro follows a static-first and islands-oriented model. It can generate mostly static HTML and only add client-side JavaScript where interactivity is required.

SvelteKit uses Svelte’s compiler-based approach with a full application framework structure. It supports routing, components, client-side interactivity, and server-side or static generation depending on configuration.

Qwik uses a resumability-oriented model. Its architecture is designed to avoid traditional hydration and delay JavaScript execution until it is needed.

### Final conclusion direction

The thesis should conclude that the three frameworks represent different interpretations of disappearing-framework ideas. Astro emphasizes minimal JavaScript and static-first output. SvelteKit emphasizes a balanced full-stack application model with compiler support. Qwik emphasizes resumability and delayed execution.

## RQ3: How much JavaScript do Astro, SvelteKit, and Qwik deliver for the same controlled Product Explorer application?

### Main chapters answering this question

- Chapter 5: Evaluation
- Chapter 6: Discussion
- Chapter 7: Conclusion

### Evidence type

This question is answered through build output measurements and Chrome DevTools Network measurements.

### Short answer

In the measured build output, Astro produced no separate JavaScript files in the measured `dist` folder for this implementation. SvelteKit generated 35 JavaScript files with a total measured size of 503,578 bytes. Qwik also generated 35 JavaScript files, but with a lower total measured JavaScript size of 96,401 bytes.

In the browser Network-tab measurements, Astro loaded 0 JavaScript requests on all tested routes. SvelteKit loaded 9 to 10 JavaScript requests depending on the route. Qwik loaded 11 to 16 JavaScript requests depending on the route.

### Final conclusion direction

The thesis should conclude that Astro delivered the least browser JavaScript in this controlled prototype. Qwik generated less total JavaScript output than SvelteKit in the build-output measurement, but it did not transfer less browser JavaScript during the measured page loads. This shows that build output and actual browser delivery must be evaluated separately.

## RQ4: How do the frameworks compare in terms of build output, browser JavaScript delivery, and Lighthouse audit results?

### Main chapters answering this question

- Chapter 5: Evaluation
- Chapter 6: Discussion
- Chapter 7: Conclusion

### Evidence type

This question is answered through production build measurements, Network-tab measurements, and Lighthouse desktop audit results.

### Short answer

Astro produced the smallest measured output folder and delivered no separate JavaScript files in the tested browser route loads. SvelteKit had the fastest measured build time but produced the largest measured output folder. Qwik produced a total output folder size close to Astro and generated less measured JavaScript output than SvelteKit, but it had the longest measured build time.

In Lighthouse, all three frameworks achieved 100 Performance and 100 Best Practices scores across all tested routes. Differences appeared mainly in Accessibility and SEO. SvelteKit had the highest overall average Accessibility and SEO scores, Astro followed closely, and Qwik scored lower in this implementation.

### Final conclusion direction

The thesis should conclude that no single framework was best in every category. Astro was strongest for JavaScript reduction and output simplicity. SvelteKit was strongest for build time and overall Lighthouse balance. Qwik showed a modern architectural model and lower generated JavaScript output than SvelteKit, but it did not outperform Astro or SvelteKit in every measured category.

## RQ5: How do developer experience and implementation complexity differ between Astro, SvelteKit, and Qwik?

### Main chapters answering this question

- Chapter 4: Implementation
- Chapter 5: Evaluation
- Chapter 6: Discussion
- Chapter 7: Conclusion

### Evidence type

This question is answered through qualitative developer experience scoring and implementation notes.

### Short answer

Astro received the highest developer experience score because the Product Explorer prototype matched its static-first model well. Routing, page structure, and component organization were direct and simple.

SvelteKit also provided a good developer experience. It offered clear routing, reusable components, and straightforward state handling for interactive behavior.

Qwik required the most framework-specific adjustment. Its syntax, resumability-oriented model, and browser-only API handling required more care during implementation. The final implementation worked, but the process involved more troubleshooting.

### Final conclusion direction

The thesis should conclude that developer experience depends strongly on application type and developer familiarity. For this small product browsing prototype, Astro was the simplest to implement, SvelteKit was balanced and comfortable, and Qwik was more complex but architecturally interesting.

## RQ6: Which framework provides the best practical balance of performance, JavaScript reduction, and usability for the controlled prototype?

### Main chapters answering this question

- Chapter 6: Discussion
- Chapter 7: Conclusion

### Evidence type

This question is answered by combining the results from all measurement categories.

### Short answer

For this controlled Product Explorer prototype, Astro provided the strongest practical result for JavaScript reduction and simplicity. It produced the smallest measured output folder, delivered no separate JavaScript files on the tested routes, and had the highest developer experience score.

SvelteKit provided the best balanced full-framework experience. It had the fastest measured build time, strong Lighthouse scores, and a good developer experience, although it delivered more JavaScript than Astro.

Qwik demonstrated a more advanced architectural model based on resumability. However, in this small prototype, its advantages were not fully visible in the measured browser JavaScript delivery. It also required more implementation effort.

### Final conclusion direction

The thesis should conclude that Astro is the strongest choice for this specific static-oriented prototype, SvelteKit is the most balanced general-purpose option, and Qwik may be more suitable for larger or more interactive applications where resumability can show clearer benefits.

## Overall Thesis Answer

The overall answer to the main research problem is that Astro, SvelteKit, and Qwik differ not only in performance results, but also in architectural philosophy and development experience.

Astro most clearly reduced browser JavaScript in the controlled Product Explorer prototype. SvelteKit provided the strongest balance between development comfort, build speed, and Lighthouse results. Qwik represented the most distinct architectural model, but its practical benefits were less visible in this small prototype.

Therefore, disappearing frameworks should not be compared using one metric alone. A fair comparison must consider build output, browser JavaScript delivery, audit results, implementation complexity, and developer experience together.

## Use in Chapter 7

Chapter 7 should not repeat all measurement tables. It should use this answer map to give direct final answers to the research questions.

The conclusion chapter should follow this structure:

1. Summary of the thesis aim
2. Summary of implementation and evaluation
3. Direct answers to RQ1–RQ6
4. Main contribution of the thesis
5. Limitations
6. Future work
7. Final closing paragraph
