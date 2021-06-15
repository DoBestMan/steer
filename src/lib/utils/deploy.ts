export function isProductionDeploy(): boolean {
  const deployRef = process.env.VERCEL_GITHUB_COMMIT_REF;
  return deployRef === 'master';
}

const featureBranchRegex = /^feature-([a-zA-Z]+-[0-9]+).*/;

export function getFeatureBranchTicketName(): string | null {
  const deployRef = process.env.VERCEL_GITHUB_COMMIT_REF;
  let branchId = null;

  if (deployRef) {
    const matches = deployRef.match(featureBranchRegex);
    if (matches !== null) {
      [, branchId] = matches;
      branchId = branchId.toLowerCase();
    }
  }

  return branchId;
}
const mockBranchRegex = /^mock-([a-zA-Z]+-[0-9]+).*/;
export function getMockBranchTicketName(): string | null {
  const deployRef = process.env.VERCEL_GITHUB_COMMIT_REF;
  let branchId = null;

  if (deployRef) {
    const matches = deployRef.match(mockBranchRegex);
    if (matches !== null) {
      [, branchId] = matches;
      branchId = branchId.toLowerCase();
    }
  }

  return branchId;
}

export function isMockDeploy(): boolean {
  const deployRef = process.env.VERCEL_GITHUB_COMMIT_REF;
  return Boolean(deployRef && /^mock-/.test(deployRef));
}

export function isLocal(): boolean {
  const deployRef = process.env.VERCEL_GITHUB_COMMIT_REF;
  return !deployRef;
}
