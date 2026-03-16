import { describe, expect, it } from 'vitest'

import { contentRepository } from './ContentRepository'
import {
  resolveAppFooterContent,
  resolveHomeHeroContent,
  resolveNavigationContent,
  resolvePresentationChromeLabel,
  resolvePresentationsPageContent,
  resolvePresentationToolbarContent,
  resolveRoadmapLabels,
  resolveTitleSlideContent,
} from './contentDefaults'

describe('contentDefaults', () => {
  const site = contentRepository.getSiteContent()
  const record = contentRepository.getPresentation('2026-q1')
  const titleSlide = record.presentation.slides.find((slide) => slide.kind === 'title')

  if (!titleSlide || titleSlide.kind !== 'title') {
    throw new Error('Expected title slide in fixture data')
  }

  it('normalizes configured site content', () => {
    expect(resolveNavigationContent(site)).toEqual({
      brand_title: 'Threat Dragon Updates',
      home_label: 'Home',
      presentations_label: 'Presentations',
      latest_presentation_label: 'Latest Presentation',
      toggle_label: 'Toggle navigation',
    })
    expect(resolveAppFooterContent(site)).toEqual({
      repository_label: 'github.com/lreading/td-project-updates',
      repository_url: 'https://github.com/lreading/td-project-updates',
    })
    expect(resolvePresentationToolbarContent(site)).toEqual({
      navigation_label: 'Slide navigation',
      previous_slide_label: 'Previous slide',
      next_slide_label: 'Next slide',
      presentation_mode_label: 'Presentation mode',
    })
    expect(resolvePresentationsPageContent(site).search_placeholder).toBe('Search presentations...')
    expect(resolveHomeHeroContent(site)).toEqual({
      title_primary: 'OWASP',
      title_accent: 'Threat Dragon',
      subtitle: 'Community Updates',
    })
    expect(resolvePresentationChromeLabel(site)).toBe('Threat Dragon')
  })

  it('falls back when optional site content is missing or blank', () => {
    const fallbackSite = {
      ...site,
      title: 'Threat Dragon Quarterly Updates',
      navigation: {
        brand_title: '   ',
        home_label: '   ',
        presentations_label: '   ',
        latest_presentation_label: '   ',
        toggle_label: '   ',
      },
      app_footer: {
        repository_label: '   ',
        repository_url: '   ',
      },
      presentation_chrome: {
        mark_label: '   ',
      },
      presentation_toolbar: {
        navigation_label: '   ',
        previous_slide_label: '   ',
        next_slide_label: '   ',
        presentation_mode_label: '   ',
      },
      home_hero: {
        title_primary: '   ',
        title_accent: '   ',
        subtitle: '   ',
      },
      presentations_page: {
        title: '   ',
        search_label: '   ',
        search_placeholder: '   ',
        year_label: '   ',
        all_years_label: '   ',
        open_presentation_label: '   ',
        empty_title: '   ',
        empty_message: '   ',
        previous_page_label: '   ',
        next_page_label: '   ',
        page_label: '   ',
        showing_label: '   ',
        total_label: '   ',
        presentation_singular_label: '   ',
        presentation_plural_label: '   ',
      },
      presentations_page_title: '   ',
    }

    expect(resolveNavigationContent(fallbackSite).brand_title).toBe('Threat Dragon Updates')
    expect(resolveAppFooterContent(fallbackSite).repository_label).toBe(
      'github.com/lreading/td-project-updates',
    )
    expect(resolvePresentationToolbarContent(fallbackSite).presentation_mode_label).toBe(
      'Presentation mode',
    )
    expect(resolvePresentationsPageContent(fallbackSite).title).toBe('All presentations')
    expect(resolveHomeHeroContent(fallbackSite).title_primary).toBe('OWASP')
    expect(resolvePresentationChromeLabel(fallbackSite)).toBe('Threat Dragon Quarterly Updates')
  })

  it('normalizes slide and roadmap defaults', () => {
    expect(resolveTitleSlideContent(titleSlide)).toEqual({
      titlePrimary: 'OWASP',
      titleAccent: 'Threat Dragon',
      subtitlePrefix: 'Quarterly Community Update',
    })
    expect(resolveRoadmapLabels(record.presentation)).toEqual({
      deliverables: 'Key deliverables',
      focusAreas: 'Focus areas',
      footerLink: 'View full roadmap & milestones on GitHub',
    })
  })

  it('falls back for blank title-slide and roadmap labels', () => {
    expect(
      resolveTitleSlideContent({
        ...titleSlide,
        title_primary: '   ',
        title_accent: '   ',
        subtitle_prefix: '   ',
      }),
    ).toEqual({
      titlePrimary: 'OWASP',
      titleAccent: 'Threat Dragon',
      subtitlePrefix: 'Quarterly Community Update',
    })

    expect(
      resolveRoadmapLabels({
        ...record.presentation,
        roadmap: {
          ...record.presentation.roadmap!,
          deliverables_heading: '   ',
          focus_areas_heading: '   ',
          footer_link_label: '   ',
        },
      }),
    ).toEqual({
      deliverables: 'Key deliverables',
      focusAreas: 'Focus areas',
      footerLink: 'View full roadmap & milestones on GitHub',
    })
  })
})
