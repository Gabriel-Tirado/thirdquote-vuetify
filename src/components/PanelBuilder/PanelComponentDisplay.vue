<template>
  <div>
      <img v-if="type === 'sub'" label="subpanel" class="panel" alt="Panel" :src="panel.subpanel.component.image_horizontal">
      <img v-if="type === 'enc'" label="enclosure" class="panel" alt="Panel" :src="panel.enclosure.component.image_horizontal">
      <template v-for="component in panelComponents" :key="component.id">
        <template v-if="component.component.plc_component">
          <template v-if="type === 'sub'">
            <img class="hor_component" v-for="n in component.total" :key="n" :style="{
              top: component.base_top + 'px',
              left: component.base_left + component.plc_adder + (n - 1) * component.component.width + 'px',
              height: component.component.height + 'px',
              width: component.component.width + 'px',
            }" :src="component.component.image_horizontal">
          </template>
        </template>
        <template v-else-if="component.component.location === type">
          <template v-for="row in component.component_rows" :key="row.id">
            <template v-if="row.column">
              <img class="col_component" v-for="n in row.current" :key="n" :style="{
                top: row.top + (n - 1) * component.component.width + 'px',
                left: row.left + 'px',
                height: component.component.height + 'px',
                width: component.component.width + 'px',
              }" :src="component.component.image_horizontal">
              <template v-if="row.endcaps && row.current > 0">
                <img class="col_component" src="https://i.ibb.co/XzSPcht/bot-end-cap-vert.png"
                :style="{
                  top: row.top - 5 + 'px',
                  left: row.left + (component.component.height - 31) / 2 + 'px',
                }">
                <img class="col_component" src="https://i.ibb.co/XzSPcht/bot-end-cap-vert.png"
                :style="{
                  top: row.top + row.current * component.component.width + 'px',
                  left: row.left + (component.component.height - 31) / 2 + 'px'
                }">
              </template>
            </template>
            <template v-else>
              <img class="hor_component" v-for="n in row.current" :key="n" :style="{
                top: row.top + 'px',
                left: row.left + (n - 1) * component.component.width + 'px',
                height: component.component.height + 'px',
                width: component.component.width + 'px',
              }" :src="component.component.image_horizontal">
              <template v-if="row.endcaps && row.current > 0">
                <img class="hor_component" src="https://i.ibb.co/XzSPcht/bot-end-cap-vert.png"
                :style="{
                  top: row.top + (component.component.height - 31) / 2 + 'px',
                  left: row.left - 5 + 'px'
                }">
                <img class="hor_component" src="https://i.ibb.co/XzSPcht/bot-end-cap-vert.png"
                :style="{
                  top: row.top + (component.component.height - 31) / 2 + 'px',
                  left: row.left + row.current * component.component.width + 'px'
                }">
              </template>
            </template>
          </template>
        </template>
      </template>
  </div>    
</template>

<script>
export default {
    props: [
        'panel',
        'panelComponents',
        'type',
    ],

}
</script>

<style scoped>
div {
  position: relative;
}
img.hor_component {
  position: absolute;
}
img.col_component {
  position: absolute;
  transform: rotate(90deg);
}
</style>