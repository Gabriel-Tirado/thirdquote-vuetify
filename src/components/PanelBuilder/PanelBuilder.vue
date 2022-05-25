<template>
  <main>
      <Control
       :calcSolution="solution"
       :calcPanel="panel"
       :calcSubpanelComp="subpanelComp"
       :calcEnclosureComp="enclosureComp" 
       :calcPanelIOs="panelIOs"
       :calcPanelComponents="panelComponents"
       :calcPanelLabors="panelLabors"
      />
    </main>
</template>

<script>
import { ref } from 'vue'
import Control from '@/components/PanelBuilder/PanelBuilderControl'
import auth from '../../firebase/auth'
import { getUser } from '../../firebase/db'
import { apiurl } from '../../drf/drfapi'

export default {
    components: {
        Control,
    },
    props: [
        'url',
        'panel_url',
    ],
    async setup (props) {
        const APIFetch = async (addr) => {
            const response = await fetch(apiurl.concat(addr));
            const data = await response.json();
            return data
        }
        // The following APIFetch commands are performed Asynchronously. Subsequent code awaits these responses. Work should only begin after all awaits are returned. Or else I am Jon Snow
        const solutionsResponse = APIFetch('/solution/')
        const panelsResponse = APIFetch('/panel/')
        const componentsResponse = APIFetch('/component/')
        // const optionLedgersResponse = APIFetch('/option-ledger/')
        const panelIOResponse = APIFetch('/panel-io/')
        // const ioLedgersResponse = APIFetch('/io-ledger/')
        const panelComponentsResponse = APIFetch('/panel-component/')
        // const componentLedgersResponse = APIFetch('/component-ledger')
        const panelLaborsResponse = APIFetch('/panel-labor/')
        const plcCompTypesResponse = APIFetch('/plc-component-type/')
        const componentRowsResponse = APIFetch('/component-row/')
        const laborsResponse = APIFetch('/labor/')

        // Solution Selection
        const solutions = ref(null)
        solutions.value = await solutionsResponse        

        const solution = ref(solutions.value.find(solution=>{
            return solution.url === props.url
        }))
        
        // Panel Selection
        const panels = ref(null)
        panels.value = await panelsResponse

        const panel = ref(panels.value.find(panel=>{
            return panel.panel_url === props.panel_url && 
            panel.solution === solution.value.id
        })) 
        panel.value.sections.forEach(section=>section.drawer = false)
        
        // Components Setup
        const components = ref(null)
        components.value = await componentsResponse

        const subpanelComp = ref(components.value.find(comp=>{
            return comp.id === panel.value.subpanel.component
        }))

        const enclosureComp = ref(components.value.find(comp=>{
            return comp.id === panel.value.enclosure.component
        }))

        // // Option Ledgers Selection
        // const optionLedgers = ref(null)
        // optionLedgers.value = await optionLedgersResponse

        const allPanelIOs = ref(null)
        allPanelIOs.value = await panelIOResponse

        const panelIOs = ref(allPanelIOs.value.filter(io=>io.panel === panel.value.id))
        const panelIOArray = ref(panelIOs.value.map(obj=>obj.id))

        // const ioLedgers = ref(null)
        // ioLedgers.value = await ioLedgersResponse

        // const panelIOLedgers = ref(ioLedgers.value.filter(ledger=>panelIOArray.value.includes(ledger.io)))

        const allPanelComponents = ref(null)
        allPanelComponents.value = await panelComponentsResponse

        const panelComponents = ref(allPanelComponents.value.filter(comp=>comp.panel === panel.value.id))
        const panelComponentArray = ref(panelComponents.value.map(obj=>obj.id))

        // const componentLedgers = ref(null)
        // componentLedgers.value = await componentLedgersResponse

        // const panelComponentLedgers = ref(componentLedgers.value.filter(comp=>panelComponentArray.value.includes(comp.component)))

        const allPanelLabors = ref(null)
        allPanelLabors.value = await panelLaborsResponse

        const panelLabors = ref(allPanelLabors.value.filter(labor=>labor.panel === panel.value.id))

        const plcCompTypes = ref(null)
        plcCompTypes.value = await plcCompTypesResponse

        const componentRows = ref(null)
        componentRows.value = await componentRowsResponse

        const labors = ref(null)
        labors.value = await laborsResponse
        // Jon Snow says all data should be brought in at this point. Therefore, utilizing object data should be copacetic.
    
        auth.profile = await getUser(auth.user.email)
        
        
        return {solution,
                panel,
                subpanelComp,
                enclosureComp,
                panelIOs,
                panelIOArray,
                panelComponents,
                panelComponentArray,
                panelLabors, 
        }
    }

}
</script>

