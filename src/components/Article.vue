<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          Articles
          <a href="#" @click="createArticle()" data-toggle="modal" data-target="#storeModal">
            <font-awesome-icon class="icon-green" :icon="['fas', 'plus']" />
          </a>
        </div>
        <div class="card-body">
          <div v-if="successMsg" class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success,</strong> {{ successMsg }}
            <button type="button" class="close" aria-label="Close" @click="closeAlert('success')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div v-if="errors.length > 0" class="alert alert-danger alert-dismissible fade show" role="alert">
            <p v-for="(error, key) in errors" :key="key">{{ error }}</p>
            <button type="button" class="close" aria-label="Close" @click="closeAlert('error')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
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
                  <td>Actions</td>
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
                  <td>
                    <a href="#" @click="showArticle(article.id)" data-toggle="modal" data-target="#articleModal">
                      <font-awesome-icon class="icon-default hover-green" title="Show" :icon="['fas', 'eye']" />
                    </a>
                    <a href="#" @click="editArticle(article.id)" data-toggle="modal" data-target="#articleModal">
                      <font-awesome-icon class="icon-default hover-blue" title="Edit" :icon="['fas', 'edit']" />
                    </a>
                    <a href="#" @click="deleteArticle(article.id)">
                      <font-awesome-icon class="icon-default hover-red" title="Delete" :icon="['fas', 'trash-alt']" />
                    </a>
                  </td>
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
    <!-- Modal -->
    <div class="modal fade" id="articleModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Article Details</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-if="articleEdit">
              <form action="" method="POST" @submit.prevent="updateArticle(article.id)">
                <div class="form-group">
                  <label for="description">Description</label>
                  <textarea class="form-control" rows="3" v-model="article.description"></textarea>
                </div>
                <div class="form-group">
                  <label for="name">Name</label>
                  <input type="text" class="form-control" name="name"
                         v-model="article.name">
                </div>
                <div class="form-group">
                  <label for="price">Price</label>
                  <input type="text" class="form-control" name="price"
                         v-model="article.price">
                </div>
                <div class="form-group">
                  <label for="total_in_shelf">Total in shelf</label>
                  <input type="text" class="form-control" name="total_in_shelf"
                         v-model="article.total_in_shelf">
                </div>
                <div class="form-group">
                  <label for="total_in_vault">Total in vault</label>
                  <input type="text" class="form-control" name="total_in_vault"
                         v-model="article.total_in_vault">
                </div>
                <div class="form-group">
                  <label for="store">Store</label>
                  <select name="store" v-model="article.store_name" class="form-control">
                    <option v-for="store in stores" :key="store.id" :value="store.name"
                            :selected="store.name === article.store_name">
                      {{ store.name }}
                    </option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
            <div v-else>
              <p>Id: {{ article.id }}</p>
              <p>Description: {{ article.description }}</p>
              <p>Name: {{ article.name }}</p>
              <p>Price: {{ article.price }}</p>
              <p>Total in shelf: {{ article.total_in_shelf }}</p>
              <p>Total in vault: {{ article.total_in_vault }}</p>
              <p>Store: {{ article.store_name }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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
      url: 'http://supershoes.test/services/articles',
      storeUrl: 'http://supershoes.test/services/stores',
      token: 'bXlfdXNlcjpteV9wYXNzd29yZA==',
      articles: [],
      stores: [],
      article: {},
      articleEdit: '',
      successMsg: '',
      errors: []
    }
  },
  mounted () {
    this.getArticles(this.url)
    this.getStores(this.storeUrl)
  },
  methods: {
    getArticles (url) {
      axios.get(url, {'headers': {
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
    },
    getStores (url) {
      axios.get(url, {'headers': {
        'Authorization': 'Basic ' + this.token
      }})
        .then(response => {
          if (typeof response.data.success !== 'undefined' && response.data.success === true) {
            this.stores = response.data.stores
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    getArticle (id) {
      axios.get(this.url + '/' + id, {'headers': {
        'Authorization': 'Basic ' + this.token
      }})
        .then(response => {
          if (typeof response.data.success !== 'undefined' && response.data.success === true) {
            this.article = response.data.article
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    createArticle () {
      // Set article's properties to null
      this.article = {
        id: null,
        description: null,
        name: null,
        price: null,
        total_in_shelf: null,
        total_in_vault: null,
        store_name: null
      }
      this.articleEdit = true
      $('#articleModal').modal('show')
    },
    showArticle (id) {
      this.articleEdit = false
      this.getArticle(id)
    },
    editArticle (id) {
      this.articleEdit = true
      this.getArticle(id)
    },
    updateArticle (id) {
      if (id === null) {
        axios.post(this.url, this.article, {'headers': {
          'Authorization': 'Basic ' + this.token,
          'Content-Type': 'application/json'
        }})
          .then(response => {
            if (typeof response.data.success !== 'undefined' && response.data.success === true) {
              this.successMsg = response.data.msg
              $('.alert').show()
              this.getArticles(this.url)
              $('#articleModal').modal('hide')
            }
          })
          .catch(err => {
            if (typeof err.response.data.success !== 'undefined' && err.response.data.success === false) {
              this.setErrors(err.response.data.errors)
            }
          })
      } else {
        axios.put(this.url + '/' + id, this.article, {'headers': {
          'Authorization': 'Basic ' + this.token,
          'Content-Type': 'application/json'
        }})
          .then(response => {
            if (typeof response.data.success !== 'undefined' && response.data.success === true) {
              this.successMsg = response.data.msg
              $('.alert').show()
              this.getArticles(this.url)
              $('#articleModal').modal('hide')
            }
          })
          .catch(err => {
            console.log(err.response.data.errors)
            this.setErrors(err.response.data.errors)
          })
      }
    },
    deleteArticle (id) {
      const confirmDelete = confirm('Do you really want to delete this item? ')
      if (confirmDelete) {
        axios.delete(this.url + '/' + id, {'headers': {
          'Authorization': 'Basic ' + this.token,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }})
          .then(response => {
            if (typeof response.data.success !== 'undefined' && response.data.success === true) {
              this.successMsg = response.data.msg
              $('.alert').show()
              this.getArticles(this.url)
            }
          })
          .catch(e => {
            console.log(e)
          })
      }
    },
    setErrors (error) {
      this.errors = []
      for (const value of Object.values(error)) {
        this.errors.push(value[0])
      }
      $('.alert').show()
      $('#articleModal').modal('hide')
    },
    closeAlert (type) {
      switch (type) {
        case 'success':
          // clean messages on close
          this.successMsg = ''
          $('.alert-success').hide()
          break
        case 'error':
          // clean messages on close
          this.errors = []
          $('.alert-danger').hide()
          break
      }
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
