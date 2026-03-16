import { expect, test } from '@playwright/test'

import { FixtureRepository } from './support/FixtureRepository'

const fixtures = new FixtureRepository()
const site = fixtures.getSiteContent()
const presentations = fixtures.listPresentations()
const featured = presentations.find((entry) => entry.featured) ?? presentations[0]

test('renders the presentations listing and opens the selected presentation', async ({ page }) => {
  await page.goto('/presentations')

  await expect(page.getByText(site.presentations_page?.title ?? '')).toBeVisible()
  await expect(page.getByLabel('Search')).toBeVisible()
  await expect(page.getByLabel('Year')).toBeVisible()
  await expect(page.getByText(`${presentations.length} presentation`)).toBeVisible()
  await expect(page.getByRole('heading', { name: featured.title })).toBeVisible()
  await expect(page.getByText(featured.summary)).toBeVisible()
  await expect(page.getByText(featured.subtitle)).toBeVisible()
  await expect(page.getByRole('link', { name: /github.com\/lreading\/td-project-updates/i })).toHaveAttribute(
    'href',
    'https://github.com/lreading/td-project-updates',
  )

  await page
    .getByRole('article')
    .filter({ has: page.getByRole('heading', { name: featured.title }) })
    .getByRole('link', { name: 'Open presentation' })
    .click()

  await expect(page).toHaveURL(new RegExp(`/presentations/${featured.id}`))
})

test('supports search and empty-state filtering on the presentations page', async ({ page }) => {
  await page.goto('/presentations')

  const search = page.getByLabel('Search')

  await search.fill(featured.subtitle)
  await expect(page.getByRole('heading', { name: featured.title })).toBeVisible()
  await expect(page.getByText('1 presentation total')).toBeVisible()
  await expect(page.getByText(/Page 1 of 1/)).toBeVisible()

  await search.fill('no such presentation')
  await expect(page.getByRole('heading', { name: 'No matching presentations' })).toBeVisible()
  await expect(page.getByText('Try a different year or a broader search term.')).toBeVisible()
  await expect(page.getByText('0 presentations total')).toBeVisible()

  await search.fill('')
  if (featured.year !== undefined) {
    await page.getByLabel('Year').selectOption(String(featured.year))
    await expect(page.getByRole('heading', { name: featured.title })).toBeVisible()
  }
})
