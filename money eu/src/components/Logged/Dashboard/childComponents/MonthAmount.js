import { useEffect, useState } from "react";
import ReactApexChart from 'react-apexcharts';
import Appglobal from "../../../../helperclasses/appglobal";
import DashboardService from "../../../../API/Dashboard_service";
import { NotificationService } from "../../../../API/notification_service";
import { NotificationType } from "../../../../helperclasses/enums";


export const MonthAmount=()=>{

    const [ChartData,setChartData]=useState( [{
        data: []
      }])

      const appglobal=new Appglobal();
      const service_dashboard=new DashboardService();
      const service_notifier=new NotificationService();

      const [HorizontalChartData,setHorizontalChartData]=useState([{
        data: []
      }]);

      const actualTpvLimit=0;
      const Horizontalcolors=['#29a329',
      '#ff8000',
      '#cc0000'];

      const colors=['#ff8000',
      '#29a329']
      const label=['Max', 'Actual'];
      const HorizontalbarLabels=[    'Normal %',
      'Refund %',
      'Chargeback %'];

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

      const HorizontalChartOption={
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
          colors: Horizontalcolors,
          plotOptions: {
            bar: {
              columnWidth: '45%',
              distributed: true,
              horizontal: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          xaxis: {
            categories: HorizontalbarLabels,
  
          }
    }

    const model_filter={}
   
    useEffect(()=>{
        let year = new Date(appglobal.getEndDate()).getFullYear();
        let month = new Date(appglobal.getEndDate()).getMonth();
        let from = new Date(year, month, 1);
        let to = new Date(year, month + 1, 1);
       model_filter['startCS']=appglobal.formatDate(from);
        model_filter['endCS']=appglobal.formatDate(to);
        model_filter['idMerchant']='';
        getChartData();
    },[])

    const getChartData=()=>{
        service_dashboard.reportsByCurrency(model_filter).then((chart_data) => {
               
                bind_chart_data(chart_data.data.orders);
          })
          .catch((error) => {
           
                service_notifier.showNotification(NotificationType.Error,error.code)

              
          });
    }

  const  bind_chart_data=(reports)=>{
    let reportsCompleted = reports.filter(
        (x) => x.typeOrder === 'Normal'
      );
      let reportsRefund = reports.filter(
        (x) => x.typeOrder === 'Refund'
      );
      let reporstChargeback = reports.filter(
        (x) => x.typeOrder === 'Chargeback'
      );
  
      let numberCompleted = reportsCompleted.length;
      let numberRefund = reportsRefund.length;
      let numberChargeback = reporstChargeback.length;
  
      let numberTotal =
        numberCompleted + numberRefund + numberChargeback;
  
      let percentageCompleted = Math.round(
        (100 * numberCompleted) / numberTotal
      );
      let percentageRefund = Math.round(
        (100 * numberRefund) / numberTotal
      );
      let percentageChargeback = Math.round(
        (100 * numberChargeback) / numberTotal
      );
  


      setHorizontalChartData([{
        data: [ percentageCompleted,
            percentageRefund,
            percentageChargeback]
      }])
  
      let amountCompleted = 0,
        amountRefund = 0,
        amountChargeback = 0;
      reportsCompleted.forEach((report) => {
        amountCompleted += report.amount;
      });
      reportsRefund.forEach((report) => {
        amountRefund += report.refundAmount;
      });
      reporstChargeback.forEach((report) => {
        amountChargeback += report.chargebackAmount;
      });
  
      let amountActual =
        amountCompleted - amountRefund - amountChargeback;
      let percentageActual = Math.round(
        (100 * amountActual) / actualTpvLimit
      );
  
  
 
      setChartData([{
        data: [actualTpvLimit, amountActual]
      }])
    }
   
    return(
        <div className="col-12  pt-3">
        <div className="card p-2">
    
               <div className="card_body row" style={{minHeight:'100px'}}>
               <div className="col-12">
               <div className="row">
               <div className="col-md-5 chart_width">
               <ReactApexChart
        options={chartOptions}
        series={ChartData}
        type="bar"
        height={350}
      />
               </div>
               <div className="col-md-2 container_vertical_line"></div>
               <div className="col-md-5 text-center" >
               <ReactApexChart
        options={HorizontalChartOption}
        series={HorizontalChartData}
        type="bar"
        height={350}
      />

               </div>
               </div>
                   </div>
               </div>
        </div>
        </div>
    )

} 