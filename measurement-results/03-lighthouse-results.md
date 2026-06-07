# Lighthouse Results

## Purpose

This file records Lighthouse desktop audit results for the three Product Explorer implementations: Astro, SvelteKit, and Qwik.

The goal is to compare the same application pages under the same local production-preview conditions.

## Measurement Method

The Lighthouse audits were collected manually in Chrome DevTools.

Settings used:

- Mode: Navigation
- Device: Desktop
- Categories: Performance, Accessibility, Best Practices, SEO
- PWA category: not selected
- Browser: Google Chrome
- Environment: local production preview server
- Tested pages:
  - `/`
  - `/products`
  - `/products/1`

## Lighthouse Scores

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

## Observations

All three implementations achieved a Performance score of 100 on the tested desktop Lighthouse runs. This means that, for this small controlled application and local production-preview setup, Lighthouse did not show a measurable performance disadvantage for any of the three frameworks.

Astro produced the strongest homepage Accessibility result, with a score of 100 on `/`. SvelteKit also achieved 100 Accessibility on `/`, while Qwik scored 91 on the homepage.

On the product listing page `/products`, Astro and SvelteKit both scored 93 for Accessibility, while Qwik scored 91. The difference is small, but it shows that accessibility details in the generated markup and interactive controls can affect the Lighthouse result.

On the product detail page `/products/1`, SvelteKit scored the highest Accessibility result with 90. Qwik scored 86, and Astro scored 85. These lower scores are likely related to page-specific details such as image alternative text, button labels, heading structure, link text, or form/control accessibility.

Best Practices was 100 for all frameworks across all tested pages.

SEO scores were close for Astro and SvelteKit, ranging from 90 to 92. Qwik scored lower in SEO, with 82 on `/` and 83 on the two product pages. This suggests that the Qwik implementation may require additional SEO metadata or document-level improvements to match the Astro and SvelteKit implementations more closely.

## Notes

These results should be interpreted as Lighthouse results for this specific thesis prototype, not as universal framework benchmarks.

The same application concept, dataset, page structure, and visual design were used across the three implementations. However, small differences in generated HTML, metadata, links, images, and client-side behavior can affect Lighthouse scores.

Because Lighthouse results can vary slightly between runs, these values should be treated as one controlled measurement run.
