import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {createRoot} from 'react-dom/client'

import './style.css'
import {Layout, Row, Col} from 'antd';
import {Input} from 'antd';
import {Divider, Form, InputNumber, Button, Slider, Radio, Typography, Select, Switch } from 'antd';


import View_1q from "./Components/view_1q";
import View_2q from "./Components/view_2q";
const {Text} = Typography;

const {Header, Content, Sider} = Layout;


class App extends Component {

    constructor(props) {
        super(props);


        this.state = {
            display_type : 'single_qubit',

            first_order: 'first_01',
            second_order: 'second_01',
            order: 'order_12'

        }
    }


    handle_display_type=(e)=>{


        let attr = e.target.value
        this.setState({
            display_type: attr
        })
    }



    handle_first=(e)=>{


        let attr = e.target.value
        this.setState({
            first_order: attr
        })
    }




    handle_second=(e)=>{


        let attr = e.target.value
        this.setState({
            second_order: attr
        })
    }

    handle_order=(e)=>{


        let attr = e.target.value
        this.setState({
            order: attr
        })
    }


    handle_click=()=>{


        if (this.state.display_type=='two_qubit'){


            let a = Number(document.getElementById('a_value').value) || 0
            let b = Number(document.getElementById('b_value').value) || 0
            let c = Number(document.getElementById('c_value').value) || 0
            let d = Number(document.getElementById('d_value').value) || 0
            let e = Number(document.getElementById('e_value').value) || 0
            let f = Number(document.getElementById('f_value').value) || 0
            let g = Number(document.getElementById('g_value').value) || 0
            let h = Number(document.getElementById('h_value').value) || 0

            // console.log([a,b,c,d,e,f,g,h])
            this.root.render(<View_2q params_arr={[a,b,c,d,e,f,g,h]} orders={[this.state.order, this.state.first_order, this.state.second_order]}/>)
            // this.root.render(<View_2q orders={[this.state.order, this.state.first_order, this.state.second_order]}/>)
        }
        else{/* 默认都是渲染 single-qubit 的状态 */

            let a = Number(document.getElementById('a_value').value) || 0
            let b = Number(document.getElementById('b_value').value) || 0
            let c = Number(document.getElementById('c_value').value) || 0
            let d = Number(document.getElementById('d_value').value) || 0

            this.root.render(<View_1q params_arr={[a, b, c, d]} first_order={this.state.first_order}/>)

        }


    }

    componentDidMount() {

        /* 初始化 View */
        this.root = createRoot(document.getElementById('svg_container'))

        /* 先用View_1进行初始化 */
        this.root.render(<View_1q/>)
        // this.root.render(<View_2q/>)
    }


    render(){

    var link = <a href="https://yong-wang.org/" target="_blank">VIDA Lab</a>;
    return(
        <>
            <Content>
                <img src="visual_design.png" style={{height:'180px'}} alt=""/>
            </Content>
            <Layout className={'layout'}>
                <Header className={'header'}>
                    <p className="tool-title">VENUS</p>
                </Header>
                <Layout className={'clayout'}>
                    <Content className={'content'}>


                        {/*{/*{/* 这里是装SVG的容器 */}
                        <div className="svg_container" id={'svg_container'}>

                        </div>


                    </Content>
                    <Sider className={'sider'} theme='light' width={'220px'}>
                        <Form className={'form_container'}>

                            <Divider style={{margin:0, backgroundColor: '#b9b9b9'}} plain><Text style={{fontSize: '0.8em'}} strong>Type:</Text></Divider>


                            <Form.Item style={{ marginBottom: "0px" }}>
                                <Radio.Group value={this.state.display_type}
                                             onChange={this.handle_display_type}
                                size={'small'}>
                                    <Radio.Button value="single_qubit">Single qubit</Radio.Button>
                                    <Radio.Button value="two_qubit">Two qubit</Radio.Button>
                                </Radio.Group>
                            </Form.Item>

                            <Divider style={{margin:0, backgroundColor: '#b9b9b9'}} plain><Text style={{fontSize: '0.8em'}} strong>Density Matrix:</Text></Divider>

                            <Form.Item>
                                <div className="ant-row" style={{padding: '5px'}}>
                                    <div className={'symbols'} style={{color: '#7907ff'}}> α:</div>
                                    &nbsp;
                                    <div><InputNumber  placeholder={0.7652} id={'a_value'} className={'values'} controls={false}/></div>
                                    &nbsp;
                                    <div className={'symbols'}> + </div>
                                    &nbsp;
                                    <div><InputNumber placeholder={-0.3503} id={'b_value'} className={'values'} controls={false}/></div>
                                    &nbsp;
                                    <div className={'symbols'}>·i</div>
                                </div>

                                <div className="ant-row" style={{padding: '5px'}}>
                                    <div className={'symbols'} style={{color: '#7907ff'}}> β:</div>
                                    &nbsp;
                                    <div><InputNumber placeholder={0.4912} id={'c_value'} className={'values'} controls={false}/></div>
                                    &nbsp;
                                    <div className={'symbols'}> + </div>
                                    &nbsp;
                                    <div><InputNumber  placeholder={0.2249} id={'d_value'} className={'values'} controls={false}/></div>
                                    &nbsp;
                                    <div className={'symbols'}>·i</div>
                                </div>

                                <div className="ant-row" style={{padding: '5px', display:this.state.display_type=='single_qubit'?'none':null}}>
                                    <div className={'symbols'} style={{color: '#7907ff'}}> γ:</div>
                                    &nbsp;
                                    <div><InputNumber  placeholder={0} id={'e_value'} className={'values'} controls={false}/></div>
                                    &nbsp;
                                    <div className={'symbols'}> + </div>
                                    &nbsp;
                                    <div><InputNumber placeholder={0} id={'f_value'} className={'values'} controls={false}/></div>
                                    &nbsp;
                                    <div className={'symbols'}>·i</div>
                                </div>

                                <div className="ant-row" style={{padding: '5px', display:this.state.display_type=='single_qubit'?'none':null}}>
                                    <div className={'symbols'} style={{color: '#7907ff'}}> δ:</div>
                                    &nbsp;
                                    <div><InputNumber placeholder={0} id={'g_value'} className={'values'} controls={false}/></div>
                                    &nbsp;
                                    <div className={'symbols'}> + </div>
                                    &nbsp;
                                    <div><InputNumber placeholder={0} id={'h_value'} className={'values'} controls={false}/></div>
                                    &nbsp;
                                    <div className={'symbols'}>·i</div>
                                </div>


                            </Form.Item>


                            <Divider style={{margin:0, backgroundColor: '#b9b9b9'}} plain><Text style={{fontSize: '0.8em'}} strong>Display Order:</Text></Divider>
                            <Form.Item style={{ marginBottom: "0px" }}>
                                <span>First qubit:</span>
                                <Radio.Group size={'small'}
                                             style={{float: 'right'}}
                                             value={this.state.first_order}
                                             onChange={this.handle_first}
                                >
                                    <Radio.Button value="first_01">0->1</Radio.Button>
                                    <Radio.Button value="first_10">1->0</Radio.Button>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item disabled={true} style={{ marginBottom: "0px" }}>
                                <span>Second qubit:</span>
                                <Radio.Group size={'small'}
                                             style={{float: 'right'}}
                                             value={this.state.second_order}
                                             onChange={this.handle_second}
                                             disabled={this.state.display_type=='single_qubit'?true:false}
                                >
                                    <Radio.Button value="second_01">0->1</Radio.Button>
                                    <Radio.Button value="second_10">1->0</Radio.Button>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item disabled={true}>
                                <span>Order:</span>
                                <Radio.Group size={'small'}
                                             style={{float: 'right'}}
                                             value={this.state.order}
                                             onChange={this.handle_order}
                                             disabled={this.state.display_type=='single_qubit'?true:false}
                                >
                                    <Radio.Button value="order_12">q1->q2</Radio.Button>
                                    <Radio.Button value="order_21">q2->q1</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Button style={{width: '200px'}}
                            onClick={this.handle_click}>Update</Button>
                        </Form>

                    </Sider>
                </Layout>
            </Layout>
            <div>Powered by {link} at Singapore Management University</div>
        </>
    )
  }
}

export default App;