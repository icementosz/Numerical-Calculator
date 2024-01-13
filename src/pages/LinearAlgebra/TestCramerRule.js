import React, { useState } from 'react'
import LACSS from './Linearalgebracss.module.css';
import { create, all } from 'mathjs'


const math = create(all, {})

// var matrixA = [];
// var matrixB = [];
var Answer = [];
const CramerRule = () => {
    const [sizematrix,setsizematrix] = useState(2); //if morethan 1 -> setstate
    const [matrix,setmatrix] = useState("");
    const [render,setrender] = useState("");
    const [result,setresult] = useState(0);

    function handleinputmatrixchange(event){
        const min=2,max=99;
        
        var num=Math.max(min,Math.min(max,event.target.value));
            setsizematrix(parseFloat(num));

            var posts = [];
            var posts2 = [];
            var testtt = [];
            for(let i=0;i<event.target.value;i++){
                var posts1 = [];
            
                testtt[i]=[];
                for(let j=0;j<event.target.value;j++){
                    posts1.push(<input type="number"  min={2} maxLength={2} placeholder="" onChange={setmatrixA(i,j)} ></input>)
                }
                posts.push(<div className={LACSS.test2}>{posts1}</div>)
                
                posts2.push(<div><input type="number"  min={2} maxLength={2} placeholder="" onChange={setmatrixB(i)} ></input></div>)
            }
            setmatrix({matrixA:testtt,matrixB:[]})
            setrender({arender:posts,brender:posts2})
    }

    const inputHandler = (e) => {
        const { value, maxLength } = e.target;
        if (String(value).length >= maxLength) {
          e.preventDefault();
          return;
        }
    }

    function setmatrixA(row,column){
        return (e) => {
            let matrixA = matrix.matrixA;
            let matrixB = matrix.matrixB;
            console.log(matrix.matrixA);
            matrixA[row][column] = e.target.value;
            setmatrix({matrixA:matrixA,matrixB:matrixB})
        }
    }

    function setmatrixB(num){
        return (e) => {
            let matrixA = matrix.matrixA;
            let matrixB = matrix.matrixB;
            matrixB[num] = e.target.value;
            setmatrix({matrixA:matrixA,matrixB:matrixB})
        }
    }

    function findanswer(){
        console.log(matrix.matrixA);
        var detA = math.det(matrix.matrixA);
        for(let i=0;i<sizematrix;i++){
            var matrixAA = structuredClone(matrix.matrixA);
            for(let j=0;j<sizematrix;j++){
                matrixAA[j][i] = matrix.matrixB[j];
            }
            Answer.push(math.det(matrixAA)/detA);
        }
        setresult(Answer);
        console.log(Answer);
    }

  return (
    <form>
            <div className={LACSS.head}>
                <h1>Cramer's Rule</h1>
            </div>
            <div className={LACSS.container}>
                <div className={LACSS.headform}>
                    <div className={LACSS.formgroup}>
                        <span class={LACSS.detail}>Size of Matrix</span> <span className={LACSS.smalldetail}>(Ex. Input 3 = 3x3)</span>
                        <input type="number"  min={2} maxLength={2} placeholder="Enter the size of matrix (Minimum value is 2)" onKeyPress={inputHandler} onChange={handleinputmatrixchange}></input>
                    </div>
                    <div className={LACSS.test1}>
                        <div className=''>
                            A
                            {render.arender}
                        {/* {(() => {
                            var posts = [];
                            var testtt = [];
                            for(let i=0;i<sizematrix;i++){
                                var posts1 = [];
                                matrixA[i]=[];
                                
                                testtt[i]=[];
                                for(let j=0;j<sizematrix;j++){
                                    posts1.push(<input type="number"  min={2} maxLength={2} placeholder="" onChange={setmatrixA(i,j)} ></input>)
                                }
                                posts.push(<div className={LACSS.test2}>{posts1}</div>)
                            }
                            //setmatrix({matrixA:testtt,matrixB:[]})
                            return posts
                    
                        })()} */}
                        </div>
                        <div>
                            B
                            {render.brender}
                        {/* {(() => {
                            var posts2 = [];
                            for(let i=0;i<sizematrix;i++){
                                posts2.push(<div><input type="number"  min={2} maxLength={2} placeholder="" onChange={setmatrixB(i)} ></input></div>)
                                
                            }
                            return posts2
                        })()} */}
                        </div>
                    </div>
                    <div className={LACSS.row1}>
                        <button type="button" onClick={findanswer}>
                            Calculate
                        </button>
                    </div>
                    <div>
                    {(() => {
                            var posts3 = [];
                            for(let i=0;i<result.length;i++){
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
  )
}

export default CramerRule