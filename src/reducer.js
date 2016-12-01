import {combineReducers} from 'redux';

const conversations = (state = {}, {type, payload}) => {
    if (type === 'RECEIVE_CONVERSATION') {
        return {
            ...state,
            [payload.id]: payload,
        };
    }
    return state;
};

const addMessageToConversation = (conversationId, message, state) => ({
    ...state,
    [conversationId]: {
        ...state[conversationId],
        [message.id]: message,
    }
});

const messages = (state = {}, {type, payload}) => {
    if (type === 'RECEIVE_MESSAGE') {
        return addMessageToConversation(payload.sender, payload, state);
    } else if (type === 'SEND_MESSAGE') {
        return addMessageToConversation(payload.receiver, payload, state);
    }
    return state;
};

const currentConversationId = (state = null, {type, payload}) => {
    if (type === 'OPEN_CONVERSATION') {
        return payload;
    } else if (type === 'CLOSE_CONVERSATION') {
        return null;
    }
    return state;
};

const reducer = combineReducers({
    conversations,
    messages,
    currentConversationId,
});

export default reducer;
