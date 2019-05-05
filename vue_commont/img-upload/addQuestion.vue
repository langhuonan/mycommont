<template>
    <div class="container">
        <div class="main">
            <header>题目编辑</header>
            <div class="setquestion">
                <div class="set-name">温馨提示：带有<span>*字符都为必填项,请完整填写</span>哦！</div>
                <div class="question-content">
                    <ul>
                        <li class="question-info"><p class="txt">*题目1</p><x-textarea id="detial" placeholder="请输入题目详细内容，如：图中纸尿裤是什么品牌？" :max="30" :height='70' :rows='3' :clos='30'></x-textarea></li>
                        <li><span>*正确答案</span><input type="text" placeholder="请输入正确答案"></li>
                        <li><span>*错误答案</span><input type="text" placeholder="请输入错误答案"></li>
                        <li><span>*错误答案</span><input type="text" placeholder="请输入错误答案"></li>
                        <li>
                            <span>图片上传</span>
                            <span class="file-msg">点击图片可进行更换</span>
                            <imgupload @getImage='getImage'></imgupload>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="add-arrfrim">
                <div class="add-txt">
                    <div class="add-mask" v-if="addMask"></div>
                    确认添加
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
    import imgupload from '../common/imgupload'
    import logo from '../assets/images/index_logo.png'
    export default {
        components:{imgupload},
        created(){

        },
        data(){
            return {
                addMask:true,
                src:logo
            }
        },
        methods:{
            
            getImage(src){
                this.src=src
                // console.log(src)
               
                console.log(src.get('src'),'666')
                //ajax
            },
        }
    }
</script>

<style lang="less" scoped>
    @r:2px;
    .container {
        width: 100vw;
        height: 100vh;
    }
    .main {
        width: 100%;
        height: 100%;
        background-color: #EFEFF4;
        position: relative;
    }
    .main header {
        width: 100%;
        height: 99/@r;
        line-height: 99/@r;
        font-size: 34/@r;
        font-weight: 500;
        text-align: center;
        color: #fff;
        background-color: #073190;
    }
    .main .set-name {
        height: 86/@r;
        line-height: 86/@r;
        padding-left: 30/@r;
        font-size: 28/@r;
        color: #888;
    }
    .main .set-name span {
        color: #E64340;
    }
    .main .question-content {
        line-height: 88/@r;
        padding-left: 30/@r;
        background-color: #fff;
    }
    
    .main li {
        position: relative;
        border-bottom: 0.5px solid #E5E5E5;
    }
    .main li span{
        margin-right: 46/@r;
    }
    .main li input {
        width: 70%;
        font-size: 28/@r;
        height: 100%;
    }
    .question-info {
        display: flex;
    }
    .question-info .txt {
        flex: 1;
        min-width: 60px;
        margin-right: 46/@r;
    }
    .question-info #detial {
        flex: 4.5;
        line-height: 25px;
        border: none;
    }

    // 图片上传
    .file-msg {
        font-size: 28/@r;
        color: #777;
    }
    // 确定添加
    .main .add-arrfrim {
        margin-top: 160/@r;
        width: 100%;
        height: 88/@r;
        text-align: center;
        line-height: 88/@r;
        color: #fff;
        padding: 30/@r;
        box-sizing: border-box;
    }
    .main .add-txt {
        position: relative;
        background-color: #1F459B;
    }
    .main .add-mask {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(255, 255, 255, .6)
  }
</style>