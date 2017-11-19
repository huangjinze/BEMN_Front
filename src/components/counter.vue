<template>
    <el-input-number v-model="num1" @change="handleChange" :min="1995" :max="2020" label="描述文字"></el-input-number>
</template>

<script>
    export default {
        data() {
            return {
                num1: 2016
            };
        },
        methods: {
            handleChange(value) {
                console.log(value);
            }
        }
    };
</script>
