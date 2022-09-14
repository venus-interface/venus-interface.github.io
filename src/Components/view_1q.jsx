import React, {Component} from 'react';
import * as d3 from 'd3'
import * as axios from 'axios'



class View_1q extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }


    render_view=(params_arr, first_order)=>{


        /*设置一个检查 检查输入是不是合法*/
        if(!params_arr[0]){
            alert('Value a is null. Fill valid values and update')
            return
        }


        /*初始化一些位置长度相关的变量*/
        /*整个大的block放置的位置*/
        const x0 = 80, y0 = 330
        /*base 的 长度*/
        const base_length = 300


        // let a = 0.7652, b = -0.3503
        // let c = 0.4912, d = 0.2249

        let [a_, b_, c_, d_] = params_arr
        let params_dict = first_order=='first_01'?
            {a: a_, b: b_, c:c_, d:d_, P0: a_*a_ + b_*b_, P1: c_*c_ + d_*d_}:
            {a: c_, b: d_, c:a_, d:b_, P0: c_*c_ + d_*d_, P1: a_*a_ + b_*b_}

        let convert_dict = {
            'first_01': {a: 'a', b: 'b', c:'c', d:'d', P0: 'P0', P1: 'P1',symbol1: '0', symbol2: '1',},
            "first_10": {a: 'c', b: 'd', c:'a', d:'b', P0: 'P1', P1: 'P0',symbol1: '1', symbol2: '0',},
        }



        /*取绝对值，因为要算长度*/
        let a = first_order=='first_01'?Math.abs(+a_): Math.abs(+c_)
        let b = first_order=='first_01'?Math.abs(+b_): Math.abs(+d_)
        let c = first_order=='first_01'?Math.abs(+c_): Math.abs(+a_)
        let d = first_order=='first_01'?Math.abs(+d_): Math.abs(+b_)

        let alpha = Math.sqrt(a*a + b*b)
        let beta = Math.sqrt(c*c + d*d)


        // console.log(a,b,c,d,alpha,beta)

        let base = Math.sqrt(alpha*alpha+beta*beta)





        let scale = d3.scaleLinear().domain([0, base]).range([0, base_length])



        /*开始构造最下面的三角形的 points， 用来生成线段*/
        let base_triangle_points = [
            [0,0],
            [base, 0],
            [(alpha*alpha)/base, -(alpha*beta)/base],
            [0,0]
        ]


        /*构造 alpha 三角形的坐标*/
        let alpha_B_x0 = alpha, alpha_B_y0 = 0
        let alpha_C_x0 = (a*a)/alpha, alpha_C_y0 = -(a*b)/alpha
        let alpha_rotation_angle = Math.asin(beta/base)


        let alpha_triangle_point = [
            [0,0],
            [alpha_B_y0*Math.sin(alpha_rotation_angle) + alpha_B_x0*Math.cos(alpha_rotation_angle), alpha_B_y0*Math.cos(alpha_rotation_angle) - alpha_B_x0*Math.sin(alpha_rotation_angle)],
            [alpha_C_y0*Math.sin(alpha_rotation_angle) + alpha_C_x0*Math.cos(alpha_rotation_angle), alpha_C_y0*Math.cos(alpha_rotation_angle) - alpha_C_x0*Math.sin(alpha_rotation_angle)],
            [0,0],
        ]



        /*构造 beta 三角形的坐标*/

        /*beta三角形因为旋转的话原点不再是原来的原点，所以为了简化计算，重新设定一个坐标系*/


        let beta_A_x0 = -beta, beta_A_y0 = 0
        let beta_C_x0 = -(d*d)/beta, beta_C_y0 = -(d*c)/beta
        let beta_rotation_angle = 2*Math.PI - Math.asin(alpha/base)


        let beta_triangle_point = [
            [0,0],
            [beta_A_y0*Math.sin(beta_rotation_angle) + beta_A_x0*Math.cos(beta_rotation_angle), beta_A_y0*Math.cos(beta_rotation_angle) - beta_A_x0*Math.sin(beta_rotation_angle)],
            [beta_C_y0*Math.sin(beta_rotation_angle) + beta_C_x0*Math.cos(beta_rotation_angle), beta_C_y0*Math.cos(beta_rotation_angle) - beta_C_x0*Math.sin(beta_rotation_angle)],
            [0,0],
        ]












        /*开始画图*/
        /*构造整个大的图形，起名叫block*/
        let block = d3.select('svg')
            .append('g')
            .classed('block', true)
            .attr('transform', `translate(${x0}, ${y0})`)


        /*block = block12 + block3 */
        let block3 = block.append('g')
            .classed('beta', true)
            .attr('transform', `translate(${scale(base)}, 0)`)

        let block12 = block.append('g')
            .classed('base_and_alpha', true)






        /*开始画 alpha 后面的半圆*/
        let alpha_circle_arc = d3.arc()
            .outerRadius(scale(alpha)/2)
            .innerRadius(0)
            .startAngle(-Math.PI/2-alpha_rotation_angle)
            .endAngle(Math.PI/2-alpha_rotation_angle)


        let P0 = block12.append("path")
            .attr("transform", `translate(${scale((alpha*alpha)/2*base)},${scale(-(alpha*beta)/2*base)})`)
            .attr("d", alpha_circle_arc())
            .classed(' P0', true)





        /*开始画 beta 后面的半圆*/
        let beta_circle_arc = d3.arc()
            .outerRadius(scale(beta)/2)
            .innerRadius(0)
            .startAngle(-Math.PI/2-beta_rotation_angle)
            .endAngle(Math.PI/2-beta_rotation_angle)


        let P1 = block3.append("path")
            // .attr("transform", `translate(${-beta*beta/2*base},${-beta*alpha/2*base})`)
            .attr("transform", `translate(${scale(-beta*beta/base)/2},${scale(-beta*alpha/base)/2})`)
            .attr("d", beta_circle_arc())
            .classed(' P1', true)



        let lineGenerator = d3.line()
            .x(d=>scale(d[0]))
            .y(d=>scale(d[1]))





        /*画左边的 alpha 三角形*/
        block12.append('path')
            .attr('d', lineGenerator(alpha_triangle_point))
            .classed('triangle alpha_triangle ', true) /*invisible*/


        /*画右边的 beta 三角形*/
        block3.append('path')
            .attr('d', lineGenerator(beta_triangle_point))
            .classed('triangle beta_triangle ', true)/*invisible*/


        /*画最底下的 base 三角形*/
        block12.append('path')
            .attr('d', lineGenerator(base_triangle_points))
            .classed('triangle base_triangle', true)



        /* alpha 实部*/
        block12.append('line')
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", scale(alpha_C_y0*Math.sin(alpha_rotation_angle) + alpha_C_x0*Math.cos(alpha_rotation_angle)))
            .attr("y2", scale(alpha_C_y0*Math.cos(alpha_rotation_angle) - alpha_C_x0*Math.sin(alpha_rotation_angle)))
            .classed('real_part a', true)


        /* alpha 虚部*/
        block12.append('line')
            .attr("x1", scale(alpha_B_y0*Math.sin(alpha_rotation_angle) + alpha_B_x0*Math.cos(alpha_rotation_angle)))
            .attr("y1", scale(alpha_B_y0*Math.cos(alpha_rotation_angle) - alpha_B_x0*Math.sin(alpha_rotation_angle)))
            .attr("x2", scale(alpha_C_y0*Math.sin(alpha_rotation_angle) + alpha_C_x0*Math.cos(alpha_rotation_angle)))
            .attr("y2", scale(alpha_C_y0*Math.cos(alpha_rotation_angle) - alpha_C_x0*Math.sin(alpha_rotation_angle)))
            .classed('ima_part b', true)



        /* beta 实部*/
        block3.append('line')
            .attr("x1", scale(beta_A_y0*Math.sin(beta_rotation_angle) + beta_A_x0*Math.cos(beta_rotation_angle)))
            .attr("y1", scale(beta_A_y0*Math.cos(beta_rotation_angle) - beta_A_x0*Math.sin(beta_rotation_angle)))
            .attr("x2", scale(beta_C_y0*Math.sin(beta_rotation_angle) + beta_C_x0*Math.cos(beta_rotation_angle)))
            .attr("y2", scale(beta_C_y0*Math.cos(beta_rotation_angle) - beta_C_x0*Math.sin(beta_rotation_angle)))
            .classed('real_part c', true)

            // [beta_A_y0*Math.sin(beta_rotation_angle) + beta_A_x0*Math.cos(beta_rotation_angle), beta_A_y0*Math.cos(beta_rotation_angle) - beta_A_x0*Math.sin(beta_rotation_angle)],
            // [beta_C_y0*Math.sin(beta_rotation_angle) + beta_C_x0*Math.cos(beta_rotation_angle), alpha_C_y0*Math.cos(beta_rotation_angle) - beta_C_x0*Math.sin(beta_rotation_angle)],
            //

            /* beta 虚部*/
            block3.append('line')
                .attr("x1", scale(beta_C_y0*Math.sin(beta_rotation_angle) + beta_C_x0*Math.cos(beta_rotation_angle)))
                .attr("y1", scale(beta_C_y0*Math.cos(beta_rotation_angle) - beta_C_x0*Math.sin(beta_rotation_angle)))
                .attr("x2", 0)
                .attr("y2", 0)
                .classed('ima_part d', true)



        /* 添加 实部虚部的 交互 */
        let tooltip = d3.select("#svg_container")
            .append("div")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .classed('tooltip', true)


        d3.selectAll(".a,.b,.c,.d")
            .on("mouseover", function(){return tooltip.style("visibility", "visible");})
            // .on("mousemove", function(){return tooltip.style("top", (event.pageY)+"px").style("left",(event.pageX)+"px");})
            .on("mousemove", function(e){
                /*知道是a, b, c, 还是d*/
                let element = d3.select(this).attr('class').split(' ')[1]

                tooltip.style('top', e.clientY+"px")
                    .style('left', e.clientX+"px")
                    .html(`<span style="font-weight: bold">${convert_dict[first_order][element]}:</span> ${params_dict[element]}`)
            })
            .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

        /*添加 外界半圆 的交互*/
        d3.selectAll(".P0,.P1")
            .on("mouseover", function(){return tooltip.style("visibility", "visible");})
            // .on("mousemove", function(){return tooltip.style("top", (event.pageY)+"px").style("left",(event.pageX)+"px");})
            .on("mousemove", function(e){
                /*知道是a, b, c, 还是d*/
                let element = d3.select(this).attr('class')

                tooltip.style('top', e.clientY+"px")
                    .style('left', e.clientX+"px")
                    .html(`<span style="font-weight: bold;color:#f00">${convert_dict[first_order][element]}:</span> ${params_dict[element].toFixed(2)}`)
            })
            .on("mouseout", function(){return tooltip.style("visibility", "hidden");});




        /* 开始画symbol */
        if(d3.selectAll('.base_triangle').size()){
            block12.append('text')
                .text('|φ⟩')
                .attr('x', scale(base)/2+20)
                .attr('y', scale(-(alpha*beta)/base)/2+20)
                .attr("dy", "1em")
                .style('font-size', '1.3em')
        }

        if(d3.selectAll('.P0').size()){
            d3.select(`.${d3.select('.P0').node().parentNode.classList[0]}`)
                .append('text')
                .text(`|${convert_dict[first_order]['symbol1']}⟩`)
                .attr('transform', d3.selectAll('.P0').attr('transform'))
                .attr("dy", "-1em")
        }

        if(d3.selectAll('.P1').size()){
            d3.select(`.${d3.select('.P1').node().parentNode.classList[0]}`)
                .append('text')
                .text(`|${convert_dict[first_order]['symbol2']}⟩`)
                .attr('transform', d3.selectAll('.P1').attr('transform'))
                .attr("dy", "-1em")
        }


    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        /* 清除svg的所有元素*/
        d3.select('.svgStyle').selectAll('*').remove()

        /*重新渲染*/
        this.render_view(this.props.params_arr, this.props.first_order)

        console.log('update 1')
    }


    componentDidMount() {

        let params_arr = this.props.params_arr || ['0.7652', '-0.3503', '0.4912', '0.2249']
        let first_order = this.props.first_order || 'first_01'

        // let default_params = ['0.7652', '-0.3503', '0.4912', '0.2249']

        /* 清除svg的所有元素*/
        d3.select('.svgStyle').selectAll('*').remove()

        /*重新渲染*/
        this.render_view(params_arr, first_order)

    }



    render(){

        return(
            <div>
                <svg className='svgStyle' id={'svgStyle'}/>
            </div>
        )
    }
}

export default View_1q;
