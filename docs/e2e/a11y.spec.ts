import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const DOC_PATHS = [
  '/',
  '/quickstart',
  '/concepts',
  '/schema/',
  '/schema/site',
  '/schema/presentations-index',
  '/schema/presentation',
  '/schema/generated',
  '/templates/',
  '/templates/hero',
  '/templates/agenda',
  '/templates/section-list-grid',
  '/templates/timeline',
  '/templates/progress-timeline',
  '/templates/people',
  '/templates/metrics-and-links',
  '/templates/action-cards',
  '/templates/closing',
  '/cli/',
  '/cli/init',
  '/cli/validate',
  '/cli/fetch',
  '/cli/build',
  '/cli/serve',
  '/connectors/',
  '/connectors/github',
  '/examples/',
  '/examples/open-source-update',
  '/examples/product-review',
  '/examples/security-posture',
  '/examples/community-update',
  '/examples/tutorial-example',
  '/examples/manual-data-example',
  '/meta/',
  '/meta/accessibility',
  '/meta/ai',
  '/meta/supply-chain',
  '/meta/agent-assistance',
]

const expectNoAccessibilityViolations = async (pagePath: string, page: Page) => {
  await page.goto(pagePath)
  const results = await new AxeBuilder({ page })
    // VitePress default layout uses a div#VPContent; axe treats missing <main> as best-practice only.
    .disableRules(['landmark-one-main', 'region'])
    .analyze()
  expect(results.violations).toEqual([])
}

for (const path of DOC_PATHS) {
  test(`docs a11y: ${path}`, async ({ page }) => {
    await expectNoAccessibilityViolations(path, page)
  })
}
