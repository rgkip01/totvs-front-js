<template>
  <div class="container">
    <div class="section mt-5">
      <h1>Clientes</h1>
      <div class="input-group mb-3">
        <input type="text" v-model="query" class="form-control" placeholder="Filtrar" aria-label="Recipient's username" aria-describedby="basic-addon2">
        <div class="input-group-append">
          <button @click="search()" class="btn btn-outline-secondary" type="button">Button</button>
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th width="30%">Código Cliente</th>
            <th width="40%" @click="orderByName('name')">Nome do Cliente</th>
            <th width="40%" @click="orderByName('price')">Valor</th>
            <th width="60%" @click="orderByName('dueDate')">Desde</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="defaulting in defaultings" v-bind:key="defaulting.id">
            <td>{{defaulting._id}}</td>
            <td>{{defaulting.name}}</td>
            <td>{{defaulting.price}}</td>
            <td>{{defaulting.dueDate | moment("DD/MM/Y")}}</td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
name: 'Defaulting',

data: () => ({
  defaultings:[],
  id:0,
  name: null,
  price:0,
  dueDate: null,
  params: null,
  sort: '-',
  query:''
}),

async created(){
  this.getlAll()
},

methods: {

  async search(){
     await axios.get(process.env.VUE_APP_CORE_URL, { params: {search: this.query }}).then(res => {
      return this.defaultings = res.data
    })
  },

  async orderByName(params){
    let query = ''
    if (this.sort == '-') {
      query = params
      this.sort = ''
    } else {
      query = `-${params}`
      this.sort = '-'
    }
     await axios.get(`${process.env.VUE_APP_CORE_URL}/order`, { params: {order: query }}).then(res => {
      return this.defaultings = res.data
    })
  },

  async getlAll(){
    await axios.get(process.env.VUE_APP_CORE_URL).then( res => {
      return this.defaultings = res.data
    })
  },
  async getOne(defaulting){
    this.id = defaulting._id
    this.name = defaulting.name
    this.price = defaulting.price
    this.dueDate = defaulting.dueDate
  },

  async postUser(){
    if(this.id == 0){
      await axios.post(process.env.VUE_APP_CORE_URL, {
        name: this.name,
        price: this.price,
        dueDate: this.dueDate
      })
    this.getlAll();

    } else {
      await axios.put(`${process.env.VUE_APP_CORE_URL}/${this.id}`, {
        name: this.name,
        price: this.price,
        dueDate: this.dueDate
      })
    this.getlAll();

    }
  },

  async deleteOne(id){
    await axios.delete(`${process.env.VUE_APP_CORE_URL}/${id}`)
    this.getlAll();
  }

  }
}

</script>
