import React from 'react';
import Header from './header';
import arrowBack from '../assets/ic_arrow_back.svg';

const Conversation = ({onClose, conversation}) => (
    <div>
        <Header
            icon={arrowBack}
            onIconClick={onClose}
            title={conversation.name}
        />
        {conversation.name}
    </div>
);

export default Conversation;
