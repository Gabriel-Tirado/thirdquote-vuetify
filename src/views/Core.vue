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
  margin-left: 4px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
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

<!-- Parent CSS (Container) -->
<style scoped>
.header {
  margin-bottom: 16px;
}

main {
  padding: 24px;
}

@media (min-width: 768px) {
  main {
    padding: 48px;
  }
}
</style>

<!-- Responsive Breakpoints -->
<style scoped>
.horizontal {
  --count: 1;
  --gap: 16px;
  --margin: 24px;
}

@media (min-width: 640px) {
  .horizontal {
    --count: 2;
  }
}

@media (min-width: 768px) {
  .horizontal {
    --count: 3;
    --margin: 0;
  }
}

@media (min-width: 1024px) {
  .horizontal {
    --count: 4;
  }
}

@media (min-width: 1280px) {
  .horizontal {
    --gap: 24px;
    --count: 6;
  }
}
</style>