import 'react-native-gesture-handler';
import React, {useRef} from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer, useLinking} from '@react-navigation/native';
import store from './REDUX/store';
import HomePage from './Components/HomePage';
import {linkingConfig} from './Components/DeepLinking/linkingConfig';

export default function App() {
  const ref = useRef();

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  const {getInitialState} = useLinking(ref, linkingConfig);

  React.useEffect(() => {
    Promise.race([
      getInitialState(),
      new Promise(resolve =>
        // Timeout in 150ms if `getInitialState` doesn't resolve
        // Workaround for https://github.com/facebook/react-native/issues/25675
        setTimeout(resolve, 1000),
      ),
    ])
      .catch(e => {
        console.error(e);
      })
      .then(state => {
        console.log(state, 'states');
        if (state !== undefined) {
          setInitialState(state);
          setIsReady(true);
        }
      });
  }, [getInitialState]);

  return (
    <NavigationContainer initialState={initialState} ref={ref}>
      <Provider store={store}>
        <HomePage isExternalLink={isReady} />
      </Provider>
    </NavigationContainer>
  );
}
