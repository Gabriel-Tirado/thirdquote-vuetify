<template>
  <main>
    <div class="header">
      <!-- <h3>{{sol_data.name}}</h3> -->
      <!-- {{solution}} -->
    </div>
    <Suspense>
    <template #default>
      <PanelBuilder :url="url" :panel_url="panel_url"/>
    </template>
    <template #fallback>
      Panel Builder Loading...
    </template>
    </Suspense>
  </main>
</template>

<script>
import PanelBuilder from '@/components/PanelBuilder/PanelBuilder'

export default {
  components: {
    PanelBuilder,
  },
  props: [
    'url',
    'panel_url',
  ],
  setup () {
  }
}
</script>

<style scoped>
section {
  padding: 16px 24px;
  background: #f5f5f5;
}
</style>