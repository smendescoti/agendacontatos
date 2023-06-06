import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //atributos
  grafico: Chart = new Chart();
  tipo: string = 'bar';

  constructor(
    private dashboardService: DashboardService,
    private spinnerService: NgxSpinnerService
  ) {
  }

  //evento executado quando o componente é aberto
  ngOnInit(): void {

    this.spinnerService.show();

    this.dashboardService.get()
      .subscribe({
        next: (data) => {

          var dados = []; //array para os dados do gráfico
          var nomes = []; //array para os nomes do eixo x

          for (var i = 0; i < data.length; i++) {
            dados.push([data[i].name, data[i].data]);
            nomes.push(data[i].name);
          }

          this.grafico = new Chart({
            chart: { type: this.tipo },
            title: { text: 'Quantidade de contatos cadastrados por datas.' },
            subtitle: { text: 'Treinamento Angular - COTI Informática' },
            series: [{
              data: dados, type: undefined as any
            }],
            xAxis: {
              categories: nomes
            },
            legend: { enabled: false },
            credits: { enabled: false }
          });

        },
        error: (e) => {
          console.log(e.error);
        }
      })
      .add(() => {
        this.spinnerService.hide();
      })
  }

}
