import { NextApiRequest, NextApiResponse } from 'next';

import { ListResultMetadata } from '~/data/models/ListResultMetadata';
import { SiteSearchResultGroup } from '~/data/models/SiteSearchResultGroup';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetSiteSearch } from '~/lib/backend/site-search';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<{
    resultMetadata: ListResultMetadata;
    siteSearchResultGroupList: SiteSearchResultGroup[];
  }>,
) => {
  backendBootstrap({ request });

  const { additionalQueryText, queryText, queryType } = request.query;

  if (
    typeof queryText !== 'string' ||
    typeof queryType !== 'string' ||
    typeof additionalQueryText !== 'string'
  ) {
    throw new Error('All search paramaters must be a string');
  }

  const siteSearch = await backendGetSiteSearch({
    additionalQueryText,
    queryText,
    queryType,
  });

  response.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate',
  );

  response.json(siteSearch);
};
