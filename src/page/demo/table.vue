<template>
     <table cellpadding="0" cellspacing="0">
            <thead>
                <tr>
                    <th v-for="item in thead">
                    {{item}}
                </th>
                </tr>
            </thead>
            <tbody>
                <tr  v-for="(item,index) in tbody.rows">
                    <td  v-for="(t,cIndex) in thead">
                        {{t}}1
                    </td> 
                </tr>
            </tbody>
            </table>
</template>

<script>
    export default {
        
        data(){
          return {
                thead:'ABCDEFHGHIJKLMNOPQR'.split(''),
                tbody:{
                    rows:30
                }
          }
        }
    }
</script>

<style lang="less">
table{
  
    td,th{
        padding:10px;
        background:#eee;
        color:#333;
    }
}
</style>