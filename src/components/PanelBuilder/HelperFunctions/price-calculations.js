import { computed, reactive } from "vue";

export function priceCalculations(panel, panelComponents, panelLabors, roundingFactor) {
    let round = parseFloat('1' + '0'.repeat(roundingFactor)) 
    
    const baseMaterialCost = computed(()=>{
        let cost = 0
        for (let i=0; i<panelComponents.length; i++) {
            let comp = panelComponents[i]
            cost += (comp.base_quantity + comp.base_add + comp.base_option_add) * comp.component.cost
        }
        cost += parseFloat(panel.subpanel.component.cost) + parseFloat(panel.enclosure.component.cost)
        if (cost > -100 && cost < 0) {
            cost = 0
        }
        cost = Math.ceil(cost / round) * round
        return cost
    })
    const baseLaborCost = computed(()=>{
        let cost = 0
        for (let i=0; i<panelLabors.length; i++) {
            let labor = panelLabors[i]
            cost += (labor.base_hours + labor.base_add + labor.base_option_add) * labor.type.cost
        }
        if (cost > -100 && cost < 0) {
            cost = 0
        }
        cost = Math.ceil(cost / round) * round
        return cost
    })
    const optionMaterialCost = computed(()=>{
        let cost = 0
        for (let i=0; i<panelComponents.length; i++) {
            let comp = panelComponents[i]
            cost += comp.option_add * comp.component.cost
        }
        if (cost > -100 && cost < 0) {
            cost = 0
        }
        cost = Math.ceil(cost / round) * round

        return cost
    })
    const optionLaborCost = computed(()=>{
        let cost = 0
        for (let i=0; i<panelLabors.length; i++) {
            let labor = panelLabors[i]
            cost += labor.option_add * labor.type.cost
        }
        if (cost > -100 && cost < 0) {
            cost = 0
        }
        cost = Math.ceil(cost / round) * round
        return cost
    })
    const materialCost = computed(()=> {
        return baseMaterialCost.value + optionMaterialCost.value
    })
    const laborCost = computed(()=> {
        return baseLaborCost.value + optionLaborCost.value
    })
    const baseMaterialSell = computed(()=>{
        let sell = 0
        for (let i=0; i<panelComponents.length; i++) {
            let comp = panelComponents[i]
            sell += (comp.base_quantity + comp.base_add + comp.base_option_add) * comp.component.sell
        }
        sell += parseFloat(panel.subpanel.component.sell) + parseFloat(panel.enclosure.component.sell)
        sell = Math.ceil(sell / round) * round
        return sell
    })
    const baseLaborSell = computed(()=>{
        let sell = 0
        for (let i=0; i<panelLabors.length; i++) {
            let labor = panelLabors[i]
            sell += (labor.base_hours + labor.base_add + labor.base_option_add) * labor.type.sell
        }
        if (sell > -100 && sell < 0) {
            sell = 0
        }
        sell = Math.ceil(sell / round) * round
        return sell
    })
    const optionMaterialSell = computed(()=>{
        let sell = 0
        for (let i=0; i<panelComponents.length; i++) {
            let comp = panelComponents[i]
            sell += comp.option_add * comp.component.sell
        }
        if (sell > -100 && sell < 0) {
            sell = 0
        }
        sell = Math.ceil(sell / round) * round
        return sell
    })
    const optionLaborSell = computed(()=>{
        let sell = 0
        for (let i=0; i<panelLabors.length; i++) {
            let labor = panelLabors[i]
            sell += labor.option_add * labor.type.sell
        }
        if (sell > -100 && sell < 0) {
            sell = 0
        }
        sell = Math.ceil(sell / round) * round
        return sell
    })
    const baseCost = computed(()=>{
        return baseLaborCost.value + baseMaterialCost.value
    })
    const baseSell = computed(()=>{
        return baseLaborSell.value + baseMaterialSell.value
    })
    const optionCost = computed(()=>{
        return optionLaborCost.value + optionMaterialCost.value
    })
    const optionSell = computed(()=>{
        return optionLaborSell.value + optionMaterialSell.value
    })
    const cost = computed(()=>{
        return baseCost.value + optionCost.value
    })
    const materialSell = computed(()=>{
        return baseMaterialSell.value + optionMaterialSell.value
    })
    const laborSell = computed(()=>{
        return baseLaborSell.value + optionLaborSell.value
    })
    const sell = computed(()=>{
        return baseSell.value + optionSell.value
    })
    function formatterFunction(formattedValue) {
        let sigDig = 1
        if (formattedValue.toString().length - 2 > 1) {sigDig = formattedValue.toString().length - 2}
        let formatter = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumSignificantDigits: sigDig
      })
      return formatter.format(formattedValue)  
      }
    const dispBaseMaterialSell = computed(()=>{
    return formatterFunction(baseMaterialSell.value)
    })
    const dispBaseLaborSell = computed(()=>{
    return formatterFunction(baseLaborSell.value)
    })
    const dispOptionMaterialSell = computed(()=>{
    return formatterFunction(optionMaterialSell.value)
    })
    const dispOptionLaborSell = computed(()=>{
    return formatterFunction(optionLaborSell.value)
    })
    const dispOptionSell = computed(()=>{
    return formatterFunction(optionSell.value)
    })
    const dispBaseSell = computed(()=>{
    return formatterFunction(baseSell.value)
    })
    const dispMaterialSell = computed(()=>{
    return formatterFunction(materialSell.value)    
    })
    const dispLaborSell = computed(()=>{
    return formatterFunction(laborSell.value)    
    })
    const dispSell = computed(()=>{
    return formatterFunction(sell.value)
    })

    const dispBaseMaterialCost = computed(()=>{
    return formatterFunction(baseMaterialCost.value)
    })
    const dispBaseLaborCost = computed(()=>{
    return formatterFunction(baseLaborCost.value)
    })
    const dispOptionMaterialCost = computed(()=>{
    return formatterFunction(optionMaterialCost.value)
    })
    const dispOptionLaborCost = computed(()=>{
    return formatterFunction(optionLaborCost.value)
    })
    const dispOptionCost = computed(()=>{
    return formatterFunction(optionCost.value)
    })
    const dispBaseCost = computed(()=>{
    return formatterFunction(baseCost.value)
    })
    const dispMaterialCost = computed(()=>{
    return formatterFunction(materialCost.value)    
    })
    const dispLaborCost = computed(()=>{
    return formatterFunction(laborCost.value)    
    })
    const dispCost = computed(()=>{
    return formatterFunction(cost.value)
    })

    return reactive({
        baseMaterialSell: dispBaseMaterialSell, 
        baseLaborSell: dispBaseLaborSell, 
        optionMaterialSell: dispOptionMaterialSell, 
        optionLaborSell: dispOptionLaborSell,
        baseSell: dispBaseSell,
        optionSell: dispOptionSell,
        materialSell: dispMaterialSell,
        laborSell: dispLaborSell,
        sell: dispSell,
        baseMaterialCost: dispBaseMaterialCost, 
        baseLaborCost: dispBaseLaborCost, 
        optionMaterialCost: dispOptionMaterialCost, 
        optionLaborCost: dispOptionLaborCost,
        baseCost: dispBaseCost,
        optionCost: dispOptionCost,
        materialCost: dispMaterialCost,
        laborCost: dispLaborCost,
        cost: dispCost,
    })
}