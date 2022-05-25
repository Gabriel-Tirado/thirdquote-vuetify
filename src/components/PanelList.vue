<template>
  <HelloWorld/>
  <h2 style="text-align: left">Panel Types</h2>
  <vue-horizontal class="horizontal">
      <div class="item" v-for="panel in solution.panels" :key="panel.size">
        <template v-if="panel.public || development">
          <router-link :to="{name: 'CorePanel', params: { url: url, panel_url: panel.panel_url }}">  
            <div class="card">
              <div class="image" :style="{background: `url(${panel.ui_image})`}">

              </div>
              <div class="content">
                <div>
                  <div class="brand">
                    <div class="name">{{ panel.name }}</div>
                  </div>
                </div>
                <div class="title">{{ panel.description }}</div>
              </div>
            </div>
          </router-link>
        </template>
      </div>
    </vue-horizontal>
</template>

<script>
import { computed, ref } from 'vue'
import VueHorizontal from 'vue-horizontal'
import { apiurl } from '../drf/drfapi.js'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
    components: {
        VueHorizontal,
        HelloWorld,
    },
    props: [
        'url',
    ],
    async setup (props){
    
      const solutions = ref(null)
      const addr = '/solution/'
      const solutionsResponse = await fetch(apiurl.concat(addr))
      solutions.value = await solutionsResponse.json();
      const development = ref(false)
        if (window.location.hostname === 'localhost') {development.value = true}

      const solution = computed(()=> {
      return solutions.value.find(solution=>{return solution.url === props.url})
      })
      return {solution, development}
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
  color: #333333;
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