import React from 'react';
import {StatusBar} from 'react-native';
import {QueryClientProvider} from 'react-query';
import {Provider} from 'react-redux';
import {queryClient} from './src/react-query/react-query-configs';
import {store} from './src/redux/store';
import RootNavigator from './src/navigation/RootNavigator';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <StatusBar barStyle="light-content" />
        <RootNavigator />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
