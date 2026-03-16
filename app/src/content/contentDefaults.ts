import type {
  AppFooterContent,
  HomeHeroContent,
  NavigationContent,
  PresentationChromeContent,
  PresentationDeck,
  PresentationToolbarContent,
  PresentationsPageContent,
  SiteContent,
  TitleSlide,
} from '../types/content'

const DEFAULT_NAVIGATION_CONTENT: Required<NavigationContent> = {
  brand_title: 'Threat Dragon Updates',
  home_label: 'Home',
  presentations_label: 'Presentations',
  latest_presentation_label: 'Latest Presentation',
  toggle_label: 'Toggle navigation',
}

const DEFAULT_APP_FOOTER_CONTENT: Required<AppFooterContent> = {
  repository_label: 'github.com/lreading/td-project-updates',
  repository_url: 'https://github.com/lreading/td-project-updates',
}

const DEFAULT_PRESENTATION_CHROME_CONTENT: Required<PresentationChromeContent> = {
  mark_label: 'Threat Dragon',
}

const DEFAULT_PRESENTATION_TOOLBAR_CONTENT: Required<PresentationToolbarContent> = {
  navigation_label: 'Slide navigation',
  previous_slide_label: 'Previous slide',
  next_slide_label: 'Next slide',
  presentation_mode_label: 'Presentation mode',
}

const DEFAULT_PRESENTATIONS_PAGE_CONTENT: Required<PresentationsPageContent> = {
  title: 'All presentations',
  search_label: 'Search',
  search_placeholder: 'Search presentations...',
  year_label: 'Year',
  all_years_label: 'All years',
  open_presentation_label: 'Open presentation',
  empty_title: 'No matching presentations',
  empty_message: 'Try a different year or a broader search term.',
  previous_page_label: 'Previous',
  next_page_label: 'Next',
  page_label: 'Page',
  showing_label: 'Showing',
  total_label: 'total',
  presentation_singular_label: 'presentation',
  presentation_plural_label: 'presentations',
}

const DEFAULT_HOME_HERO_CONTENT: Required<HomeHeroContent> = {
  title_primary: 'OWASP',
  title_accent: 'Threat Dragon',
  subtitle: 'Community Updates',
}

export interface TitleSlideResolvedContent {
  titlePrimary: string
  titleAccent: string
  subtitlePrefix: string
}

export interface RoadmapResolvedLabels {
  deliverables: string
  focusAreas: string
  footerLink: string
}

const trimOrFallback = (value: string | undefined, fallback: string): string => {
  const trimmed = value?.trim()
  return trimmed && trimmed.length > 0 ? trimmed : fallback
}

export const resolveNavigationContent = (
  site: SiteContent,
): Required<NavigationContent> => ({
  brand_title: trimOrFallback(
    site.navigation?.brand_title,
    DEFAULT_NAVIGATION_CONTENT.brand_title,
  ),
  home_label: trimOrFallback(
    site.navigation?.home_label,
    DEFAULT_NAVIGATION_CONTENT.home_label,
  ),
  presentations_label: trimOrFallback(
    site.navigation?.presentations_label,
    DEFAULT_NAVIGATION_CONTENT.presentations_label,
  ),
  latest_presentation_label: trimOrFallback(
    site.navigation?.latest_presentation_label,
    DEFAULT_NAVIGATION_CONTENT.latest_presentation_label,
  ),
  toggle_label: trimOrFallback(
    site.navigation?.toggle_label,
    DEFAULT_NAVIGATION_CONTENT.toggle_label,
  ),
})

export const resolveAppFooterContent = (
  site: SiteContent,
): Required<AppFooterContent> => ({
  repository_label: trimOrFallback(
    site.app_footer?.repository_label,
    DEFAULT_APP_FOOTER_CONTENT.repository_label,
  ),
  repository_url: trimOrFallback(
    site.app_footer?.repository_url,
    DEFAULT_APP_FOOTER_CONTENT.repository_url,
  ),
})

export const resolvePresentationChromeLabel = (site: SiteContent): string =>
  trimOrFallback(
    site.presentation_chrome?.mark_label,
    trimOrFallback(
      site.navigation?.brand_title,
      trimOrFallback(site.title, DEFAULT_PRESENTATION_CHROME_CONTENT.mark_label),
    ),
  )

export const resolvePresentationToolbarContent = (
  site: SiteContent,
): Required<PresentationToolbarContent> => ({
  navigation_label: trimOrFallback(
    site.presentation_toolbar?.navigation_label,
    DEFAULT_PRESENTATION_TOOLBAR_CONTENT.navigation_label,
  ),
  previous_slide_label: trimOrFallback(
    site.presentation_toolbar?.previous_slide_label,
    DEFAULT_PRESENTATION_TOOLBAR_CONTENT.previous_slide_label,
  ),
  next_slide_label: trimOrFallback(
    site.presentation_toolbar?.next_slide_label,
    DEFAULT_PRESENTATION_TOOLBAR_CONTENT.next_slide_label,
  ),
  presentation_mode_label: trimOrFallback(
    site.presentation_toolbar?.presentation_mode_label,
    DEFAULT_PRESENTATION_TOOLBAR_CONTENT.presentation_mode_label,
  ),
})

export const resolvePresentationsPageContent = (
  site: SiteContent,
): Required<PresentationsPageContent> => ({
  title: trimOrFallback(
    site.presentations_page?.title,
    trimOrFallback(site.presentations_page_title, DEFAULT_PRESENTATIONS_PAGE_CONTENT.title),
  ),
  search_label: trimOrFallback(
    site.presentations_page?.search_label,
    DEFAULT_PRESENTATIONS_PAGE_CONTENT.search_label,
  ),
  search_placeholder: trimOrFallback(
    site.presentations_page?.search_placeholder,
    DEFAULT_PRESENTATIONS_PAGE_CONTENT.search_placeholder,
  ),
  year_label: trimOrFallback(
    site.presentations_page?.year_label,
    DEFAULT_PRESENTATIONS_PAGE_CONTENT.year_label,
  ),
  all_years_label: trimOrFallback(
    site.presentations_page?.all_years_label,
    DEFAULT_PRESENTATIONS_PAGE_CONTENT.all_years_label,
  ),
  open_presentation_label: trimOrFallback(
    site.presentations_page?.open_presentation_label,
    DEFAULT_PRESENTATIONS_PAGE_CONTENT.open_presentation_label,
  ),
  empty_title: trimOrFallback(
    site.presentations_page?.empty_title,
    DEFAULT_PRESENTATIONS_PAGE_CONTENT.empty_title,
  ),
  empty_message: trimOrFallback(
    site.presentations_page?.empty_message,
    DEFAULT_PRESENTATIONS_PAGE_CONTENT.empty_message,
  ),
  previous_page_label: trimOrFallback(
    site.presentations_page?.previous_page_label,
    DEFAULT_PRESENTATIONS_PAGE_CONTENT.previous_page_label,
  ),
  next_page_label: trimOrFallback(
    site.presentations_page?.next_page_label,
    DEFAULT_PRESENTATIONS_PAGE_CONTENT.next_page_label,
  ),
  page_label: trimOrFallback(
    site.presentations_page?.page_label,
    DEFAULT_PRESENTATIONS_PAGE_CONTENT.page_label,
  ),
  showing_label: trimOrFallback(
    site.presentations_page?.showing_label,
    DEFAULT_PRESENTATIONS_PAGE_CONTENT.showing_label,
  ),
  total_label: trimOrFallback(
    site.presentations_page?.total_label,
    DEFAULT_PRESENTATIONS_PAGE_CONTENT.total_label,
  ),
  presentation_singular_label: trimOrFallback(
    site.presentations_page?.presentation_singular_label,
    DEFAULT_PRESENTATIONS_PAGE_CONTENT.presentation_singular_label,
  ),
  presentation_plural_label: trimOrFallback(
    site.presentations_page?.presentation_plural_label,
    DEFAULT_PRESENTATIONS_PAGE_CONTENT.presentation_plural_label,
  ),
})

export const resolveHomeHeroContent = (
  site: SiteContent,
): Required<HomeHeroContent> => ({
  title_primary: trimOrFallback(
    site.home_hero?.title_primary,
    DEFAULT_HOME_HERO_CONTENT.title_primary,
  ),
  title_accent: trimOrFallback(
    site.home_hero?.title_accent,
    DEFAULT_HOME_HERO_CONTENT.title_accent,
  ),
  subtitle: trimOrFallback(
    site.home_hero?.subtitle,
    DEFAULT_HOME_HERO_CONTENT.subtitle,
  ),
})

export const resolveTitleSlideContent = (
  slide: TitleSlide,
): TitleSlideResolvedContent => ({
  titlePrimary: trimOrFallback(slide.title_primary, DEFAULT_HOME_HERO_CONTENT.title_primary),
  titleAccent: trimOrFallback(slide.title_accent, DEFAULT_HOME_HERO_CONTENT.title_accent),
  subtitlePrefix: trimOrFallback(slide.subtitle_prefix, 'Quarterly Community Update'),
})

export const resolveRoadmapLabels = (
  presentation: PresentationDeck,
): RoadmapResolvedLabels => ({
  deliverables: trimOrFallback(presentation.roadmap?.deliverables_heading, 'Key deliverables'),
  focusAreas: trimOrFallback(presentation.roadmap?.focus_areas_heading, 'Focus areas'),
  footerLink: trimOrFallback(
    presentation.roadmap?.footer_link_label,
    'View full roadmap & milestones on GitHub',
  ),
})
