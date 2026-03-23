import { expect, test } from '@playwright/test'

const SPRING_BRIEFING_TITLE = 'Acorn Cloud Product Brief'

test('readme gif walkthrough (docs reference project)', async ({ page }) => {
  await page.goto('/')
  await page.waitForTimeout(800)

  await expect(page.getByRole('link', { name: 'Acorn Cloud Updates' })).toBeVisible()
  await page.getByRole('link', { name: 'View all presentations', exact: true }).click()
  await page.waitForTimeout(700)
  await expect(page).toHaveURL(/\/presentations$/)

  await page
    .getByRole('article')
    .filter({ has: page.getByRole('heading', { name: SPRING_BRIEFING_TITLE }) })
    .getByRole('link', { name: SPRING_BRIEFING_TITLE })
    .click()

  await page.waitForTimeout(700)
  await expect(page).toHaveURL(/\/presentations\/2026-spring-briefing/)

  await expect(page.getByText('Keyboard shortcuts')).toBeVisible()
  await page.waitForTimeout(400)
  await page.getByRole('button', { name: 'Do not show again' }).click()
  await page.waitForTimeout(250)

  await page.goto('/presentations/2026-spring-briefing?slide=1&mode=presentation')
  await expect(page.getByRole('link', { name: 'Acorn Cloud Updates' })).toBeHidden()
  await page.waitForTimeout(250)

  const pauseMs = 1050
  const slideCount = 9
  await page.waitForTimeout(pauseMs)
  for (let step = 1; step < slideCount; step += 1) {
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(pauseMs)
  }

  await page.waitForTimeout(1050)
})
