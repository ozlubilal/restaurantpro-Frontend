import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Bill } from 'src/app/models/bill';
import { StoreBill } from 'src/app/models/storeBill';
import { StoreBillDetails } from 'src/app/models/storeBillDetails';
import { AuthService } from 'src/app/services/auth.service';
import { BillService } from 'src/app/services/bill.service';
import { StoreBillService } from 'src/app/services/store-bill.service';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit{
bills:Bill[];
storeBills:StoreBill[];
storeBillDetails:StoreBillDetails[];
  constructor(
  private billService:BillService, 
  private storeBillService:StoreBillService,
  private toastrService:ToastrService,
  private router:Router,
  private authService:AuthService,
  ){}
  ngOnInit(): void {
    this.authService.isRoleAuthenticated("Admin")
    this.getAllBills();
    this.getStoreBills();
    this.getAllBillDetails();
   this.getStoreBillDetails();
  }
getStoreBills(){
this.storeBillService.getAll().subscribe(response=>{
  this.storeBills=response.data
  console.log(response.data)
})
}
getStoreBillDetails(){
  this.storeBillService.getStoreBillDetails().subscribe(response=>{
  this.storeBillDetails=response.data;
  
  })
}
getBillDetailsByStoreBillId(storeBillId:number){
this.billService.getBillDetailsByStoreBillId(storeBillId).subscribe(response=>{
  return response.data;
})
}
getAllBills(){
  this.billService.getAll().subscribe(response=>{
    this.bills=response.data;
  })
}
getAllBillDetails(){
  this.billService.getListBillDetailDto().subscribe(response=>{
    console.log(response.data)
  })
}

delete(bill:Bill){
  this.billService.delete(bill).subscribe(response=>{
  this.toastrService.success(response.message,"Başarılı");
  },responseError=>{
    this.toastrService.error(responseError.error,"Başarısız");
  });
}
}
