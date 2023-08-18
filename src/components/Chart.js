import {useEffect, useMemo} from 'react';
import * as echarts from 'echarts';
import { Avatar, Grid, Typography } from '@mui/material';
import { datas } from '../shared/data';
import logo from '../shared/images/logo.png';

export const Chart = () => {

    const transformedData = useMemo(() => datas.map((data) => (
        {
            value: data.items.length,
            name: `${data.name} ${data.items.length}`
        })), [datas]);

    useEffect(() => {
        const chartDom = document.getElementById('main');
        const myChart = echarts.init(chartDom);
        let option;
        option = {
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              left: 'left'
            },
            series: [
              {
                type: 'pie',
                radius: '50%',
                data: transformedData,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
        option && myChart.setOption(option);
    }, )

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={7}>
                    <Typography sx={{ float: "right", marginTop: 2 }}>Rapport Statistique</Typography>
                </Grid>
                <Grid item xs={5} sx={{ marginBottom: 1 }}>
                    <Avatar
                        alt="logo"
                        src={logo}
                        sx={{ width: 50, height: 50, float: "right" }}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ px: 10 }} >
                <div id="main" style={{ width: '100%', height: 500 }}></div>
            </Grid>
        </>
    );
}
