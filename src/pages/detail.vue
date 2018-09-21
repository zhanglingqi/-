<template>
    <div class="page">
         <x-header class="lg-header @handleClose">水电表抄录</x-header>
        <scroller class="scroll"> 
            <div class="lg-con">
                <div class="row">{{roomWatch.roomNumber}}</div>
                <input Type="number" pattern="\d*" @click="aios" placeholder=place v-model="roomWatch.watchNumber" class="lg-input">

                <x-textarea placeholder="备注" class="lg-text" :height="160" v-model="roomWatch.remark"></x-textarea>
                <x-button type="primary" @click.native="submit">保存</x-button>
            </div>
        </scroller>
    </div>
</template>

<script>
import { XTextarea,XButton,XHeader } from 'vux'
import {roomWatchNumberRequest,saveRoomWatchNumberRequest} from '@/utils/api'
export default {
    data () {
        return {
            formData:{
                feeType:'',
                roomId:''
            },
            roomWatch:{
                feeType:'',
                userId:1,
                roomId:0,
                roomNumber:"",
                orderId:0,
                watchNumber:2,
                remark:'修改备注'
            },
            place:'输入水表数',
        };
    },
    components: {
        XTextarea,
        XButton,
        XHeader
    },
    activated () {
        this.init();
    },
    methods: {
        init(){
            var roomId = this.$route.query.roomId;
            var type = this.$route.query.type;
            this.formData.roomId = roomId;
            this.place = type==0?'输入水表数':'输入电表数';
            this.formData.feeType = type==0?'water':'ammeter';
            this.roomWatch.feeType = type==0?'water':'ammeter';
            this.roomWatchNumber();
        },
        roomWatchNumber(){
            roomWatchNumberRequest(this.formData).then(res=>{
                this.roomWatch.orderId = res.data.orderId;
                this.roomWatch.remark = res.data.remark;
                this.roomWatch.roomId = res.data.roomId;
                this.roomWatch.roomNumber = res.data.roomNumber;
                this.roomWatch.watchNumber = res.data.watchNumber;
            })
        },
        submit(){
            // this.roomWatch.userId = window.localStorage.getItem('userId');
            saveRoomWatchNumberRequest(this.roomWatch).then(res=>{
                localStorage.setItem('cell',JSON.stringify({'roomId':this.roomWatch.roomId,'watchNumber':this.roomWatch.watchNumber}));
                alert('保存成功');
                window.history.go(-1);
            })
        },
        handleClose () {
            window.history.go(-1);
        },
        aios() {
             var u = navigator.userAgent, app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid) {
            //这个是安卓操作系统
            // alert(1)
            }
            if (isIOS) {
        　　　　//这个是ios操作系统
            // alert(2)
            }
        }
    }
}
</script>

<style lang='scss' scoped>
.lg-con{
    padding: .213rem;
    .row{
        padding: .213rem 0;
        background: #cccccc;
        text-align: center;
        border-radius: 5px;
        margin-bottom: 5px;
    }
    .lg-input{
        border: 1px solid #cccccc;
        width: 100%;
        border-radius: 3px;
        padding: .133rem .213rem;
        margin-top:5px;
        height: 50px;
        font-size: 20px; 
    }
    .lg-text{
        padding: 5px 3px !important;
        border: 1px solid #ccc;
        margin-top: 15px;
        margin-bottom: 30px;
        border-radius: 5px;
    }
    .lg-header{
    background-color: #26a2ff !important;
    .vux-header-left a{
        color: #fff !important;
    } 
}
}
</style>
<style>
.weui-textarea{
    width: 99% !important;
}
.weui-btn_primary{
    background-color: #26a2ff !important;
}

</style>

