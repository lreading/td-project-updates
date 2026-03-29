import type {
  BuildSiteInput,
  BuildSiteResult,
  FetchPresentationDataInput,
  FetchPresentationDataResult,
  InitFromExampleInput,
  InitFromExampleResult,
  InitPresentationInput,
  InitPresentationResult,
  ServeSiteInput,
  ServeSiteResult,
  ValidateContentInput,
  ValidateContentResult,
} from './TdCliService.types'

export interface TdCliService {
  initPresentation(input: InitPresentationInput): Promise<InitPresentationResult>
  initFromExample(input: InitFromExampleInput): Promise<InitFromExampleResult>
  fetchPresentationData(input: FetchPresentationDataInput): Promise<FetchPresentationDataResult>
  buildSite(input: BuildSiteInput): Promise<BuildSiteResult>
  serveSite(input: ServeSiteInput): Promise<ServeSiteResult>
  validateContent(input: ValidateContentInput): Promise<ValidateContentResult>
}
