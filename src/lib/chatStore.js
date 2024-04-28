import { create } from 'zustand'
import useUserStore from './userStore'

const useChatStore = create((set) => ({
    chatId: null,
    user: null,
    isCurrentuserBlocked: false,
    isReceiverBlocked: false,
    changeChat: (chatId, user) => {
        const currentUser = useUserStore.getState().currentUser

        // CHECKING IF CURRENT USER IS BLOCKED
        if (user.blocked.includes(currentUser.id)) {
            return set({
                chatId,
                user: null,
                isCurrentuserBlocked: true,
                isReceiverBlocked: false,
            })
        }

        // CHECKING IF RECEIVER IS BLOCKED
        else if (currentUser.blocked.includes(user.id)) {
            return set({
                chatId,
                user: user,
                isCurrentuserBlocked: false,
                isReceiverBlocked: true,
            })
        } else{

            set({
                chatId,
                user,
                isCurrentuserBlocked: false,
                isReceiverBlocked: false,
            })
        }
    },

    changeBlock: () => {
        set((state) => ({...state, isReceiverBlocked: !state.isReceiverBlocked}))
    }


}))

export default useChatStore
