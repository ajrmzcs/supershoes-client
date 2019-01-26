<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          Stores
        </div>
        <div class="card-body">
          <div v-if="stores.length > 0">
            <table class="table">
              <thead>
                <tr>
                  <td>Id</td>
                  <td>Address</td>
                  <td>Name</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="store in stores" :key="store.id">
                  <td>{{ store.id }}</td>
                  <td>{{ store.name }}</td>
                  <td>{{ store.address }}</td>
                  <td>
                    <font-awesome-icon class="icon-default hover-green" :icon="['fas', 'eye']" />
                    <font-awesome-icon class="icon-default hover-blue" :icon="['fas', 'edit']" />
                    <font-awesome-icon class="icon-default hover-red" :icon="['fas', 'trash-alt']" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            There are no stores yet!!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Store',
  data () {
    return {
      url: 'http://supershoes.test/services/stores',
      token: 'bXlfdXNlcjpteV9wYXNzd29yZA==',
      stores: []
    }
  },
  mounted () {
    this.getStores(this.url)
  },
  methods: {
    getStores (url) {
      axios.get(url, {'headers': {
        'Authorization': 'Basic ' + this.token
      }})
        .then(response => {
          if (typeof response.data.success !== 'undefined' && response.data.success === true) {
            this.stores = response.data.stores
          }
          console.log(this.stores)
        })
        .catch(e => {
          console.log(e)
        })
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
</style>
