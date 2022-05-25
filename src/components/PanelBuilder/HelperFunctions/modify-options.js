import { ref } from "@vue/reactivity"
import { computed } from "@vue/runtime-core"


export function modifyPanelOptions(panel) {

const optionModify = (option)=>{
    // Customize option based on type. Each option type receives its own selection parameter.
    option.oldMultiplier = 0
    option.multiplier = 0
    option.baseMultiplier = 0
    
    if (option.type === 'BOOL') {
        option.selection = !!option.default
        if (option.selection) {
            option.lastOption = 1
        } else {option.lastOption = 0}
        option.choiceNum = computed(() => {
            if (option.selection) {
                return 1
            } else {return 0}
        })
    } else if (option.type === 'QTY') {
        option.selection = option.default
        option.lastOption = option.selection
    } else if (option.type === 'CHOICE'){
        const choiceArray = ref([])
        let choiceObject = ref({})
        const selection = ref("")
        // Extrapolates choices into array for use in javascript application.
        for (let i=0; i<option.choices.length; i++) {
            let choice = option.choices[i]
            choiceArray.value.push(choice.name)
            choiceObject.value[choice.name] = choice.num
            if(choice.num === option.default) {
                selection.value = choice.name
            }
        }
        option.choiceArray = choiceArray.value
        option.selection = ref(selection.value)
        option.choiceNum = computed(()=> {
            return choiceObject.value[option.selection]
        })
        option.lastOption = ref(choiceObject.value[option.selection])
    }
}

for (let i=0; i<panel.sections.length; i++) {
    let section = panel.sections[i]
    for (let j=0; j<section.options.length; j++) {
        let option = section.options[j]
        optionModify(option)
}}}

export function findOption(panel, id) {
    for (let i=0; i<panel.sections.length; i++) {
        let section = panel.sections[i]
        for (let j=0; j<section.options.length; j++) {
            let option = section.options[j]
            if (option.id === id) {
                return option
            }
    }}

}