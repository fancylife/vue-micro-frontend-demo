<template>
    <div>
        <h1>前端微服务基站</h1>
      <ul>
          <li>  <a href="#/bi-report">去详情页</a></li>
          <li>  <a href="#/fcrm">去首页</a></li>
          <li>  <a href="#/wxwork">去wxwork</a></li>
      </ul>
        <div class="wrapper">
         <div class="thead"  @scroll="onScrollSync('thead','tbody')" ref="thead" >
              <ok-table></ok-table>
         </div>
          <div class="tbody" @scroll="onScrollSync('tbody','thead')" ref="tbody">
               <ok-table></ok-table>
          </div>
          <div class="tbody-fixed-left-top"  ref="tbodyFixedLeftTop">
               <ok-table></ok-table>
          </div>
           <div class="tbody-fixed-left-center" @scroll="onScrollFixSync('tbodyFixedLeftCenter','tbody')"  ref="tbodyFixedLeftCenter">
               <ok-table></ok-table>
          </div>
        </div>
    </div>
</template>

<script>
    import OkTable from './table';
    export default {
        components:{
            OkTable
        },
        methods: {
             onScrollFixSync(triggerKey,targetKey){
                let scrollTop = this.$refs[triggerKey].scrollTop;
                this.$refs[targetKey].children[0].setAttribute('style', `transform:translate3d(0px,${-scrollTop}px,0px)`)
            },
            onScrollSync(triggerKey,targetKey) {
                let scrollLeft = this.$refs[triggerKey].scrollLeft;
            
              this.$refs[targetKey].children[0].setAttribute('style', `transform:translate3d(${-scrollLeft}px,0px,0px)`)
                if(triggerKey === 'tbody'){
                    let scrollTop = this.$refs[triggerKey].scrollTop;
                    this.$refs['tbodyFixedLeftCenter'].children[0].setAttribute('style', `transform:translate3d(0px,${-scrollTop}px,0px)`)
                }
                console.log() 
            }
            // onScrollFixSync(triggerKey,targetKey){
            //    this.$refs[targetKey].scrollTop = this.$refs[triggerKey].scrollTop;  
            // },
            // onScrollSync(triggerKey,targetKey) {
            //     this.$refs[targetKey].scrollLeft = this.$refs[triggerKey].scrollLeft;
                
            //     if(triggerKey === 'tbody'){
            //            this.$refs['tbodyFixedLeftCenter'].scrollTop = this.$refs[triggerKey].scrollTop;
            //     }
            //     console.log() 
            // }
        },
        mounted(){
            // window.addEventListener('scroll',)
        }
    }
</script>

<style lang="less">
   
.wrapper{
    width: 500px;
    height: 300px;
    position: relative;
    overflow: hidden;
}

.thead{
    overflow: scroll;
    position: absolute;
    top: 0;
    z-index: 30;
    width: 500px;
    height: 36px;
    table th{
        color: red;
    }
}
.tbody{
        width: 500px;
    height: 264px;
    overflow: scroll;
    position: absolute;
    top: 0;
}
 /* for Chrome */
.tbody,.thead,.tbody-fixed-left-top,.tbody-fixed-left-center {
    &::-webkit-scrollbar{
         display: none; 
    }
}
.tbody-fixed-left-top{
     position: absolute;
    left: 0;
    width: 80px;
    z-index: 34;
    top: 0;
    height: 36px;
     overflow: hidden;
     table th, table td{
        color: yellow;
    }
}
.tbody-fixed-left-center{
    position: absolute;
    left: 0;
    width: 80px;
    z-index: 31;
    top: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    height: 264px;
     table th, table td{
        color: blue;
    }
}
</style>