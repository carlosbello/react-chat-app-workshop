import React, {PropTypes as t} from 'react';
import Header from './header';
import ChatList from './chat-list';
import chatClient from '../chat-client';
import Conversation from './conversation';

const App = React.createClass({

    propTypes: {
        currentUser: t.object,
    },

    getInitialState() {
        return {
            conversations: {
                'asdf': {name: 'xxx', fullName: 'XXX - YYY', avatar: '', id: 'asdf'}
            },
            currentConversationId: null,
            messsages: {
                'asdf': [
                    {time: new Date(), text: 'Hola', sender: 'Juan'}
                ]
            },
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
        chatClient.on('message', ({type, payload}) => {
            console.log('new message', payload);
        });
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

    sendMessage(message) {
        console.log('SEND', message);
    },

    render() {
        const {currentConversationId, conversations} = this.state;
        if (currentConversationId) {
            const currentConversationMessages = this.state.messsages[currentConversationId];
            return (
                <Conversation
                    conversation={conversations[currentConversationId]}
                    messages={currentConversationMessages}
                    onClose={this.closeConversation}
                    onSend={this.sendMessage}
                />
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
