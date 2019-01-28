<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          Articles by Store
        </div>
        <div class="card-body">
          <div v-if="articles.length > 0">
            <div class="table-responsive">
              <table class="table">
                <thead>
                <tr>
                  <td>Id</td>
                  <td>Desciption</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>T.Shelf</td>
                  <td>T.Vault</td>
                  <td>Store</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="article in articles" :key="article.id">
                  <td>{{ article.id }}</td>
                  <td>{{ article.description }}</td>
                  <td>{{ article.name }}</td>
                  <td>{{ article.price }}</td>
                  <td>{{ article.total_in_shelf }}</td>
                  <td>{{ article.total_in_vault }}</td>
                  <td>{{ article.store_name }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-else>
            There are no articles yet!!
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
      url: 'http://supershoes.test/services/articles/stores/',
      token: 'bXlfdXNlcjpteV9wYXNzd29yZA==',
      articles: [],
      id: ''
    }
  },
  mounted () {
    // Workaround to show url
    this.getArticles(this.url)
  },
  methods: {
    getArticles (url) {
      axios.get(url + this.$route.params.id, {'headers': {
        'Authorization': 'Basic ' + this.token
      }})
        .then(response => {
          if (typeof response.data.success !== 'undefined' && response.data.success === true) {
            this.articles = response.data.articles
          }
          console.log(this.articles)
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
