import React from 'react'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'

export const SidebarData = [
    {
        title: 'Overview',
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Home',
                path: '/overview/home',
                icon: <IoIcons.IoIosPaper />,
            },
        ]
    },
    {
        title: 'Roots of Equations',
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Bisection',
                path: '/rootsofequation/bisection',
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title: 'False-Position',
                path: '/rootsofequation/falseposition',
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title: 'One-Point',
                path: 'rootsofequation/onepoint',
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title: 'Newton Raphson',
                path: 'rootsofequation/newtonraphson',
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title: 'Secant',
                path: 'rootsofequation/secant',
                icon: <IoIcons.IoIosPaper />,
            },
        ]
    },
    {
        title: 'Linear Algebra',
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Cramer\'s Rule',
                path: '/linearalgebra/cramerrule',
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title: 'Test Cramer\'s Rule',
                path: '/linearalgebra/testcramerrule',
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title: 'Gauss Elimination',
                path: '/linearalgebra/gausselimination',
                icon: <IoIcons.IoIosPaper />,
            },
        ]
    },
    {
        title: 'Interpolation',
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Lagrange',
                path: '/interpolation/lagrange',
                icon: <IoIcons.IoIosPaper />,
            },
        ]
    },
    {
        title: 'Regression',
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Regression',
                path: '/leastsquaresregression/regression',
                icon: <IoIcons.IoIosPaper />,
            },
        ]
    },
    // {
    //     title: 'Products',
    //     path: '/products',
    //     icons: <FaIcons.FaCartPlus />
    // }
];
