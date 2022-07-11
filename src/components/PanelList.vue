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
    async setup (props){

      const screenWidth = ref(window.innerWidth);
      const updateWidth = () => {
        screenWidth.value = window.innerWidth
      }
      onMounted(() => {
        window.addEventListener("resize", updateWidth)
      })
      onUnmounted(() => {
        window.removeEventListener("resize", updateWidth)
      })

      const solutions = ref(null)
      const addr = '/solution/'
      const solutionsResponse = await fetch(apiurl.concat(addr))
      solutions.value = await solutionsResponse.json();
      const development = ref(false)
        if (window.location.hostname === 'localhost') {development.value = true}

      const solution = computed(()=> {
      return solutions.value.find(solution=>{return solution.url === props.url})
      })

      return {solution, development, screenWidth}
    }

}
</script>


<style scoped>
section {
  padding: 16px 24px;
  background: #f5f5f5;
}
</style>

<style scoped>
/* Content Design */
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
  margin: auto 0;
  color: #333333;
}

.brand .icon {
  height: 20px;
  width: 20px;
  fill: currentColor;
}

.brand .name {
  margin-left: 4px;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
  margin: 15% 5%;
}

.title {
  color: #333333;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.6;
  margin: 15% 5%;
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

/* Parent CSS (Container) */
main {
  padding: 24px;
}
@media (min-width: 768px) {
  main {
    padding: 48px;
  }
}

/* Responsive Table */

@media (max-width: 1366px) {
  .grid-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 999px) {
  .table-list {
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    padding: 20px;
    row-gap: 50px;
  }

  .brand .name {
    margin-left: 4px;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.5;
    margin: 15% 5%;
  }
}

@media (max-width: 750px) {
  .table-list {
    display: grid;
    grid-template-columns: 1fr 6fr 1fr;
    padding: 20px;
    row-gap: 50px;
  }
}

@media (max-width: 500px) {
  .grid-list {
    display: grid;
    grid-template-columns: 1fr;
    margin: 10% 5%;
  }
  .table-list {
    display: grid;
    grid-template-columns: 1fr;
    padding: 20px;
    row-gap: 50px;
  }
  .brand .name {
    font-size: 16px;
    font-weight: 700;
    line-height: 1.5;
    text-decoration: underline;
    margin: 0;
  }
  .title {
    color: #333333;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.6;
    margin: 0;
  }
}

@media (min-width: 1000px)
{
  .table-list {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    padding: 20px;
    row-gap: 50px;
  }
}
</style>
