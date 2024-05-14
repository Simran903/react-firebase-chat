import React from 'react'
import List from '../components/list/List'
import Chat from '../components/chat/Chat'
import Detail from '../components/detail/Detail'
import useChatStore from '../lib/chatStore'

const ChatApp = () => {
    const { chatId } = useChatStore()
    
    return (
        <div className='container'>
            <List />
            {chatId && <Chat />}
        </div>
    )
}

export default ChatApp