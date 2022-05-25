<template>
    <div id="card">
        <div id="content">
            <div><img label="image_1" style="height: 75px; weight: 75px" :src="image1"></div>
            <div><img label="image_2" style="height: 75px; weight: 75px" :src="image2"></div>
            <div style="float: right"><h3 style="float: right">{{title}}</h3></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SolutionCard',
    props: ['image1', 'image2', 'title']
}
</script>

<style lang="less" scoped>
#card {
  display: grid;
  grid-template-columns: 1fr;  
}
#card > div {
  display: flex;
  padding: 3px;
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

#content {
  display: grid;
  grid-template-columns: 1fr 1fr 3fr;
}
#content > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin: 5px;
  box-sizing: border-box;
  transition: 0.17s all ease-in-out;
}
#content > div > * {
  margin: 5px;
}
</style>