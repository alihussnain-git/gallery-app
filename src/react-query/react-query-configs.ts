import {QueryClient, QueryClientConfig} from 'react-query';

export const config: QueryClientConfig = {
  defaultOptions: {queries: {cacheTime: 2000, retry: 0}},
};

export const queryClient = new QueryClient(config);
