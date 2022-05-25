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
  max-width: 200px;
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
</style>

<style scoped lang="less">
#grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
#grid > div {
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
#grid > div > * {
  margin: 5px;
}
</style>