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
        identification: null,
        selectedOrdinationId: null,
        selectedOrdination: '',
        selectedService: '',
        selectedDate: '',
        userRole: null,
        currentAdminName: '',
        adminOrdiantionId: null,
        numberOfNewOrders: null,
        ordinationIdSlider: null,
        patientId: null,
    },
    mutations: {},
    actions: {},
    getters: {},
})
