import React, { useState } from 'react'
import LACSS from './Linearalgebracss.module.css';
import { create, all } from 'mathjs'
import { Helmet } from 'react-helmet'

const math = create(all, {})

const GaussElimination = () => {
    const [sizematrix, setsizematrix] = useState(2);
    const [mymatrixA, setmymatrixA] = useState();
    const [mymatrixB, setmymatirxB] = useState([]);
    const [result, setresult] = useState([]);

    function handleinputmatrixchange(event) {
        const min = 2, max = 99;
        var num = Math.max(min, Math.min(max, event.target.value));
        setsizematrix(0);
        //ไวเกิน ถ้าไม่ใส่ cooldown 
        setTimeout(() => {
            setsizematrix(parseFloat(num));
            setmymatrixA(Array.from({ length: num }, () => Array.from({ length: num }, () => null)));
            console.log(mymatrixA)
        }, 10);
    }

    const inputHandler = (e) => {
        const { value, maxLength } = e.target;
        if (String(value).length >= maxLength) {
            e.preventDefault();
            return;
        }
    }

    function setmatrixA(row, column, e) {
        mymatrixA[row][column] = e.target.value;
        setmymatrixA(mymatrixA);
    }

    function setmatrixB(num, e) {
        mymatrixB[num] = e.target.value;
        setmymatirxB(mymatrixB)
    }

    function gausselimination(){
        console.log(mymatrixA)
        console.log(mymatrixB)
    }

  return (
    <div>
            <Helmet>
                <title>Gauss Elimination</title>
            </Helmet>
            <form>
                <div className={LACSS.head}>
                    <h1>Gauss Elimination</h1>
                </div>
                <div className={LACSS.container}>
                    <div className={LACSS.headform}>
                        <div className={LACSS.formgroup}>
                            <span class={LACSS.detail}>Size of Matrix</span> <span className={LACSS.smalldetail}>(Ex. Input 3 = 3x3)</span>
                            <input type="number" min={2} maxLength={2} placeholder="Enter the size of matrix (Minimum value is 2)" onKeyPress={inputHandler} onChange={handleinputmatrixchange}></input>
                        </div>
                        <div className={LACSS.test1}>
                            <div className="">
                                A
                                {(() => {
                                    var posts = [];
                                    for (let i = 0; i < sizematrix; i++) {
                                        var posts1 = [];
                                        for (let j = 0; j < sizematrix; j++) {
                                            posts1.push(<input type="number" min={2} maxLength={2} onChange={e => setmatrixA(i, j, e)} ></input>)
                                        }
                                        posts.push(<div className={LACSS.test2}>{posts1}</div>)
                                    }
                                    return posts
                                })()}
                            </div>
                            <div>
                                B
                                {(() => {
                                    var posts2 = [];
                                    for (let i = 0; i < sizematrix; i++) {
                                        posts2.push(<div><input type="number" min={2} maxLength={2} onChange={e => setmatrixB(i, e)} ></input></div>)
                                    }
                                    return posts2
                                })()}
                            </div>
                        </div>
                        <div className={LACSS.row1}>
                            <button type="button" onClick={gausselimination} >
                                Calculate
                            </button>
                        </div>
                        <div>
                            {(() => {
                                var posts3 = [];
                                for (let i = 0; i < result.length; i++) {
                                    posts3.push(<div>X{i} is {result[i]}</div>)
                                }
                                return posts3
                            })()}
                        </div>
                    </div>
                </div>
                <div className={LACSS.container1}>

                </div>
            </form>
        </div>
  )
}

export default GaussElimination