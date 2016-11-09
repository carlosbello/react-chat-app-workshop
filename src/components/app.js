import React, {PropTypes as t} from 'react';

const App = React.createClass({

    propTypes: {
        currentUser: t.object,
    },

    render() {
        const {currentUser} = this.props;
        return (
            <h1>Hello {currentUser.name}</h1>
        );
    },
});

export default App;