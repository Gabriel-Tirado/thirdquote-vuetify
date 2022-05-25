<template>
    <div>
        <div style="margin: 10px;"></div>
        <it-input v-model="panelName" :status="panelNameCheck" :message="panelMessage" label-top="Panel Title"/>
        <div style="margin: 10px;"></div>
        <it-input v-model="site" :status="siteCheck" :message="siteMessage" label-top="Destination Site"/>
        <div style="margin: 10px;"></div>
        <it-button v-if="panelNameCheck==='success' && siteCheck==='success' && !auth.profile.employer" @click="budgetaryModal = true" type="primary">Get Budgetary Quote</it-button>
        <it-button v-else-if="panelNameCheck==='success' && siteCheck==='success' && auth.profile.employer" @click="submitPanel" type="primary">Get Budgetary Quote</it-button>
        <it-button v-else disabled>Get Budgetary Quote</it-button>
        <div style="margin: 10px;"></div>
        <it-button v-if="panelErrors===true" @click="panelErrorModal = !panelErrorModal">Panel Warnings</it-button>

        <it-modal v-model="panelErrorModal">
            <template #body>
                <div>
                <h2>Panel Warnings</h2>
                <div v-for="component in panelComponents" :key="component.id">
                    <div v-if="component.max_exceed===true">
                        <p>
                            {{component.component.name}} max value exceeded<br>
                            Part Max: {{component.max}} Part Actual: {{component.total}},
                        </p><br>
                    </div>
                </div>
                </div>
            </template>
        </it-modal>

        <it-modal v-model="budgetaryModal">
            <template #body>
                <div>
                <h2>One Small Step for Man Remains</h2>
                <h4>Please complete some more information and we'll deliver you this quote right away</h4>
                <form @submit.prevent="onSubmit">
                    <it-input v-model="auth.profile.employer" :status="employerCheck" label-top="Name of Employer"/>
                    <it-input v-model="auth.profile.position" :status="positionCheck" label-top="Your Position or Title"/>
                    <it-button v-if="employerCheck==='success' && positionCheck==='success'" type="primary" @click="submit">Submit to Big Brother</it-button>
                    <it-button v-else disabled>Submit to Big Brother</it-button>
                </form>

                </div>
            </template>
        </it-modal>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import VueHorizontal from 'vue-horizontal'
import auth from '../../firebase/auth'
import { createUser, createBudgetary } from '../../firebase/db'
import { computed } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import emailjs from 'emailjs-com'

export default {
    components: [
        VueHorizontal,
    ],
    props: [
        'panel',
        'panelOptions',
        'panelComponents',
        'panelLabors',
        'displayPrice',
    ],
    setup(props){
        const budgetaryModal = ref(false)
        const panelErrorModal = ref(false)
        
        const panelName = ref('')
        const site = ref('')
        const panelMessage = ref('')
        const siteMessage = ref('')
        const router = useRouter()

        const panelErrors = computed(()=> {
            let max_exceed_found = false
            for (let i=0; i<props.panelComponents.length; i++) {
                let panelComponent = props.panelComponents[i]
                if (panelComponent.max_exceed == true) {
                    max_exceed_found = true
                    break
                }
                else {
                    max_exceed_found = false
                }
            }
            return max_exceed_found
        })

        const panelNameCheck = computed(()=>{
            let letterNumber = /^[0-9a-zA-Z\s]+$/
            if (panelName.value && panelName.value.match(letterNumber)){
                panelMessage.value = ''
                return 'success'
            } else if (panelName.value && !panelName.value.match(letterNumber)) {
                panelMessage.value = 'Letters, Numbers and Spaces Only'
                return 'danger'
            }
            panelMessage.value = ''
            return 'default'
        })
        const siteCheck = computed(()=>{
            let letterNumber = /^[0-9a-zA-Z\s,]+$/
            if (site.value && site.value.match(letterNumber)){
                siteMessage.value = ''
                return 'success'
            } else if (site.value && !site.value.match(letterNumber)) {
                siteMessage.value = 'Letters, Numbers, Commas, and Spaces Only'
                return 'danger'
            }
            siteMessage.value = ''
            return 'default'
        })

        const submitPanel = async () => {
            let panelData = {
                email: auth.user.email,
                customerName: auth.user.displayName,
                projectNum: Math.ceil((Date.now() - 1624847000000)/100),
                date: Date(),
                panel: props.panel,
                title: panelName.value,
                site: site.value,
                url: panelName.value.split(" ").join("-"),
                panelComponents: props.panelComponents,
                panelLabors: props.panelLabors,
                displayPrice: props.displayPrice,
            }
            await createBudgetary(panelData)
            // Added
            sendEmail(panelData)
            router.push({name: 'Budgetary', params: {url: panelData.url}})
        }
        // New Function Sends Email
        const sendEmail = (_paramData) => {
            emailjs.send('service_b87xtao', 'template_4nupcly', {
                name: _paramData.customerName,
                email: _paramData.email,
                projectNum: _paramData.projectNum,
                date: _paramData.date,
                panelName: _paramData.title,
                site: _paramData.site,
                url: _paramData.url,
            }, 'SVVgfzbqPTZbcAkjB')
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.log('FAILED...', error);
            });
        }

        const onSubmit = async () => {
          auth.profile.email = auth.user.email
          await createUser({ ...auth.profile})
          submitPanel()
        }
        const employerCheck = computed(()=>{
            if (auth.profile.employer){
                return 'success'
            }
            return 'default'
        })
        const positionCheck = computed(()=>{
            if (auth.profile.position){
                return 'success'
            }
            return 'default'
        })

        return { panelErrors, panelErrorModal, budgetaryModal, onSubmit, auth, employerCheck, positionCheck, panelNameCheck, siteCheck, panelName, site, submitPanel, siteMessage, panelMessage }
    },
    
}
</script>

<style>

</style>