<template>
  <vue-horizontal v-if="maintenanceBits.maintenance">
          <div class="card" @click="maintenanceBits.option = true">
              <div class="name">
                  Options
              </div>
          </div>
          <div class="card" @click="maintenanceBits.labor = true">
              <div class="name">
                  Labor
              </div>
          </div>
          <div class="card" @click="maintenanceBits.components = true">
              <div class="name">
                  Components
              </div>
          </div>
          <div class="card" @click="maintenanceBits.ios = true">
              <div class="name">
                  IOs
              </div>
          </div>
      </vue-horizontal>

      <it-drawer v-model="maintenanceBits.option">
            <div>Options</div>
            <div>-------</div>
        <div v-for="section in panel.sections" :key="section.order">
            <div>{{section.name}}</div>
                <div>-------</div>
            <div v-for="option in section.options" :key="option.order">
                <div>name(name) - {{option.name}}</div>
                <div>base multiplier(baseMultiplier) - {{option.baseMultiplier}}</div>
                <div>multiplier(multiplier) - {{option.multiplier}}</div>
                <div>selection(selection) - {{option.selection}}</div>
                <div>last option(lastOption) - {{option.lastOption}}</div>
                <div>selection Num(choiceNum) - {{option.choiceNum}}</div>
                <div>-------</div>
            </div>
        </div>
      </it-drawer>
      <it-drawer v-model="maintenanceBits.labor">
          <div>Labor</div>
          <div>-------</div>
        <div v-for="labor in panelLabors" :key="labor.id">
            <div>type - {{labor.type.type}}</div>
            <div>base hours(base_bours) - {{labor.base_hours}}</div>
            <div>base add(base_add) - {{labor.base_add}}</div>
            <div>base option add(base_option_add) - {{labor.base_option_add}}</div>
            <div>option add(option_add) - {{labor.option_add}}</div>
            <div>total(total) - {{labor.total}}</div>
            <div>-------</div>
        </div>
      </it-drawer>
      <it-drawer v-model="maintenanceBits.components">
          <div>Components</div>
          <div>-------</div>
            <div v-for="component in panelComponents" :key="component.id">
                <div>name(component.name) - {{component.component.name}}</div>
                <div>Cost/Sell - {{component.component.cost}}/{{component.component.sell}}</div>
                <div>base quantity(base_quantity) - {{component.base_quantity}}</div>
                <div>base add(base_add) - {{component.base_add}}</div>
                <div>base option add(base_option_add) - {{component.base_option_add}}</div>
                <div>option add(option_add) - {{component.option_add}}</div>
                <div>total(total) - {{component.total}}</div>
                <div v-for="row in component.component_rows" :key="row.id">
                    <div>---</div>
                    <div>row num - {{row.row_num}}</div>
                    <div>row min - {{row.min}}</div>
                    <div>row max - {{row.max}}</div>
                    <div>current - {{row.current}}</div>
                </div>
                <div>-------</div>
            </div>
      </it-drawer>
      <it-drawer v-model="maintenanceBits.ios">
          <div>IOs</div>
          <div>-------</div>
            <div v-for="io in panelIOs" :key="io.id">
                <div>Type - {{io.type}}</div>
                <div>base quantity - {{io.base_quantity}}</div>
                <div>base option add - {{io.base_option_add}}</div>
                <div>option add - {{io.option_add}}</div>
                <div>total - {{io.total}}</div>
                <div>-------</div>
            </div>
      </it-drawer>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    name: 'Maintenance',
    props: [
        'panel',
        'panelLabors',
        'panelComponents',
        'panelIOs',
    ],
    setup() {
        const maintenanceBits = ref({
            maintenance: true,
            options: false,
            labor: false,
            components: false,
        })

        return {maintenanceBits}
    },
}
</script>

<style>

</style>