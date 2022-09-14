import React, {Component} from 'react';
import * as d3 from 'd3'
import * as axios from 'axios'



class View_2q extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }



    render_view=(params_arr=[0.1845,-0.1441,0.2691,-0.2102,-0.3252,0.3989,-0.4744,0.5819], orders=['order_12', 'first_01', 'second_01'])=>{


        /*设置一个检查 检查输入是不是合法*/
        if(!params_arr[0]){
            alert('Value a is null. Fill valid values and update')
            return
        }


        /*初始化一些位置长度相关的变量*/
        /*整个大的block放置的位置*/
        const x0 = 90, y0 = 330
        /*base 的 长度*/
        const base_length = 300


        /*输入*/
        let [a, b, c, d, e, f, g, h] = params_arr

        let params_dict = {a: a, b:b, c:c, d:d, e:e, f:f, g:g, h:h,
        P00: a*a + b*b, P01: c*c + d*d, P10: e*e + f*f, P11: g*g + h*h}


        let convert_dict = {
            'order_12-first_01-second_01': {a:a, b:b, c:c, d:d, e:e, f:f, g:g, h:h, P00:'P00', P01:'P01', P10:'P10', P11:'P11', symbol00:'00', symbol01:'01', symbol10:'10', symbol11:'11', a_:'a', b_:'b', c_:'c', d_:'d', e_:'e', f_:'f', g_:'g', h_:'h'},
            'order_12-first_01-second_10': {a:c, b:d, c:a, d:b, e:g, f:h, g:e, h:f, P00:'P01', P01:'P00', P10:'P11', P11:'P10', symbol00:'01', symbol01:'00', symbol10:'11', symbol11:'10', a_:'c', b_:'d', c_:'a', d_:'b', e_:'g', f_:'h', g_:'e', h_:'f'},
            'order_12-first_10-second_01': {a:e, b:f, c:g, d:h, e:a, f:b, g:c, h:d, P00:'P10', P01:'P11', P10:'P00', P11:'P01', symbol00:'10', symbol01:'11', symbol10:'00', symbol11:'01', a_:'e', b_:'f', c_:'g', d_:'h', e_:'a', f_:'b', g_:'c', h_:'d'},
            'order_12-first_10-second_10': {a:g, b:h, c:e, d:f, e:c, f:d, g:a, h:b, P00:'P11', P01:'P10', P10:'P01', P11:'P00', symbol00:'11', symbol01:'10', symbol10:'01', symbol11:'00', a_:'g', b_:'h', c_:'e', d_:'f', e_:'c', f_:'d', g_:'a', h_:'b'},
            'order_21-first_01-second_01': {a:a, b:b, c:e, d:f, e:c, f:d, g:g, h:h, P00:'P00', P01:'P10', P10:'P01', P11:'P11', symbol00:'00', symbol01:'10', symbol10:'01', symbol11:'11', a_:'a', b_:'b', c_:'e', d_:'f', e_:'c', f_:'d', g_:'g', h_:'h'},
            'order_21-first_01-second_10': {a:e, b:f, c:a, d:b, e:g, f:h, g:c, h:d, P00:'P10', P01:'P00', P10:'P11', P11:'P01', symbol00:'10', symbol01:'00', symbol10:'11', symbol11:'01', a_:'e', b_:'f', c_:'a', d_:'b', e_:'g', f_:'h', g_:'c', h_:'d'},
            'order_21-first_10-second_01': {a:c, b:d, c:g, d:h, e:a, f:b, g:e, h:f, P00:'P01', P01:'P11', P10:'P00', P11:'P10', symbol00:'01', symbol01:'11', symbol10:'00', symbol11:'10', a_:'c', b_:'d', c_:'g', d_:'h', e_:'a', f_:'b', g_:'e', h_:'f',},
            'order_21-first_10-second_10': {a:g, b:h, c:c, d:d, e:e, f:f, g:a, h:b, P00:'P11', P01:'P01', P10:'P10', P11:'P00', symbol00:'11', symbol01:'01', symbol10:'10', symbol11:'00', a_:'g', b_:'h', c_:'c', d_:'d', e_:'e', f_:'f', g_:'a', h_:'b'},
        }

        let appended_P_dict = {
            'order_12-first_01-second_01': {appended_P0: params_dict.P00+params_dict.P01, appended_P1:params_dict.P10+params_dict.P11},
            'order_12-first_01-second_10': {appended_P0: params_dict.P00+params_dict.P01, appended_P1:params_dict.P10+params_dict.P11},
            'order_12-first_10-second_01': {appended_P0: params_dict.P10+params_dict.P11, appended_P1:params_dict.P00+params_dict.P01},
            'order_12-first_10-second_10': {appended_P0: params_dict.P10+params_dict.P11, appended_P1:params_dict.P00+params_dict.P01},
            'order_21-first_01-second_01': {appended_P0: params_dict.P00+params_dict.P10, appended_P1:params_dict.P01+params_dict.P11},
            'order_21-first_01-second_10': {appended_P0: params_dict.P00+params_dict.P10, appended_P1:params_dict.P01+params_dict.P11},
            'order_21-first_10-second_01': {appended_P0: params_dict.P11+params_dict.P01, appended_P1:params_dict.P00+params_dict.P10},
            'order_21-first_10-second_10': {appended_P0: params_dict.P11+params_dict.P01, appended_P1:params_dict.P00+params_dict.P10},
        }


        /*全部搞成正数*/
        a = Math.abs(+convert_dict[`${orders[0]}-${orders[1]}-${orders[2]}`]['a'])
        b = Math.abs(+convert_dict[`${orders[0]}-${orders[1]}-${orders[2]}`]['b'])
        c = Math.abs(+convert_dict[`${orders[0]}-${orders[1]}-${orders[2]}`]['c'])
        d = Math.abs(+convert_dict[`${orders[0]}-${orders[1]}-${orders[2]}`]['d'])
        e = Math.abs(+convert_dict[`${orders[0]}-${orders[1]}-${orders[2]}`]['e'])
        f = Math.abs(+convert_dict[`${orders[0]}-${orders[1]}-${orders[2]}`]['f'])
        g = Math.abs(+convert_dict[`${orders[0]}-${orders[1]}-${orders[2]}`]['g'])
        h = Math.abs(+convert_dict[`${orders[0]}-${orders[1]}-${orders[2]}`]['h'])



        let alpha = Math.sqrt(a*a + b*b)
        let beta = Math.sqrt(c*c + d*d)
        let gamma = Math.sqrt(e*e + f*f)
        let delta = Math.sqrt(g*g + h*h)

        let shoulder1 = Math.sqrt(alpha*alpha + beta*beta)
        let shoulder2 = Math.sqrt(gamma*gamma + delta*delta)

        let base = Math.sqrt(shoulder1*shoulder1 + shoulder2*shoulder2)




        let scale = d3.scaleLinear().domain([0, base]).range([0, base_length])



        /*开始构造最下面的三角形的 points， 用来生成线段*/
        let base_triangle_points = [
            [0,0],
            [base, 0],
            [(shoulder1*shoulder1)/base, -(shoulder1*shoulder2)/base],
            [0,0]
        ]


        /*构造 shoulder1 三角形的坐标*/
        let shoulder1_B_x0 = shoulder1, shoulder1_B_y0 = 0
        let shoulder1_C_x0 = (alpha*alpha)/shoulder1, shoulder1_C_y0 = -(alpha*beta)/shoulder1
        let shoulder1_rotation_angle = Math.asin(shoulder2/base)


        let shoulder1_triangle_point = [
            [0,0],
            [shoulder1_B_y0*Math.sin(shoulder1_rotation_angle) + shoulder1_B_x0*Math.cos(shoulder1_rotation_angle), shoulder1_B_y0*Math.cos(shoulder1_rotation_angle) - shoulder1_B_x0*Math.sin(shoulder1_rotation_angle)],
            [shoulder1_C_y0*Math.sin(shoulder1_rotation_angle) + shoulder1_C_x0*Math.cos(shoulder1_rotation_angle), shoulder1_C_y0*Math.cos(shoulder1_rotation_angle) - shoulder1_C_x0*Math.sin(shoulder1_rotation_angle)],
            [0,0],
        ]


        /*构造 shoulder2 三角形的坐标*/

        /*beta三角形因为旋转的话原点不再是原来的原点，所以为了简化计算，重新设定一个坐标系*/


        let shoulder2_A_x0 = -shoulder2, shoulder2_A_y0 = 0
        let shoulder2_C_x0 = -(delta*delta)/shoulder2, shoulder2_C_y0 = -(delta*gamma)/shoulder2
        let shoulder2_rotation_angle = 2*Math.PI - Math.asin(shoulder1/base)


        let shoulder2_triangle_point = [
            [0,0],
            [shoulder2_A_y0*Math.sin(shoulder2_rotation_angle) + shoulder2_A_x0*Math.cos(shoulder2_rotation_angle), shoulder2_A_y0*Math.cos(shoulder2_rotation_angle) - shoulder2_A_x0*Math.sin(shoulder2_rotation_angle)],
            [shoulder2_C_y0*Math.sin(shoulder2_rotation_angle) + shoulder2_C_x0*Math.cos(shoulder2_rotation_angle), shoulder2_C_y0*Math.cos(shoulder2_rotation_angle) - shoulder2_C_x0*Math.sin(shoulder2_rotation_angle)],
            [0,0],
        ]




        /*开始画图*/
        /*构造整个大的图形，起名叫block*/
        let block = d3.select('svg')
            .append('g')
            .classed('block', true)
            .attr('transform', `translate(${x0}, ${y0})`)


        /*block = block_alpha + block_delta */
        let block_delta = block.append('g')
            .classed('delta', true)
            .attr('transform', `translate(${scale(base)}, 0)`)


        let block_alpha = block.append('g')
            .classed('base_and_alpha', true)




        let lineGenerator = d3.line()
            .x(d=>scale(d[0]))
            .y(d=>scale(d[1]))




        /*画左边的 shoulder1 三角形*/
        block_alpha.append('path')
            .attr('d', lineGenerator(shoulder1_triangle_point))
            .classed('triangle shoulders appended_P0_interaction', true)/*invisible*/


        // /*画右边的 shoulder2 三角形*/
        block_delta.append('path')
            .attr('d', lineGenerator(shoulder2_triangle_point))
            .classed('triangle shoulders appended_P1_interaction', true)/*invisible*/


        /*画最底下的 base 三角形*/
        block_alpha.append('path')
            .attr('d', lineGenerator(base_triangle_points))
            .classed('triangle base_triangle', true)



        /*构造 左下角 alpha 三角形的坐标*/
        let alpha_B_x0 = alpha, alpha_B_y0 = 0
        let alpha_C_x0 = a*a/alpha, alpha_C_y0 = -a*b/alpha
        let alpha_rotation_angle = Math.acos(shoulder1/base) + Math.acos(alpha/shoulder1)


        let alpha_triangle_point = [
            [0,0],
            [alpha_B_y0*Math.sin(alpha_rotation_angle) + alpha_B_x0*Math.cos(alpha_rotation_angle), alpha_B_y0*Math.cos(alpha_rotation_angle) - alpha_B_x0*Math.sin(alpha_rotation_angle)],
            [alpha_C_y0*Math.sin(alpha_rotation_angle) + alpha_C_x0*Math.cos(alpha_rotation_angle), alpha_C_y0*Math.cos(alpha_rotation_angle) - alpha_C_x0*Math.sin(alpha_rotation_angle)],
            [0,0],
        ]


        /*画 左下 的 alpha 三角形*/
        block_alpha.append('path')
            .attr('d', lineGenerator(alpha_triangle_point))
            .classed('triangle alpha_triangle', true)





        /*构造一个新的坐标系， 用来旋转 第二个--beta三角形*/
        let block_beta = block.append('g')
            .classed('beta', true)
            .attr('transform', `translate(${scale(alpha_B_y0*Math.sin(alpha_rotation_angle) + alpha_B_x0*Math.cos(alpha_rotation_angle))}, ${scale(alpha_B_y0*Math.cos(alpha_rotation_angle) - alpha_B_x0*Math.sin(alpha_rotation_angle))})`)


        /*构造 bet三角形的坐标*/
        let beta_B_x0 = beta, beta_B_y0 = 0
        let beta_C_x0 = c*c/beta, beta_C_y0 = -c*d/beta
        let beta_rotation_angle = Math.acos(shoulder1/base) - Math.acos(beta/shoulder1)


        let beta_triangle_point = [
            [0,0],
            [beta_B_y0*Math.sin(beta_rotation_angle) + beta_B_x0*Math.cos(beta_rotation_angle), beta_B_y0*Math.cos(beta_rotation_angle) - beta_B_x0*Math.sin(beta_rotation_angle)],
            [beta_C_y0*Math.sin(beta_rotation_angle) + beta_C_x0*Math.cos(beta_rotation_angle), beta_C_y0*Math.cos(beta_rotation_angle) - beta_C_x0*Math.sin(beta_rotation_angle)],
            [0,0],
        ]


        /*画 左下 的 alpha 三角形*/
        block_beta.append('path')
            .attr('d', lineGenerator(beta_triangle_point))
            .classed('triangle beta_triangle', true)





        /*构造一个新的坐标系， 用来旋转 第三个-- gamma三角形*/
        let block_gamma = block.append('g')
            .classed('gamma', true)
            .attr('transform', `translate(${scale((shoulder1*shoulder1)/base)}, ${scale(-(shoulder1*shoulder2)/base)})`)


        /*构造 bet三角形的坐标*/
        let gamma_B_x0 = gamma, gamma_B_y0 = 0
        let gamma_C_x0 = e*e/gamma, gamma_C_y0 = -e*f/gamma
        let gamma_rotation_angle = Math.PI/2 - Math.acos(shoulder2/base) - Math.acos(delta/shoulder2)


        let gamma_triangle_point = [
            [0,0],
            [gamma_B_y0*Math.sin(gamma_rotation_angle) + gamma_B_x0*Math.cos(gamma_rotation_angle), gamma_B_y0*Math.cos(gamma_rotation_angle) - gamma_B_x0*Math.sin(gamma_rotation_angle)],
            [gamma_C_y0*Math.sin(gamma_rotation_angle) + gamma_C_x0*Math.cos(gamma_rotation_angle), gamma_C_y0*Math.cos(gamma_rotation_angle) - gamma_C_x0*Math.sin(gamma_rotation_angle)],
            [0,0],
        ]


        /*画 左下 的 gamma 三角形*/
        block_gamma.append('path')
            .attr('d', lineGenerator(gamma_triangle_point))
            .classed('triangle beta_triangle', true)







        /*构造 右下角 delta 三角形的坐标*/
        let delta_A_x0 = -delta, delta_A_y0 = 0
        let delta_C_x0 = -h*h/delta, delta_C_y0 = -h*g/delta
        let delta_rotation_angle = 2*Math.PI - Math.acos(shoulder2/base) - Math.acos(delta/shoulder2)
        // let delta_rotation_angle = 0


        let delta_triangle_point = [
            [0,0],
            [delta_A_y0*Math.sin(delta_rotation_angle) + delta_A_x0*Math.cos(delta_rotation_angle), delta_A_y0*Math.cos(delta_rotation_angle) - delta_A_x0*Math.sin(delta_rotation_angle)],
            [delta_C_y0*Math.sin(delta_rotation_angle) + delta_C_x0*Math.cos(delta_rotation_angle), delta_C_y0*Math.cos(delta_rotation_angle) - delta_C_x0*Math.sin(delta_rotation_angle)],
            [0,0],
        ]


        /*画 右下 的 delta 三角形*/
        block_delta.append('path')
            .attr('d', lineGenerator(delta_triangle_point))
            .classed('triangle alpha_triangle', true)




        /*开始画 代表 P00 概率的 半圆*/
        let alpha_circle_arc = d3.arc()
            .outerRadius(scale(alpha)/2)
            .innerRadius(0)
            .startAngle(-(Math.PI/2 + alpha_rotation_angle))
            .endAngle(Math.PI/2-alpha_rotation_angle)


        let P00 = block_alpha.append("path")
            // .attr("transform", `translate(${-alpha*alpha/2*base},${-alpha*alpha/2*base})`)
            .attr("transform", `translate(${scale(alpha_B_y0*Math.sin(alpha_rotation_angle) + alpha_B_x0*Math.cos(alpha_rotation_angle))/2},${scale(alpha_B_y0*Math.cos(alpha_rotation_angle) - alpha_B_x0*Math.sin(alpha_rotation_angle))/2})`)
            .attr("d", alpha_circle_arc())
            .classed(' P00', true)




        /*开始画 代表 P01 概率的 半圆*/
        let beta_circle_arc = d3.arc()
            .outerRadius(scale(beta)/2)
            .innerRadius(0)
            .startAngle(-(Math.PI/2 + beta_rotation_angle))
            .endAngle(Math.PI/2-beta_rotation_angle)


        let P01 = block_beta.append("path")
            // .attr("transform", `translate(${-beta*beta/2*base},${-beta*alpha/2*base})`)
            .attr("transform", `translate(${scale(beta_B_y0*Math.sin(beta_rotation_angle) + beta_B_x0*Math.cos(beta_rotation_angle))/2},${scale(beta_B_y0*Math.cos(beta_rotation_angle) - beta_B_x0*Math.sin(beta_rotation_angle))/2})`)
            .attr("d", beta_circle_arc())
            .classed(' P01', true)



        /*开始画 代表 P10 概率的 半圆*/
        let gamma_circle_arc = d3.arc()
            .outerRadius(scale(gamma)/2)
            .innerRadius(0)
            .startAngle(-(Math.PI/2 + gamma_rotation_angle))
            .endAngle(Math.PI/2-gamma_rotation_angle)


        let P10 = block_gamma.append("path")
            // .attr("transform", `translate(${-beta*beta/2*base},${-beta*alpha/2*base})`)
            .attr("transform", `translate(${scale(gamma_B_y0*Math.sin(gamma_rotation_angle) + gamma_B_x0*Math.cos(gamma_rotation_angle))/2},${scale(gamma_B_y0*Math.cos(gamma_rotation_angle) - gamma_B_x0*Math.sin(gamma_rotation_angle))/2})`)
            .attr("d", gamma_circle_arc())
            .classed(' P10', true)


        /*开始画 代表 P11 概率的 半圆*/
        let delta_circle_arc = d3.arc()
            .outerRadius(scale(delta)/2)
            .innerRadius(0)
            .startAngle(-(Math.PI/2 + delta_rotation_angle))
            .endAngle(Math.PI/2-delta_rotation_angle)


        let P11 = block_delta.append("path")
            // .attr("transform", `translate(${-beta*beta/2*base},${-beta*alpha/2*base})`)
            .attr("transform", `translate(${scale(delta_A_y0*Math.sin(delta_rotation_angle) + delta_A_x0*Math.cos(delta_rotation_angle))/2},${scale(delta_A_y0*Math.cos(delta_rotation_angle) - delta_A_x0*Math.sin(delta_rotation_angle))/2})`)
            .attr("d", delta_circle_arc())
            .classed(' P11', true)





        /*从这里开始画最上层的表示实部和虚部的 线段*/
        /* alpha 实部*/
        block_alpha.append('line')
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", scale(alpha_C_y0*Math.sin(alpha_rotation_angle) + alpha_C_x0*Math.cos(alpha_rotation_angle)))
            .attr("y2", scale(alpha_C_y0*Math.cos(alpha_rotation_angle) - alpha_C_x0*Math.sin(alpha_rotation_angle)))
            .classed('real_part a', true)


        /* alpha 虚部*/
        block_alpha.append('line')
            .attr("x1", scale(alpha_C_y0*Math.sin(alpha_rotation_angle) + alpha_C_x0*Math.cos(alpha_rotation_angle)))
            .attr("y1", scale(alpha_C_y0*Math.cos(alpha_rotation_angle) - alpha_C_x0*Math.sin(alpha_rotation_angle)))
            .attr("x2", scale(alpha_B_y0*Math.sin(alpha_rotation_angle) + alpha_B_x0*Math.cos(alpha_rotation_angle)))
            .attr("y2", scale(alpha_B_y0*Math.cos(alpha_rotation_angle) - alpha_B_x0*Math.sin(alpha_rotation_angle)))
            .classed('ima_part b', true)


        /* beta 实部*/
        block_beta.append('line')
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", scale(beta_C_y0*Math.sin(beta_rotation_angle) + beta_C_x0*Math.cos(beta_rotation_angle)))
            .attr("y2", scale(beta_C_y0*Math.cos(beta_rotation_angle) - beta_C_x0*Math.sin(beta_rotation_angle)))
            .classed('real_part c', true)


        /* beta 虚部*/
        block_beta.append('line')
            .attr("x1", scale(beta_C_y0*Math.sin(beta_rotation_angle) + beta_C_x0*Math.cos(beta_rotation_angle)))
            .attr("y1", scale(beta_C_y0*Math.cos(beta_rotation_angle) - beta_C_x0*Math.sin(beta_rotation_angle)))
            .attr("x2", scale(beta_B_y0*Math.sin(beta_rotation_angle) + beta_B_x0*Math.cos(beta_rotation_angle)))
            .attr("y2", scale(beta_B_y0*Math.cos(beta_rotation_angle) - beta_B_x0*Math.sin(beta_rotation_angle)))
            .classed('ima_part d', true)




        /* gamma 实部*/
        block_gamma.append('line')
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", scale(gamma_C_y0*Math.sin(gamma_rotation_angle) + gamma_C_x0*Math.cos(gamma_rotation_angle)))
            .attr("y2", scale(gamma_C_y0*Math.cos(gamma_rotation_angle) - gamma_C_x0*Math.sin(gamma_rotation_angle)))
            .classed('real_part e', true)


        /* gamma 虚部*/
        block_gamma.append('line')
            .attr("x1", scale(gamma_C_y0*Math.sin(gamma_rotation_angle) + gamma_C_x0*Math.cos(gamma_rotation_angle)))
            .attr("y1", scale(gamma_C_y0*Math.cos(gamma_rotation_angle) - gamma_C_x0*Math.sin(gamma_rotation_angle)))
            .attr("x2", scale(gamma_B_y0*Math.sin(gamma_rotation_angle) + gamma_B_x0*Math.cos(gamma_rotation_angle)))
            .attr("y2", scale(gamma_B_y0*Math.cos(gamma_rotation_angle) - gamma_B_x0*Math.sin(gamma_rotation_angle)))
            .classed('ima_part f', true)


        /* delta 实部*/
        block_delta.append('line')
            .attr("x1", scale(delta_C_y0*Math.sin(delta_rotation_angle) + delta_C_x0*Math.cos(delta_rotation_angle)))
            .attr("y1", scale(delta_C_y0*Math.cos(delta_rotation_angle) - delta_C_x0*Math.sin(delta_rotation_angle)))
            .attr("x2", scale(delta_A_y0*Math.sin(delta_rotation_angle) + delta_A_x0*Math.cos(delta_rotation_angle)))
            .attr("y2", scale(delta_A_y0*Math.cos(delta_rotation_angle) - delta_A_x0*Math.sin(delta_rotation_angle)))
            .classed('real_part g', true)


        /* delta 虚部*/
        block_delta.append('line')
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", scale(delta_C_y0*Math.sin(delta_rotation_angle) + delta_C_x0*Math.cos(delta_rotation_angle)))
            .attr("y2", scale(delta_C_y0*Math.cos(delta_rotation_angle) - delta_C_x0*Math.sin(delta_rotation_angle)))
            .classed('ima_part h', true)



        /* 添加 实部虚部的 交互 */
        let tooltip = d3.select("#svg_container")
            .append("div")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .classed('tooltip', true)


        d3.selectAll(".a,.b,.c,.d,.e,.f,.g,.h")
            .on("mouseover", function(){return tooltip.style("visibility", "visible");})
            // .on("mousemove", function(){return tooltip.style("top", (event.pageY)+"px").style("left",(event.pageX)+"px");})
            .on("mousemove", function(e){
                /*知道是a, b, c, 还是d*/
                let element = d3.select(this).attr('class').split(' ')[1]

                tooltip.style('top', e.clientY+"px")
                    .style('left', e.clientX+"px")
                    .html(`<span style="font-weight: bold">${convert_dict[`${orders[0]}-${orders[1]}-${orders[2]}`][`${element}_`]}:</span> ${params_dict[convert_dict[`${orders[0]}-${orders[1]}-${orders[2]}`][`${element}_`]]}`)
            })
            .on("mouseout", function(){return tooltip.style("visibility", "hidden");});


        /*添加 外界半圆 的交互*/
        d3.selectAll(".P00,.P01,.P10,.P11")
            .on("mouseover", function(){return tooltip.style("visibility", "visible");})
            // .on("mousemove", function(){return tooltip.style("top", (event.pageY)+"px").style("left",(event.pageX)+"px");})
            .on("mousemove", function(e){
                /*知道是a, b, c, 还是d*/
                let element = d3.select(this).attr('class')

                tooltip.style('top', e.clientY+"px")
                    .style('left', e.clientX+"px")
                    .html(`<span style="font-weight: bold;color:#f00">${convert_dict[`${orders[0]}-${orders[1]}-${orders[2]}`][element]}:</span> ${params_dict[convert_dict[`${orders[0]}-${orders[1]}-${orders[2]}`][element]].toFixed(2)}`)
            })
            .on("mouseout", function(){return tooltip.style("visibility", "hidden");});



        /*开始做 shoulders 的交互*/
        d3.selectAll('.shoulders')
            .on("mouseover", function(e){

                tooltip.style("visibility", "hidden");
                d3.selectAll('.P00,.P01,.P10,.P11').style('visibility', 'hidden')
                d3.selectAll('.P_label').style('visibility', 'hidden')
                tooltip.style("visibility", "visible")


                /*开始画 alpha 后面的半圆*/
                block_alpha.append("path")
                    .attr("transform", `translate(${scale(shoulder1_B_y0*Math.sin(shoulder1_rotation_angle) + shoulder1_B_x0*Math.cos(shoulder1_rotation_angle))/2},${scale(shoulder1_B_y0*Math.cos(shoulder1_rotation_angle) - shoulder1_B_x0*Math.sin(shoulder1_rotation_angle))/2})`)
                    .attr("d", d3.arc()
                        .outerRadius(scale(shoulder1)/2)
                        .innerRadius(0)
                        .startAngle(-Math.PI/2-shoulder1_rotation_angle)
                        .endAngle(Math.PI/2-shoulder1_rotation_angle)())
                    .classed('appended_P0', true)

                block_delta.append("path")
                    .attr("transform", `translate(${scale(shoulder2_A_y0*Math.sin(shoulder2_rotation_angle) + shoulder2_A_x0*Math.cos(shoulder2_rotation_angle))/2},${scale(shoulder2_A_y0*Math.cos(shoulder2_rotation_angle) - shoulder2_A_x0*Math.sin(shoulder2_rotation_angle))/2})`)
                    .attr("d", d3.arc()
                        .outerRadius(scale(shoulder2)/2)
                        .innerRadius(0)
                        .startAngle(-Math.PI/2-shoulder2_rotation_angle)
                        .endAngle(Math.PI/2-shoulder2_rotation_angle))
                    .classed('appended_P1', true)




            })
            .on("mousemove", function(e){

                let element = d3.select(this).attr('class').split(' ')[2].split('_')[1]

                tooltip.style('top', e.clientY+"px")
                    .style('left', e.clientX+"px")
                    .html(`${appended_P_dict[`${orders[0]}-${orders[1]}-${orders[2]}`][`appended_${element}`].toFixed(2)}`)

            })
            .on("mouseout", function(){
                d3.selectAll('.appended_P0,.appended_P1').style('visibility', 'hidden')

                d3.selectAll('.P00,.P01,.P10,.P11').style('visibility', 'visible')
                d3.selectAll('.P_label').style('visibility', 'visible')

                tooltip.style("visibility", "hidden");

            });








        /* 开始画symbol */
        if(d3.selectAll('.base_triangle').size()){
            block_alpha.append('text')
                .text('|φ⟩')
                .attr('x', scale(base)/2)
                .attr('y', scale(-(alpha*beta)/base)/2)
                .attr("dy", "1em")
        }


        if(d3.selectAll('.P00').size()){
            d3.select(`.${d3.select('.P00').node().parentNode.classList[0]}`)
                .append('text')
                .text(`|${convert_dict[`${orders[0]}-${orders[1]}-${orders[2]}`]['symbol00']}⟩`)
                .attr('transform', d3.selectAll('.P00').attr('transform'))
                .attr("dy", "-0.5em")
                .style('font-size', '0.9em')
                .classed('P_label', true)
        }

        if(d3.selectAll('.P01').size()){
            d3.select(`.${d3.select('.P01').node().parentNode.classList[0]}`)
                .append('text')
                .text(`|${convert_dict[`${orders[0]}-${orders[1]}-${orders[2]}`]['symbol01']}⟩`)
                .attr('transform', d3.selectAll('.P01').attr('transform'))
                .attr("dy", "-0.5em")
                .style('font-size', '0.9em')
                .classed('P_label', true)

        }

        if(d3.selectAll('.P10').size()){
            d3.select(`.${d3.select('.P10').node().parentNode.classList[0]}`)
                .append('text')
                .text(`|${convert_dict[`${orders[0]}-${orders[1]}-${orders[2]}`]['symbol10']}⟩`)
                .attr('transform', d3.selectAll('.P10').attr('transform'))
                .attr("dy", "-0.5em")
                .style('font-size', '0.9em')
                .classed('P_label', true)

        }

        if(d3.selectAll('.P11').size()){
            d3.select(`.${d3.select('.P11').node().parentNode.classList[0]}`)
                .append('text')
                .text(`|${convert_dict[`${orders[0]}-${orders[1]}-${orders[2]}`]['symbol11']}⟩`)
                .attr('transform', d3.selectAll('.P11').attr('transform'))
                .attr("dy", "-0.5em")
                .style('font-size', '0.9em')
                .classed('P_label', true)

        }




    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        /* 清除svg的所有元素*/
        d3.select('.svgStyle').selectAll('*').remove()

        /*重新渲染*/
        this.render_view(this.props.params_arr, this.props.orders)

        console.log('update 2')

    }


    componentDidMount() {

        /* 清除svg的所有元素*/
        d3.select('.svgStyle').selectAll('*').remove()

        /*重新渲染*/
        this.render_view(this.props.params_arr, this.props.orders)


    }


    render(){

        return(
            <div>
                <svg className='svgStyle'/>
            </div>
        )
    }
}

export default View_2q;
