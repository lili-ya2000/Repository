import React, { Component } from 'react'
import { Layout, Menu, } from 'antd';//Layout UI样式
import { Input } from 'antd';//输入框UI样式
import { Button } from 'antd';//按钮 UI 样式
import { List } from 'antd';//列表UI样式
import './Todolist.css'


const { Header, Content, Footer } = Layout;//样式布局


export default class Todolist extends Component {
  //构造方法
  constructor(props){
    super(props);

    this.state = {
      list: [],  //展示列表
      inputValue:'' //记录输入框的值
    }
  }

  //加载时执行,持久存储数据,刷新页面时，列表不会重置
  componentWillMount(){

     var myList = window.localStorage.getItem('myList');//从localStrong中获取myList
     if(myList==null || myList==''){
         myList = [];//初始化myList数组
     }else{
         myList = myList.split(',');
     }
 
     this.setState({
         list:myList
     });
  }

  //添加
  handleBtnClick(){

    //在内存中添加
    this.setState({
        list: [...this.state.list,this.state.inputValue], 
        inputValue: '' 
      },()=>{
        //console.log(this.state.list);
        window.localStorage.setItem('myList',this.state.list);//把更新后的state数据更新到localStrong中
      });

  }

  //输入框输入
  handleInputChange(e){
    this.setState({
      inputValue: e.target.value
    });
  }

  //删除
  handleItemClick(index){
    const list = [...this.state.list];
    list.splice(index,1);
    this.setState({
      list: list
    },()=>{
        window.localStorage.setItem('myList',this.state.list);//把更新后的state数据更新到localStrong中
    });

  }

  //键盘事件
  keyDown(e){

    if(e.keyCode == 13){
        this.handleBtnClick();
    }
   
  }

  //修改
  handleUpdate(index){

    //弹出输入框，用于填写新内容
    var rel = window.prompt('请输入新内容：');
    if(rel != null){
        this.state.list.splice(index,1,rel);
        this.setState({
            list:this.state.list
        },()=>{
            window.localStorage.setItem('myList',this.state.list);//把更新后的state数据更新到localStrong中
        });
    }

  }

  render(){
    return (
      <div>
        
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
              <Menu.Item key="1">
                <div>
                  <Input placeholder="输入待办事项" value={this.state.inputValue} onChange={this.handleInputChange.bind(this)} onKeyDown={this.keyDown.bind(this)}></Input>
                  <Button type="primary" onClick={this.handleBtnClick.bind(this)}>添加</Button>
                </div>
              </Menu.Item>             
            </Menu>
          </Header>

          <Content style={{ padding: '0 50px' }}>

            <div className="site-layout-content">

              <List bordered dataSource={''} header={<div>待办事项</div>}>
                {this.state.list.map((item,index) => {
                  return <List.Item key={index}>
                          {item}&nbsp;&nbsp;

                          <div style={{ float:'right'  }}>
                            <Button type="primary" onClick={this.handleUpdate.bind(this,index)}> 修改 </Button>&nbsp;&nbsp;
                            <Button type="primary" danger onClick={this.handleItemClick.bind(this,index)}> 删除 </Button>
                          </div>
                          
                        </List.Item>
                })}
              </List>

            </div>

          </Content>
          <Footer style={{ textAlign: 'center' }}>Todolist</Footer>
        </Layout>


      </div>

      
    );
  }
}