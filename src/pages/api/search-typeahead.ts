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

  const { queryText, queryType } = request.query;

  if (typeof queryText !== 'string' || typeof queryType !== 'string') {
    throw new Error('queryText and queryType must be a string');
  }

  const siteSearch = await backendGetSiteSearch({
    queryText,
    queryType,
  });
  response.json(siteSearch);
};
