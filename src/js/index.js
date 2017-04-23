import React, {Component} from "react";//React必须大写
import reactDom from "react-dom";
import {createStore, combineReducers} from "redux";
import Style from "../css/index.less";
import  reducers from "./reducers";
import {connect, Provider} from "react-redux";
function Test(prop) {   //组件名称和组件方法必须首字母大写
    return <div>{prop.name}</div>; //直接生成的文字node节点即直接为{}必须得到的结果是字符串或者数字
}                                   //自定义属性可以是对象 因为会被react词法分析成对象传给组件方法

function Welcome(prop) {
    return (<h1 onClick={prop.onClick}>hello{prop.name || "hello"}</h1>)
}
function GetOut(prop) {     //使用逻辑符或多元运算进行简化操作  jsx中可以是数字和字符串也可以是(html元素)
    return (<h1 onClick={prop.onClick}>{prop.name || (<h3>hello</h3>)} ,you get out!</h1>);  //事件必须作用在dom元素上而不是模块元素上 所以需要往下传递
}
class UserGreeting extends Component {
    constructor(props) {
        super(props);
        this.state = {isLogin: false};
        this.other = this.other.bind(this);
    }

    other() {
        this.setState((pre) => ({isLogin: !pre.isLogin}))
    }

    render() {
        if (this.state.isLogin) { //使用逻辑符或多元运算进行简化操作
            return <Welcome onClick={this.change || this.other }/>
        }
        return <GetOut onClick={this.change || this.other }/>
    }
}

class ListItem extends Component {      //如果使用ref获取组建 该组件必须是定义的类 不是function
    constructor(props) {
        super(props);
    }

    render() {
        return (<li>{this.props.value}</li>)
    }
}
function NumberList(prop) {
    const listItem = prop.numbers.map((cur) => {
        return (<ListItem value={(() => cur)()} key={cur}/>); //每个列表条目都应该有一个key 不然会报错
    });                         //模版里可以直接写js 但是一定要立即执行 返回结果
    return (<ul>{listItem}</ul>)
}
const numbers = [2, 4, 5, 6, 7];


class NameForm extends Component {
    constructor(props) {
        super(props);
        this.state = {value: "hello", bool: true};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        console.log(this.input);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <textarea onChange={this.handleChange} value={this.state.value}/>
                <ListItem value={1} ref={(input) => this.input = input}/>
                <input type="submit" value="button"/>
                {this.state.bool && <span>{1231}</span>}
            </form>
        )//ref中会执行一个回调函数 参数是当前dom 可以利用它保存当前dom引用
    }
}

class ListOfWords extends React.PureComponent { //判断props的新旧值是否发生不同变化（注意 千万不要在父组件去改老值的对象 这样这里也会收到影响）

    render() {                                  //于是老对象和新对象一样 则不会发生变化
        return <div>{this.props.words.join(',')}</div>;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.words !== nextProps.words) { //自定义老对象和新对象什么时候发生改变才更新该组件
            return true;
        }
        return false;
    }
}
function WordAdder() {//当多个模块内容一样 只是内容不同时  可以使用函数组合 返回一个类 传递不同的数据给这个类 返回不同的数据一样的模块
    //然后实现重复利用
    return class  extends React.Component {
        constructor(props) {//为了防止传入的数据 被更改 可以在新建一个子组件 当传递给子组件时 子组件其实接受到的是一个新的对象 对新的对象进行更改不会影响原来的
            super(props);   //当然 也可以使用浅拷贝
            this.state = {
                words: ['marklar']
            };
            this.handleClick = this.handleClick.bind(this);
        }

        componentDidMount() {//组件被安装时
            console.log(123);
        }

        componentWillUnmount() {//组件将要被卸载时
            console.log(456);
        }

        // componentWillMount()：组件加载前调用
        // componentDidMount()：组件加载后调用
        // componentWillUpdate(): 组件更新前调用
        // componentDidUpdate(): 组件更新后调用
        // componentWillUnmount()：组件卸载前调用
        // componentWillReceiveProps()：组件接受新的参数时调用
        handleClick() {
            //千万不能直接改变this.state的值 这样 子元素的旧值会跟着改变导致和新值是一样的
            this.setState((pre) => ({words: [...pre.words, "back"]}));//数组解构则代表把值全部拿出来  此表达式如['marklar','back']
        }

        render() {  //千万不能在render函数中使用高阶函数 这样会导致再次渲染时返回的jsx对象不是同一个 不是同一个对象的话 会把原先的对象直接全部卸载掉重新安装
            return (
                <div>
                    <button onClick={this.handleClick}>Clickme</button>
                </div>
            );//{...this.state}等于    words={this.state.words} 前一句相当于结构对象 把对象的属性直接结构成表达式
        }
    }
}
const DefaultState = {b: 2};//默认的state
// const chatReduce=combineReducers({//一个大型应用会导致Reduce非常大 所以我们可以用combineReducers合并小的Reducer
//     ...reducers                     //此处表示每个属性都将指定一个reducer(和原来的大reducer一样调用)不过每个小Reducer的第一个参数
//                                     //由原来的state变成了state.a  此处等同于a:reducer(state.a,action)
// });
// const chatReduce=combineReducers(reducers);
// const store =createStore(chatReduce);//创建一个store数据仓库
// const unSubScribe=store.subscribe(()=>{console.log(1)});//回调函数 如果store发生变化则会触发该函数 通常在这里面放入setState函数保持页面和store同步
// //例如function listerner() {
// //let newState = store.getState();
// //component.setState(newState); 指定某个组件去setState
// //}
// unSubScribe();//删除监听回调函数
// const action={
//     type:"ADD",
//     payload:2
// };
// store.dispatch(action);//派发action来改变现在这个时刻的state
// console.log(store.getState());//获取现在这个时刻的state
//当我获取了现在这个时刻的state然后去setState改变state则会重新调用render渲染(只是虚拟dom比较然后更新真实dom 并非卸载重新装载)当前模块的父子组件中用到该state的所有组件
class TestMount extends Component {
    constructor(props) {
        super(props);
        this.state = {show: true};
        this.changeHandler = this.changeHandler.bind(this);//把changeHandler属性的方法换成作用在当前对象方法
    }

    changeHandler() {
        this.setState((pre) => ({show: !pre.show}))//setState会去通知react调用Render函数 如果render函数中有高阶函数 则会每次都重新渲染 因为对象发现不是同一个了
                                                   //如果发现是同一个对象 并且并没有什么需要变化的 则不会去改变页面上的dom
    }

    render() {
        console.log(123);
        const Abc = WordAdder();
        return (<div className={Style.text} onClick={this.changeHandler}><span
            className="notComplie">123</span>{this.state.show ? <Abc/> : ""}</div>)
    }
}


////////////////////////////////////
function counter(count = 0, action) {
    switch (action.type) {
        case 'increase':
            return count + 1;
        default:
            return count
    }
}

const Reducers = combineReducers({//合并子reduce
        count: counter
    }
);

const store = createStore(Reducers);
const increaseAction = {type: 'increase'};
function mapStateToProps(state,ownProp) {//映射state到组件的的props上
    console.log(ownProp);
    return {
        value: state.count
    }
}
function mapDispatchToProps(dispatch) {//映射派发action到组件的事件上
    return {
        onIncreaseClick: () => dispatch(increaseAction)//触发函数时发送Action
    }                                //可以在触发监听器时把dom元素的值放在action对象中传到reducer中进行处理更新store导致其他订阅了store的组件随之获取处理过的值 实现双向数据绑定
}
class Counter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {value, onIncreaseClick} = this.props;
        return (
            <div>
                <span>{value}</span>
                <input type="text" value={this.props.value}/>
                <button onClick={onIncreaseClick}>Increase</button>
            </div>
        )
    }
}

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);

class Tcounter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {value} = this.props;//mapStateToProps中将调用我们的函数处理state返回一个props 这里可以直接解构使用
        return (
            <p>{value}</p>
        )
    }
}
function getValue(state) {
    return 1;
}
function mapStateToProps2(state) {
    return {
        value: getValue(state) //虽然此处也订阅了state 但是这里返回值和之前的没有发生变化 则不会调用render方法重复渲染!但是如果state发生改变则会调用render重新渲染
    }
}
const Bpp = connect( //返回一个新的容器组件
    mapStateToProps2,
    mapDispatchToProps
)(Tcounter);

let element = <div><Provider store={store}><App value={1}/></Provider><Provider store={store}><Bpp/></Provider></div>;//把组件当成一个标签 可以重复使用 组件必须有一个根元素
reactDom.render(element, document.getElementById("app"));

