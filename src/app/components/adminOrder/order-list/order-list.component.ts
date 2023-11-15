import { Component, OnInit } from '@angular/core';
import { OrderDetails } from 'src/app/models/orderDetails';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  ngOnInit(): void {
    this.authService.isRoleAuthenticated("Admin")
    this.getAllOrderDetails();
  }
  orderDetails:OrderDetails[];
constructor(
  private orderService:OrderService,
  private authService:AuthService,
){}
getAllOrderDetails(){
  this.orderService.getOrderDetails().subscribe(response=>{
    this.orderDetails=response.data;
  })
}
}
