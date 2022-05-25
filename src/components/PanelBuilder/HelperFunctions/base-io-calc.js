import { computed } from "@vue/runtime-core"


export function baseIOCalc(panelIOs, panelComponents, panelLabors) {
    const baseIOLedgerCalc = (io, panelComponents, panelLabors) => {
        // Add components and labor based on base IO amounts.
        io.base_quantity = parseFloat(io.base_quantity)
        io.component_max = parseFloat(io.component_max)
        io.spare_multiplier = parseFloat(io.spare_multiplier)

        let componentAdd = Math.ceil((io.base_quantity + io.base_option_add) * io.spare_multiplier / io.component_max)
        
        for (let i=0; i<io.io_ledgers.length; i++) {
            let ioLedger = io.io_ledgers[i]
            ioLedger.quantity = parseFloat(ioLedger.quantity)
            if (ioLedger.component){
                panelComponents.find(component => {
                    return component.id === ioLedger.component
                }).base_add += componentAdd
            } else if (ioLedger.labor){
                panelLabors.find(labor => {
                    return labor.id === ioLedger.labor
                }).base_add += ioLedger.quantity * Math.ceil((io.base_quantity + io.base_option_add) * io.spare_multiplier)
            }
        }
    }

    for (let i=0; i<panelIOs.length; i++) {
        // Prepopulate panelIO array with option_add and base_option_add fields. Used later.
        let panelIO = panelIOs[i]
        panelIO.option_add = 0
        panelIO.base_option_add = 0
        panelIO.total = computed(() => {
            return panelIO.base_quantity + 
                   panelIO.base_option_add +  
                   panelIO.option_add
        })
        baseIOLedgerCalc(panelIO, panelComponents, panelLabors)
        // console.log(IOAddCheckOK(panelIOs[i], panelComponents, 6))
    }
}