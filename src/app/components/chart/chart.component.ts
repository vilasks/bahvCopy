import { Component, OnInit,Input,ViewChild,Renderer2, ElementRef,AfterViewInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
import {Chart,ChartType } from 'chart.js/auto'
import { DataServiceService } from 'src/app/services/data-services/data-service.service';
import { SymbolsService } from 'src/app/services/symbols-services/symbols.service';
import { min,max} from 'lodash'
import zoomPlugin  from 'chartjs-plugin-zoom';
import { AlertServiceService } from 'src/app/services/alert-service/alert-service.service';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @ViewChild("modal", {static: false}) modal!:ElementRef;
  @ViewChild("chart", {static: false}) chartRef!:ElementRef;
  @ViewChild("current_interval", {static: false}) current_interval!:ElementRef;
  constructor(
    private dataService:DataServiceService,
    private symbolService:SymbolsService,
    private formBuilder:FormBuilder,
    private alertService:AlertServiceService,
    private render: Renderer2,
    private toastr:ToastrService,
    ) { }
  
  @Input() symbol!:string
  data:Array<number> = []
  label:Array<string> = []
  chart:any;
  staticLabel:string = "Rs"
  options:any;
  type:ChartType = "line"
  currentInterval:number = 7;
  currentevent:any = null;
  crosshair:any;
  createAlert:FormGroup = this.formBuilder.group({
      symbol: new FormControl('',[Validators.required]),
      price: new FormControl('',{
        validators: [Validators.required,Validators.min(0.01)],
        asyncValidators: [],
        updateOn: 'blur'
      }),
      // email: new FormControl('',[Validators.email,Validators.required])
    });
  submitInProgress:boolean = false;
  mailInProgress:boolean = false;
  mailSent = false;
  otpProgress = false;
  otpVerified = false;
  stockMinTime = 0;
  stockMaxTime = 1;
  currentStockTime:any;
  stockMinLabel:any;
  stockMaxLabel:any;
  ngOnInit(): void {
    let crosshair:any;
    let crosshairLabel = {
      id: "crosshairLabel",

      //drawing part
      afterDatasetsDraw(chart:any,args:any,plugins:any){
        const {ctx,chartArea:{left,right,top,bottom},scales:{x,y}} = chart;
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        if(crosshair){
          ctx.save()
          ctx.beginPath()
          crosshair.forEach((line:any,index:number)=>{
            ctx.moveTo(line.startX,line.startY)
            ctx.lineTo(line.endX,line.endY)
            ctx.stroke()
          })
          ctx.fillStyle = 'grey';
          ctx.fillRect(0,crosshair[0].startY-10,left,20)
          ctx.font = 'bold 12px sans-serif';
          ctx.fillStyle = "white"
          ctx.textAlign = "center"
          ctx.fillText(y.getValueForPixel(crosshair[0].startY).toFixed(2),left/2,crosshair[0].startY)
        }
      },

      //mouse event
      afterEvent(chart:any,args:any){
        const {ctx,chartArea:{left,right,top,bottom}} = chart;
        const Xpos = args.event.x;
        const Ypos = args.event.y;
        
        if(!args.inChartArea && crosshair){
          crosshair = undefined
          args.changed = true;
        }else if(args.inChartArea){
          crosshair = [
            {
              startX: left,
              startY: Ypos,
              endX: right,
              endY: Ypos
            },
            {
              startX: Xpos,
              startY: top,
              endX: Xpos,
              endY: bottom
            }
          ];
          args.changed = true;
        }

      }
    }

    const plugin = {
      id: 'customCanvasBackgroundColor',
      beforeDraw: (chart:any, args:any, options:any) => {
        const {ctx} = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = options.color || '#f0f0f0';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      }
    };

    Chart.register(zoomPlugin);
    this.chart = new Chart(
      "chart",
      {
        data: {
          labels: this.label,
          datasets: [
            {
              data:this.data,
              type: this.type,
              label: this.staticLabel,
              // pointStyle: "line",
              pointRadius: 0
            }
          ]
        },
        options:{
          // responsive: true,
          
          interaction:{
            intersect: false,
            mode: "index",
          },

          responsive: true,
          maintainAspectRatio: true,

          layout:{
            padding: 10
          },
          
          scales:{
            y:{
              suggestedMin:300,
              suggestedMax: 340,
              grid:{
                lineWidth: 1
              }
            },
            x:{
              grid:{
                lineWidth: 0.1
              },
              ticks:{
                padding: 0,
                autoSkip: true,
                maxTicksLimit: 10
              }
            },
            
          },
          plugins:{
            legend:{
              display:false
            }
          }
        },
        plugins: [
          plugin,
          crosshairLabel,
        ]
      }
    )
    this.getDate()

    this.symbolService.stock.subscribe(
      (data:string)=>{
        this.getDate(data)
        this.getMinMaxTimestamps(data)
      }
    )
    
    this.getMinMaxTimestamps(this.symbol)

  }

  
  
  getDate(symbol=this.symbol){
    this.dataService.getDate(symbol).subscribe(
      (data:any)=>{
        if(data.data.length > 0){
          this.data = data.data
          this.updateChart(data)
        }
      },
      (err:any)=>{
        console.log(err)
      }
    )
  }

  changeStyle(type:ChartType){
    if(type=="scatter"){
      this.chart.data.datasets[0].pointRadius = 5
    }else{
      this.chart.data.datasets[0].pointRadius = 0
    }
    this.chart.data.datasets[0].type = type
    this.chart.update()    
  }

  changeIntervel(event:any,intervel:string){
    let i = parseInt(intervel)
    this.currentInterval = i
    this.dataService.changeInterval(this.symbol,i).subscribe(
      (data:any)=>{
        this.updateChart(data)
      },
      (err)=>{
        console.log(err)
      }
    )
  }

  updateChart(data:any){
    let priceArr = data.data.map((e:any)=>{
      return e.CLOSE
    })
    let dates = data.data.map((e:any)=>{
      return this.formatDate(e.TIMESTAMP)
    })

    this.chart.data.datasets[0].data = priceArr
    this.chart.data.labels = dates 
    this.chart.options.scales.y.min = (min(priceArr) as number) - 10
    this.chart.options.scales.y.max = (max(priceArr) as number) + 10
    this.chart.update()
  }

  // wheelEvent(e:any){
  //   if(e.deltaY>0){
  //     this.currentInterval+=7
  //     if(this.currentevent){
  //       clearInterval(this.currentevent)
  //       this.currentevent = setTimeout(()=>this.changeIntervel(this.currentInterval.toString()),2000)
  //     }else{
  //       this.currentevent = setTimeout(()=>this.changeIntervel(this.currentInterval.toString()),2000)
  //     }
  //   }else{
  //     this.currentInterval-=7
  //     if(this.currentevent){
  //       clearInterval(this.currentevent)
  //       this.currentevent = setTimeout(()=>this.changeIntervel(this.currentInterval.toString()),2000)
  //     }else{
  //       this.currentevent = setTimeout(()=>this.changeIntervel(this.currentInterval.toString()),2000)
  //     }
  //   }
  //   e.preventDefault()
  // }

  formatDate(val:string){
    let date = new Date(val).toLocaleDateString().split("/")
    let tmp = date[0]
    date[0] = date[1]
    date[1] = tmp
    date[2] = date[2].substr(-2)
    return date.join("/")
    // new Date().toUTCString().split(",")[1].split(" ")[2] + " "+new Date().toUTCString().split(",")[1].split(" ")[3]
  }

  openCreateForm(){
    this.createAlert.patchValue(
      {
        symbol: this.symbol,
        price: this.roundOffPrice(this.chart.data.datasets[0].data[this.chart.data.datasets[0].data.length - 1]),
        email: '',
        otp: ''
      }
    )
    this.mailSent = false;
    this.otpVerified = false;
  }

  submitCreateAlert(){
    this.submitInProgress = true 
    this.setPrice(this.roundOffPrice(this.createAlert.get("price")?.value))
    this.alertService.createAlert(this.createAlert.value).subscribe(
      (data:any)=>{
        if(data.status === 1){
          this.toastr.success(data.msg || "alert created successfully", "Success")
          this.modal.nativeElement.click()
        }else{
          this.toastr.error(data.msg || "unable to create alert currently. please try after sometime", "Error")
        }
        this.submitInProgress = false;
      },
      (err)=>{
        this.submitInProgress = false;
        this.toastr.error(err.error.msg || "unable to create alert currently. please try after sometime", "Error")
      }
    )
  }


  roundOffPrice(price:any){
    if(typeof price === "number"){
      return Number(price.toFixed(1))
    }else if(typeof price === "string"){
      return Number(Number(price).toFixed(1))
    }
    return price
  }

  setPrice(value:any){
    this.createAlert.patchValue({price: value})
  }

  sendMail(){
    this.mailInProgress = true
    this.dataService.sendOtp(this.createAlert.get("email")?.value).subscribe(
      (data:any)=>{
        if(data.status == 1){
          this.mailSent = true
          this.createAlert.addControl("otp", new FormControl('',[Validators.required]))
          this.createAlert.get("email")?.setErrors(null)
        }else{
          this.createAlert.get("email")?.setErrors({emailError: true})
        }
        this.mailInProgress = false;
      },
      (err)=>{
        console.log(err)
        this.mailInProgress = false;
        this.createAlert.get("email")?.setErrors({emailError: true})
      }
    )
    
  }

  verifyOTP(){
    this.otpProgress = true
    let data = {
      email: this.createAlert.get("email")?.value,
      otp: this.createAlert.get("otp")?.value
    }
    this.dataService.verifyOtp(data).subscribe(
      (data:any) => {
        if(data.status == 1){
          this.otpVerified = true
          this.createAlert.get("otp")?.setErrors(null)
        }else{
          this.createAlert.get("otp")?.setErrors({otpError: true})
        }
        this.otpProgress = false
      },
      (err)=>{
        console.log(err)
        this.otpProgress = false;
        this.createAlert.get("otp")?.setErrors({otpError: true})
      }
    )
  }

  get f(){
    return this.createAlert.controls
  }

  renderIntervalLabel(event:any,intervel:string){
    console.log(event.srcElement.clientWidth)
    console.log(event.target.max)
    console.log(event.srcElement.clientWidth/event.target.max)
    console.log((event.srcElement.clientWidth/event.target.max) * parseInt(intervel))
    console.log(this.current_interval.nativeElement.clientWidth/2)
    this.currentStockTime = new Date(Date.parse(this.stockMinLabel) + (86400000 * parseInt(intervel)))
    this.current_interval.nativeElement.style.left = `${((event.srcElement.clientWidth/event.target.max) * parseInt(intervel)) - this.current_interval.nativeElement.clientWidth/2}px`
  }

  getMinMaxTimestamps(stock:string){
    this.symbolService.getMinMaxTimestamps(stock).subscribe(
      (data:any)=>{
        if(data.status == 1){
          this.setMinMaxTimestamps(data.data)
        }else{
          this.toastr.error("Error while getting stock data. please try after sometime", "Error")
        }
      },
      (err)=>{
        this.toastr.error("Error while getting stock data. please try after sometime")
        console.log(err)
      }
    )
  }


  setMinMaxTimestamps(data:any){
    let timeDifference = (Date.parse(data.max) - Date.parse(data.min))/86400000
    this.stockMinLabel = data.min
    this.stockMaxLabel = data.max
    console.log(timeDifference)
    this.stockMinTime = 0
    this.stockMaxTime = timeDifference
  }

}
