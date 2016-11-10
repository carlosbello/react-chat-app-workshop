import React, {PropTypes as t} from 'react';
import Header from './header';
import ChatList from './chat-list';

const App = React.createClass({

    propTypes: {
        currentUser: t.object,
    },

    openChat() {

    },

    render() {
        const conversations = [
            {id: '1', fullName: 'Güama', avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'},
            {id: '2', fullName: 'Hatuey', avatar: 'https://randomuser.me/api/portraits/lego/6.jpg'},
        ];
        return (
            <div>
            <Header title="Chats" />
            <ChatList
                conversations={conversations}
                onSelectChat={this.openChat}
                />
            </div>
        );
    },
});

export default App;