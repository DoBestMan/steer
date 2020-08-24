export function isProductionDeploy(): boolean {
  const deployRef = process.env.VERCEL_GITHUB_COMMIT_REF;
  return deployRef === 'master';
}

export function isIntegrationDeploy(): boolean {
  const deployRef = process.env.VERCEL_GITHUB_COMMIT_REF;
  return Boolean(
    deployRef && /^dev$|^qa$|^uat$|^dev-st$|^int-/.test(deployRef),
  );
}
