
import { useEffect, useState } from 'react';
import DashboardService from '../../../../API/Dashboard_service';
import Appglobal from '../../../../helperclasses/appglobal';
import { NotificationService } from '../../../../API/notification_service';
import { NotificationType } from '../../../../helperclasses/enums';
import ReactApexChart from 'react-apexcharts';

export const TotalAmount=()=>{
    const service_dashboard=new DashboardService();
    const service_notifier=new NotificationService();
    const appglobal=new Appglobal();

    const eurCurrency = 'EUR';
    const usdCurrency = 'USD';
    const gbpCurrency = 'GBP';

    const [EURChartData,setEURChartData]=useState( [{
        data: []
      }])
      const [USDChartData,setUSDChartData]=useState( [{
        data: []
      }])
      const [GBPChartData,setGBPChartData]=useState( [{
        data: []
      }])

      const [EURDonutChartData,setEURDonutChartData]=useState([])
      const [USDDonutChartData,setUSDDonutChartData]=useState([])
      const [GBPDonutChartData,setGBPDonutChartData]=useState([])

      
    const model_filter={startCS:appglobal.formatDate(appglobal.getStartDate()),endCS:appglobal.formatDate(appglobal.getEndDate()),idMerchant:''}

    useEffect(()=>{
        getChartData(eurCurrency);
        getChartData(usdCurrency);
        getChartData(gbpCurrency); 
    },[])

    const getChartData=(currency)=>{
        model_filter['currency']=currency;
        service_dashboard.reportsByCurrency(model_filter).then((chart_data) => {
               
                bind_chart_data(chart_data.data.orders,currency);
          })
          .catch((error) => {
           
                service_notifier.showNotification(NotificationType.Error,error.code)

              
          });
    }

    const bind_chart_data=(orders,currency)=>{
        debugger;
        orders = orders.filter((x) => x.currency === currency);
        let refundOrders = orders.filter(
            (x) => x.typeOrder === 'Refund'
          );
          let chargebackOrders = orders.filter(
            (x) => x.typeOrder === 'Chargeback'
          );
          let aprovedOrders = orders.filter(
            (x) => x.typeOrder === 'Normal'
          );
          let refundOrdersValue = 0;
          refundOrders.forEach((element) => {
            refundOrdersValue += element.refundAmount;
          });

          let chargebackOrdersValue = 0;
          chargebackOrders.forEach((element) => {
            chargebackOrdersValue += element.chargebackAmount;
          });

          let aprovedOrdersValue = 0;
          aprovedOrders.forEach((element) => {
            aprovedOrdersValue += element.amount;
          });
          
    let r = refundOrdersValue.toFixed(2);
    let c = chargebackOrdersValue.toFixed(2);
    let a = aprovedOrdersValue.toFixed(2);

          let data_array= [a,r,c];
    if (currency === 'EUR') {
        setEURChartData( [{
            data: data_array
          }])

          setEURDonutChartData([Number(a),Number(r),Number(c)]);

    }
    if (currency === 'USD') {
        setUSDChartData( [{
            data:data_array
          }])
          setUSDDonutChartData([Number(a),Number(r),Number(c)]);

    }
    if (currency === 'GBP') {
        setGBPChartData( [{
            data: data_array
          }])
          setGBPDonutChartData([Number(a),Number(r),Number(c)]);

    }
    }

      const colors=['#29a329','#ff8000','#cc0000'];
      const label=['Completed','Refund','Chargeback']

      const chartOptions = {
        chart: {
          height: 300,
          type: 'bar',
          toolbar: {
            show: false
          },
          events: {
            click: function(chart, w, e) {
              // console.log(chart, w, e)
            }
          }
        },
        colors: colors,
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: label,

        }
      };

      const donutChartOption={
        chart: {
          width: 380,
          type: 'donut',
          dropShadow: {
            enabled: true,
            color: '#111',
            top: -1,
            left: 3,
            blur: 3,
            opacity: 0.2
          }
        },
        stroke: {
          width: 0,
        },
        plotOptions: {
          pie: {
            donut: {
              
            }
          }
        },
        labels: label,
        dataLabels: {
          dropShadow: {
            blur: 3,
            opacity: 0.8
          }
        },

        states: {
          hover: {
            filter: 'none'
          }
        },

        colors:colors,
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
    }


    return (
        <div  id="div_charts_total"  className="row">
 <div className="col-12  pt-3">
 <div className="card">
 <div className="card_header row p-2" style={{minHeight: '50px'}}>
            <div className="col-10 " ><strong>Currency { eurCurrency }</strong> </div>
        </div>
        <div className="card_body py-2 px-4">
        <div className="col-12">
        <div className="row">
        <div className="col-md-5 chart_width">
        <ReactApexChart
        options={chartOptions}
        series={EURChartData}
        type="bar"
        height={350}
      />
        </div>
        <div className="col-md-2 container_vertical_line"></div>
        <div className="col-md-5 text-center" >
        <ReactApexChart options={donutChartOption} series={EURDonutChartData} type="donut" />
        </div>
        </div>
            </div>
        </div>
 </div>
 </div>

 <div className="col-12  pt-3">
 <div className="card">
 <div className="card_header row p-2" style={{minHeight: '50px'}}>
            <div className="col-10 " ><strong>Currency { usdCurrency }</strong> </div>
        </div>
        <div className="card_body py-2 px-4">
        <div className="col-12">
        <div className="row">
        <div className="col-md-5 chart_width">
        <ReactApexChart
        options={chartOptions}
        series={USDChartData}
        type="bar"
        height={350}
      />
        </div>
        <div className="col-md-2 container_vertical_line"></div>
        <div className="col-md-5 text-center" >
        <ReactApexChart options={donutChartOption} series={USDDonutChartData} type="donut" />

        </div>
        </div>
            </div>
        </div>
 </div>
 </div>

 <div className="col-12  pt-3">
 <div className="card">
 <div className="card_header row p-2" style={{minHeight: '50px'}}>
            <div className="col-10 " ><strong>Currency {gbpCurrency }</strong> </div>
        </div>
        <div className="card_body py-2 px-4">
        <div className="col-12">
        <div className="row">
        <div className="col-md-5 chart_width">
        <ReactApexChart
        options={chartOptions}
        series={GBPChartData}
        type="bar"
        height={350}
      />
        </div>
        <div className="col-md-2 container_vertical_line"></div>
        <div className="col-md-5 text-center" >
        <ReactApexChart options={donutChartOption} series={GBPDonutChartData} type="donut" />

        </div>
        </div>
            </div>
        </div>
 </div>
 </div>
        </div>
    )
} 