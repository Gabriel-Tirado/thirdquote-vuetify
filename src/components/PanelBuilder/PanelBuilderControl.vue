<template>
  <div>
      <!-- <Maintenance :panel="panel" :panelLabors="panelLabors" :panelComponents="panelComponents" :panelIOs="panelIOs"/> -->
      <vue-horizontal class="horizontal">
          <div class="item" style="height:150px;" v-for="section in panel.sections" :key="section.order">
            <div class="card" @click="section.drawer = true">
              <div class="content">
                <div>
                  <div class="brand">
                    <div class="name">
                      <div style="font-size: x-large; font-family: 'Times New Roman'">{{section.order}}</div>
                      <div style="padding-top:10px;">{{ section.name }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </vue-horizontal>
        <div class="item" v-for="section in panel.sections" :key="section.order">
            <v-layout>
              <v-navigation-drawer v-model="section.drawer" position="right" temporary style="width: 30%; padding: 10px">
                  <h3>{{section.name}}</h3>
                  <div id="options">
                    <div id="buffer"></div>
                    <div v-for="option in section.options" :key="option.order">
                      <div>
                        <div class="description">
                          <h4>{{option.description}}</h4>
                        </div>
                        <!-- <v-tooltip activator="parent" location="top" text="option.tooltip"> -->
                        <div>
                          <v-switch inset color="info" :label="option.name" v-if="option.type === 'BOOL'" v-model="option.selection" style="margin: 0 25%"/>
                          <v-text-field type="number" :label="option.name" v-if="option.type === 'QTY'" v-model="option.selection" :min="option.min_quantity" :max="option.max_quantity" style="margin: 0 33%"/>
                          <v-select dense="true" :label="option.name" v-if="option.type === 'CHOICE'" v-model="option.selection" :items="option.choiceArray" style="margin: 0 10%"/>
                        </div>
                        <!-- </v-tooltip> -->
                      </div>
                    </div>
                  </div>
              </v-navigation-drawer>
            </v-layout>
        </div>
        <div id="grid">
            <div>
              <PanelComponentDisplay :panel="panel" :panelComponents="panelComponents" :type="'sub'"/>
              <div v-if="screenWidth < 1500">
                <PanelComponentDisplay :panel="panel" :panelComponents="panelComponents" :type="'enc'"/>
              </div>
            </div>
            <div v-if="screenWidth >= 1500">
                <PanelComponentDisplay :panel="panel" :panelComponents="panelComponents" :type="'enc'"/>
            </div>
            <div id="display">
              <h3 style="text-align:left; align:left">Base Price</h3>
              <table style="width: 200px">
                <tr>
                  <td style="text-align:left; padding-right: 25px">Base Material</td>
                  <td style="text-align:right">{{displayPrice.baseMaterialSell}}</td>
                </tr>
                <tr>
                  <td style="text-align:left; padding-right: 25px">Base Labor</td>
                  <td style="text-align:right">{{displayPrice.baseLaborSell}}</td>
                </tr>
                <tr>
                  <td style="text-align:left; padding-right: 25px; font-weight: bold;">Subtotal</td>
                  <td style="text-align:right; font-weight: bold;">{{displayPrice.baseSell}}</td>
                </tr>
              </table>
              <h3 v-if="displayPrice.optionSell !== '$0'" style="text-align:left; align:left">Option Adjustments</h3>
              <table style="width: 200px">
                <tr v-if="displayPrice.optionMaterialSell !== '$0'">
                  <td style="text-align:left; padding-right: 25px">Material</td>
                  <td style="text-align:right">{{displayPrice.optionMaterialSell}}</td>
                </tr>
                <tr v-if="displayPrice.optionLaborSell !== '$0'">
                  <td style="text-align:left; padding-right: 25px">Labor</td>
                  <td style="text-align:right">{{displayPrice.optionLaborSell}}</td>
                </tr>
                <tr v-if="displayPrice.optionSell !== '$0'">
                  <td style="text-align:left; padding-right: 25px; font-weight: bold;">Subtotal</td>
                  <td style="text-align:right; font-weight: bold;">{{displayPrice.optionSell}}</td>
                </tr>
              </table>
              <table style="width: 200px">
                <tr>
                  <td style="text-align:left; padding-right: 25px; font-weight: bold; font-size: 20px">Total</td>
                  <td style="text-align:right; font-weight: bold; font-size: 20px">{{displayPrice.sell}}</td>
                </tr>
              </table>
              <!-- <h3>Base Price:</h3>
              <h5>Base Material - {{displayPrice.baseMaterialSell}}</h5> 
              <h5>Base Labor - {{displayPrice.baseLaborSell}}</h5>
              <h4>Subtotal - {{displayPrice.baseSell}}</h4>
              <h3 v-if="displayPrice.optionSell !== '$0'">Option Price Adjustments:</h3>
              <h5 v-if="displayPrice.optionMaterialSell !== '$0'">Option Material | {{displayPrice.optionMaterialSell}}</h5> 
              <h5 v-if="displayPrice.optionLaborSell !== '$0'">Option Labor | {{displayPrice.optionLaborSell}}</h5>
              <h4 v-if="displayPrice.optionSell !== '$0'">Option Subtotal | {{displayPrice.optionSell}}</h4>
              <h3>Total Price - {{displayPrice.sell}}</h3> -->
              <BudgetaryButton 
                :panel="panel"
                :panelOptions="panelOptions" 
                :panelComponents="panelComponents" 
                :panelLabors="panelLabors" 
                :displayPrice="displayPrice"
              />
            </div>
            <div></div>
        </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import VueHorizontal from 'vue-horizontal'
import { modifyPanelOptions } from './HelperFunctions/modify-options.js'
import { modifyPanelLabors } from './HelperFunctions/modify-labors.js'
import { modifyPanelComponents } from './HelperFunctions/modify-components.js'
import { baseComponentCalc } from './HelperFunctions/base-component-calc.js'
import { baseIOCalc } from './HelperFunctions/base-io-calc.js'
import { baseOptionCalc } from './HelperFunctions/base-option-calc.js'
import { optionWatchAssign } from './HelperFunctions/option-controls.js'
import { priceCalculations } from './HelperFunctions/price-calculations.js'
// import  Maintenance  from '@/components/PanelBuilder/Maintenance'
import PanelComponentDisplay from '@/components/PanelBuilder/PanelComponentDisplay'
import BudgetaryButton from '@/components/PanelBuilder/BudgetaryButton'

export default {
    components: {
        VueHorizontal,
        // Maintenance,
        PanelComponentDisplay,
        BudgetaryButton,
    },
    props: [
        'calcSolution',
        'calcPanel',
        'calcSubpanelComp',
        'calcEnclosureComp',
        'calcPanelIOs',
        'calcPanelComponents',
        'calcPanelLabors',
    ],
    setup (props) {
        const solution = ref(props.calcSolution)
        const panel = ref(props.calcPanel)
        const subpanelComp = ref(props.calcSubpanelComp)
        const enclosureComp = ref(props.calcEnclosureComp)
        const panelIOs = ref(props.calcPanelIOs)
        const panelIOLedgers = ref(props.calcPanelIOLedgers)
        const panelComponents = ref(props.calcPanelComponents)
        const panelComponentLedgers = ref(props.calcPanelComponentLedgers)
        const panelLabors = ref(props.calcPanelLabors)

        // Conditioning options
        // Adds 'selection' field to option array, as well as 'choiceArray' if the option type is 'CHOICE'
        modifyPanelOptions(panel.value)

        // condition data and add extra front-end fields
        modifyPanelLabors(panelLabors.value)

        // condition data and add extra front-end fields
        modifyPanelComponents(panelComponents.value)

        baseOptionCalc(panel.value, panelComponents.value, panelLabors.value, panelIOs.value)

        // Calculate the base components and labor from base IO selections.
        baseIOCalc(panelIOs.value, panelComponents.value, panelLabors.value)

        // Calculate the base labor and child components from core project components
        baseComponentCalc(panelComponents.value, panelLabors.value)

        // Set watch assignments for all option selections. This is the good stuff.
        optionWatchAssign(panel.value, panelComponents.value, panelIOs.value, panelLabors.value)

        const displayPrice = priceCalculations(panel.value, panelComponents.value, panelLabors.value, 2)

        const screenWidth = ref(window.innerWidth)

        const updateWidth = () => {
          screenWidth.value = window.innerWidth
        }

        onMounted(() => {
          window.addEventListener("resize", updateWidth)
        })
        onUnmounted(() => {
          window.removeEventListener("resize", updateWidth)
        })

        return {
            solution,
            panel,
            subpanelComp,
            enclosureComp,
            panelIOs,
            panelIOLedgers,
            panelComponents,
            panelComponentLedgers,
            panelLabors,
            displayPrice,
            screenWidth
        }
    }
}
</script>

<style scoped>
section {
  padding: 16px 24px;
  background: #f5f5f5;
}
</style>

<!-- Content Design -->
<style scoped>
.card {
  margin: 3px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  min-height: 60px;
  cursor: pointer;
}

.image {
  background-position: center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  padding-top: 50%;
}

.content {
  padding: 10px 12px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  color: #333333;
}

.brand .icon {
  flex-shrink: 0;
  height: 20px;
  width: 20px;
  fill: currentColor;
}

.brand .name {
  margin-left: 2px;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
  display: grid;
  grid-template-columns: 1fr 4fr;
}

.title {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.6;
  margin-top: 8px;
  margin-bottom: 8px;
}

.date {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
}

.horizontal {
  margin-left: 10px
}
</style>

<style scoped lang="less">

#grid > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding: 10px;
  // margin: 5px;
  // border: 1px solid #d3dae6;
  // border-radius: 6px;
  // box-sizing: border-box;
  // transition: 0.17s all ease-in-out;
  // &:hover {
  //   border: 1px solid #fff;
  //   box-shadow: 0 0 0 1px rgba(50, 50, 93, 0.05),
  //     0 7px 14px 0 rgba(50, 50, 93, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.07);
  // }
}
#grid > div > * {
  margin: 5px;
}
#display > div > {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin: 5px;
  border: 1px solid #d3dae6;
  border-radius: 6px;
  box-sizing: border-box;
  transition: 0.17s all ease-in-out;
  &:hover {
    border: 1px solid #fff;
    box-shadow: 0 0 0 1px rgba(50, 50, 93, 0.05),
      0 7px 14px 0 rgba(50, 50, 93, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.07);
  }
}

#options {
    display: block;
     
}
#options > div {
  // display: flex;
  // padding: 10px;
  // margin: 5px;
  border-radius: 6px;
  box-sizing: border-box;
  transition: 0.17s all ease-in-out;
}
.option {
  display: grid;
  grid-template-columns: 1fr 3fr;
}
.description{
  padding: 5px;
  text-align: center;
  float: center;
}
// .name {
//   grid-column: 1;
//   grid-row: 2;
// }
// .choice {
//   grid-column: 2;
//   grid-row: 2;
// }
.option > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  margin: 5px;
  box-sizing: border-box;
  transition: 0.17s all ease-in-out;
}
.option > div > * {
  margin: 5px;
}
#buffer > div {
  padding: 5px;
}

@media (min-width: 1500px)
{
  #grid {
    display: grid;
    grid-template-columns: 7fr 7fr 4fr 5fr;
  }
}

@media (max-width: 1500px)
{
  #grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 900px)
{
  #grid {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
