import { compile, derivative } from 'mathjs';
import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import ROECSS from './Rootofequationcss.module.css';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { Helmet } from 'react-helmet'

var dataintable = [];
const NewtonRaphson = () => {
    const columns = [
        {
            name: 'Iteration',
            selector: row => row.iteration
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

    const [datanewtonraphson, setdatanewtonraphson] = useState({
        fx: '',
        x: 0,
    });

    const [GIteration, setGIteration] = useState([]);
    const [GX, setGX] = useState([]);

    const [result, setresult] = useState(0);
    const [showresult, setshow] = useState(false);

    const func = (x) => {
        var expr = compile(datanewtonraphson.fx);
        let scope = { x: parseFloat(x) };
        return expr.evaluate(scope);
    }

    const funcdiff = (x) => {
        let scope = { x: parseFloat(x) };
        return derivative(datanewtonraphson.fx, 'x').evaluate(scope)
    }

    function newtonraphson() {
        var X = parseFloat(datanewtonraphson.x), XOld = 0, PercentError = 100, Fx = 0, FxDiff = 0;
        var datax = [], dataerror = [];
        var n = 0;
        var maxitreation = 999;
        while (PercentError > 0.000001 && n <= maxitreation) {
            XOld = X;
            Fx = func(X);
            FxDiff = funcdiff(X);
            X = XOld - (Fx / FxDiff);
            datax[n] = X;
            PercentError = Math.abs((X - XOld) / X) * 100;
            dataerror[n] = PercentError;
            n++;
        }
        createTable(datax, dataerror);
        createGraph(datax);
        setresult(X);
        setshow(true);

    }

    function createTable(x, error) {
        dataintable = []
        for (var i = 0; i < x.length; i++) {
            dataintable.push({
                iteration: i + 1,
                xx: x[i],
                error: error[i]
            });
        }
    }

    function createGraph(x) {
        var datagiteration = []
        var datagx = []
        for (var i = 0; i < x.length; i++) {
            datagiteration.push(i + 1);
            datagx.push(x[i]);
        }
        setGIteration(datagiteration);
        setGX(datagx);
    }

    return (
        <div>
            <Helmet>
                <title>NewtonRaphson</title>
            </Helmet>
            <form>
                <div className={ROECSS.head}>
                    <h1>Newton Raphson</h1>
                </div>
                <div className={ROECSS.container}>
                    <div className={ROECSS.headform}>
                        <div className={ROECSS.formgroup}>
                            <span class="detail">Equation</span>
                            <input type="text" placeholder="Enter the equation" onChange={(e) => setdatanewtonraphson({ ...datanewtonraphson, fx: e.target.value })}></input>
                        </div>
                        <div className={ROECSS.row3}>
                            <div className={ROECSS.formgroup}>
                                <span class="detail">X</span>
                                <input type="number" name="xl" placeholder="Enter The X Start Value" onChange={(e) => setdatanewtonraphson({ ...datanewtonraphson, x: e.target.value })}></input>
                            </div>
                        </div>
                        <div className={ROECSS.row1}>
                            <button type="button" onClick={newtonraphson}>
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
                                    label: 'X',
                                    data: GX,
                                    fill: false,
                                    lineTension: 0.5,
                                    backgroundColor: 'white',
                                    borderColor: '#7FB77E',
                                    borderWidth: 2,
                                },
                            ]
                        }}
                    />
                </div>}
            </form>
        </div>
    )
}

export default NewtonRaphson