# SBOM

Slide Spec publishes a Software Bill of Materials in CycloneDX JSON format for every tagged release.

## Latest artifact

- Download the latest SBOM: <https://github.com/lreading/slide-spec/releases/latest/download/sbom.cyclonedx.json>
- Browse release assets: <https://github.com/lreading/slide-spec/releases/latest>

## Format

The release SBOM is generated in `cyclonedx-json` format during CI and attached to the corresponding GitHub Release as `sbom.cyclonedx.json`.

## Scope

The SBOM is intended to give consumers a machine-readable inventory for the release contents published from this repository. For broader release provenance and artifact context, see [Supply Chain](/meta/supply-chain).
