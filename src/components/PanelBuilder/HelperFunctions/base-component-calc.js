export function baseComponentCalc(panelComponents, panelLabors) {

const baseComponentLedgerCalc = (component, panelComponents, panelLabors) => {
    for (let i=0; i<component.component_ledgers.length; i++) {
        let componentLedger = component.component_ledgers[i]
        if (componentLedger.child) {
            panelComponents.find(child => {
                return child.id === componentLedger.child
            }).base_add += componentLedger.quantity * (component.base_add + component.base_quantity + component.base_option_add)
        } else if (componentLedger.labor) {
            panelLabors.find(labor => {
                return labor.id === componentLedger.labor
            }).base_add += componentLedger.quantity * (component.base_add + component.base_quantity + component.base_option_add)
        }
    }
}
for (let i=0; i<panelComponents.length; i++) {
    baseComponentLedgerCalc(panelComponents[i], panelComponents, panelLabors)
}

}
