<template>
  <HelloWorld msg=""/>
  <div v-for="(budgetaries, title) in sortedBudgetary" :key="title">
    <h3>{{title}}</h3>
  <vue-horizontal class="horizontal">
      <div class="item" v-for="budgetary in budgetaries" :key="budgetary.title">
        <router-link :to="{name: 'Budgetary', params: { url: budgetary.url }}">
          <div class="card">
            <div class="content">
              <div>
                <div class="brand">
                  <div class="name">{{ budgetary.title }}</div>
                </div>
              </div>
              <div class="title">{{ budgetary.title }}</div>
            </div>
          </div>
        
        </router-link>
      </div>
    </vue-horizontal>
  </div>
</template>

<script>
import VueHorizontal from 'vue-horizontal'
import { getBudgetaryList } from '../firebase/db'
import auth from '../firebase/auth'
import HelloWorld from '@/components/HelloWorld.vue'
import { reactive } from '@vue/reactivity'

export default {
    components: {
        VueHorizontal,
        HelloWorld,
    },
    async setup (){
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
        return{ sortedBudgetary }
    }
}
</script>

<style>
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
  min-width: 100px;
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
