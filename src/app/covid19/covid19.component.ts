import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CountryReports } from 'src/countryReports';
import { ApicallService } from '../apicall.service';
import { Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-covid19',
  templateUrl: './covid19.component.html',
  styleUrls: ['./covid19.component.css'],
})
export class Covid19Component implements OnInit {
  @Input('ELEMENT_DATA') ELEMENT_DATA!: CountryReports[];
  displayedColumns: string[] = [
    'country',
    'cases',
    'todayCases',
    'deaths',
    'todayDeaths',
    'recovered',
    'todayRecovered',
    'active',
    'critical',
    'casesPerOneMillion',
    'deathsPerOneMillion',
    'tests',
    'testsPerOneMillion',
  ];
  dataSource = new MatTableDataSource<CountryReports>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private service: ApicallService) {}

  ngOnInit(): void {
    this.getAllReports();
  }
  public getAllReports() {
    let resp = this.service.covid19Reports();
    resp.subscribe(
      (report) => (this.dataSource.data = report as CountryReports[])
    );
  }
}
