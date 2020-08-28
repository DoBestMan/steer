export function isProductionDeploy(): boolean {
  const deployRef = process.env.VERCEL_GITHUB_COMMIT_REF;
  return deployRef === 'master';
}

export function isIntegrationDeploy(): boolean {
  const deployRef = process.env.VERCEL_GITHUB_COMMIT_REF;
  return Boolean(deployRef && /^dev$|^qa$/.test(deployRef));
}

export function isMockDeploy(): boolean {
  const deployRef = process.env.VERCEL_GITHUB_COMMIT_REF;
  return Boolean(deployRef && /^mock-/.test(deployRef));
}

export function isLocal(): boolean {
  const deployRef = process.env.VERCEL_GITHUB_COMMIT_REF;
  return !deployRef;
}
