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
        selectedOrdinationId: null,
        selectedOrdination: '',
        selectedService: ''
    },
    mutations: {},
    actions: {},
    getters: {}
  });
