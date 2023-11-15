import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WaiterComponent } from './components/waiter/waiter.component';
import { WaiterTableOrderDetailComponent } from './components/waiter-table-order-detail/waiter-table-order-detail.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { ChefComponent } from './components/chef/chef.component';
import { TableStatusPipe } from './pipes/table-status.pipe';
import { CategoryDuplicatePipe } from './pipes/category-duplicate.pipe';
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
import { BillListComponent } from './components/adminBill/bill-list/bill-list.component';
import { TableListComponent } from './components/adminTable/table-list/table-list.component';
import { TableAddComponent } from './components/adminTable/table-add/table-add.component';
import { TableUpdateComponent } from './components/adminTable/table-update/table-update.component';
import { FloorListComponent } from './components/adminFloor/floor-list/floor-list.component';
import { FloorAddComponent } from './components/adminFloor/floor-add/floor-add.component';
import { FloorUpdateComponent } from './components/adminFloor/floor-update/floor-update.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './components/adminAuth/user-list/user-list.component';
import { UserAddComponent } from './components/adminAuth/user-add/user-add.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserUpdateComponent } from './components/adminAuth/user-update/user-update.component';
@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    LoginComponent,
    NavbarComponent,
    WaiterComponent,
    WaiterTableOrderDetailComponent,
    FilterPipePipe,
    ChefComponent,
    TableStatusPipe,
    CategoryDuplicatePipe,
    CashierComponent,
    CashierTableBillDetailComponent,
    TryComponent,
    AdminComponent,
    CategoryListComponent,
    ProductListComponent,
    OrderListComponent,
    CategoryAddComponent,
    CategoryUpdateComponent,
    ProductAddComponent,
    ProductUpdateComponent,
    BillListComponent,
    TableListComponent,
    TableAddComponent,
    TableUpdateComponent,
    FloorListComponent,
    FloorAddComponent,
    FloorUpdateComponent,
    UserListComponent,
    UserAddComponent,
    UserUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    HttpClientModule,    
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
   
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
