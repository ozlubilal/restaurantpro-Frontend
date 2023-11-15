import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router, } from '@angular/router';
import { TableService } from 'src/app/services/table.service';
import { Table } from 'src/app/models/table';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { OrderDetails } from 'src/app/models/orderDetails';
import { BillService } from 'src/app/services/bill.service';
import { Bill } from 'src/app/models/bill';
import { first, firstValueFrom } from 'rxjs';
import { LocalService } from 'src/app/services/local.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { StoreBillService } from 'src/app/services/store-bill.service';
import { StoreBill } from 'src/app/models/storeBill';

@Component({
  selector: 'app-waiter-table-order-detail',
  templateUrl: './waiter-table-order-detail.component.html',
  styleUrls: ['./waiter-table-order-detail.component.css']
})
export class WaiterTableOrderDetailComponent implements OnInit {
  ngOnInit(): void {
    this.authService.isRoleAuthenticated("User")
    this.activatedRoute.params.subscribe(params => {
      this.getTableById((params["id"]));
      this.getAllCategory();
      this.getAllProducts();      
      this.getStoreBill();
    })
   
  }
  table:Table;
  categories:Category[];
  productsOfCategory:Product[];
  products:Product[];
  categoryId:number;
  orderDetails:OrderDetails[];
  bill:Bill;
  storeBill:StoreBill;
  dataLoad:string;
  xx:boolean=true;
  constructor(
    private categoryService:CategoryService,
    private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private tableService:TableService,
    private orderService:OrderService,
    private billService:BillService,
    private localService:LocalService,
    private authService:AuthService,
    private toastrService:ToastrService,
    private storeBillService:StoreBillService,
    private router:Router,
    ){
  }

  getAllCategory(){
    this.categoryService.getAll().subscribe(response=>{
      this.categories=response.data;
    })
  }
  getAllProducts(){
    this.productService.getAll().subscribe(response => {
      this.products = response.data;
    })
  }
  getProductsByCategoryId(categoryId:number){
    this.productService.GetByCategoryId(categoryId).subscribe(response=>{
      this.productsOfCategory=response.data;
    })
  }
  getTableById(tableId:number){
    this.tableService.getById(tableId).subscribe(response=>{
      this.table=response.data;      
    this.getBillByTableAndStatusId(tableId,1);
    })
  }
  getBillByTableAndStatusId(tableId:number,statusId:number){
    this.billService.getByTableIdAndStatusId(tableId,statusId).subscribe(response=>{
    this.bill=response.data;
    if(this.bill)   
    {      
    this.getOrderDetailsByBillId(response.data.id);
    }  
    else{ 
    this.xx=false
    } 
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
       this.getOrderDetailsByBillId(this.bill.id);
      },reponseError=>{
       this.getOrderDetailsByBillId(this.bill.id);
      });
     
     })
  }
  downQuantity(orderDetail:OrderDetails){ 
    this.orderService.getById(orderDetail.id).subscribe(response=>{
      let order=response.data;
      order.quantity=1;
     this.orderService.delete(order).subscribe(response=>{
      this.getOrderDetailsByBillId(this.bill.id);
     },reponseError=>{
      this.getOrderDetailsByBillId(this.bill.id);
     });
    
    })
  

    // let pid=Number(this.products.find(p=>p.productName==orderDetail.productName)?.id)
    // this.orderService.DownQuantity(orderDetail.billId,pid).subscribe(response=>{   
    //  this.getOrderDetailsByBillId(this.bill.id);
    // },responseError=>{
    //   this.getOrderDetailsByBillId(this.bill.id);
    // })
   
  }
  getStoreBill(){
  this.storeBillService.getByStatusId(1).subscribe(response=>{
  this.storeBill=response.data;
  console.log(response.data)
  })
  }
  addOrder(product:Product){
  
    if(this.bill){
    let order:Order={
      id:0,
      billId:this.bill.id,
      price:product.price,
      productId:product.id,
      quantity:1,
      userId: JSON.parse(this.localService.getItem('user_details') || '').userId,
      orderStatusId:1,
    }
    this.orderService.add(order).subscribe(response=>{
      this.getOrderDetailsByBillId(this.bill.id);
    },responseError=>{
      this.getOrderDetailsByBillId(this.bill.id);       
    });
  }
  else{
    this.toastrService.error("Sipariş eklemek için önce hesap açılmalıdır")
  }
  }
  addBill(){    
    let bill:Bill={
      id:0,
      storeBillId:this.storeBill.id,
      tableId:this.table.id,
      billStatusId:1,
      date:new Date(),
      price:0,
    }
    console.log(bill)
    this.billService.add(bill).subscribe(response=>{
      this.xx=true
      this.bill=bill
   
    this.getBillByTableAndStatusId(this.table.id,1);
    this.getOrderDetailsByBillId(bill.id);
    })    
    
  }
  deleteBill(bill:Bill){
    this.billService.delete(this.bill).subscribe(response=>{     
     this.getOrderDetailsByBillId(this.bill.id);
     this.getBillByTableAndStatusId(this.table.id,1);
     this.xx=false    
    })
    console.log(bill.id);
  }
}
