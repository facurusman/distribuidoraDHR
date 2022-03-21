import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { Client } from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export interface PeriodicElement {
  name: string;
  phone_number: string;
  zone: string;
  adress: string;
  email: string;
  detail: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name : "Lucas", phone_number : "11-2176", zone : "villa bosch", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-6600", zone : "villa bosch", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-2176", zone : "villa bosch", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-2349", zone : "villa bosch", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-2176", zone : "villa bosch", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-2176", zone : "villa bosch", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Facundo", phone_number : "11-7777", zone : "villa bosch", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-2176", zone : "villa bosch", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-2176", zone : "villa bosch", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-2176", zone : "villa bosch", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-2176", zone : "villa bosch", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-6600", zone : "villa bosch", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-2176", zone : "villa bosch", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-2349", zone : "villa bosch", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-2176", zone : "villa bosch", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-2176", zone : "villa bosch", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Facundo", phone_number : "11-7777", zone : "villa bosch", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-2176", zone : "villa bosch", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-2176", zone : "villa bosch", adress : "murialdo", email : "rusman", detail : "holaaa"},
  {name : "Lucas", phone_number : "11-2176", zone : "villa bosch", adress : "murialdo", email : "rusman", detail : "holaaa"},
];

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})

export class ClientsComponent implements AfterViewInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
  displayedColumns: string[] = ['name', 'phone_number', 'zone', 'adress', 'email', 'detail'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  name:any
  phone_number:any
  zone:any
  adress:any
  email:any
  detail:any
  constructor(private readonly clientService: ClientsService, private readonly _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  allClients() {
    this.clientService.getClients().subscribe( (response) => {
     console.log(response)
    })
  }

  onSend() {
    const client = new Client({
      name: this.name,
      phone_number: this.phone_number,
      zone: this.zone,
      adress: this.adress,
      email: this.email,
      detail: this.detail,
    });
    this.clientService.postClient(client).subscribe((response) => {
      location.reload();
      console.log(response);
    });
  }
}
