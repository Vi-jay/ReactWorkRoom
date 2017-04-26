require("../css/style.css");
import SearchBarStyle from "../css/searchBar.css"
import React, {Component} from "react";//React必须大写
const hideRemind = require("./mixins").hideRemind;
const getRemind = require("./mixins").getRemind;
class SearchInput extends Component { //搜索框
    constructor(props) {
        super(props);
        this.state = {keyWord: "", isShowChild: true};
    }

    search = (e) => {
        this.setState({keyWord: e.target.value, isShowChild: true})
    };
    changeKeyWord = (e) => {
        this.setState({keyWord: e.target.innerText, isShowChild: false})
    };

    render() {
        return (
            <div>
                <input type="text" value={this.state.keyWord} onInput={this.search}/>
                <i className="icon-folder-open"></i>
                <ResultList {...this.state} changeKeyWord={this.changeKeyWord}/>
            </div>
        )
    }
}

class ResultList extends Component {    //搜索框的结果条目
    constructor(props) {
        super(props);
    }
    render() {
        let keyWord = this.props.keyWord;
        let target = (!this.props.isShowChild) || hideRemind(keyWord);
        return (
            <ul className={ target ? SearchBarStyle.hide : SearchBarStyle.show}>
                {
                    getRemind(keyWord).map((item, index) => {
                        return (<li key={index} onClick={this.props.changeKeyWord}>{item}</li>)
                    })
                }
            </ul>
        )
    }
}
export {SearchInput, ResultList}