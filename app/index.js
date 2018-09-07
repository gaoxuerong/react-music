import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
import { AppContainer } from 'react-hot-loader';

ReactDOM.render( 
        <Root />,
        document.getElementById('root')
    );
if (module.hot) {
    module.hot.accept('./root', () => {
        const NewRoot = Root.default;
        ReactDOM.render(
            <AppContainer>
                <NewRoot />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
