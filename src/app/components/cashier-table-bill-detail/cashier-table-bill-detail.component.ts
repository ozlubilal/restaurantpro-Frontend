import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Bill } from 'src/app/models/bill';
import { Category } from 'src/app/models/category';
import { Order } from 'src/app/models/order';
import { OrderDetails } from 'src/app/models/orderDetails';
import { Product } from 'src/app/models/product';
import { Table } from 'src/app/models/table';
import { AuthService } from 'src/app/services/auth.service';
import { BillService } from 'src/app/services/bill.service';
import { CategoryService } from 'src/app/services/category.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-cashier-table-bill-detail',
  templateUrl: './cashier-table-bill-detail.component.html',
  styleUrls: ['./cashier-table-bill-detail.component.css']
})
export class CashierTableBillDetailComponent implements OnInit {
  ngOnInit(): void {
    this.authService.isRoleAuthenticated("Cashier")
    this.activatedRoute.params.subscribe(params => {
      this.getTableById((params["id"]));
      this.getAllCategory();
      this.getAllProducts();

    })
  }
  totalCost: number;
  categories: Category[];
  products: Product[];
  table: Table;
  bill: Bill;
  productsOfCategory:Product[];
  orderDetails: OrderDetails[];
  orderDetailsLength:number;
  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private tableService: TableService,
    private billService: BillService,
    private orderService: OrderService,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router,) { }
  getAllCategory() {
    this.categoryService.getAll().subscribe(response => {
      this.categories = response.data;
    })
  }
  getAllProducts(){
    this.productService.getAll().subscribe(response => {
      this.products = response.data;
    })
  }
  getProductsByCategoryId(categoryId: number) {
    this.productService.GetByCategoryId(categoryId).subscribe(response => {
      this.productsOfCategory = response.data;
    })
  }
  getOrderDetailsByBillId(billId: number) {
    this.orderService.getOrderDetailsByBillId(billId).subscribe(response => {
      this.orderDetails = response.data;
      //this.calculateBill()
      this.calculateOfBill(billId);
    })
  }
  getBillByTableAndStatusId(tableId: number, statusId: number) {
    this.billService.getByTableIdAndStatusId(tableId, statusId).subscribe(response => {
      this.bill = response.data;
      if (this.bill) {
        this.getOrderDetailsByBillId(response.data.id);
      }
    })
  }
  getTableById(tableId: number) {
    this.tableService.getById(tableId).subscribe(response => {
      this.table = response.data;
      this.getBillByTableAndStatusId(tableId, 1);
    })
  }
  addOrder(product: Product) {
    let order: Order = {
      id: 0,
      billId: this.bill.id,
      price: product.price,
      productId: product.id,
      quantity: 1,
      userId: 1,
      orderStatusId: 3,
    }
    this.orderService.add(order).subscribe(response => {
      this.getOrderDetailsByBillId(this.bill.id);
    });
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
  }
  delete(id:number){
    this.orderService.getById(id).subscribe(response=>{
      this.orderService.delete(response.data).subscribe(response=>{
       this.toastrService.success(response.message)
       this.getOrderDetailsByBillId(this.bill.id);
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    })
   
  }
  changeOrderStatu(orderDetail: OrderDetails, statusId: number) {
    this.orderService.getById(orderDetail.id).subscribe(response => {
      let order = response.data;
      order.orderStatusId = statusId;
      this.orderService.update(order).subscribe(response => {
      });

      this.refreshList(this.orderDetails);
    })

  }
  refreshList(list: OrderDetails[]) {
    this.orderService.refreshOrderDetails(list).subscribe(response => {
      console.log(response.data)
      this.orderDetails = response.data
    })
  }
  calculateOfBill(billId:number){
    this.billService.calculateOfBill(billId).subscribe(response=>{
    this.totalCost=response.data;      
    })
  }
  payBill(){
    //tahsilat yapamadan önce bütün siparişlerin servis edidi durumunda olması şartını uygulyourz
    //Sipariş listesinde sipariş durumlarını(aynılarından 1 tane olacak şekilde) alıyoruz.
    var orderStatuslist=[...new Set(this.orderDetails.map(o=>o.orderStatusName))];
    // sipairiş durumu 1 adet ve servis edildi ise
    if(orderStatuslist.length==1&&orderStatuslist.includes("Servis Edildi"))
    {
     this.bill.billStatusId=2;
     this.billService.update(this.bill).subscribe(response=>{
      this.toastrService.success("Tahsilat başarılı")
     })
      setTimeout(()=>{                          
        this.router.navigate(['cashier/index'])
    }, 2000);   
    
    }
    else{
      this.toastrService.error("Tahsilat yapabilmek için tüm siparişlerin servis edildi durumunda olması gerekmektedir.")
    }
    
  }

}
