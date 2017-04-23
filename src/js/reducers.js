export default {
    a:(state,action)=>{//创建一个Reducer是一个纯函数(即不能出现随机 传入什么就返回什么
        // 原因是如果state相同则不会触发重新渲染 防止重复更新// ) 根据传入的action的不同 返回不同的state
        return 1;
    }
}