import { compile } from 'mathjs';
import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import ROECSS from './Rootofequationcss.module.css';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { Helmet } from 'react-helmet'

var dataintable = [];
const Bisection = () => {
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

    const [databisection, setdatabisection] = useState({
        fx: '',
        xl: 0,
        xr: 0
    });

    const [GIteration, setGIteration] = useState([]);
    const [GXl, setGXL] = useState([]);
    const [GX, setGX] = useState([]);
    const [GXR, setGXR] = useState([]);


    const [result, setresult] = useState(0);
    const [show, setshow] = useState(false);

    const func = (x) => {
        var expr = compile(databisection.fx);
        let scope = { x: parseFloat(x) };
        return expr.evaluate(scope);
    }

    function bisection() {
        var xll = parseFloat(databisection.xl), xrr = parseFloat(databisection.xr), FxR = 0, Xm = 0, FxM = 0, XmOld = 0, PercentError = 100;
        var dataxl = [], dataxr = [], datax = [], dataerror = [];
        var n = 0;
        var maxitreation = 999;
        while (PercentError > 0.000001 && n <= maxitreation) {
            XmOld = Xm;
            Xm = (xll + xrr) / 2;
            datax[n] = Xm;
            FxM = func(Xm);
            FxR = func(xrr);
            if (FxM * FxR > 0) {
                xrr = Xm;
            } else {
                xll = Xm;
            }
            dataxl[n] = xll;
            dataxr[n] = xrr;
            PercentError = Math.abs((Xm - XmOld) / Xm) * 100;
            dataerror[n] = PercentError;
            n++;
        }
        createTable(dataxl, dataxr, datax, dataerror);
        createGraph(dataxl, datax, dataxr);
        setresult(Xm);
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
                <title>Bisection</title>
            </Helmet>
            <form>
                <div className={ROECSS.head}>
                    <h1>Bisection</h1>
                </div>
                <div className={ROECSS.container}>
                    <div className={ROECSS.headform}>
                        <div className={ROECSS.formgroup}>
                            <span class="detail">Equation</span>
                            <input type="text" placeholder="Enter the equation" onChange={(e) => setdatabisection({ ...databisection, fx: e.target.value })}></input>
                        </div>
                        <div className={ROECSS.row}>
                            <div className={ROECSS.formgroup}>
                                <span class="detail">XL</span>
                                <input type="number" name="xl" placeholder="Enter The XL Value" onChange={(e) => setdatabisection({ ...databisection, xl: e.target.value })}></input>
                            </div>
                            <div className={ROECSS.formgroup}>
                                <span class="detail">XR</span>
                                <input type="number" name="xr" placeholder="Enter The XR Value" onChange={(e) => setdatabisection({ ...databisection, xr: e.target.value })}></input>
                            </div>
                        </div>
                        <div className={ROECSS.row1}>
                            <button type="button" onClick={bisection} >
                                Calculate
                            </button>
                        </div>
                        {show && <div className={ROECSS.row2}>
                            Answer is {result}
                        </div>}
                    </div>
                </div>
                {show && <div className={ROECSS.container1}>
                    <DataTable columns={columns} data={dataintable} pagination paginationPerPage={5} paginationRowsPerPageOptions={[5, 10]} />
                </div>}
                {show && <div className={ROECSS.container1}>
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
export default Bisection