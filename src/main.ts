import semver from 'semver'
import * as core from '@actions/core'

const url = 'https://releases.hashicorp.com/terraform/index.json'

interface Build {
  arch: string
  filename: string
  name: string
  os: string
  url: string
  version: string
}

interface VersionInfo {
  builds: Build[]
  name: string
  shasums: string
  shasums_signature: string
  shasums_signatures: string[]
  version: string
}

interface VersionsData {
  [version: string]: VersionInfo
}

interface TerraformData {
  name: string
  versions: VersionsData
}

export async function run(): Promise<void> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`fetch error: ${response.status}`)
    }

    const data = (await response.json()) as TerraformData
    const versions = Object.keys(data.versions)
    let validVersions = versions.filter(version => semver.valid(version))

    const includePrerelease = core.getInput('include_prerelease') === 'true'
    if (!includePrerelease) {
      validVersions = validVersions.filter(
        version => !semver.prerelease(version)
      )
    }

    if (validVersions.length === 0) {
      throw new Error('No valid version was found')
    }

    const latestVersion = semver.maxSatisfying(validVersions, '*', {
      includePrerelease
    })
    if (!latestVersion) {
      throw new Error('Unable to determine the latest version.')
    }

    core.setOutput('latest_version', latestVersion)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
