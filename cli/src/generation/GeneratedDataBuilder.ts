import { ContributorAnalyzer } from './ContributorAnalyzer'
import { DeltaCalculator } from './DeltaCalculator'

import type { GeneratedPresentationData, ReleaseEntry } from './Generation.types'
import type { GitHubClient, GitHubReleaseSummary, GitHubRepositoryMetadata } from '../github/GitHubClient.types'
import type { GitHubRepositoryRef } from '../config/Config.types'
import type { ReportingPeriod } from './Generation.types'

interface BuildGeneratedDataInput {
  client: GitHubClient
  presentationId: string
  currentPeriod: ReportingPeriod
  previousPeriod?: ReportingPeriod
  repository: GitHubRepositoryRef
}

const metricLabels = {
  issues_closed: 'Issues closed',
  new_contributors: 'New contributors',
  prs_merged: 'PRs Merged',
  stars: 'GitHub Stars',
} as const

export class GeneratedDataBuilder {
  public constructor(
    private readonly deltaCalculator: DeltaCalculator = new DeltaCalculator(),
    private readonly contributorAnalyzer: ContributorAnalyzer = new ContributorAnalyzer(),
  ) {}

  public async build(input: BuildGeneratedDataInput): Promise<GeneratedPresentationData> {
    const repositoryMetadata = await input.client.getRepositoryMetadata(input.repository)
    const releases = await input.client.listReleases(input.repository)
    const mergedPullRequests = await input.client.listMergedPullRequests(input.repository, input.currentPeriod)
    const historicalAuthors = await input.client.listMergedPullRequestAuthorsBefore(
      input.repository,
      input.currentPeriod.start,
    )
    const closedIssues = await input.client.listClosedIssues(input.repository, input.currentPeriod)

    const contributorAnalysis = this.contributorAnalyzer.analyze(mergedPullRequests, historicalAuthors)
    const previousMergedPullRequests = input.previousPeriod
      ? await input.client.listMergedPullRequests(input.repository, input.previousPeriod)
      : []
    const previousHistoricalAuthors = input.previousPeriod
      ? await input.client.listMergedPullRequestAuthorsBefore(input.repository, input.previousPeriod.start)
      : []
    const previousClosedIssues = input.previousPeriod
      ? await input.client.listClosedIssues(input.repository, input.previousPeriod)
      : []
    const previousContributorAnalysis = input.previousPeriod
      ? this.contributorAnalyzer.analyze(previousMergedPullRequests, previousHistoricalAuthors)
      : undefined
    const previousStars = 0

    return {
      id: input.presentationId,
      period: {
        start: input.currentPeriod.start,
        end: input.currentPeriod.end,
      },
      stats: {
        stars: this.deltaCalculator.createMetric(
          metricLabels.stars,
          repositoryMetadata.stars,
          previousStars,
        ),
        issues_closed: this.deltaCalculator.createMetric(
          metricLabels.issues_closed,
          closedIssues.length,
          previousClosedIssues.length,
        ),
        prs_merged: this.deltaCalculator.createMetric(
          metricLabels.prs_merged,
          mergedPullRequests.length,
          previousMergedPullRequests.length,
        ),
        new_contributors: this.deltaCalculator.createMetric(
          metricLabels.new_contributors,
          contributorAnalysis.newContributorCount,
          previousContributorAnalysis?.newContributorCount ?? 0,
        ),
      },
      releases: this.selectReleases(releases, repositoryMetadata, input.currentPeriod),
      contributors: {
        total: contributorAnalysis.total,
        authors: contributorAnalysis.authors,
      },
      merged_prs: mergedPullRequests
        .filter((pullRequest) => pullRequest.authorLogin)
        .sort((left, right) => left.mergedAt.localeCompare(right.mergedAt))
        .map((pullRequest) => ({
          number: pullRequest.number,
          title: pullRequest.title,
          merged_at: pullRequest.mergedAt,
          author_login: pullRequest.authorLogin as string,
        })),
    }
  }

  private selectReleases(
    releases: GitHubReleaseSummary[],
    repositoryMetadata: GitHubRepositoryMetadata,
    period: ReportingPeriod,
  ): ReleaseEntry[] {
    return releases
      .filter((release) =>
        typeof release.publishedAt === 'string'
        && release.publishedAt >= period.start
        && release.publishedAt <= `${period.end}T23:59:59Z`)
      .sort((left, right) => (right.publishedAt ?? '').localeCompare(left.publishedAt ?? ''))
      .slice(0, 3)
      .map((release) => ({
        id: release.tagName,
        version: release.tagName,
        published_at: release.publishedAt as string,
        url: release.htmlUrl,
        summary_bullets: this.extractReleaseBullets(release, repositoryMetadata),
      }))
  }

  private extractReleaseBullets(
    release: GitHubReleaseSummary,
    repositoryMetadata: GitHubRepositoryMetadata,
  ): string[] {
    const bulletLines = (release.body ?? '')
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.startsWith('- ') || line.startsWith('* '))
      .map((line) => line.slice(2).trim())
      .filter((line) => line.length > 0)
      .slice(0, 5)

    if (bulletLines.length > 0) {
      return bulletLines
    }

    const summarySource = release.name?.trim() || `Release for ${repositoryMetadata.fullName}`
    return [summarySource]
  }
}
