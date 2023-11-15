import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'src/app/models/table';
import { TableDetails } from 'src/app/models/tableDetails';
import { AuthService } from 'src/app/services/auth.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit{
  ngOnInit(): void {
    this.getAllTableDetails();
  }
  tableDetails:TableDetails[];
  constructor(
    private tableService:TableService,
    private toastrService:ToastrService,
    private authService:AuthService,
    ){}
getAllTableDetails(){
    this.authService.isRoleAuthenticated("Admin")
  this.tableService.GetListTableDetailDto().subscribe(response=>{
   this.tableDetails=response.data;
  })
}
delete(id:number){
  let table:Table;
  this.tableService.getById(id).subscribe(response=>{
   table=response.data
   this.tableService.delete(table).subscribe(response=>{
    this.toastrService.warning(response.message,"başarılı");
    this.getAllTableDetails();
  })
  });
 
  
}
}
