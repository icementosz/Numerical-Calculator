import React, { useState } from 'react'
import RGCSS from './regressioncss.module.css'
import { create, all, setMultiplicity, or } from 'mathjs'
import { Helmet } from 'react-helmet'
import { Scatter } from 'react-chartjs-2'
import axios from 'axios'
import { tab } from '@testing-library/user-event/dist/tab'


const math = create(all, {})

const Regression = () => {
    const [count, setcount] = useState(2);
    const [table, settable] = useState([{ x: null, y: null }, { x: null, y: null }]);
    const [tabletest, settabletest] = useState([]);
    const [table1, settable1] = useState([{ x:[null,null], y: null }, { x: [null,null], y: null }]);
    const [x, setx] = useState(0)
    const [multiregress, setmultiregress] = useState(false);
    const [order, setorder] = useState(1);
    const [countx, setcountx] = useState(2);
    const [result,setresult] = useState([]);
    const [apidata,setapidata] = useState([]);
    const [showAnswer,SetshowAnswer] = useState(false)

    function setcount1(e) {
        console.log("test")
        console.log(typeof e.target.value);
        var temptable = []
        if (e.target.value < 2) {
            //setcount(2)
            return;
            
        }
        setcount(0);
        setTimeout(() => {
            setcount(e.target.value)
            if(multiregress===false){
                for (let i = 0; i < e.target.value; i++) {
                    temptable[i] = { x: null, y: null };
                }
                settable(temptable)
            }
            else{
                for (let i = 0; i < e.target.value; i++) {
                    temptable[i] = { x: Array(1).fill(0).map(x => Array(countx).fill(null)), y: null };
                }
                settable1(temptable)
            }
        }, 10);
    }

    function setdatatable(column, row) {
        return (e) => {
            settable([...table], table[column][row] = e.target.value)
            console.log(table)  
        }
    }

    function setdatatable1(column, row, xn) {
        return (e) => {
            if(row == 'x'){
                console.log(column,row,xn)
                console.log(table1)
                settable1([...table1], table1[column][row][xn] = e.target.value)
                console.log(table1)
            }
            else if(row == 'y'){
                settable1([...table1],table1[column][row] = e.target.value)
            }
        }
    }

    function regression(e) {
        e.preventDefault();
        if (multiregress === false) {
            let poly = [];
            let polyb = [];
            for (let i = 0; i <= order; i++) {
                poly[i] = [];
                for (let j = 0; j <= order; j++) {
                    if (i == 0 && j == 0)
                        poly[i][j] = table.length;
                    else
                        poly[i][j] = table.reduce((a, b) => { return a += Math.pow(b.x, i + j) }, 0);
                }
                if (i == 0)
                    polyb[i] = table.reduce((a, b) => { return a += Number(b.y) }, 0);
                else
                    polyb[i] = table.reduce((a, b) => { return a += Math.pow(b.x, i) * b.y }, 0);
            }
            let answer = math.lusolve(poly,polyb);
            var answerobject = []
            for(let j=table[0].x;j<=table[table.length-1].x;j++){
                let y=0;
                for(let i=0;i<=order;i++){
                    y += answer[i][0]*Math.pow(j,i);
                }
                answerobject.push({x:Number(j),y:y})
            }
            console.log(answerobject)
            settabletest(answerobject);
            setTimeout(() => {
                setresult(answer);
                console.log(polyb)
                console.log(poly)
                console.log(answer)
                console.log(tabletest)
            }, 100);
            // setresult(answer);
            // console.log(polyb)
            // console.log(poly)
            // console.log(answer)
            // console.log(tabletest)
        }else{
            let multiple = [];
            let multipleb = [];
            for(let i = 0; i < table1[0].x.length+1; i++ ){
                multiple[i] = [];
                for(let j = 0; j < table1[0].x.length+1; j++){
                    if(i==0&&j==0)
                        multiple[i][j] = table1.length;
                    else if(i==0)
                        multiple[i][j] = table1.reduce((a,b)=> {return a+=Number(b.x[j-1])},0);
                    else if(j==0)
                        multiple[i][j] = multiple[0][i];
                    else
                        multiple[i][j] = table1.reduce((a,b)=> {return a+=(b.x[i-1]*b.x[j-1])},0)
                }
                if(i==0)
                    multipleb[i] = table1.reduce((a,b) => {return a+=Number(b.y)},0);
                else
                    multipleb[i] = table1.reduce((a,b) => {return a+=b.x[i-1]*b.y},0);
            }
            let answer = math.lusolve(multiple,multipleb);
            setresult(answer);
            console.log(multiple);
            console.log(multipleb)
            console.log(answer)
        }
        SetshowAnswer(true)
    }

    async function getapi(e){
        e.preventDefault();
        // axios.get('http://localhost:3000/employees').then((respond)=>{console.log(respond)})
        var eiei = await axios.get('http://localhost:3000/data')
        setapidata(eiei.data);
        console.log(apidata)
    }

    function setdataapito(e){
        var dataa = null;
        for(let i=0;i<apidata.length;i++){
            if(apidata[i].id == e.target.value){
                dataa = apidata[i]
                break
            }
        }
        if(dataa){
            console.log(dataa.countofpair);
            setcount(dataa.countofpair)
            setx(dataa.xvalue)
            setorder(dataa.order)
            console.log(apidata)
            console.log(dataa.point);
            settable(dataa.point)
            console.log(table);
        }
        console.log(count);
    }

    function postapi(e){
        e.preventDefault();
        axios.post('http://localhost:3000/data',{id:'', countofpair:Number(count), xvalue:Number(x), order:Number(order), point:table});
    }

    return (
        <div>
            <Helmet>
                <title>Regression</title>
            </Helmet>
            <form>
                <div className={RGCSS.head}>
                    <h1>Regression</h1>
                </div>
                <div className={RGCSS.container}>
                    <div className={RGCSS.headform}>
                        <div>
                            <select onChange={setdataapito}>
                                {(() => {
                                    var postss = []
                                    for(let i=0;i<apidata.length;i++){
                                        postss.push(<option>{apidata[i].id}</option>)
                                    }
                                    return postss
                                })()}
                            </select>
                        </div>
                        <div className={RGCSS.checkbox1}>
                            <span class>Multiple</span>
                            <input className={RGCSS.input1} type="checkbox" onChange={(e) => setmultiregress(!multiregress)}></input>
                        </div>
                        <div className={RGCSS.formgroup}>
                            <span class={RGCSS.detail}>Count of Order Pair</span>
                            <input type="number" defaultValue={count} min={2} maxLength={2} placeholder="Enter the count of order pair (Minimum value is 2)" onChange={setcount1}></input>
                        </div>
                        {!multiregress && <div className={RGCSS.formgroup}>
                            <span class={RGCSS.detail}>X Value</span>
                            <input type="number" value={x} placeholder="Enter the x value" onChange={(e) => setx((e.target.value))}></input>
                        </div>}
                        {!multiregress && <div className={RGCSS.formgroup}>
                            <span class={RGCSS.detail}>Order</span>
                            <input type="number" value={order} placeholder="Enter the order" onChange={(e) => setorder((e.target.value))}></input>
                        </div>}
                        {multiregress && <div className={RGCSS.formgroup}>
                            <span class={RGCSS.detail}>Count Of X</span>
                            <input type="number" placeholder="Enter the count of x" onInput={(e) => setcountx((e.target.value >= 2 ? e.target.value : 2))}></input>
                        </div>}
                        <div className={RGCSS.row1}>
                        </div>
                        <div className=''>
                            <table className={RGCSS.tablehead}>
                                <thead>
                                    {(() => {
                                        if (multiregress == false) {
                                            return (
                                                <tr>
                                                    <th className={RGCSS.tabledecor}>
                                                        Point
                                                    </th>
                                                    <th className={RGCSS.tabledecor}>
                                                        X
                                                    </th>
                                                    <th className={RGCSS.tabledecor}>
                                                        Y
                                                    </th>
                                                </tr>)
                                        } else {
                                            console.log(countx)
                                            var posts2 = [];
                                            posts2.push(<th className={RGCSS.tabledecor}>
                                                Point
                                            </th>)
                                            for (let i = 0; i < countx; i++) {
                                                posts2.push(<th className={RGCSS.tabledecor}>
                                                    X{i + 1}
                                                </th>)
                                            }
                                            posts2.push(<th className={RGCSS.tabledecor}>
                                                Y
                                            </th>)
                                            var post1 = [<tr>{posts2}</tr>];
                                            return post1
                                        }
                                    })()}
                                </thead>
                                <tbody>
                                    {(() => {
                                        if (multiregress === false) {
                                            var posts = [];
                                            for (let i = 0; i < count; i++) {
                                                posts.push(<tr>
                                                    <td className={RGCSS.tabledecor}>{i + 1}</td>
                                                    <td className={RGCSS.tabledecor}><input type="number" value={table[i].x} className={RGCSS.inputdecor} onInput={setdatatable(i, 'x')} /></td>
                                                    <td className={RGCSS.tabledecor}><input type="number" value={table[i].y} className={RGCSS.inputdecor} onInput={setdatatable(i, 'y')} /></td>
                                                </tr>)
                                            }
                                            return posts
                                        }
                                        else {
                                            var posts4 = [];
                                            for (let i = 0; i < count; i++) {
                                                var posts3 = [];
                                                posts3.push(<td className={RGCSS.tabledecor}>{i + 1}</td>)
                                                for (let j = 0; j < countx; j++) {
                                                    posts3.push(<td className={RGCSS.tabledecor}><input type="number" className={RGCSS.inputdecor} onInput={setdatatable1(i, 'x', j)} /></td>)
                                                }
                                                posts3.push(<td className={RGCSS.tabledecor}><input type="number" className={RGCSS.inputdecor} onInput={setdatatable1(i, 'y')} /></td>)
                                                posts4.push(<tr>{posts3}</tr>)

                                            }
                                            return posts4
                                        }
                                    })()}
                                </tbody>
                            </table>
                        </div>
                        <div className={RGCSS.row1}>
                            <button onClick={regression}>Calculate</button>
                        </div>
                        {!multiregress && 
                        <div className={RGCSS.row1}>
                            <button onClick={getapi}>Getapi</button>
                        </div>}
                        {!multiregress && 
                        <div className={RGCSS.row1}>
                            <button onClick={postapi}>postapi</button>
                        </div>}
                        {showAnswer && <div style={{textAlign:"center"}}>
                            {(() => {
                                var posts5 = [];
                                for (let i = 0; i < result.length; i++) {
                                    posts5.push(<div>X{i} is {result[i]}</div>)
                                }
                                return posts5
                            })()}
                        </div>}
                        <div>
                        <Scatter
                        data={{
                            labels: null,
                            datasets: [
                                    {
                                        label: 'XL',
                                        data: table,
                                        fill: false,
                                        lineTension: 0.5,
                                        backgroundColor: 'white',
                                        borderColor: '#FF8787',
                                        borderWidth: 2,
                                        showLine: true,
                                    },
                            ],
                        }}
                    />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Regression