<template>
  <div class="message-box dialog-mask" @click="$close">

    <div class="dialog-content">
     <div class="dialog-close">
     <button class="el-button" type="text"  @click="$close">Close</button>
     </div>
      <div class="dialog-body">

        <img class="block-image" v-bind:alt="content.ItemName" v-bind:src="content.PhotoName | resizeImage"/>
        <h2>{{ content.ItemName }} (ID:{{content.ItemID}})</h2>
        
        
        <p>Dimensions: {{content.Dimensions}}</p>
       <div v-if="content.Description">{{content.Description}}</div>
       <div v-else>Description coming soon.</div>
       <span class="block-price">{{content.BasePrice | currency}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    resizeImage: function (value) {
    return value + "?format=png&crop=10,10,-10,-10&mode=crop";
    }
  }
};
</script>


<style scoped lang="scss">

/*Dialog styles*/
.dialog {
    &-mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: center;
        justify-content: center;
        background-color: rgba(0,0,0,.33); 
    }

    &-content {
        margin: 0 20px;
        padding: 20px 30px;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        color: #303133;
        max-width: 500px;
    }

    &-close {
        text-align: right;
    }
}


.el-button {
    cursor: pointer;
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
    margin: 0;
    transition: .1s;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    border-style: none;

}

.el-button:focus, .el-button:hover {
    background: #b8cacf;
    border-color: #3a8ee6;
    color: #fff;
}

/*End Dialog styles*/

.block {
    &-image {
        max-width: 250px;
        @media only screen and (max-width: 767px) {
          max-width: 120px;
        }
    }
    &-price {
        padding: 10px;
        border: 1px solid #56a1b3;
        background: #119bba;
        color: #fff;
        font-weight: 600;
        display: block;
        margin: 10px 0;
    }
}
</style>