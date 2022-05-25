import { computed, ref } from "@vue/runtime-core"

export function modifyPanelComponents(panelComponents) {
    // var minRow = 0
    // var maxRow = 0
    for (let i=0; i<panelComponents.length; i++) {
        let panelComponent = panelComponents[i]

        const development = ref(false)
        if (window.location.hostname === 'localhost') {development.value = true}

        // Add extra fields from RPC request
        panelComponent.base_quantity = parseFloat(panelComponent.base_quantity)
        panelComponent.base_add = 0
        panelComponent.base_option_add = 0
        panelComponent.option_add = 0
        panelComponent.base_quantity = parseFloat(panelComponent.base_quantity)
        panelComponent.max = 0
        panelComponent.total = computed(() => {
            if (development.value && panelComponent.autofill) {return panelComponent.max}
            return panelComponent.base_quantity + 
                   panelComponent.base_add + 
                   panelComponent.base_option_add + 
                   panelComponent.option_add
        })

        panelComponent.max_exceed = computed(()=>{
            if (panelComponent.total > panelComponent.max) {
                console.log('max_exceeded')
                return true
            }
            else {
                console.log('not exceeded')
                return false
            }
        })

        if (panelComponent.component.plc_component) {
            let proc_comp = panelComponents.find(comp=>{
                return comp.component.plc_component.processor
            })
            panelComponent.base_left = proc_comp.component_rows[0].left
            panelComponent.base_top = proc_comp.component_rows[0].top + (proc_comp.component.height - panelComponent.component.height)/2
            panelComponent.plc_adder = computed(() => {
                let adder = 0
                for (let j=0; j<panelComponents.length; j++) {
                    let comp = panelComponents[j]
                    if (comp.component.plc_component && comp.component.plc_component.order < panelComponent.component.plc_component.order) {
                        adder += comp.total * comp.component.width
                    }
                }
                return adder
            })
        }
        // Convert string values to float
        for (let j=0; j<panelComponent.component_ledgers.length; j++) {
            let componentLedger = panelComponent.component_ledgers[j]
            componentLedger.quantity = parseFloat(componentLedger.quantity)
        }
        // If the component is not row-listed, the assumed max is placed arbitrarily high (10,000)
        if (panelComponent.component_rows.length < 1){
            panelComponent.max += 10000
        } else {
        // Create a total max from the combined max of each row.
            for (let j=0; j<panelComponent.component_rows.length; j++) {
                let row = panelComponent.component_rows[j]
                row.row_num = parseFloat(row.row_num)
                row.top = parseInt(row.top)
                row.left = parseInt(row.left)
                row.max_comp = parseFloat(row.max_comp)
                row.min = 0
                row.max = 0
                // maxRow += row
                panelComponent.max += row.max_comp
                for (let k=0; k<panelComponent.component_rows.length; k++) {
                    if (k < j) {
                        let lower_row = panelComponent.component_rows[k]
                        row.min += lower_row.max_comp
                        row.max += lower_row.max_comp
                    }
                }
                row.max += row.max_comp
                row.current = computed(()=>{
                    let num = 0
                    if (panelComponent.total <= row.min) {
                        num = 0
                    } else if (panelComponent.total > row.min && panelComponent.total < row.max) {
                        num = panelComponent.total - row.min
                    } else if (panelComponent.total >= row.max) {
                        num = row.max_comp
                    }
                    return num
                })
            }
        }
    }
}