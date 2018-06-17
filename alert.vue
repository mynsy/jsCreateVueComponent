<template>
  <div id="alert">
    <h2>{{customTitle}}</h2>
    <p>{{customContent}}</p>
    <div>
      <button v-if="customConfirm" @click="customConfirm">确定</button>  
      <button v-if="customCancel" @click="customCancel">取消</button>  
    </div>
  </div>
</template>

<style>
#alert {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  color: #000;
  padding: 0 10px;
  text-align: center;
}
#alert h2 {
  border-bottom: 1px solid #efefef;
}
</style>
