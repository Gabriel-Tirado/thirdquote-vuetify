<template>
  <div id="grid">
      <div></div>
      <div id="frame">
        <component :is="budgetaryTemplate" :data="budgetaryData"/>
      </div>
      <div id="sideFrame">
            <div id="fixedDetails">
                <h3>Pricing Summary</h3>
                    <table style="width:100%">
                        <tr style="background: #244061; color: white">
                            <th>Panel Total</th>
                            <th>{{budgetaryData.displayPrice.sell}}</th>
                        </tr>
                        <tr>
                            <td>Components and Material</td>
                            <td>{{budgetaryData.displayPrice.materialSell}}</td>
                        </tr>
                        <tr>
                            <td>Engineering & Assembly</td>
                            <td>{{budgetaryData.displayPrice.laborSell}}</td>
                        </tr>
                    </table>
                <h3>Details</h3>
                <!-- Option Selection Section -->
                <div id="buttonGrid">
                    <div>
                        <v-btn size="large" block @click="optionDrawer = true">Option Selections</v-btn>
                    </div>
                    <div>
                        <a :href="'data:text/txt;charset=utf-8,'+optionDL('\t')" download="options.txt">
                            <v-btn size="large" block ><img src="https://i.ibb.co/DkgJqKg/txt.png" alt="TXT"></v-btn>
                        </a>
                    </div>
                    <div>
                        <a :href="'data:text/csv;charset=utf-8,'+optionDL(',')" download="options.csv">
                            <v-btn size="large" block ><img src="https://i.ibb.co/5XZ3GVh/csv.png" alt="CSV"></v-btn>
                        </a>
                    </div>
                </div>

                <v-layout>
                    <v-navigation-drawer v-model="optionDrawer" temporary position="left" style="margin: 9.8vh 0; width: 25%; padding: 20px 10px">
                        <template v-for="section in budgetaryData.panel.sections" :key="section.order">
                                <h3>{{section.name}}</h3>
                                <template v-for="option in section.options" :key="option.order">
                                        <p>{{option.name}}: {{option.selection}}</p>
                                </template>
                        </template>
                    </v-navigation-drawer>
                </v-layout>
                
                <!-- Material Selection Section -->
                <template v-if="auth.internal || auth.partner">
                    <div id="buttonGrid">
                        <div>
                            <v-btn size="large" block @click="materialDrawer = true">Materials (BOM)</v-btn>
                        </div>
                        <div>
                            <a :href="'data:text/txt;charset=utf-8,'+materialDL('\t')" download="materials.txt">
                                <v-btn size="large" block ><img src="https://i.ibb.co/DkgJqKg/txt.png" alt="TXT"></v-btn>
                            </a>
                        </div>
                        <div>
                            <a :href="'data:text/csv;charset=utf-8,'+materialDL(',')" download="materials.csv">
                                <v-btn size="large" block ><img src="https://i.ibb.co/5XZ3GVh/csv.png" alt="CSV"></v-btn>
                            </a>
                        </div>
                    </div>

                    <v-layout>
                        <v-navigation-drawer v-model="materialDrawer" temporary position="left" style="margin: 9vh 0; width: 25%; padding: 20px 10px">
                            <template v-for="component in budgetaryData.panelComponents" :key="component">
                                    <template v-if="component.total > 0">
                                        <h4>{{component.component.name}}</h4>
                                        <h5>Model: {{component.component.model_id}} - {{component.component.manufacturer}}</h5>
                                        <template v-if="auth.internal">
                                            <h5>Cost - {{component.component.cost}}  |   Sell - {{component.component.sell}}</h5>
                                        </template>
                                        <h5>Quantity  - {{component.total}}</h5>
                                    </template>
                            </template>
                        </v-navigation-drawer>
                    </v-layout>
                    
                </template>
                <!-- Labor Requirement Section -->
                <template v-if="auth.internal">
                    <div id="buttonGrid">
                        <div>
                            <v-btn size="large" block @click="laborDrawer = true">Labor Requirements</v-btn>
                        </div>
                        <div>
                            <a :href="'data:text/txt;charset=utf-8,'+laborDL('\t')" download="labor.txt">
                                <v-btn size="large" block ><img src="https://i.ibb.co/DkgJqKg/txt.png" alt="TXT"></v-btn>
                            </a>
                        </div>
                        <div>
                            <a :href="'data:text/csv;charset=utf-8,'+laborDL(',')" download="labor.csv">
                                <v-btn size="large" block ><img src="https://i.ibb.co/5XZ3GVh/csv.png" alt="CSV"></v-btn>
                            </a>
                        </div>
                    </div>

                    <v-layout>
                        <v-navigation-drawer v-model="laborDrawer" temporary position="left" style="margin-top: 9.8vh; width: 25%; padding: 20px 10px">
                            <template v-for="labor in budgetaryData.panelLabors" :key="labor">
                                    <h4>{{labor.type.type}}</h4>
                                    <h5>Cost - {{labor.type.cost}}  |   Sell - {{labor.type.sell}}</h5>
                                    <h5>Quantity - {{labor.total}}</h5>
                            </template>
                        </v-navigation-drawer>
                    </v-layout>

                </template>
                <!-- Cost Sell Section -->
                <template v-if="auth.internal">
                    <div id="buttonGrid">
                        <div>
                            <v-btn size="large" block @click="costSellDrawer = true">Cost Sell Items</v-btn>
                        </div>
                        <div>
                            <a :href="'data:text/txt;charset=utf-8,'+costSellDL('\t')" download="CostSell.txt">
                                <v-btn size="large" block ><img src="https://i.ibb.co/DkgJqKg/txt.png" alt="TXT"></v-btn>
                            </a>
                        </div>
                        <div>
                            <a :href="'data:text/csv;charset=utf-8,'+costSellDL(',')" download="CostSell.csv">
                                <v-btn size="large" block ><img src="https://i.ibb.co/5XZ3GVh/csv.png" alt="CSV"></v-btn>
                            </a>
                        </div>
                    </div>

                    <v-layout>
                       <v-navigation-drawer v-model="costSellDrawer" temporary position="left" style="margin-top: 9.8vh; width: 25%; padding: 20px 10px">
                            <template v-for="(price, item) in budgetaryData.displayPrice" :key="item">
                                    <h3>{{item}}: {{price}}</h3>
                            </template>
                       </v-navigation-drawer> 
                    </v-layout>
                    

                </template>
                <h3>Print Budgetary</h3>
                <v-btn size="large" block @click="printDiv()">Print</v-btn>
            </div>
        </div>
  </div>
</template>

<script>
import { getBudgetary } from '../firebase/db'
import auth from '../firebase/auth'
import Budgetary from './BudgetaryTemplates/Budgetary.vue'
import DrivePanel from './BudgetaryTemplates/DrivePanel.vue'
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'

export default {
    props: [
        'url',
    ],
    async setup (props){
        const budgetaryData = await getBudgetary(auth.user.email, props.url)
        const budgetaryTemplateObj = {
            'Budgetary': Budgetary,
            'DrivePanel': DrivePanel,
        }
        const budgetaryTemplate = budgetaryTemplateObj[budgetaryData.panel.budgetary_template]
        const optionDrawer = ref(false)
        const materialDrawer = ref(false)
        const laborDrawer = ref(false)
        const costSellDrawer = ref(false)

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function printDiv() {

            // find all class=pagedivider
            // iterate through all pagedivider elements and set to invisible with for loop
            var dividers = document.getElementsByClassName('pagedivider');
            for (var i = 0; i < dividers.length; i++) {
                dividers[i].style.visibility = "hidden"
            }

            var budgetaryContents = document.getElementById('frame').innerHTML;
            var a = window.open('', '')
            let stylesHtml = '';
            for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
                stylesHtml += node.outerHTML;
                }
            a.document.write('<html>');
            a.document.write(`<head>${stylesHtml}</head>`);
            a.document.write('<body>');
            a.document.write(budgetaryContents);
            a.document.write('</body></html>');
            await sleep(100);
            a.print();
            a.close();
            // iterate through all pagedivider elements and set to visible with for loop
            for (var n = 0; n < dividers.length; n++) {
                dividers[n].style.visibility = "visible"
            }
        }
        computed
        const optionDL = (delimiter) => {
            let compStr = ''
            for (let i = 0; i < budgetaryData.panel.sections.length; i++) {
                let section = budgetaryData.panel.sections[i]
                compStr += section.name + '\n'
                for (let j = 0; j < budgetaryData.panel.sections[i].options.length; j++) {
                    let option = budgetaryData.panel.sections[i].options[j]
                    compStr += option.name + delimiter + option.selection + '\n'
                }
            }
            return compStr

        }
        const materialDL = (delimiter) => {
            let compStr = 'Component Name' + delimiter + 'Model ID' + delimiter + 'Manufacturer' + delimiter + 'Quantity'
            if (auth.internal) {
                compStr += delimiter + 'Cost' + delimiter + 'Sell\n'
            } else {
                compStr += '\n'
            }
            for (let i = 0; i < budgetaryData.panelComponents.length; i++) {
                let component = budgetaryData.panelComponents[i]

                if (component.total > 0 && component.component.cost != 0) {
                    compStr += component.component.name.replaceAll(',',';') + delimiter
                    compStr += component.component.model_id.replaceAll(',',';') + delimiter
                    compStr += component.component.manufacturer.replaceAll(',',';') + delimiter
                    compStr += component.total + delimiter
                    if (auth.internal) {
                        compStr += component.component.cost + delimiter
                        compStr += component.component.sell + '\n'
                    } else {
                        compStr += '\n'
                    }
                }
            }
            return compStr
        }
        const laborDL = (delimiter) => {
            let compStr = 'Labor Type' + delimiter + 'Labor Cost (HR)' + delimiter + 'Labor Sell (HR)' + delimiter + 'Quantity (HRS)\n'
            for (let i = 0; i < budgetaryData.panelLabors.length; i++) {
                let labor = budgetaryData.panelLabors[i]

                if (labor.total > 0) {
                    compStr += labor.type.type.replaceAll(',',';') + delimiter
                    compStr += labor.type.cost.replaceAll(',','') + delimiter
                    compStr += labor.type.sell.replaceAll(',','') + delimiter
                    compStr += labor.total + '\n'
                }
            }
            return compStr
        }
        const costSellDL = (delimiter) => {
            let compStr = 'Item' + delimiter + 'Price\n'
            for (const [key, value] of Object.entries(budgetaryData.displayPrice)) {
                compStr += key.replaceAll(',','') + delimiter
                compStr += value.replaceAll(',','') + delimiter + '\n'
            }
            return compStr
        }

        return{ 
            budgetaryData,
            budgetaryTemplate,
            optionDrawer,
            materialDrawer,
            laborDrawer,
            costSellDrawer,
            auth,
            printDiv,
            optionDL,
            materialDL,
            laborDL,
            costSellDL,
            }
    }
}
</script>

<style scoped lang="less">
#banner {
    background-color: #244061;
    color: white;
}
#buttonGrid {
    display: grid;
    grid-template-columns: 5fr 1fr 1fr;
}
#fixedDetails {
    position: fixed;
    min-width: 300px;
}
#frame {
    margin-top: 50px;
    // margin-left: 400px;
    border: 1px solid #d3dae6;
    border-radius: 6px;
    box-sizing: border-box;
    transition: 0.17s all ease-in-out;
    width: 800px;
    &:hover {
        border: 1px solid #fff;
        box-shadow: 0 0 0 1px rgba(50, 50, 93, 0.05),
        0 7px 14px 0 rgba(50, 50, 93, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.07);
    }
}
#grid {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
}
#proposal {
    font-family: Ebrima;
    text-align: justify;
    margin: 40px;
    display: block
};
#proposal > h1 {
    font-size: 40px;
};
#proposal > h2 {
    font-size: 35px;
};
#proposal > h3 {
    font-size: 25px;
};
#proposal > h4 {
    font-size: 20px;
};
#proposal > h5 {
    font-size: 16px;
};
#proposal > p{
    display: block;
    margin-bottom: 10px
};
#pad {
    padding-top: 100px;
};
#sideFrame {
    margin-top: 50px;
    margin-right: 10vw;
    min-width: 300px;
};
</style>