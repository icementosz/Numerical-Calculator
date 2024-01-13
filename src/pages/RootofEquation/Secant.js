import { compile } from 'mathjs';
import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import ROECSS from './Rootofequationcss.module.css';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { Helmet } from 'react-helmet'

var dataintable = [];
const Secant = () => {
    const columns = [
        {
            name: 'Iteration',
            selector: row => row.iteration
        },
        {
            name: 'X0',
            selector: row => row.x00
        },
        {
            name: 'X1',
            selector: row => row.x11
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

    const [datasecant, setdatasecant] = useState({
        fx: '',
        x0: 0,
        xr: 0
    });

    const [GIteration, setGIteration] = useState([]);
    const [GX0, setGX0] = useState([]);
    const [GX1, setGX1] = useState([]);
    const [GX, setGX] = useState([]);

    const [result, setresult] = useState(0);
    const [showresult, setshow] = useState(false);

    const func = (x) => {
        var expr = compile(datasecant.fx);
        let scope = { x: parseFloat(x) };
        return expr.evaluate(scope);
    }

    function secant() {
        var x00 = parseFloat(datasecant.x0), x11 = parseFloat(datasecant.x1), Fx0 = 0, Fx1 = 0, X = 0, PercentError = 100;
        var datax0 = [], datax1 = [], datax = [], dataerror = [];
        var n = 0;
        var maxitreation = 999;
        var round = 1;
        while (PercentError > 0.000001 && n <= maxitreation) {
            if (round === 1) {
                console.log(round)
                Fx0 = func(x00);
                Fx1 = func(x11);
                X = x11 - (Fx1 * (x00 - x11)) / (Fx0 - Fx1)
                datax0[n] = x00;
                datax1[n] = x11;
                datax[n] = X;
                PercentError = Math.abs((X - x11) / X) * 100;
                dataerror[n] = PercentError;
                round = 0;
                n++;
            } else {
                x00 = x11;
                x11 = X;
                Fx0 = func(x00);
                Fx1 = func(x11);
                X = x11 - (Fx1 * (x00 - x11)) / (Fx0 - Fx1)
                datax0[n] = x00;
                datax1[n] = x11;
                datax[n] = X;
                PercentError = Math.abs((X - x11) / X) * 100;
                dataerror[n] = PercentError;
                n++;
            }
        }
        createTable(datax0, datax1, datax, dataerror);
        createGraph(datax0, datax1, datax);
        setresult(X);
        setshow(true);

    }

    function createTable(x0, x1, x, error) {
        dataintable = []
        for (var i = 0; i < x0.length; i++) {
            dataintable.push({
                iteration: i + 1,
                x00: x0[i],
                x11: x1[i],
                xx: x[i],
                error: error[i]
            });
        }
    }

    function createGraph(x0, x1, x) {
        var datagiteration = []
        var datagx0 = []
        var datagx = []
        var datagx1 = []
        for (var i = 0; i < x0.length; i++) {
            datagiteration.push(i + 1);
            datagx0.push(x0[i]);
            datagx.push(x[i]);
            datagx1.push(x1[i]);
        }
        setGIteration(datagiteration);
        setGX0(datagx0);
        setGX1(datagx1);
        setGX(datagx);
    }


    return (
        <div>
            <Helmet>
                <title>Secant</title>
            </Helmet>
            <form>
                <div className={ROECSS.head}>
                    <h1>Secant</h1>
                </div>
                <div className={ROECSS.container}>
                    <div className={ROECSS.headform}>
                        <div className={ROECSS.formgroup}>
                            <span class="detail">Equation</span>
                            <input type="text" placeholder="Enter the equation" onChange={(e) => setdatasecant({ ...datasecant, fx: e.target.value })}></input>
                        </div>
                        <div className={ROECSS.row}>
                            <div className={ROECSS.formgroup}>
                                <span class="detail">X0</span>
                                <input type="number" name="x0" placeholder="Enter The X0 Value " onChange={(e) => setdatasecant({ ...datasecant, x0: e.target.value })}></input>
                            </div>
                            <div className={ROECSS.formgroup}>
                                <span class="detail">X1</span>
                                <input type="number" name="x1" placeholder="Enter The X1 Value" onChange={(e) => setdatasecant({ ...datasecant, x1: e.target.value })}></input>
                            </div>
                        </div>
                        <div className={ROECSS.row1}>
                            <button type="button" onClick={secant}>
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
                                    label: 'X0',
                                    data: GX0,
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
                                    label: 'X1',
                                    data: GX1,
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

export default Secant