import { compile } from 'mathjs';
import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import ROECSS from './Rootofequationcss.module.css';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { Helmet } from 'react-helmet'

var dataintable = [];
const FalsePosition = () => {
    const columns = [
        {
            name: 'Iteration',
            selector: row => row.iteration
        },
        {
            name: 'XL',
            selector: row => row.xlll
        },
        {
            name: 'XR',
            selector: row => row.xrrr
        },
        {
            name: 'X',
            selector: row => row.xx
        },
        {
            name: 'Error',
            selector: row => row.error
        },
    ]

    const [datafalseposition, setdatafalseposition] = useState({
        fx: '',
        xl: 0,
        xr: 0
    });

    const [GIteration, setGIteration] = useState([]);
    const [GXl, setGXL] = useState([]);
    const [GX, setGX] = useState([]);
    const [GXR, setGXR] = useState([]);

    const [result, setresult] = useState(0);
    const [showresult, setshow] = useState(false);

    const func = (x) => {
        var expr = compile(datafalseposition.fx);
        let scope = { x: parseFloat(x) };
        return expr.evaluate(scope);
    }

    function falseposition() {
        var xll = parseFloat(datafalseposition.xl), xrr = parseFloat(datafalseposition.xr), FxL = 0, FxR = 0, X = 0, XOld = 0, Fx = 0, PercentError = 100;
        var dataxl = [], dataxr = [], datax = [], dataerror = [];
        var n = 0;
        var maxitreation = 999;
        while (PercentError > 0.000001 && n <= maxitreation) {
            XOld = X;
            FxL = func(xll);
            FxR = func(xrr);
            X = ((xll * FxR) - (xrr * FxL)) / (FxR - FxL);
            Fx = func(X);
            if (Fx * FxR > 0) {
                xrr = X;
            } else {
                xll = X;
            }
            dataxl[n] = xll;
            dataxr[n] = xrr;
            datax[n] = X;
            PercentError = Math.abs((X - XOld) / X) * 100;
            dataerror[n] = PercentError;
            n++;
        }
        createTable(dataxl, dataxr, datax, dataerror);
        createGraph(dataxl, datax, dataxr);
        setresult(X);
        setshow(true);
    }

    function createTable(xl, xr, x, error) {
        dataintable = []
        for (var i = 0; i < xl.length; i++) {
            dataintable.push({
                iteration: i + 1,
                xlll: xl[i],
                xrrr: xr[i],
                xx: x[i],
                error: error[i]
            });
        }
    }

    function createGraph(xl, x, xr) {
        var datagiteration = []
        var datagxl = []
        var datagxm = []
        var datagxr = []
        for (var i = 0; i < xl.length; i++) {
            datagiteration.push(i + 1);
            datagxl.push(xl[i]);
            datagxm.push(x[i]);
            datagxr.push(xr[i]);
        }
        setGIteration(datagiteration);
        setGXL(datagxl);
        setGX(datagxm);
        setGXR(datagxr);
    }

    return (
        <div>
            <Helmet>
                <title>FalsePosition</title>
            </Helmet>
            <form>
                <div className={ROECSS.head}>
                    <h1>False-Position</h1>
                </div>
                <div className={ROECSS.container}>
                    <div className={ROECSS.headform}>
                        <div className={ROECSS.formgroup}>
                            <span class="detail">Equation</span>
                            <input type="text" placeholder="Enter the equation" onChange={(e) => setdatafalseposition({ ...datafalseposition, fx: e.target.value })}></input>
                        </div>
                        <div className={ROECSS.row}>
                            <div className={ROECSS.formgroup}>
                                <span class="detail">XL</span>
                                <input type="number" name="xl" placeholder="Enter The XL Value" onChange={(e) => setdatafalseposition({ ...datafalseposition, xl: e.target.value })}></input>
                            </div>
                            <div className={ROECSS.formgroup}>
                                <span class="detail">XR</span>
                                <input type="number" name="xr" placeholder="Enter The XR Value" onChange={(e) => setdatafalseposition({ ...datafalseposition, xr: e.target.value })}></input>
                            </div>
                        </div>
                        <div className={ROECSS.row1}>
                            <button type="button" onClick={falseposition}>
                                Calculate
                            </button>
                        </div>
                        {showresult && <div className={ROECSS.row2}>
                            Answer is {result}
                        </div>}
                    </div>
                </div>
                {showresult && <div className={ROECSS.container1}>
                    <DataTable columns={columns} data={dataintable} pagination paginationPerPage={5} paginationRowsPerPageOptions={[5, 10]} />
                </div>}
                {showresult && <div className={ROECSS.container1}>
                    <Line
                        data={{
                            labels: GIteration,
                            datasets: [
                                {
                                    label: 'XL',
                                    data: GXl,
                                    fill: false,
                                    lineTension: 0.5,
                                    backgroundColor: 'white',
                                    borderColor: '#FF8787',
                                    borderWidth: 2,
                                },
                                {
                                    label: 'X',
                                    data: GX,
                                    fill: false,
                                    lineTension: 0.5,
                                    backgroundColor: 'white',
                                    borderColor: '#7FB77E',
                                    borderWidth: 2,
                                },
                                {
                                    label: 'XR',
                                    data: GXR,
                                    fill: false,
                                    lineTension: 0.5,
                                    backgroundColor: 'white',
                                    borderColor: '#97D2EC',
                                    borderWidth: 2,
                                },
                            ],
                        }}
                    />
                </div>}
            </form>
        </div>
    )
}
export default FalsePosition