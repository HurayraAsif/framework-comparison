# Developer Experience Scores

## Purpose

This file records a qualitative developer-experience evaluation for the three Product Explorer implementations: Astro, SvelteKit, and Qwik.

The goal is not to measure runtime performance. The goal is to document how practical, simple, stable, and understandable each framework felt during implementation of the same controlled thesis prototype.

## Scoring Method

Each framework was scored from 1 to 5.

| Score | Meaning                                 |
| ----- | --------------------------------------- |
| 1     | Very difficult or unstable              |
| 2     | Difficult                               |
| 3     | Acceptable but with noticeable friction |
| 4     | Good developer experience               |
| 5     | Very smooth developer experience        |

The scores are based on the implementation process for this specific Product Explorer application, including setup, routing, data handling, component development, styling, interactivity, build behavior, and debugging.

## Developer Experience Summary

| Framework | Score | Summary                                                                                                                                                                     |
| --------- | ----: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Astro     |     5 | The simplest and most stable implementation experience for this prototype. Static routing, page generation, and build behavior were straightforward.                        |
| SvelteKit |     4 | Good developer experience with clear routing and component structure. Some build/output behavior required interpretation because of adapter-auto and `.svelte-kit/output`.  |
| Qwik      |     3 | Functional in the end, but more difficult during implementation. Extra friction came from Qwik-specific syntax, client-side behavior, build warnings, and debugging issues. |

## Detailed Evaluation

### Astro

Astro received the highest developer-experience score in this prototype.

The project structure was easy to understand, and the implementation matched the application requirements naturally. The Product Explorer application mainly consists of static pages, product listing pages, and product detail pages. Astro handled this type of static content-oriented structure very well.

The build process was also straightforward. The production build generated 17 static pages successfully, including the homepage, product listing page, and product detail pages.

Astro also produced the smallest measured output folder and did not generate separate JavaScript or CSS files in the measured `dist` folder for this implementation. This made the output easier to inspect and interpret.

Overall, Astro felt the most direct and least complex for this specific static product-explorer prototype.

Score: 5 / 5

### SvelteKit

SvelteKit also provided a good developer experience.

The routing model was clear, the component structure was understandable, and the implementation of pages and product data was manageable. Compared with Astro, SvelteKit felt more application-oriented and more flexible for interactive use cases.

The build completed successfully and the local production preview worked correctly. However, the output structure was more complex than Astro because the generated files were inside `.svelte-kit/output`. The adapter-auto warning also required interpretation. The warning did not stop the build, but it showed that a specific deployment adapter would be needed for a real production deployment target.

SvelteKit was smooth overall, but slightly less simple than Astro for this controlled static-style prototype.

Score: 4 / 5

### Qwik

Qwik was the most difficult implementation experience in this prototype.

The final application worked correctly, including the homepage, product listing page, search, category filtering, detail pages, and favorite button using `localStorage`. However, the implementation required more debugging than the Astro and SvelteKit versions.

The Qwik build initially failed because of an unsupported `For` import. The code had to be changed to standard JSX mapping. There were also Qwik-specific warnings related to `useVisibleTask$`, image width/height attributes, and missing integration messages during build output. These issues did not prevent the final application from working, but they made the development process less straightforward.

Qwik’s programming model also required more attention for client-side behavior, especially for the favorite button and browser-only APIs such as `localStorage`.

For this reason, Qwik receives a lower developer-experience score in this specific prototype. This does not mean Qwik is generally weak; it means that for this small thesis application, the implementation process involved more friction.

Score: 3 / 5

## Observations

Astro was the easiest framework to use for this prototype because the application was mostly content-oriented and static. Its file structure, static page generation, and build output were simple to understand.

SvelteKit was also productive and clear, but its generated output and deployment configuration required more interpretation than Astro.

Qwik successfully delivered the required functionality, but its implementation required more framework-specific knowledge and more debugging. The final result worked, but the development process was less smooth than Astro and SvelteKit.

## Notes

These scores are subjective developer-experience scores based on one controlled implementation process. They should not be interpreted as universal framework rankings.

The same application requirements, dataset, product pages, and visual design were used across the three frameworks to keep the comparison as fair as possible.
