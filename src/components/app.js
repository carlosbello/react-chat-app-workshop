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
            conversations: {},
            currentConversationId: null,
        }
    },

    addConversation(newConversation) {
        this.setState({
            conversations: {
                ...this.state.conversations,
                [newConversation.id]: newConversation,
            }
        });
    },

    componentDidMount() {
        chatClient.on('user', ({type, payload}) => {
            this.addConversation(payload);
        });
        chatClient.getUsers();
    },

    openConversation(id) {
        this.setState({currentConversationId: id});
    },

    closeConversation() {
        this.setState({currentConversationId: null});
    },

    getConversations() {
        const {conversations} = this.state;
        return Object.keys(conversations).map(convId => conversations[convId]);
    },

    render() {
        const {currentConversationId} = this.state;
        if (currentConversationId) {
            return (
                <div>
                    <button onClick={this.closeConversation}>
                        Close
                    </button>
                    {this.state.conversations[currentConversationId].name}
                </div>
            );
        } else {
            return (
                <div>
                    <Header title="Chats"/>
                    <ChatList
                        conversations={this.getConversations()}
                        onSelectChat={this.openConversation}
                    />
                </div>
            );
        }
    },
});

export default App;
