import { create } from 'zustand'
import { db } from './firebase'
import { doc, getDoc } from 'firebase/firestore'

const useUserStore = create((set) => ({
    currentUser: null,
    isLoading: true,
    color: "#5183fe", // Default color

    fetchUserInfo: async (uid) => {
        if (!uid) return set({ currentUser: null, isLoading: false })

        try {
            const docRef = doc(db, 'users', uid)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                set({ currentUser: docSnap.data(), isLoading: false })
            } else {
                set({ currentUser: null, isLoading: false })
            }

        } catch (error) {
            console.log(error)
            return set({ currentUser: null, isLoading: false })
        }
    },

    setColor: (color) => set({ color }), // Function to update color
}))

export default useUserStore
