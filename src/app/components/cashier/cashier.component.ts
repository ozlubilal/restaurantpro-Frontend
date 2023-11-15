import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StoreBill } from 'src/app/models/storeBill';
import { Table } from 'src/app/models/table';
import { AuthService } from 'src/app/services/auth.service';
import { BillService } from 'src/app/services/bill.service';
import { OrderService } from 'src/app/services/order.service';
import { StoreBillService } from 'src/app/services/store-bill.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.css']
})

export class CashierComponent implements OnInit {
  ngOnInit(): void {
    this.authService.isRoleAuthenticated("Cashier")
    this.getTablesByStatuId();
    this.getStoreBill();
  }
  dataLoaded:boolean=false;
  tables:Table[]=[];
  storeBill:StoreBill;
  cash:number=0;
  billOfPayedCount:number;
  constructor(
    private authService:AuthService,
    private tableService:TableService,
    private billService:BillService,
    private storeBillService:StoreBillService,
    private orderService:OrderService,
    private toastrService:ToastrService,

    ){

  }

  getTablesByStatuId(){
    this.tableService.getByStatuId(2).subscribe(response=>{
     this.tables=response.data;
     console.log(this.tables.length)
    })
  }
  getStoreBill(){
    this.storeBillService.getByStatusId(1).subscribe(response=>{
      this.storeBill=response.data;
      console.log(response.data)      
      if(response.data){
     this.calculateDayOfBillPrice(response.data.id);
      }
    })
    this.dataLoaded=true;
  }
  calculateDayOfBillPrice(storeBillId:number){
  //günlük toplam tahsilat tutatrını alıyoruz.  
  this.orderService.getOrderDetailsByStoreBillId(this.storeBill.id).subscribe(response=>{
    response.data.filter(o=>o.billStatuId==2).forEach(orderDetailDto => {
    this.cash=this.cash+orderDetailDto.price*orderDetailDto.quantity;    
    });  
  })
  //tahsil edilmiş hesap sayısını alıyoruz
  this.billService.getByStoreBillId(this.storeBill.id).subscribe(response=>{
   this.billOfPayedCount=response.data.filter(b=>b.billStatusId==2).length;
  })
  }
  addStoreBill(){    
    let storeBill:StoreBill={
      id:0,
      startDate:new Date(),
      finishDate:new Date(),
      storeBillStatusId:1,   
    }
    console.log(storeBill)
    this.storeBillService.add(storeBill).subscribe(response=>{
      this.getStoreBill();
    })
  }

  closeStoreBill(){
    this.storeBill.storeBillStatusId=2,
    this.storeBillService.update(this.storeBill).subscribe(response=>{
     this.toastrService.success(response.message);
     console.log(this.storeBill)
     this.getStoreBill();
    },responseError=>{
      this.toastrService.error(responseError.error)
    });
  }
  deleteStoreBill(){
    this.storeBillService.delete(this.storeBill).subscribe(response=>{
      this.toastrService.warning(response.message);
      this.getStoreBill();
    },responseError=>{
      this.toastrService.error(responseError.error)
    })
  }
  
}
