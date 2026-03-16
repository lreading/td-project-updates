import type { GeneratedPresentationData } from '../generation/Generation.types'

export interface InitPresentationInput {
  year: number
  quarter: number
  force?: boolean
}

export interface InitPresentationResult {
  presentationId: string
  createdPaths: string[]
}

export interface FetchPresentationDataInput {
  fromDate: string
  toDate?: string
  presentationId: string
  noPreviousPeriod?: boolean
  write?: boolean
}

export interface FetchPresentationDataResult {
  presentationId: string
  generatedPath: string
  previousPresentationId?: string
  generated: GeneratedPresentationData
  warnings: string[]
}

export interface BuildSiteInput {
  mode?: 'production'
}

export interface BuildSiteResult {
  outputPath: string
}

export interface ServeSiteInput {
  host?: string
  port?: number
  open?: boolean
}

export interface ServeSiteResult {
  url: string
}

export interface ValidateContentInput {
  strict?: boolean
}

export interface ValidateContentResult {
  valid: boolean
  errors: string[]
}
