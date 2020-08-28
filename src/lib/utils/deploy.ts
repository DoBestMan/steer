export function isProductionDeploy(): boolean {
  const deployRef = process.env.VERCEL_GITHUB_COMMIT_REF;
  return deployRef === 'master';
}

export function isFeatureBranchDeploy(): boolean {
  const deployRef = process.env.VERCEL_GITHUB_COMMIT_REF;
  return Boolean(deployRef && /^sqa-/.test(deployRef.toLowerCase()));
}

export function isMockDeploy(): boolean {
  const deployRef = process.env.VERCEL_GITHUB_COMMIT_REF;
  return Boolean(deployRef && /^mock-/.test(deployRef));
}

export function isLocal(): boolean {
  const deployRef = process.env.VERCEL_GITHUB_COMMIT_REF;
  return !deployRef;
}
