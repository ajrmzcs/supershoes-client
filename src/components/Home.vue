<template>
  <div class="row">
    <div class="col-sm-8 offset-sm-2 col-12">
      <div class="card">
        <div class="card-header">
          Admin panel
        </div>
        <div class="card-body">
          <h5 class="card-title">Welcome</h5>
          <p class="card-text">Please select an option</p>
          <div class="links-wrapper">
            <router-link class="nav-link" to="/">Home</router-link>
            <router-link class="nav-link" to="/stores">Stores</router-link>
            <router-link class="nav-link" to="/articles">Articles</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Home'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.links-wrapper {
  display:flex;
  flex-direction: row;
  justify-content: center;
}
</style>
