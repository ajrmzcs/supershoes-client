<template>
  <div id="app" class="site">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Super Shoes</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/stores">Stores</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/articles">Articles</router-link>
        </li>
      </ul>
    </div>
  </nav>
    <div class="container content-margin site-content">
      <router-view/>
    </div>
    <footer class="py-3">
      <div class="text-center">
        <span class="">Super Shoes &copy; {{ new Date().getFullYear() }}</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
.content-margin {
  margin-top: 2rem;
}

.icon-default {
  color: lightgrey;
}

.hover-green:hover {
  color: forestgreen;
}
.hover-blue:hover {
  color: dodgerblue;
}
.hover-red:hover {
  color: red;
}
.site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.site-content {
  flex: 1;
}
</style>
