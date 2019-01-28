<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          Stores
          <a href="#" @click="createStore()" data-toggle="modal" data-target="#storeModal">
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
          <div v-if="stores.length > 0">
            <div class="table-responsive">
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
                  <td>
                    <router-link title="Articles by Store" class="nav-link" :to="{name: 'ArticlesByStore', params: {id: store.id}}">
                      {{ store.name }}
                    </router-link>
                  </td>
                  <td>{{ store.address }}</td>
                  <td>
                    <a href="#" @click="showStore(store.id)" data-toggle="modal" data-target="#storeModal">
                      <font-awesome-icon class="icon-default hover-green" title="Show" :icon="['fas', 'eye']" />
                    </a>
                    <a href="#" @click="editStore(store.id)" data-toggle="modal" data-target="#storeModal">
                      <font-awesome-icon class="icon-default hover-blue" title="Edit" :icon="['fas', 'edit']" />
                    </a>
                    <a href="#" @click="deleteStore(store.id)">
                      <font-awesome-icon class="icon-default hover-red" title="Delete" :icon="['fas', 'trash-alt']" />
                    </a>
                  </td>
                </tr>
                </tbody>
              </table>
              Total items: {{ total }}
            </div>
          </div>
          <div v-else>
            There are no stores yet!!
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="storeModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Store Details</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-if="storeEdit">
              <form action="" method="POST" @submit.prevent="updateStore(store.id)">
                <div class="form-group">
                  <label for="name">Name</label>
                  <input type="text" class="form-control" name="name"
                         v-model="store.name">
                </div>
                <div class="form-group">
                  <label for="address">Address</label>
                  <input type="text" class="form-control" name="name"
                  v-model="store.address">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
            <div v-else>
              <p>Id: {{ store.id }}</p>
              <p>Name: {{ store.name }}</p>
              <p>Address: {{ store.address }}</p>
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
      url: 'http://localhost:8000/services/stores',
      token: 'bXlfdXNlcjpteV9wYXNzd29yZA==',
      stores: [],
      store: {},
      storeEdit: '',
      successMsg: '',
      errors: [],
      total: ''
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
            this.total = response.data.total_elements
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    getStore (id) {
      axios.get(this.url + '/' + id, {'headers': {
        'Authorization': 'Basic ' + this.token
      }})
        .then(response => {
          if (typeof response.data.success !== 'undefined' && response.data.success === true) {
            this.store = response.data.store
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    createStore () {
      // Set store's properties to null
      this.store = {id: null, name: null, address: null}
      this.storeEdit = true
      $('#storeModal').modal('show')
    },
    showStore (id) {
      this.storeEdit = false
      this.getStore(id)
    },
    editStore (id) {
      this.storeEdit = true
      this.getStore(id)
    },
    updateStore (id) {
      if (id === null) {
        axios.post(this.url, this.store, {'headers': {
          'Authorization': 'Basic ' + this.token,
          'Content-Type': 'application/json'
        }})
          .then(response => {
            if (typeof response.data.success !== 'undefined' && response.data.success === true) {
              this.successMsg = response.data.msg
              $('.alert').show()
              this.getStores(this.url)
              $('#storeModal').modal('hide')
            }
          })
          .catch(err => {
            if (typeof err.response.data.success !== 'undefined' && err.response.data.success === false) {
              this.setErrors(err.response.data.errors)
            }
          })
      } else {
        axios.put(this.url + '/' + id, this.store, {'headers': {
          'Authorization': 'Basic ' + this.token,
          'Content-Type': 'application/json'
        }})
          .then(response => {
            if (typeof response.data.success !== 'undefined' && response.data.success === true) {
              this.successMsg = response.data.msg
              $('.alert').show()
              this.getStores(this.url)
              $('#storeModal').modal('hide')
            }
          })
          .catch(err => {
            this.setErrors(err.response.data.errors)
          })
      }
    },
    deleteStore (id) {
      const confirmDelete = confirm('Do you really want to delete this item? ' +
              'This will also delete all related articles')
      if (confirmDelete) {
        axios.delete(this.url + '/' + id, {'headers': {
          'Authorization': 'Basic ' + this.token,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }})
          .then(response => {
            console.log(response)
            if (typeof response.data.success !== 'undefined' && response.data.success === true) {
              this.successMsg = response.data.msg
              $('.alert').show()
              this.getStores(this.url)
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
      $('#storeModal').modal('hide')
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
