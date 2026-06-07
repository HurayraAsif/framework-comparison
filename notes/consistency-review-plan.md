# Consistency Review Plan

## Purpose

This file is used to review Chapters 4–7 before transferring them into the final thesis document. The goal is to make sure the chapters are consistent, non-repetitive, academically precise, and aligned with the research questions.

## Review Order

1. Review Chapter 4: Implementation
2. Review Chapter 5: Evaluation
3. Review Chapter 6: Discussion
4. Review Chapter 7: Conclusion
5. Compare all chapters with the research-question answer map

## Chapter 4 Review Rule

Chapter 4 should explain what was implemented and how it was implemented.

It should include:

- application requirements,
- shared dataset and assets,
- Astro implementation,
- SvelteKit implementation,
- Qwik implementation,
- consistency across frameworks.

It should not include:

- detailed measurement tables,
- Lighthouse scores,
- final framework ranking,
- research question answers.

## Chapter 5 Review Rule

Chapter 5 should present the evaluation results.

It should include:

- build output results,
- Network JavaScript delivery results,
- Lighthouse results,
- developer experience scores.

It should not include:

- long discussion of what the results mean,
- repeated implementation explanations,
- final conclusion statements.

## Chapter 6 Review Rule

Chapter 6 should interpret the results.

It should include:

- meaning of build output differences,
- meaning of JavaScript delivery differences,
- Lighthouse interpretation,
- developer experience trade-offs,
- implications for disappearing frameworks,
- threats to validity.

It should not repeat:

- all measurement tables,
- full implementation details,
- final research question answers in list format.

## Chapter 7 Review Rule

Chapter 7 should conclude the thesis.

It should include:

- summary of the thesis,
- direct answers to RQ1–RQ6,
- main contributions,
- limitations,
- future work,
- final conclusion.

It should not repeat:

- complete Chapter 5 result tables,
- long Chapter 6 discussion paragraphs,
- unnecessary implementation detail.

## Repetition Control

The same idea may appear in different chapters only if the function is different.

Example:

- Chapter 5: Astro loaded 0 JavaScript requests.
- Chapter 6: This suggests Astro reduced browser JavaScript most clearly in this prototype.
- Chapter 7: Astro was strongest for JavaScript reduction in the final conclusion.

This is acceptable because each chapter uses the idea for a different purpose.

## Final Check Before Thesis Document

Before writing the final thesis document, confirm that:

- all research questions are answered,
- all measurement values are consistent,
- Chapter 4 does not contain evaluation discussion,
- Chapter 5 does not contain conclusion-style claims,
- Chapter 6 does not repeat full tables,
- Chapter 7 directly answers RQ1–RQ6,
- no unsupported claims are made,
- no metrics are claimed that were not measured.
