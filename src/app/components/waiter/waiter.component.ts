import { Component, OnInit } from '@angular/core';
import { StoreBill } from 'src/app/models/storeBill';
import { Table } from 'src/app/models/table';
import { AuthService } from 'src/app/services/auth.service';
import { StoreBillService } from 'src/app/services/store-bill.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.css']
})

export class WaiterComponent implements OnInit {
  ngOnInit(): void {
    this.getStoreBill();
    this.authService.isRoleAuthenticated("User")
    this.getTables();
  }
  storeBill:StoreBill;
  tables:Table[];
  constructor(
    private tableService:TableService,
    private authService:AuthService,
    private storeBillService:StoreBillService,
  ){}

  getTables(){
    this.tableService.getAll().subscribe(response=>{
     this.tables=response.data;
    })
  }
  getStoreBill(){
    
    this.storeBillService.getByStatusId(1).subscribe(response=>{
      this.storeBill=response.data;
     
    })
  }

}
