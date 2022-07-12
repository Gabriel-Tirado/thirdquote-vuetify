<template>
  <HelloWorld msg=""/>
  <div class="table-list">
    <div v-for="(budgetaries, title) in sortedBudgetary" :key="title" style="grid-column: 2">
      <h4>{{title}}</h4>
      
      <v-table fixed-header height="500px" density="compact" style="border: 1px solid #ededed; border-radius: 5px;">
        <thead>
          <tr>
            <th class="text-center" style="background-color: #ededed">
              <div class="content brand">
                <div class="title">Project Number:</div>
                <div class="title">Title:</div>
                <div class="title">Site:</div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="horizontal">
          
          <tr v-for="budgetary in sortItems(budgetaries)" :key="budgetary.title">
            <td>
              <router-link :to="{name: 'Budgetary', params: { url: budgetary.url }}" style="text-decoration: none;">
                <div class="content brand">
                  <div class="title">{{ budgetary.projectNum }}</div>
                  <div class="title">{{ budgetary.title }}</div>
                  <div class="title">{{ budgetary.site }}</div>
                </div>
              </router-link>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
  
</template>

<script>
import { getBudgetaryList } from '../firebase/db'
import auth from '../firebase/auth'
import HelloWorld from '@/components/HelloWorld.vue'
import { reactive } from '@vue/reactivity'

export default {
  components: {
    HelloWorld,
  },
  async setup() {
    const budgetaryList = await getBudgetaryList(auth.user.email)
    const sortedBudgetary = reactive({})
    for (let i = 0; i < budgetaryList.length; i++) {
      let budgetary = budgetaryList[i]
      if (Object.prototype.hasOwnProperty.call(sortedBudgetary, budgetary.panel.name)) {
        sortedBudgetary[budgetary.panel.name].push(budgetary)
      } else {
        sortedBudgetary[budgetary.panel.name] = [budgetary,]
      }
    }

    const sortItems = (_items) => {
      return _items.sort((a, b) => b.projectNum - a.projectNum)
    }

    return{ sortedBudgetary, sortItems }
  }
}
</script>

<style>
section {
  padding: 16px 24px;
  background: #f5f5f5;
}
</style>

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

/* Content Design */
.content {
  padding: 5px auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: left;
}
.brand {
  align-items: center;
  color: #333333;
}
.title {
  color: #333333;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.6;
}
.table-list {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  padding: 20px;
  row-gap: 50px;
}

/* Responsive Breakpoints */
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