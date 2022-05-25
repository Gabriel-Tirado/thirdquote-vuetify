// import { computed } from "@vue/runtime-core";
import { watch } from '@vue/runtime-core'
import { findOption } from './modify-options.js'

export function optionWatchAssign(panel, panelComponents, panelIOs, panelLabors) {
    for (let i=0; i<panel.sections.length; i++) {
        let section = panel.sections[i]
        for (let j=0; j<section.options.length; j++) {
            let option = section.options[j]
            watch(option, () => {
                let choiceChangeDetect = option.choiceNum !== option.lastOption && (option.type === "CHOICE" || option.type === "BOOL")
                let qtyChangeDetect = option.selection !== option.lastOption && option.type === "QTY"
                let multiplierChange = option.oldMultiplier !== option.multiplier
                if (choiceChangeDetect){
                    console.log('choiceChangeDetect')
                }
                if (qtyChangeDetect){
                    console.log('qtyChangeDetect')
                }
                if (multiplierChange){
                    console.log('multiplierChange')
                }
                if (choiceChangeDetect || qtyChangeDetect || multiplierChange){
                    optionControl(panel, option, panelComponents, panelIOs, panelLabors)
                }
            })
        }
    }
}

const removeComponent = (component, panelComponents, panelLabors, quantity) => {
    // console.log('remove component')
    component.option_add -= quantity
    for (let i=0; i<component.component_ledgers.length; i++) {
        let componentLedger = component.component_ledgers[i]
        if (componentLedger.child) {
            removeComponent(panelComponents.find(child => {
                return child.id === componentLedger.child
            }), panelComponents, panelLabors, quantity * componentLedger.quantity)
        } else if (componentLedger.labor) {
            panelLabors.find(labor => {
                return labor.id === componentLedger.labor
            }).option_add -= quantity 
        }
    }
}

const addComponent = (component, panelComponents, panelLabors, quantity) => {
    // console.log('add component')
    component.option_add += quantity
    for (let i=0; i<component.component_ledgers.length; i++) {
        let componentLedger = component.component_ledgers[i]
        // console.log(componentLedger)
        if (componentLedger.child) {
            addComponent(panelComponents.find(child => {
                return child.id === componentLedger.child
            }), panelComponents, panelLabors, quantity * componentLedger.quantity)
        } else if (componentLedger.labor) {
            panelLabors.find(labor => {
                return labor.id === componentLedger.labor
            }).option_add += quantity 
        }
    }
}

const removeIO = (io, panelComponents, panelLabors, quantity) => {
    // console.log('remove io')
    let currentComponentCount = Math.ceil((io.base_quantity + io.base_option_add + io.option_add) * io.spare_multiplier / io.component_max)
    let futureComponentCount = Math.ceil((io.base_quantity + io.base_option_add + io.option_add - quantity) * io.spare_multiplier / io.component_max)
    let removeComponentCount = currentComponentCount - futureComponentCount
    io.option_add -= quantity

    for (let i=0; i<io.io_ledgers.length; i++) {
        let io_ledger = io.io_ledgers[i]
        if (io_ledger.component){
            removeComponent(panelComponents.find(component => {
                return component.id === io_ledger.component
            }), panelComponents, panelLabors, removeComponentCount)
        } else if (io_ledger.labor){
            panelLabors.find(labor => {
                return labor.id === io_ledger.labor
            }).option_add -= io_ledger.quantity * quantity
        }
    }
}

const addIO = (io, panelComponents, panelLabors, quantity) => {
    // console.log('add io')
    let currentComponentCount = Math.ceil((io.base_quantity + io.base_option_add + io.option_add) * io.spare_multiplier / io.component_max)
    let futureComponentCount = Math.ceil((io.base_quantity + io.base_option_add + io.option_add + quantity) * io.spare_multiplier / io.component_max)
    let addComponentCount = futureComponentCount - currentComponentCount
    io.option_add += quantity

    for (let i=0; i<io.io_ledgers.length; i++) {
        let io_ledger = io.io_ledgers[i]
        if (io_ledger.component){
            addComponent(panelComponents.find(component => {
                return component.id === io_ledger.component
            }), panelComponents, panelLabors, addComponentCount)
        } else if (io_ledger.labor){
            panelLabors.find(labor => {
                return labor.id === io_ledger.labor
            }).option_add += io_ledger.quantity * quantity
        }
    }
}

const optionControl = (panel, option, panelComponents, panelIOs, panelLabors) => {
    // console.log('option control')
    for (let i=0; i<option.option_ledgers.length; i++) {
        let optionLedger = option.option_ledgers[i]
        // console.log(optionLedger)
        let totalMultiplier = (1 + option.baseMultiplier + option.multiplier)
        let oldTotalMultiplier = (1 + option.baseMultiplier + option.oldMultiplier)
        var optionRemoveCondition = false
        var optionAddCondition = false
        var optionQuantity = 0

        if (option.oldMultiplier !== option.multiplier) {
            let typeSelectCheck = false

            if (option.type === "CHOICE" || option.type === "BOOL") {
                typeSelectCheck = optionLedger.option_num === option.choiceNum 
            } else {
                typeSelectCheck = true
            }

            optionRemoveCondition = option.oldMultiplier > option.multiplier && typeSelectCheck
            optionAddCondition = option.multiplier > option.oldMultiplier && typeSelectCheck

            if (optionAddCondition) {
                optionQuantity = optionLedger.quantity * (totalMultiplier - oldTotalMultiplier)
            } else {
                optionQuantity = optionLedger.quantity * (oldTotalMultiplier - totalMultiplier)
            }

        } else if (option.type === "CHOICE") {
            optionRemoveCondition = optionLedger.option_num === option.lastOption
            optionAddCondition = optionLedger.option_num === option.choiceNum
            optionQuantity = optionLedger.quantity * totalMultiplier
        } else if (option.type === "BOOL") {
            optionRemoveCondition = optionLedger.option_num === option.lastOption
            optionAddCondition = optionLedger.option_num === option.choiceNum
            optionQuantity = optionLedger.quantity * totalMultiplier
        } else if (option.type === "QTY") {
            optionRemoveCondition = option.lastOption > option.selection
            optionAddCondition = option.selection > option.lastOption
            if (optionRemoveCondition) {
                optionQuantity = (option.lastOption - option.selection) * optionLedger.quantity * totalMultiplier
            } else if (optionAddCondition) {
                optionQuantity = (option.selection - option.lastOption) * optionLedger.quantity * totalMultiplier
            }
        }

        if (optionLedger.io) {
            let panelIO = panelIOs.find(io => {
                return io.id === optionLedger.io
            })
            if (optionRemoveCondition) {
                removeIO(panelIO, panelComponents, panelLabors, optionQuantity)
            } else if (optionAddCondition) {
                addIO(panelIO, panelComponents, panelLabors, optionQuantity)
            } else {continue}
        } else if (optionLedger.component) {
            let panelComponent = panelComponents.find(comp => {
                return comp.id === optionLedger.component
            })
            if (optionRemoveCondition) {
                removeComponent(panelComponent, panelComponents, panelLabors, optionQuantity)
            } else if (optionAddCondition) {
                addComponent(panelComponent, panelComponents, panelLabors, optionQuantity)
            } else {continue}
        } else if (optionLedger.labor) {
            let panelLabor = panelLabors.find(labor => {
                return labor.id === optionLedger.labor
            })
            if (optionRemoveCondition) {
                // console.log('remove labor')
                panelLabor.option_add -= optionQuantity
            } else if (optionAddCondition) {
                // console.log('add labor')
                panelLabor.option_add += optionQuantity
            } else {continue}
        } else if (optionLedger.option_multiplier) {
            let multipliedOption = findOption(panel, optionLedger.option_multiplier)
            
            if (optionRemoveCondition) {
                // console.log('remove multiply')
                console.log(multipliedOption)
                multipliedOption.multiplier -= optionQuantity
            } else if (optionAddCondition) {
                // console.log('add multiply')
                multipliedOption.multiplier += optionQuantity
            } else {continue}
            optionControl(panel, multipliedOption, panelComponents, panelIOs, panelLabors)
        }        
            
    }

    if (option.type === "CHOICE" || option.type === "BOOL") {
        option.lastOption = option.choiceNum
    } else {
        option.lastOption = option.selection
    }

    option.oldMultiplier = option.multiplier
}