import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/models/bill';
import { Category } from 'src/app/models/category';
import { Order } from 'src/app/models/order';
import { OrderDetails } from 'src/app/models/orderDetails';
import { Product } from 'src/app/models/product';
import { StoreBill } from 'src/app/models/storeBill';
import { Table } from 'src/app/models/table';
import { AuthService } from 'src/app/services/auth.service';
import { BillService } from 'src/app/services/bill.service';
import { CategoryService } from 'src/app/services/category.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { StoreBillService } from 'src/app/services/store-bill.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit{
  
  ngOnInit(): void {    
    this.authService.isRoleAuthenticated("Chef")
  this.getAllOrderDetailsOfActive();  
 

  }
  newList:Order;
  bill:Bill;
  orderDetails:OrderDetails[];
  products:Product[];
  order:Order;
  tables:Table[];
  categoriesForListBox:string[];
  productsForListBox:string[];
  allOrderCount:number;
  pendingOrderCount:number;
  processedOrderCount:number;
  servicedOrderCount:number;
  storeBill:StoreBill;  
  dataLoad:string;
  date:string=new Date().toLocaleDateString();
  constructor(
    private orderService:OrderService,
    private tableService:TableService,
    private billService:BillService,
    private authService:AuthService,
    private storeBillService:StoreBillService,
  ){}
  onOptionsSelectedTable(value:string){
    this.orderService.getOrderDetailsByStoreBillId(this.storeBill.id).subscribe(response=>{
      if(value=="0")
      this.orderDetails=response.data
      else
      this.orderDetails=response.data.filter(o=>o.tableName==value)      
    })
  }
  onOptionsSelectedProduct(value:string){
    this.orderService.getOrderDetailsByStoreBillId(this.storeBill.id).subscribe(response=>{
    if(value=="0")
    this.orderDetails=response.data
    else
    this.orderDetails=response.data.filter(o=>o.productName==value)    
    })
  }
  onOptionsSelectedCategory(value:string){
    this.orderService.getOrderDetailsByStoreBillId(this.storeBill.id).subscribe(response=>{
      if(value=="0")
      this.orderDetails=response.data
      else
      this.orderDetails=response.data.filter(o=>o.categoryName==value)
    })
  }

  getTables(){
    this.tableService.getAll().subscribe(response=>{
    this.tables=response.data;
    })
  }
  

  getBillByTableAndStatusId(tableId:number,statusId:number){
    this.billService.getByTableIdAndStatusId(tableId,statusId).subscribe(response=>{
    this.bill=response.data;
    if(this.bill)   
    {      
    this.getAllOrderDetailsOfActive();
    }  
    else{ 
    } 
    })
  }
  filterOrderDetails(orderStatusName:string){
    
    this.orderService.getOrderDetailsByStoreBillId(this.storeBill.id).subscribe(response=>{
      this.orderDetails=response.data.filter(o=>o.orderStatusName==orderStatusName);
    })
  }
  getAllOrderDetailsOfActive(){
  
    this.storeBillService.getByStatusId(1).subscribe(response=>{
      this.storeBill=response.data;
      this.orderService.getOrderDetailsByStoreBillId(response.data.id).subscribe(response=>{
        this.orderDetails=response.data 
        console.log(response.data)      
        //siparişe ait kategoriler 
      this.categoriesForListBox=[...new Set(response.data.map(({categoryName})=>categoryName))];
      this.productsForListBox=[...new Set(response.data.map(({productName})=>productName))];
      this.pendingOrderCount=response.data.filter(o=>o.orderStatusName=="Bekliyor").length;
      this.processedOrderCount=response.data.filter(o=>o.orderStatusName=="Hazirlaniyor").length;
      this.servicedOrderCount=response.data.filter(o=>o.orderStatusName=="Servis Edildi").length;
      this.allOrderCount=response.data.length;
      this.getTables();
      })
    })  
  }
// //mevcut sipariş listesini yeniden çekiyoruz
//   refreshList(list:OrderDetails[]){
//    this.orderService.refreshOrderDetails(list).subscribe(response=>{
//     this.orderDetails=response.data
//    })
//   }

  changeOrderStatu(orderDetail:OrderDetails,statusId:number){
  this.orderService.getById(orderDetail.id).subscribe(response=>{
     let order=response.data;
     order.orderStatusId=statusId;
     this.orderService.update(order).subscribe(response=>{   
     });
     this.getAllOrderDetailsOfActive();
   })   

}
getOrderDetailsByBillId(billId:number){
  this.orderService.getOrderDetailsByBillId(billId).subscribe(response=>{      
    this.orderDetails=response.data;          
      this.dataLoad="response.data[0].categoryName";
  },responseError=>{
    this.dataLoad="response.data[0].categoryName"
   
  })
}
upQuantity(orderDetail:OrderDetails){ 
  this.orderService.getById(orderDetail.id).subscribe(response=>{
    let order=response.data
    order.quantity=1;
    this.orderService.add(order).subscribe(response=>{
      this.getAllOrderDetailsOfActive();
    },reponseError=>{
      this.getAllOrderDetailsOfActive();
    });
   
   })
}
downQuantity(orderDetail:OrderDetails){ 
  this.orderService.getById(orderDetail.id).subscribe(response=>{
    let order=response.data;
    order.quantity=1;
   this.orderService.delete(order).subscribe(response=>{
    this.getAllOrderDetailsOfActive();
   },reponseError=>{
    this.getAllOrderDetailsOfActive();
   });
  
  })


  // let pid=Number(this.products.find(p=>p.productName==orderDetail.productName)?.id)
  // this.orderService.DownQuantity(orderDetail.billId,pid).subscribe(response=>{   
  //  this.getOrderDetailsByBillId(this.bill.id);
  // },responseError=>{
  //   this.getOrderDetailsByBillId(this.bill.id);
  // })
 
}

}