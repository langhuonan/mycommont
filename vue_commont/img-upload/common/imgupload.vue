<template>       
<div class="upload">
    <label for="file"><img :src="src" alt=""></label>
    <input type="file" @change="getFile" ref="file" id="file">
</div>

</template>

<script>
import logo from '../assets/images/index_logo.png'
export default {
    data(){
     return{
        src:logo
     }
    },
    methods: {
        //base64转为formdata
        dataURItoBlob(dataURI) {
            var byteString = atob(dataURI.split(',')[1]);
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], {type: mimeString});
        },
        getFile:function(e){
            let _this = this
            let value_ = e.target
            let files = e.target.files[0]//获取上传的图片

            let size_ = 200;//文件限制的大小，单位为kb
            let fileSize = (files.size / 1024).toFixed(0)//文件大小，单位kb
            let fileType = value_.value.substring(value_.value.lastIndexOf("."))//文件格式

            if (!e || !window.FileReader) { return }//是否支持FileReader
            let reader = new FileReader()//new一个FileReader对象
            reader.readAsDataURL(files) //将文件读取为 DataURL
            //判断文件大小
            if (fileSize > size_) {
                alert('文件过大')
                return false
            }
            
            if (!fileType.match(/.jpg|.jpeg|.gif|.png|.bmp/i)) {
                alert('请上传正确格式的图片')
                return false;
            }


            reader.onload = function(){//文件读取成功result 属性返回读取的结果
                _this.src = this.result//展示图片
                //将base64转为formdata
                var blob = _this.dataURItoBlob(this.result);
                let format = new FormData()
                format.append('src',blob)
                _this.$emit('getImage',format)//将路径传出去
            }
        }
    }
}
</script>

<style lang="less" scoped>
    @r:2px;
   .upload img{
        display: block;
        width: 108/@r;
        height: 108/@r;
        margin-bottom: 34/@r;
    }
   .upload input {
        display: none;
    }
</style>