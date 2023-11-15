import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { LoginComponent } from './components/login/login.component';
import { WaiterComponent } from './components/waiter/waiter.component';
import { WaiterTableOrderDetailComponent } from './components/waiter-table-order-detail/waiter-table-order-detail.component';
import { ChefComponent } from './components/chef/chef.component';
import { CashierComponent } from './components/cashier/cashier.component';
import { CashierTableBillDetailComponent } from './components/cashier-table-bill-detail/cashier-table-bill-detail.component';
import { TryComponent } from './components/try/try.component';
import { AdminComponent } from './components/admin/admin.component';
import { CategoryListComponent } from './components/adminCategory/category-list/category-list.component';
import { ProductListComponent } from './components/adminProduct/product-list/product-list.component';
import { OrderListComponent } from './components/adminOrder/order-list/order-list.component';
import { CategoryAddComponent } from './components/adminCategory/category-add/category-add.component';
import { CategoryUpdateComponent } from './components/adminCategory/category-update/category-update.component';
import { ProductAddComponent } from './components/adminProduct/product-add/product-add.component';
import { ProductUpdateComponent } from './components/adminProduct/product-update/product-update.component';
import { TableListComponent } from './components/adminTable/table-list/table-list.component';
import { TableAddComponent } from './components/adminTable/table-add/table-add.component';
import { TableUpdateComponent } from './components/adminTable/table-update/table-update.component';
import { FloorListComponent } from './components/adminFloor/floor-list/floor-list.component';
import { FloorAddComponent } from './components/adminFloor/floor-add/floor-add.component';
import { FloorUpdateComponent } from './components/adminFloor/floor-update/floor-update.component';
import { BillListComponent } from './components/adminBill/bill-list/bill-list.component';
import { UserListComponent } from './components/adminAuth/user-list/user-list.component';
import { UserAddComponent } from './components/adminAuth/user-add/user-add.component';
import { loginGuard } from './guards/login.guard';
import { UserUpdateComponent } from './components/adminAuth/user-update/user-update.component';

const routes: Routes = [
  
  {path:"",pathMatch:"full", component:LoginComponent},
  {path:"waiter/index", component:WaiterComponent,canActivate:[loginGuard]},  
  {path:"waiter/tableOrderDetail/:id", component:WaiterTableOrderDetailComponent},
  {path:"chef/index", component:ChefComponent},  
  {path:"cashier/index", component:CashierComponent},
  {path:"cashier/tableBillDetail/:id", component:CashierTableBillDetailComponent},
  {path:"try",component:TryComponent},
  {path:"admin/index",component:AdminComponent,canActivate:[loginGuard]},
  {path:"admin/categoryList",component:CategoryListComponent},  
  {path:"admin/productList",component:ProductListComponent},
  {path:"admin/productAdd",component:ProductAddComponent},
  {path:"admin/orderList",component:OrderListComponent},  
  {path:"admin/categoryAdd",component:CategoryAddComponent},
  {path:"admin/categoryUpdate/:id",component:CategoryUpdateComponent},
  {path:"admin/productUpdate/:id",component:ProductUpdateComponent},  
  {path:"admin/tableList",component:TableListComponent},  
  {path:"admin/tableAdd",component:TableAddComponent}, 
  {path:"admin/tableUpdate/:id",component:TableUpdateComponent},   
  {path:"admin/floorList",component:FloorListComponent},  
  {path:"admin/floorAdd",component:FloorAddComponent}, 
  {path:"admin/floorUpdate/:id",component:FloorUpdateComponent}, 
  {path:"admin/billList",component:BillListComponent},   
  {path:"admin/userList",component:UserListComponent}, 
  {path:"admin/userAdd",component:UserAddComponent},   
  {path:"admin/userUpdate/:id",component:UserUpdateComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
