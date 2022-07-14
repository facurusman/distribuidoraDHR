import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GraphicsData } from 'src/app/models/GraphicsData';
import { GraphicsService } from 'src/app/services/graphics.service';
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponentComponent implements OnInit {


  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  zona: string[] = [];
  cantidad: number[] = [];
  constructor(private router: Router, private graficosService: GraphicsService) {
    this.chartOptions = {
      series: this.cantidad,
      chart: {
        width: 600,
        type: "pie"
      },
      labels: this.zona,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {
    this.getGraphics();

  }

  getGraphics() {
    return this.graficosService.getGraphics().subscribe(response => {
      const datos = response as GraphicsData[];
      datos.forEach(propiedad => {
        this.cantidad.push(propiedad.cantidad);
        this.zona.push(propiedad.zona);
      });

      this.chartOptions = {
        series: this.cantidad,
        chart: {
          width: 6000,
          type: "pie"
        },
        labels: this.zona,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    });
  }

}
