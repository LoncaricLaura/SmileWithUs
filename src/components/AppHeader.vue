<template>
    <div
        class="absolute flex w-full h-full lg:h-auto px-6 sm:px-12 md:px-24 lg:px-32 pt-4 top-0 lg:top-0 pt-8"
        :class="
            open
                ? 'bg-gradient-to-r from-gray-700 to-gray-900 lg:bg-inherit transform origin-top-right transition duration-300 fade-in-out'
                : ''
        "
    >
        <div class="flex items-top lg:items-center pt-6 lg:pt-0">
            <router-link to="/">
                <p
                    class="text-3xl md:text-4xl font-extrabold text-[#244B8E] italic"
                    :class="[open ? 'text-[white]' : '']"
                >
                    SmileWithUs
                </p>
            </router-link>
        </div>

        <div class="lg:hidden flex justify-end fixed right-6 sm:right-12 md:right-24 top-16">
            <button
                class="flex items-center px-6 py-3 rounded font-extrabold text-[0300A6]"
                @click="toggle"
            >
                <svg
                    class="open absolute fill-current h-5 w-5 transform transition duration-1000 ease-in-out"
                    :class="open ? 'hidden' : 'open'"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>

                <svg
                    class="close absolute transform transition duration-1000 ease-in-out"
                    :class="open ? 'close' : 'hidden'"
                    height="18px"
                    version="1.1"
                    viewBox="0 0 14 14"
                    width="18px"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                    <title />
                    <desc />
                    <defs />
                    <g
                        fill="none"
                        fill-rule="evenodd"
                        id="Page-1"
                        stroke="none"
                        stroke-width="1"
                    >
                        <g
                            fill="white"
                            id="Core"
                            transform="translate(-341.000000, -89.000000)"
                        >
                            <g
                                id="close"
                                transform="translate(341.000000, 89.000000)"
                            >
                                <path
                                    d="M14,1.4 L12.6,0 L7,5.6 L1.4,0 L0,1.4 L5.6,7 L0,12.6 L1.4,14 L7,8.4 L12.6,14 L14,12.6 L8.4,7 L14,1.4 Z"
                                    id="Shape"
                                />
                            </g>
                        </g>
                    </g>
                </svg>
            </button>
        </div>
        <div
            class="flex flex-col lg:flex-row w-full lg:justify-end lg:space-x-12 pt-[140px] lg:pt-0 text-xl lg:flex lg:text-xl font-bold text-white lg:text-[#244B8E] text-end items-end lg:items-center"
            :class="open ? 'block ' : 'hidden'"
        >
            <div
                class="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8 pb-6 lg:pb-0"
            >
                <router-link to="/" class="hover:font-bold" @click="closeMenu" v-if="store.state.currentUserEmail"
                    >Home
                </router-link>

                <router-link to="/" class="hover:font-bold" @click="closeMenu" v-if="store.state.currentUserEmail"
                    >Ordiantions</router-link
                >
            </div>
            <div class="flex flex-col lg:flex-row items-end lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
                <router-link to="/signup" @click="closeMenu" v-if="!store.state.currentUserEmail" class="hover:font-bold text-[#1B3B73] lg:text-white bg-white lg:bg-[#1B3B73] py-2 px-4 rounded-full"
                    >Sign up</router-link
                >
                <router-link
                    to="/login"
                    @click="closeMenu"
                    class="hover:font-bold "
                    v-if="!store.state.currentUserEmail"
                    >Login </router-link
                >
                <div
                    v-if="store.state.currentUserEmail"
                    class="text-[#1B3B73] pl-2 cursor-pointer "
                    @click="signout()"
                >
                    Log out
                </div>
            </div>
        </div>
        
          <div class="hidden md:flex items-center text-xl md:text-2xl text-slate-700 font-bold pl-12 w-1/5" v-if="store.state.currentName">
            Hi, {{ store.state.currentName }}
          </div>
    </div>
</template>

<script>
import { db } from '../firebase'
import { store } from '../store'
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth'

const auth = getAuth()
//monitoring the user's login status
onAuthStateChanged(auth, (user) => {
    if (user) {
        store.state.currentUserEmail = user.email
        localStorage.setItem('checkLogedUser', store.state.currentUserEmail)
        store.state.currentName = user.displayName
        store.state.currentUid = user.uid
    } else {
        store.state.currentUserEmail = null
        store.state.currentName = null
        localStorage.clear()
    }
})

export default {
    name: 'AppHeader',
    data() {
        return {
            open: false,
            store,
            users: []
        }
    },
    firestore: {
        users: db.collection('users'),
    },
    methods: {
        closeMenu() {
            this.open = false
        },
        toggle() {
            this.open = !this.open
        },
        signout() {
            signOut(auth)
                .then(() => {
                    this.$router.replace({ name: '/' })
                })
                .catch((error) => {
                    console.log(error)
                })
        },
    },
}
</script>

<style>
.router-link-exact-active {
    font-weight: bold;
}
</style>
