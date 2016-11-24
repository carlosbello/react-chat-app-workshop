import React from 'react';
import Header from './header';
import arrowBack from '../assets/ic_arrow_back.svg';
import ChatBar from './chat-bar';

const twoDigits = num => num > 9 ? num : `0${num}`;

const formatTime = time => {
    const date = new Date(time);
    const mins = date.getMinutes();
    const hours = date.getHours();

    return `${hours}:${twoDigits(mins)}`;
};

const Conversation = ({onClose, conversation, messages, onSend}) => (
    <div>
        <Header
            icon={arrowBack}
            onIconClick={onClose}
            title={conversation.name}
        />
        <ul>
            {Object.keys(messages)
                .map(id => messages[id])
                .map(({text, time, sender}) =>
                <li key={`${time}_${sender}`}>
                    <div>{text}</div>
                    <span>{formatTime(time)}</span>
                </li>
            )}
        </ul>
        <ChatBar onSend={onSend} />
    </div>
);

export default Conversation;
