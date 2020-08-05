<template>
  <div class="container">
    <div class="section mt-5">
      <h1>Clientes</h1>
      <div class="input-group mb-3">
        <input type="text" v-model="params" class="form-control" placeholder="Filtrar" aria-label="Recipient's username" aria-describedby="basic-addon2">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button">Button</button>
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th width="60%" @click="orderBy('name')">Nome do Cliente</th>
            <th width="20%" @click="orderBy('price')">Valor</th>
            <th width="20%" @click="orderBy('dueDate')">Desde</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="defaulting in defaultings" v-bind:key="defaulting.id">
            <td>{{defaulting._id}}</td>
            <td>{{defaulting.name}}</td>
            <td>{{defaulting.price}}</td>
            <td>{{defaulting.dueDate}}</td>
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
    url: 'http:localhost:3000/',
    params: null
  }),

  async created(){
    this.getlAll()
  },
  
  methods:{
    orderBy(field) {
      
    },

    async getlAll(){
      const res = await axios.get('http://localhost:3000/api')
      return this.defaultings = res.data
    },
    async getOne(defaulting){
      this.id = defaulting._id
      this.name = defaulting.name
      this.price = defaulting.price
      this.dueDate = defaulting.dueDate
    },

    async postUser(){
      if(this.id == 0){
        await axios.post('http://localhost:3000/', {
          name: this.name,
          price: this.price,
          dueDate: this.dueDate
        })
      this.getlAll();

      } else {
        await axios.put(`hhtp://localhost:3000/${this.id}`, {
          name: this.name,
          price: this.price,
          dueDate: this.dueDate
        })
      this.getlAll();

      }
    },

    async deleteOne(id){
      await axios.delete(`${this.url}/${id}`)
      this.getlAll();
    }
  }
}
</script>
