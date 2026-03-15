import type { PresentationDeck, PresentationSlide } from '../types/content'

const defaultSlideLabels: Record<PresentationSlide['kind'], string> = {
  title: 'Title',
  agenda: 'Agenda',
  'recent-updates': 'What Happened Since Last Update',
  releases: 'Releases',
  roadmap: 'Roadmap',
  'contributor-spotlight': 'Contributor Spotlight',
  'community-highlights': 'Community Highlights',
  'how-to-contribute': 'How To Contribute',
  'thank-you': 'Thank You',
}

export const getSlideLabel = (
  slide: PresentationSlide,
  deck: PresentationDeck,
): string => {
  if (slide.kind === 'roadmap') {
    const activeSection = deck.roadmap?.sections[slide.stage]

    if (activeSection) {
      return `Roadmap: ${activeSection.label}`
    }
  }

  return defaultSlideLabels[slide.kind]
}
