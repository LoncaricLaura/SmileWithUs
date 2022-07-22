import { reactive } from 'vue'

export const store = reactive({
    currentUserEmail: null,
    currentUid: null,
    currentName: null,
    currentOrdination: null
})