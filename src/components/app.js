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
        const me = this.props.currentUser.id;
        const message = this.createMessage({text: 'patata biónica', sender: 'asdf', receiver: me});
        return {
            conversations: {
                'asdf': {name: 'xxx', fullName: 'XXX - YYY', avatar: '', id: 'asdf'}
            },
            currentConversationId: null,
            messages: {
                [message.sender]: [
                    message
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
        const me = this.props.currentUser.id;
        chatClient.on('user', ({type, payload}) => {
            this.addConversation(payload);
        });
        chatClient.getUsers();
        chatClient.on('message', ({payload, sender, time}) => {
            this.addMessage(this.createMessage({
                text: payload.text,
                sender: sender,
                receiver: me,
                time,
            }));
        });
    },

    addMessage(message) {
        const {messages} = this.state;
        const me = this.props.currentUser.id;
        const conversationId = message.sender === me
            ? message.receiver
            : message.sender;

        this.setState({
            messages: {
                ...messages,
                [conversationId]: {
                    ...messages[conversationId],
                    [message.id]: message,
                }
            }
        });
    },

    createMessage({text, sender, receiver, time = Date.now()}) {
        return {
            id: `${time}-${sender}`,
            text: text,
            time,
            sender,
            receiver,
        };
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

    sendMessage(text) {
        const {currentConversationId} = this.state;
        const me = this.props.currentUser.id;
        const newMessage = this.createMessage({text: text, sender: me, receiver: currentConversationId});
        chatClient.sendMessage(text, currentConversationId);
        this.addMessage(newMessage);
    },

    getMessages(conversationId) {
        return this.state.messages[conversationId] || [];
    },

    render() {
        const {currentConversationId, conversations} = this.state;
        if (currentConversationId) {
            const currentConversationMessages = this.getMessages(currentConversationId);
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
