<template>
  <div id="product-items">
     <div class="btn btn-primary tooltip">
      <img alt="sales rep icon" src="../assets/sales_rep.png" class="rep-icon"/>
        <div class="position">
          <h3>Hello, my name is {{store_data.SalesRep.FirstName}} {{store_data.SalesRep.LastName}}! </h3>
          <i></i>
        </div>
      </div>
      <p>{{store_data.SalesRep.FirstName}} {{store_data.SalesRep.LastName}} | <a v-bind:href="'mailto:' + store_data.SalesRep.EmailAddress" target="_top">{{store_data.SalesRep.EmailAddress}}</a></p>
    <ul>
    <li v-for="item in store_data.items" v-bind:key="item.ProductID" class="items">

      <div class="block-top">
        <div class="block-image">
          <img title="Click on image to view more details" v-bind:alt="item.ItemName" v-bind:src="item.PhotoName | resizeImage" @click="showProductDetails(item)"/>
        </div>

       <span class="block-price">{{item.BasePrice | currency}}</span>
       <p class="block-title" @click="showProductDetails(item)">{{ item.ItemName }}</p>
      </div>
      <div class="block-middle">       
        <span class="block-manufacturer">Manufacturer: {{store_data.CompanyName}} </span>
        <img v-bind:alt="store_data.CompanyName" v-bind:src="populateManufactureLogo(store_data.ManufacturerID)"/>
      </div>
      <div class="styled-checkbox">
        <input type="checkbox" v-bind:id="item.ProductID" v-bind:value="item" v-model="selectedItems">
        <label v-bind:for="item.ProductID"></label>
      </div>
     
    </li>
    </ul>
    <div v-if="selectedItems.length" class="selected-list">    
      <span class="selected-list-title">Selected Items </span>
      <ul>
        <li v-for="selectedItem in selectedItems" v-bind:key="selectedItem.ProductID">
          <span>{{selectedItem.ItemName}} - {{selectedItem.BasePrice | currency}}</span>
        </li>
      </ul>
      <span class="selected-total">Total: {{selectedSum | currency}}</span>
    </div>
  </div>
</template>

<script>
import json from "../assets/data.json";
import DialogBox from '@/components/DialogBox.vue';
import { create } from 'vue-modal-dialogs';

const dialogBox = create(DialogBox, 'content');


export default {
  name: "Products",
  data(){
    return{
      store_data: json,
      selectedItems: []
    }
  },
  methods: {
    showProductDetails (item) {
      dialogBox(item)
    },
    populateManufactureLogo (id) {
      let logoURL = "//images.repzio.com/productimages/" + id + "/logo" + id + "_lg.jpg?width=50";
      return logoURL;
    }
  },
  computed: {
    selectedSum(){
      let total = 0;
      this.selectedItems.forEach((item) => {
          total += item.BasePrice;
      });
      return total;
    }
  },
  filters: {
    resizeImage: function (value) {
    return value + "?format=png&crop=10,10,-10,-10&width=100&mode=crop";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.rep {
    &-icon,
    &-msg {
      @media only screen and (min-width: 768px) {
        display: inline-block;
        vertical-align: middle;
        width: 100px;
        cursor: pointer;
      }
    } 

    &-msg {
      background: #cde0f7;
      padding: 10px;
    }
  }

ul {
  list-style-type: none;
  padding: 0;
}
.items {
  display: inline-block;
  margin:10px;
  padding: 10px;
  box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);
  width: 300px;
}
.block {
  &-image {
    width: 100%;
    height: 190px;
    display: flex;

    img {
      margin:auto;
      cursor: pointer;
    }

    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
     /* IE10+ CSS styles */
     display: block;
    }

  }
  &-price {
    padding: 10px;
    border: 1px solid #56a1b3;
    background: #119bba;
    color: #fff;
    font-weight: 600;
    display: block;
  }
  &-title {
     color: #093c47;
     font-weight: 600;
     text-decoration: underline;
     cursor: pointer;
  }
  &-middle {
    text-align:right;
  }
  &-manufacturer {
    font-size: 11px;
    font-style: italic;
    display: block;
  }
  
}

.selected {

  &-list {
    position: -webkit-sticky; /* Safari */
    position: sticky;
    bottom: 0;
    z-index: 10;
    background: #03738c;
    &-title {
      font-weight: 700;
      padding: 10px;
      display: block;
      text-decoration: underline;
    }

    > * {
      color:#fff;
    }
  }


  &-total {
    font-weight: 600;
  }
}

/*Tooltip styles*/
.tooltip {
    display:inline-block;
    position:relative;
    border-bottom:1px dotted #666;
    text-align:left;
}

.tooltip .position {
    min-width:200px; 
    top:50%;
    left:100%;
    margin-left:20px;
    transform:translate(0, -50%);
    padding:10px 20px;
    color:#444444;
    background-color:#EEEEEE;
    font-weight:normal;
    font-size:13px;
    border-radius:8px;
    position:absolute;
    z-index:99999999;
    box-sizing:border-box;
    box-shadow:0 1px 8px rgba(0,0,0,0.5);
    display:none;
    @media only screen and (max-width: 767px) {
        top: 100%;
        left: 40%;
        transform:translate(-50%, 0);
    }
}

.tooltip:hover .position {
    display:block;
}

.tooltip .position i {
    position:absolute;
    top:50%;
    right:100%;
    margin-top:-12px;
    width:12px;
    height:24px;
    overflow:hidden;

    @media only screen and (max-width: 767px) {
      bottom:100%;
      left:50%;
      top: auto;
    }
}

.tooltip .position i::after {
    content:'';
    position:absolute;
    width:12px;
    height:12px;
    left:0;
    top:50%;
    transform:translate(50%,-50%) rotate(-45deg);
    background-color:#EEEEEE;
    box-shadow:0 1px 8px rgba(0,0,0,0.5);

    @media only screen and (max-width: 767px) {
      left:50%;
      transform:translate(-50%,50%) rotate(45deg);
    }
}
/*End Tooltip styles*/

/* styled-checkbox */
.styled-checkbox {
  width: 28px;
  height: 28px;
  position: relative;
  margin: 20px auto;
  background: #f7fcfc;
  box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);
  label {
    width: 20px;
    height: 20px;
    cursor: pointer;
    position: absolute;
    left: 4px;
    top: 4px;
    background: #0aa4c7;
    box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,1);
    &:after {
      content: '';
      width: 9px;
      height: 5px;
      position: absolute;
      top: 4px;
      left: 4px;
      border: 3px solid #fcfff4;
      border-top: none;
      border-right: none;
      background: transparent;
      opacity: 0;
      transform: rotate(-45deg);
    }
    &:hover::after {
      opacity: 0.3;
    }
  }
  input[type=checkbox] {
    visibility: hidden;
    &:checked + label:after {
      opacity: 1;
    }    
  }
}
/* end styled-checkbox*/

</style>
