<template>
  <HelloWorld/>
  <div class="table-list">
    <div style="grid-column: 2">
      <v-table fixed-header height="auto" density="compact" style="border: 1px solid #ededed; border-radius: 5px;">
        <thead>
          <tr>
            <th class="text-center" style="background-color: #ededed">
              <h2>Panel Types</h2>
            </th>
          </tr>
        </thead>
        <tbody class="horizontal">
          <tr class="item" v-for="panel in solution.panels" :key="panel.size">
            <div v-if="panel.public || development">
              <router-link :to="{name: 'CorePanel', params: { url: url, panel_url: panel.panel_url }}" style="text-decoration: none">  
                  <div class="grid-list">
                    <div class="image" :style="{background: `url(${panel.ui_image})`}"></div>
                    <!-- <v-img :src="panel.ui_image"></v-img> -->
                      <div class="brand">
                        <div class="name">{{ panel.name }}</div>
                      </div>
                      <div class="title">{{ panel.description }}</div>
                  </div>
              </router-link>
            </div>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { apiurl } from '../drf/drfapi.js'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
    components: {
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
  background-size: 30% !important;
  background-repeat: no-repeat !important;
  padding-top: 50%;
}

.content {
  padding: 10px 12px;
  justify-content: space-between;
}

.brand {
  align-items: center;
  color: #333333;
}

.brand .icon {
  height: 20px;
  width: 20px;
  fill: currentColor;
}

.brand .name {
  margin-left: 4px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
  margin: 15% auto;
}

.title {
  color: #333333;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.6;
  margin: 15% auto;
}

.date {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
}

.grid-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.table-list {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
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