<template>
  <!-- <HelloWorld v-if="screenWidth > 600" msg=""/> -->
  <div class="table-list">
    <div :style="screenWidth > 500 && 'grid-column: 2'">
      <v-table fixed-header height="auto" density="compact" style="border: 1px solid #ededed; border-radius: 5px;">
        <thead>
          <tr>
            <th class="text-center" style="background-color: #ededed">
              <h2>Solution Types</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="item" v-for="panel in solution.panels" :key="panel.size">
            <div v-if="panel.public || development">
              <router-link :to="{name: 'CorePanel', params: { url: url, panel_url: panel.panel_url }}" style="text-decoration: none">  
                  <div class="grid-list">
                    <div v-if="screenWidth >= 1366" class="image" :style="{background: `url(${panel.ui_image})`}"></div>
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
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { apiurl } from '../drf/drfapi.js'
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  components: {
    // HelloWorld,
  },
  props: [
    'url',
  ],
  async setup (props) {
    onMounted(() => {
      window.addEventListener("resize", updateWidth)
    })
    onUnmounted(() => {
      window.removeEventListener("resize", updateWidth)
    })

    const screenWidth = ref(window.innerWidth);
    const solutions = ref(null)
    const addr = '/solution/'
    const solutionsResponse = await fetch(apiurl.concat(addr))
    solutions.value = await solutionsResponse.json();
    const development = ref(false)
      if (window.location.hostname === 'localhost') {development.value = true}

    const solution = computed(()=> {
    return solutions.value.find(solution=>{return solution.url === props.url})
    })

    const updateWidth = () => {
      screenWidth.value = window.innerWidth
    }

    return {solution, development, screenWidth}
  }
}
</script>

<style scoped>
/* Parent CSS (Container) */
main {
  padding: 24px;
}
@media (min-width: 768px) {
  main {
    padding: 48px;
  }
}
section {
  padding: 16px 24px;
  background: #f5f5f5;
}

/* Content Design */
.brand {
  align-items: center;
  margin: auto 0;
  color: #333333;
}
.brand .name {
  margin-left: 4px;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
  margin: 15% 5%;
}
.grid-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.image {
  background-position: center !important;
  background-size: 30% !important;
  background-repeat: no-repeat !important;
  padding-top: 50%;
}
.table-list {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  padding: 20px;
  row-gap: 50px;
}
.title {
  color: #333333;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.6;
  margin: 15% 5%;
}

/* Responsive Table */
@media (max-width: 1366px) {
  .grid-list {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 1000px) {
  .brand .name {
    margin-left: 4px;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.5;
    margin: 15% 5%;
  }
  .table-list {
    grid-template-columns: 1fr 4fr 1fr;
  }
}
@media (max-width: 750px) {
  .table-list {
    grid-template-columns: 1fr 6fr 1fr;
  }
}
@media (max-width: 500px) {
  .brand .name {
    font-size: 16px;
    font-weight: 700;
    line-height: 1.5;
    text-decoration: underline;
    margin: 0;
  }
  .grid-list {
    grid-template-columns: 1fr;
    margin: 10% 5%;
  }
  .table-list {
    grid-template-columns: 1fr;
  }
  .title {
    color: #333333;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.6;
    margin: 0;
  }
}
</style>
