import Icon from "../css/style.css";
import React, {Component} from "react";//React必须大写
import reactDom from "react-dom";
import {createStore, combineReducers} from "redux";
import {connect, Provider} from "react-redux";
const searchBar =require("./searchBar"),SearchInput=searchBar.SearchInput,ResultList=searchBar.ResultList;
const Place={"管辖区域1":["地区1","地区2","地区3"],"管辖区域2":["地区1","地区2","地区3"]};
class Container extends Component{  //总组件
    render(){
        return(
            <div>
                <i className="icon-office"></i>
                <SearchInput/>
                {
                    getAllPlace().map(function (Items,index) {
                        return  React.createElement(Items, {key:index}, null);
                    })
                }
            </div>
        )
    }
}
function getAllPlace() {
    let allPlace=[];
    for (let key in Place){
        allPlace.push(PlaceList(key,Place[key]));
    }
    return allPlace;
}
function PlaceList(parentPlace,childPlace) {
    return class  extends Component{  //总组件
        render(){
            return(
                <div>
                    <p>{parentPlace}</p>
                <ul>
                    {
                        childPlace.map(function (item) {
                            return (<li key={item}>{item}</li>)
                        })
                    }
                </ul>
                </div>
            )
        }
    }
}


reactDom.render(<Container/>,document.getElementById("app"));