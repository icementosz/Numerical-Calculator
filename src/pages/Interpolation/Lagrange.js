import React, { useState } from 'react'
import ITPLTCSS from './interpolationcss.module.css';
import { Helmet } from 'react-helmet'

const Lagrange = () => {
    const [count,setcount] = useState(2);
    const [table,settable] = useState([{x:null,y:null},{x:null,y:null}]);
    const [point,setpoint] = useState([]);
    const [x,setx] = useState(0)
    const [Answer,SetAnswer] = useState(0)
    const [showAnswer,SetshowAnswer] = useState(false)
    const [textError,settextError] = useState('');
    const [showError,setshowError] = useState(false);

    function setcount1(e){
        var temptable = []
        if(e.target.value < 2 ){
            return;
        }
        setcount(0);
        setTimeout(() => {
            setcount(e.target.value)
            for(let i=0;i<e.target.value;i++){
                temptable[i] = {x:null,y:null};
            }
            settable(temptable)
        }, 10);
        
    }

    function setdatatable(column,row){
        return (e) =>{
            settable([...table],table[column][row]=e.target.value)
            console.log(table)
        }
    }

    function lagrange(e){
        e.preventDefault();
        console.log(point)
        for(let i = 0; i < table.length; i++){
            if(!table[i]['x'] || !table[i]['y']){
              console.log("is null");
              settextError('Table has null value')
              setshowError(true)
              break;
            }else{
                setshowError(false)
                let result = 0;
                for(let i = 0; i< point.length; i++){
                    let temp = table[point[i]-1].y;
                    for(let j = 0; j<point.length; j++){
                        if (j != i)
                            temp*=(table[point[j]-1].x-x)/(table[point[j]-1].x-table[point[i]-1].x);
                    }
                    result += temp;
                }
                SetAnswer(result)
                SetshowAnswer(true)
            }
          }
    }
  return (
    <div>
        <Helmet>
            <title>Lagrange</title>
        </Helmet>
        <form>
            <div className={ITPLTCSS.head}>
                <h1>Lagrange Interpolation</h1>
            </div>
            <div className={ITPLTCSS.container}>
                    <div className={ITPLTCSS.headform}>
                        <div className={ITPLTCSS.formgroup}>
                            <span class={ITPLTCSS.detail}>Count of Order Pair</span>
                            <input type="number" min={2} maxLength={2} placeholder="Enter the count of order pair (Minimum value is 2)" onChange={setcount1}></input>
                        </div>
                        <div className={ITPLTCSS.formgroup}>
                            <span class={ITPLTCSS.detail}>X Value</span>
                            <input type="number" placeholder="Enter the x value" onChange={(e) => setx(e.target.value)}></input>
                        </div>
                        <div className={ITPLTCSS.formgroup}>
                            <span class={ITPLTCSS.detail}>Enter point Example : 1,3</span>
                            <input type="text" placeholder="Enter the point value" onChange={(e) => setpoint((e.target.value).split(','))}></input>
                        </div>
                        <div className={ITPLTCSS.row1}>
                        </div>
                        <div className=''>
                            <table className={ITPLTCSS.tablehead}>
                                    <thead>
                                        <tr>
                                            <th className={ITPLTCSS.tabledecor}>
                                                Point
                                            </th>
                                            <th className={ITPLTCSS.tabledecor}>
                                                X
                                            </th>
                                            <th className={ITPLTCSS.tabledecor}>
                                                Y
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {(() => {
                                        var posts=[];
                                        for(let i=0;i<count;i++){
                                            posts.push(<tr>
                                                <td className={ITPLTCSS.tabledecor}>{i+1}</td>
                                                <td className={ITPLTCSS.tabledecor}><input className={ITPLTCSS.inputdecor} onInput={setdatatable(i,'x')}/></td>
                                                <td className={ITPLTCSS.tabledecor}><input className={ITPLTCSS.inputdecor} onInput={setdatatable(i,'y')}/></td>
                                            </tr>)
                                        }
                                        return posts
                                    })()}
                                    </tbody>
                            </table>
                        </div>
                        <div className={ITPLTCSS.row1}>
                            <button onClick={lagrange}>Calculate</button>
                        </div>
                        {showError &&<div className={ITPLTCSS.row1}>
                            {textError}
                        </div>}
                        {showAnswer && <div className={ITPLTCSS.row1}>
                            Answer is {Answer}
                        </div>}
                    </div>
                </div>
            </form>
        </div>
  )
}

export default Lagrange