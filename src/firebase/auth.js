import { reactive } from 'vue'

const auth = reactive({
    user: {},
    profile: {},
    loggedIn: false,
    internal: false,
    partner: false,
})

export default auth
