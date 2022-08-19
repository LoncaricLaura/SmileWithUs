import { reactive } from 'vue'
import { createStore } from 'vuex'

/*
export const store = reactive({
    currentUserEmail: null,
    currentUid: null,
    currentName: null,
    currentOrdination: null,
    selectedOrdination: ''
})*/

export const store = createStore({
    state: {
        currentUserEmail: null,
        currentUid: null,
        currentName: null,
        c: null,
        selectedOrdination: '',
        selectedService: '',
        selectedDate: '',
        userRole: null,
        currentAdminName: '',
    },
    mutations: {},
    actions: {},
    getters: {}
  });
