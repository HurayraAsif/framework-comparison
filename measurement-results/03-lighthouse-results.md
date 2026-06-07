# Lighthouse Results

## Purpose

This file records Lighthouse measurement results for the three Product Explorer implementations: Astro, SvelteKit, and Qwik.

The purpose of this measurement is to compare the frameworks using the same controlled application scenario, the same routes, the same product dataset, and the same browser-based Lighthouse method.

## Measurement Method

The Lighthouse measurements were collected using Chrome DevTools Lighthouse.

The following settings were used:

| Setting        | Value                                           |
| -------------- | ----------------------------------------------- |
| Mode           | Navigation                                      |
| Device         | Desktop                                         |
| Tested routes  | `/`, `/products`, `/products/1`                 |
| Categories     | Performance, Accessibility, Best Practices, SEO |
| Environment    | Local production preview server                 |
| Runs per route | 3                                               |

Each framework was tested separately using its production preview command. The same three routes were tested for every framework.

## Tested Routes

| Route         | Description          |
| ------------- | -------------------- |
| `/`           | Homepage             |
| `/products`   | Product listing page |
| `/products/1` | Product detail page  |

## Astro Lighthouse Results

### Astro: Individual Runs

| Page          | Run | Performance | Accessibility | Best Practices | SEO |
| ------------- | --: | ----------: | ------------: | -------------: | --: |
| `/`           |   1 |         100 |           100 |            100 |  90 |
| `/`           |   2 |         100 |           100 |            100 |  90 |
| `/`           |   3 |         100 |           100 |            100 |  90 |
| `/products`   |   1 |         100 |            93 |            100 |  91 |
| `/products`   |   2 |         100 |            93 |            100 |  91 |
| `/products`   |   3 |         100 |            93 |            100 |  91 |
| `/products/1` |   1 |         100 |            85 |            100 |  91 |
| `/products/1` |   2 |         100 |            85 |            100 |  91 |
| `/products/1` |   3 |         100 |            85 |            100 |  91 |

### Astro: Average Scores

| Page          | Avg. Performance | Avg. Accessibility | Avg. Best Practices | Avg. SEO |
| ------------- | ---------------: | -----------------: | ------------------: | -------: |
| `/`           |              100 |                100 |                 100 |       90 |
| `/products`   |              100 |                 93 |                 100 |       91 |
| `/products/1` |              100 |                 85 |                 100 |       91 |

## SvelteKit Lighthouse Results

### SvelteKit: Individual Runs

| Page          | Run | Performance | Accessibility | Best Practices | SEO |
| ------------- | --: | ----------: | ------------: | -------------: | --: |
| `/`           |   1 |         100 |           100 |            100 |  91 |
| `/`           |   2 |         100 |           100 |            100 |  91 |
| `/`           |   3 |         100 |           100 |            100 |  91 |
| `/products`   |   1 |         100 |            93 |            100 |  92 |
| `/products`   |   2 |         100 |            93 |            100 |  92 |
| `/products`   |   3 |         100 |            93 |            100 |  92 |
| `/products/1` |   1 |         100 |            90 |            100 |  92 |
| `/products/1` |   2 |         100 |            90 |            100 |  92 |
| `/products/1` |   3 |         100 |            90 |            100 |  92 |

### SvelteKit: Average Scores

| Page          | Avg. Performance | Avg. Accessibility | Avg. Best Practices | Avg. SEO |
| ------------- | ---------------: | -----------------: | ------------------: | -------: |
| `/`           |              100 |                100 |                 100 |       91 |
| `/products`   |              100 |                 93 |                 100 |       92 |
| `/products/1` |              100 |                 90 |                 100 |       92 |

## Qwik Lighthouse Results

### Qwik: Individual Runs

| Page          | Run | Performance | Accessibility | Best Practices | SEO |
| ------------- | --: | ----------: | ------------: | -------------: | --: |
| `/`           |   1 |         100 |            91 |            100 |  82 |
| `/`           |   2 |         100 |            91 |            100 |  82 |
| `/`           |   3 |         100 |            91 |            100 |  82 |
| `/products`   |   1 |         100 |            91 |            100 |  83 |
| `/products`   |   2 |         100 |            91 |            100 |  83 |
| `/products`   |   3 |         100 |            91 |            100 |  83 |
| `/products/1` |   1 |         100 |            86 |            100 |  83 |
| `/products/1` |   2 |         100 |            86 |            100 |  83 |
| `/products/1` |   3 |         100 |            86 |            100 |  83 |

### Qwik: Average Scores

| Page          | Avg. Performance | Avg. Accessibility | Avg. Best Practices | Avg. SEO |
| ------------- | ---------------: | -----------------: | ------------------: | -------: |
| `/`           |              100 |                 91 |                 100 |       82 |
| `/products`   |              100 |                 91 |                 100 |       83 |
| `/products/1` |              100 |                 86 |                 100 |       83 |

## Overall Average Comparison

The following table summarizes the average Lighthouse scores across all three tested routes.

| Framework | Avg. Performance | Avg. Accessibility | Avg. Best Practices | Avg. SEO |
| --------- | ---------------: | -----------------: | ------------------: | -------: |
| Astro     |           100.00 |              92.67 |              100.00 |    90.67 |
| SvelteKit |           100.00 |              94.33 |              100.00 |    91.67 |
| Qwik      |           100.00 |              89.33 |              100.00 |    82.67 |

## Observations

All three frameworks achieved perfect Performance scores across all tested routes. This indicates that, for this small controlled Product Explorer application, Lighthouse did not identify major performance issues in any framework implementation.

All three frameworks also achieved perfect Best Practices scores across all tested routes. This suggests that the implementations followed acceptable browser and web platform practices according to the Lighthouse checks used in this measurement.

The main differences appeared in Accessibility and SEO. SvelteKit achieved the highest overall average scores in these two categories. Astro followed closely, while Qwik showed lower SEO scores and slightly lower Accessibility scores, especially on the product detail page.

Astro produced stable results across all three runs. Its homepage reached perfect scores in Performance, Accessibility, and Best Practices, while SEO remained at 90. The product detail page had the lowest Astro Accessibility score at 85.

SvelteKit produced stable results across all three runs. It achieved the highest overall average Accessibility and SEO scores among the three frameworks in this Lighthouse measurement.

Qwik also produced stable results across all three runs. Its Performance and Best Practices scores were perfect, but its SEO scores were lower than Astro and SvelteKit across all tested pages.

## Interpretation

The Lighthouse results show that framework choice alone did not create a measurable Performance difference in this controlled desktop test. All three frameworks reached a Performance score of 100 on the tested pages.

However, the results also show that framework implementations can differ in non-performance categories such as Accessibility and SEO. These differences are likely connected to implementation details such as page metadata, semantic structure, labels, image attributes, and other markup-level factors rather than only the framework runtime model.

Therefore, the Lighthouse results should be interpreted as local measurements of these specific Product Explorer implementations, not as universal benchmark results for Astro, SvelteKit, or Qwik.

## Notes

The measurements were collected using local production preview builds. The results may vary on other machines, browsers, Lighthouse versions, screen sizes, or network conditions.

The same product dataset, route structure, and similar visual design were used across all three implementations to keep the comparison as fair as possible.
