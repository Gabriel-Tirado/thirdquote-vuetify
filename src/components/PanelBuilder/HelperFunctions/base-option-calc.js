import { findOption } from './modify-options.js'

export function baseOptionCalc(panel, panelComponents, panelLabors, panelIOs) {
    for (let i=0; i<panel.sections.length; i++) {
        let section = panel.sections[i]
        for (let j=0; j<section.options.length; j++) {
            let option = section.options[j]
            for (let k=0; k<option.option_ledgers.length; k++) {
                let option_ledger = option.option_ledgers[k]
                option_ledger.quantity = parseFloat(option_ledger.quantity)
                if (option_ledger.option_multiplier) {
                    if (option.type === "QTY") {
                        findOption(panel, option_ledger.option_multiplier).baseMultiplier += option_ledger.quantity * option.default
                    } else {
                        findOption(panel, option_ledger.option_multiplier).baseMultiplier += option_ledger.quantity
                    }
                }
            }}}

    for (let i=0; i<panel.sections.length; i++) {
        let section = panel.sections[i]
        for (let j=0; j<section.options.length; j++) {
            let option = section.options[j]
            for (let k=0; k<option.option_ledgers.length; k++) {
                let option_ledger = option.option_ledgers[k]
                option_ledger.quantity = parseFloat(option_ledger.quantity)
                
                if (option.type === "BOOL" && option_ledger.option_num !== option.default) { continue }
                if (option.type === "CHOICE" && option_ledger.option_num !== option.choiceNum) { continue }

                if (option_ledger.io){
                    let panelIO = panelIOs.find(io => {
                        return io.id === option_ledger.io
                    })
                    if (option.type === "QTY") {
                        panelIO.base_option_add += option.default * option_ledger.quantity * (1 + option.baseMultiplier)
                    } else {
                        panelIO.base_option_add += option_ledger.quantity * (1 + option.baseMultiplier)
                    }
                } else if (option_ledger.component) {
                    let panelComponent = panelComponents.find(comp => {
                        return comp.id === option_ledger.component
                    })
                    if (option.type === "QTY") {
                        panelComponent.base_option_add += option.default * option_ledger.quantity * (1 + option.baseMultiplier)
                    } else {
                        panelComponent.base_option_add += option_ledger.quantity * (1 + option.baseMultiplier)
                    }
                } else if (option_ledger.labor) {
                    let panelLabor = panelLabors.find(labor => {
                        return labor.id === option_ledger.labor
                    })
                    if (option.type === "QTY") {
                        panelLabor.base_option_add += option.default * option_ledger.quantity * (1 + option.baseMultiplier)
                    } else {
                        panelLabor.base_option_add += option_ledger.quantity * (1 + option.baseMultiplier)
                    }
                }
        } 
    }
}}