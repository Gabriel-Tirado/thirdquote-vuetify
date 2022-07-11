<template>
  <div>
    <!-- <Maintenance :panel="panel" :panelLabors="panelLabors" :panelComponents="panelComponents" :panelIOs="panelIOs"/> -->
    
    <!-- PC/Large Tablet panel control options -->
    <vue-horizontal class="horizontal" v-if="screenWidth > 700">
      <div class="item" style="height:150px;" v-for="section in panel.sections" :key="section.order">
        <div class="card" style="border: 1px solid grey" @click="section.drawer = true">
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

    <!-- Mobile Panel Control Options -->
    <v-btn v-if="screenWidth < 700" size="x-large" elevation="1" style="border: 1px solid lightgrey; width: 75vw; margin: 5% 0 5px;" @click="solutionNavDrawer = !solutionNavDrawer">Panel Options</v-btn>
    <v-layout v-if="screenWidth < 700">
      <v-navigation-drawer v-model="solutionNavDrawer" touchless position="top" style="max-height: 40%; padding: 10px">
        <div class="item" style="margin: 5px 0;" v-for="section in panel.sections" :key="section.order">
          <v-btn class="card" @click="section.drawer = true" style="width: 90vw; margin: auto">
            <div class="content">
              <div>
                <div class="brand">
                  <div class="name">
                    <div style="font-size: x-large; font-family: 'Times New Roman'">{{section.order}}</div>
                    <div style="padding-top:10px; text-align: left;">{{ section.name }}</div>
                  </div>
                </div>
              </div>
            </div>
          </v-btn>
        </div>
      </v-navigation-drawer>
    </v-layout>

    <!-- Panel Control Options NavBar -->
    <div class="item" v-for="section in panel.sections" :key="section.order">
      <v-layout>
        <v-navigation-drawer v-model="section.drawer" touchless :position="(screenWidth > 700 && 'left') || (screenWidth <= 700 && 'top')" temporary :style="(screenWidth > 700 && ('width: 30vw; padding: 10px')) || (screenWidth <= 700 && ('height: 50vh; width: 100vw; padding: 10px'))">
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
                  <v-switch inset color="info" :label="option.name" v-if="option.type === 'BOOL'" v-model="option.selection" style="margin: 0 20% 0 25%;"/>
                  <v-text-field type="number" :label="option.name" v-if="option.type === 'QTY'" v-model="option.selection" :min="option.min_quantity" :max="option.max_quantity" style="margin: 0 30%"/>
                  <v-select dense="true" :label="option.name" v-if="option.type === 'CHOICE'" v-model="option.selection" :items="option.choiceArray" style="margin: 0 10%"/>
                </div>
                <!-- </v-tooltip> -->
              </div>
            </div>
          </div>
        </v-navigation-drawer>
      </v-layout>
    </div>

    <!-- Budgetary Button and Panel Images -->
    <!-- If Mobile/Small Screen -->
      <v-btn v-if="screenWidth < 700" size="x-large" elevation="1" style="border: 1px solid lightgrey; white-space: normal !important; width: 75vw; margin: 5px 0;" @click="panelNavDrawer = !panelNavDrawer">Panel Solutions</v-btn>
      <v-layout v-if="screenWidth < 700">
        <v-navigation-drawer v-model="panelNavDrawer" touchless position="top" style="height: 40vh; max-height: 50vh; padding: 10px">
          <h2>Panel Solutions</h2>
          <div v-for="solution in solutions" :key="solution.id" style="width: 100%;">
            <h4>{{solution.name}}</h4>
            <div class="item" v-for="panel in solution.panels" :key="panel.size">
              <router-link :to="{name: 'CorePanel', params: { url: solution.url, panel_url: panel.panel_url }}" style="text-decoration: none">
                <v-btn @click="reloadPage()" size="large" elevation="1" style="width: 90%; margin: 5px 0; border: 1px solid #d3dae6;">
                  {{panel.name}}
                </v-btn>
              </router-link>
            </div>
            <div class="borderLine" style="width: 70%"></div>
          </div>
        </v-navigation-drawer>
      </v-layout>

      <v-btn v-if="screenWidth < 700" size="x-large" elevation="1" style="border: 1px solid lightgrey; white-space: normal !important; width: 75vw; margin: 5px 0;" @click="compNavDrawer = !compNavDrawer">Components</v-btn>
      <v-layout v-if="screenWidth < 700">
        <v-navigation-drawer v-model="compNavDrawer" touchless position="top" style="height: 40vh; max-height: 50vh; padding: 10px">
          <h2>Components</h2>
          <div v-for="component in sortItems(panelComponents)" :key="component.id" style="margin: 15px 0">
            <div v-if="component.component.image_horizontal !== ''">
              <v-btn size="large" v-if="component.panel === calcPanel.id" @click="componentDrawer = !componentDrawer; compName = component.component.name" elevation="1" style="width: 90%; min-height: 50px; height: auto; white-space: normal; border: 1px solid #d3dae6; display: inline-block;">
                <h4>{{component.component.manufacturer}} - {{component.component.model_id}}</h4>
                <div>{{component.component.name}}</div>
              </v-btn>
            </div>
          </div>
        </v-navigation-drawer>
      </v-layout>

    <!-- If PC/Large Screen + Panel Images -->
    <div id="grid">
      <div>
        <h2 v-if="screenWidth > 700">Panel Solutions</h2>
        <div v-if="screenWidth > 700" style="border: 2px solid lightgrey; border-radius: 2px; width: 95%; height: 40vh; overflow-x: hidden; overflow-y: scroll; padding: 10px 0">
          <div v-for="solution in solutions" :key="solution.id" style="width: 100%;">
            <h4>{{solution.name}}</h4>
            <div class="item" v-for="panel in solution.panels" :key="panel.size">
              <router-link :to="{name: 'CorePanel', params: { url: solution.url, panel_url: panel.panel_url }}" style="text-decoration: none">
                <v-btn @click="reloadPage()" size="large" elevation="1" style="width: 90%; margin: 5px 0; border: 1px solid #d3dae6;">
                  {{panel.name}}
                </v-btn>
              </router-link>
            </div>
            <div class="borderLine" style="width: 90%;"></div>
          </div>
        </div>

        <v-btn size="x-large" @click="laborDrawer = !laborDrawer" elevation="1" id="laborButton" :style="(screenWidth <= 700 && 'width: 75%;') || (screenWidth > 700 && 'width: 95%;')">Labor</v-btn>
        
        <h2 v-if="screenWidth > 700">Components</h2>
        <div v-if="screenWidth > 700" style="border: 2px solid lightgrey; border-radius: 2px; width: 95%; height: 50vh; overflow-x: hidden; overflow-y: scroll;">
          <div v-for="component in sortItems(panelComponents)" :key="component.id" style="margin: 15px 0">
            <div v-if="component.component.image_horizontal !== ''">
              <v-btn size="large" v-if="component.panel === calcPanel.id" @click="componentDrawer = !componentDrawer; compName = component.component.name" elevation="1" style="width: 90%; min-height: 50px; height: auto; white-space: normal; border: 1px solid #d3dae6; display: inline-block;">
                <h4>{{component.component.manufacturer}} - {{component.component.model_id}}</h4>
                <div>{{component.component.name}}</div>
              </v-btn>
            </div>
          </div>
        </div>
      </div>

      <div class="panelDisplay">
        <h2 style="text-decoration: underline">SubPanel</h2>
        <PanelComponentDisplay :panel="panel" :panelComponents="panelComponents" :type="'sub'"/>

        <h2 style="text-decoration: underline">Enclosure</h2>
        <PanelComponentDisplay :panel="panel" :panelComponents="panelComponents" :type="'enc'"/>
      </div>

      <!-- <div id="display">
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

        
        <BudgetaryButton 
          :panel="panel"
          :panelOptions="panelOptions" 
          :panelComponents="panelComponents" 
          :panelLabors="panelLabors" 
          :displayPrice="displayPrice"
        />
      </div> -->
    </div>

    <!-- Labor Drawer -->
    <v-layout>
        <v-navigation-drawer v-model="laborDrawer" touchless :position="(screenWidth > 700 && 'left') || (screenWidth <= 700 && 'top')" temporary :style="(screenWidth > 700 && ('width: 30vw; padding: 10px')) || (screenWidth <= 700 && ('height: 40vh; width: 100vw; padding: 10px'))">
            <h1 style="margin: 15px 0">Labor</h1>
            <div v-for="labor in panelLabors" :key="labor.id" style="margin: 15px 0">
                <h3>{{labor.type.type}}</h3>
                <div>Base Hours: {{labor.base_hours}}</div>
                <div>Base Add: {{labor.base_add}}</div>
                <div>Base Option Add: {{labor.base_option_add}}</div>
                <div>Option Add: {{labor.option_add}}</div>
                <div>Total: {{labor.total}}</div>
            </div>
        </v-navigation-drawer>
    </v-layout>

    <!-- Component Drawer -->
    <v-layout>
      <v-navigation-drawer v-model="componentDrawer" touchless :position="(screenWidth > 700 && 'left') || (screenWidth <= 700 && 'top')" temporary :style="(screenWidth > 700 && ('width: 30vw; padding: 10px')) || (screenWidth <= 700 && ('height: 40vh; width: 100vw; padding: 10px'))">
        <h1 style="margin: 15px 0">Component</h1>
        <div v-for="component in panelComponents" :key="component.id">
          <div v-if="compName == component.component.name">
            <h3 style="margin: 10px">{{component.component.name}}</h3>
            <div>Cost: {{component.component.cost}}</div>
            <div>Sell: {{component.component.sell}}</div>
            <div>Base Quantity: {{component.base_quantity}}</div>
            <div>Base Add: {{component.base_add}}</div>
            <div>Base Option Add: {{component.base_option_add}}</div>
            <div>Option Add: {{component.option_add}}</div>
            <div>Total: {{component.total}}</div>

            <div v-for="row in component.component_rows" :key="row.id">
              <div class="borderLine"></div>
              <h4 style="margin: 10px 0">Row Num: {{row.row_num}}</h4>

              <v-text-field type="number" variant="outlined" shaped="true" hide-details="auto" v-model="row.min" label="Row Min" style="margin: 15px 40%"></v-text-field>
              <v-text-field type="number" variant="outlined" hide-details="auto" v-model="row.max" label="Row Max" style="margin: 15px 40%;"></v-text-field>
              <v-text-field type="number" variant="outlined" hide-details="auto" v-model="row.current" label="Row Current" style="margin: 15px 40%"></v-text-field>

              <v-text-field type="number" variant="outlined" hide-details="auto" v-model="row.left" label="Row Left" style="margin: 15px 40%"></v-text-field>
              <v-text-field type="number" variant="outlined" hide-details="auto" v-model="row.top" label="Row Top" style="margin: 15px 40%"></v-text-field>
            </div>
          </div> 
        </div>
      </v-navigation-drawer>
    </v-layout>

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
// import BudgetaryButton from '@/components/PanelBuilder/BudgetaryButton'
import { apiurl } from '@/drf/drfapi'

export default {
    components: {
        VueHorizontal,
        // Maintenance,
        PanelComponentDisplay,
        // BudgetaryButton,
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
    async setup (props) {

        onMounted(() => {
          window.addEventListener("resize", updateWidth)
        })
        onUnmounted(() => {
          window.removeEventListener("resize", updateWidth)
        })

        const screenWidth = ref(window.innerWidth)
        const solution = ref(props.calcSolution)
        const panel = ref(props.calcPanel)
        const subpanelComp = ref(props.calcSubpanelComp)
        const enclosureComp = ref(props.calcEnclosureComp)
        const panelIOs = ref(props.calcPanelIOs)
        const panelIOLedgers = ref(props.calcPanelIOLedgers)
        const panelComponents = ref(props.calcPanelComponents)
        const panelComponentLedgers = ref(props.calcPanelComponentLedgers)
        const panelLabors = ref(props.calcPanelLabors)
        const solutionNavDrawer = ref(false)
        const panelNavDrawer = ref(false)
        const compNavDrawer = ref(false)
        const laborDrawer = ref(false)
        const componentDrawer = ref(false)
        const compName = ref('')

        const solutions = ref(null)
        const addr = '/solution/'
        const solutionsResponse = await fetch(apiurl.concat(addr))

        solutions.value = await solutionsResponse.json();

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

        const updateWidth = () => {
          screenWidth.value = window.innerWidth
        }

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function reloadPage() {
          await sleep(100)
          window.location.reload()
        }

        const sortItems = (_items) => {
           return _items.sort((a, b) => a.component.id - b.component.id)
        }

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
            screenWidth,
            solutionNavDrawer,
            solutions,
            laborDrawer,
            componentDrawer,
            compName,
            panelNavDrawer,
            compNavDrawer,
            reloadPage,
            sortItems
        }
    }
}
</script>

<style scoped>
section {
  padding: 16px 24px;
  background: #f5f5f5;
}

/* Content Design */
.card {
  margin: 3px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid lightgrey;
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
  width: 100%
}

.borderLine {
  border-bottom: 1px solid #d3dae6;
  width: 50%;
  margin: 10px auto;
}

.brand {
  display: inline;
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

#laborButton {
  border: 1px solid #d3dae6;
  max-height: 50px;
  margin: 30px 0;
}

#grid {
  display: grid;
  grid-template-columns: 2fr 3fr;
}

@media (max-width: 950px)
{
  #grid {
    display: block;
  }
}

@media (max-width: 700px) {
  .panelDisplay {
    transform: scale(0.7);
    transform-origin: center top;
  }
}

@media (max-width: 450px) {
  .panelDisplay {
    transform: scale(0.5);
    transform-origin: center top;
  }
}
</style>
