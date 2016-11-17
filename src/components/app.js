import React, {PropTypes as t} from 'react';
import Header from './header';
import ChatList from './chat-list';
import chatClient from '../chat-client';

const App = React.createClass({

    propTypes: {
        currentUser: t.object,
    },

    getInitialState() {
        return {
            conversations: [
            ]
        }
    },

    addConversation(newConversation) {
        this.setState({
            conversations: [
                ...this.state.conversations,
                newConversation,
            ]
        });
    },

    componentDidMount() {
        chatClient.on('user', ({type, payload}) => {
            this.addConversation(payload);
        });
    },

    openChat() {

    },

    render() {
        const {conversations} = this.state;
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