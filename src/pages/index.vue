<template>
    <div class="page">
        <lg-header></lg-header>
        <scroller class="scroll"> 
            <sticky :check-sticky-support="false" :offset="0">
                <tab v-model="tabModel" bar-active-color="#26a2ff" active-color="#26a2ff">
                    <tab-item @on-item-click="onItemClick">水表</tab-item>
                    <tab-item @on-item-click="onItemClick">电表</tab-item>
                </tab>
            </sticky>
            <popup-picker :data="popupData.list" v-model="popupData.value" :columns="1" class="lg-picker" @on-change="popupChange"></popup-picker>
            <div>
                <cell class="lg-cell" :title="i.roomNumber" :value="i.watchNumber" v-for="i in cellData" @click.native="cellClick(i.roomId)"></cell>
            </div>
        </scroller > 
        <second-page></second-page>
        
    </div>
</template>

<script>
import {roomListRequest,cellListRequest} from '@/utils/api'
import header from '@/components/header.vue'
import secondPage from '@/components/second-page'
import {Tab,TabItem,Sticky,PopupPicker,Cell} from 'vux'
export default {
    data () {
        return {
            tabModel:0,
            popupData:{
                list:[],
                value:[],
            },
            cellData:[
                {
                 roomId:'',
                 roomNumber:'',
                 watchNumber:''
                }
            ],
            formData : {
                feeType: 'water',
                propertyId:12,
                cellId:'',
            },
        };
    },
    components: {
        'lg-header':header,
        Tab,
        TabItem,
        Sticky,
        PopupPicker,
        Cell,
        secondPage,
    },
    watch:{
        $route( to , from ){   
            if(from.path == '/detail'){
                var cell = JSON.parse(localStorage.getItem('cell'));
                if(cell){
                    for(var i of this.cellData){
                        if(i.roomId == cell.roomId){
                            i.watchNumber = cell.watchNumber;
                        }
                    }
                }
            }
        }
    },
    created() {
        window.newName = this.newName;
    },
    methods: {
        //与安卓，ios,java的通信方法
        newName(propertyId,userId,tokenId)  {
            // window.localStorage.setItem('propertyId',propertyId);
            window.localStorage.setItem('token',tokenId);
            window.localStorage.setItem('userId',userId);
            this.cellList();
            // alert(propertyId)
        },
        cellList(){
            // this.formData.propertyId = window.localStorage.getItem('propertyId');
            cellListRequest(this.formData).then(res=>{
                var data = res.data;
                this.popupData.value = [];
                this.popupData.value.push(res.data[0].cellName);
                this.formData.cellId = res.data[0].cellId;
                for (var i = 0; i < data.length; i++) {
                    this.popupData.list.push({
                        'cellId':data[i].cellId,
                        'name':data[i].cellName,
                        'value':data[i].cellName
                    })
                }
                this.roomList();
            })
        },
        roomList(){
            roomListRequest(this.formData).then(res=>{
                this.cellData = res.data;
            })
        },
        popupChange(value){
            for(var i of this.popupData.list){
                if(i.value == value){
                    this.popupData.value = [i.name];
                    this.formData.cellId = i.cellId;
                }
            }
            this.roomList();
        },
        onItemClick(index){
            this.formData.feeType=index == 0?'water':'ammeter';
            this.cellList();
        },
        cellClick(id){
            this.$router.push({path:'/detail',query:{roomId:id,type:this.tabModel}});
        },
    }
}
</script>

<style lang='scss' scoped>
.lg-picker{
    padding: 12px 0;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 3px;
    width: 90%;
    margin-left: 5%;
    margin-top: 15px;
    font-size: 22px;
}
.lg-cell {
    border-bottom: 1px solid #ccc;
    margin-top: 10px;
    font-size: 16px;
}
</style>
<style lang="scss">
.lg-picker .vux-popup-picker-value{
    display: block;
    text-align:center !important;
}
</style>
