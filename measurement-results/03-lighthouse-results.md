# Lighthouse Results

## Purpose

This file records Lighthouse audit results for the three Product Explorer implementations: Astro, SvelteKit, and Qwik.

The purpose of this file is to document the measured Lighthouse evidence used later in the evaluation chapter. The file focuses on recorded scores from the audits. Broader interpretation is kept for the evaluation chapter.

## Measurement Method

The Lighthouse measurements were collected manually using Chrome DevTools Lighthouse.

The following settings were used:

| Setting        | Value                                           |
| -------------- | ----------------------------------------------- |
| Mode           | Navigation                                      |
| Device         | Desktop                                         |
| Tested routes  | `/`, `/products`, `/products/1`                 |
| Categories     | Performance, Accessibility, Best Practices, SEO |
| Environment    | Local production preview server                 |
| Runs per route | 3                                               |

Each framework was tested separately using its production preview server. The same three routes were tested for each framework.

## Tested Routes

| Route         | Description          |
| ------------- | -------------------- |
| `/`           | Homepage             |
| `/products`   | Product listing page |
| `/products/1` | Product detail page  |

## Astro Lighthouse Results

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

### Astro Average Scores

| Page          | Avg. Performance | Avg. Accessibility | Avg. Best Practices | Avg. SEO |
| ------------- | ---------------: | -----------------: | ------------------: | -------: |
| `/`           |              100 |                100 |                 100 |       90 |
| `/products`   |              100 |                 93 |                 100 |       91 |
| `/products/1` |              100 |                 85 |                 100 |       91 |

## SvelteKit Lighthouse Results

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

### SvelteKit Average Scores

| Page          | Avg. Performance | Avg. Accessibility | Avg. Best Practices | Avg. SEO |
| ------------- | ---------------: | -----------------: | ------------------: | -------: |
| `/`           |              100 |                100 |                 100 |       91 |
| `/products`   |              100 |                 93 |                 100 |       92 |
| `/products/1` |              100 |                 90 |                 100 |       92 |

## Qwik Lighthouse Results

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

### Qwik Average Scores

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

All three implementations achieved a Performance score of 100 on every tested route.

All three implementations also achieved a Best Practices score of 100 on every tested route.

The main score differences appeared in Accessibility and SEO. SvelteKit had the highest overall average scores in these two categories. Astro followed closely. Qwik had lower average Accessibility and SEO scores in this implementation.

The Lighthouse scores were stable across the three repeated runs for each tested route.

## Notes

These measurements should be interpreted as local Lighthouse results for the controlled Product Explorer thesis prototype. They are not universal benchmark results for Astro, SvelteKit, or Qwik.

The results may vary on other machines, browsers, Lighthouse versions, screen sizes, or network conditions.

The same product dataset, similar route structure, comparable visual design, and similar functional requirements were used across all three implementations to support a fair comparison.
