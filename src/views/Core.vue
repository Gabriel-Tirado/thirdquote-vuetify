<template>
  <main>
    <Suspense>
    <template #default>
      <PanelList :url="url"/>
    </template>
    <template #fallback>
      Panel List Loading...
    </template>
    </Suspense>
  </main>
</template>


<script>
import PanelList from '@/components/PanelList'

export default {
  name: "CoreComp",
  components: {
    PanelList,
  },
  props: [
    'url',
  ],
  setup () {
    return {}
  }
}
</script>

<style scoped>
section {
  padding: 16px 24px;
  background: #f5f5f5;
}
</style>