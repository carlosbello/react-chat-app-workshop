export const openConversation = conversationId => ({
    type: 'OPEN_CONVERSATION',
    payload: conversationId,
});

export const closeConversation = conversationId => ({
    type: 'CLOSE_CONVERSATION',
});
