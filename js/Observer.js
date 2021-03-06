class Observer {
    constructor(data) {
        this.defineReactive(data); // 将用户自定义的data中的元素都进行劫持观察，从而来实现双向绑定
    }
    defineReactive(data) {
        Object.keys(data).forEach(key => {
            var val = data[key];
            var dep  = new Dep(); // 用来收集双向绑定的各个数据上变化时都有的依赖,当前使用一个Dep容器就可以了
            if(typeof val === 'object') {
                new Observer(val);  // 反复检查还有没有内容,向里检查是否还有需要监听的内容
            }
            Object.defineProperty(data, key, {
                get() {
                    if(Watcher) { // 如果当前所获取的这个变量上面有监视器，那么就需要把监视器放到订阅器中等待触发
                        dep.addSub(Watcher); // 将监视器添加到订阅列表中
                    }
                    return val;
                },
                set(newVal) {
                    if(newVal === val) { // set值与之前的值相同，不做任何修改
                        return;
                    }
                    val = newVal; // 将vue实例上对应的值修改为新的值

                    dep.notify(); // 通知执行所有与此变量相关的回调函数
                }
            })
        });
    }
}