import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Floor } from 'src/app/models/floor';
import { SeaterOfTable } from 'src/app/models/seaterOfTable';
import { Table } from 'src/app/models/table';
import { AuthService } from 'src/app/services/auth.service';
import { FloorService } from 'src/app/services/floor.service';
import { SeaterOfTableService } from 'src/app/services/seater-of-table.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-table-update',
  templateUrl: './table-update.component.html',
  styleUrls: ['./table-update.component.css']
})
export class TableUpdateComponent implements OnInit{
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.id=(params["id"]);
      this.getTableById();
      })
  }
  tableUpdateForm:FormGroup;
  table:Table;
  id:number;
  floors:Floor[];
  seaterOfTables:SeaterOfTable[];
  constructor(
  private floorService:FloorService,
  private seaterOfTableService:SeaterOfTableService,
  private tableService:TableService,
  private formBuilder:FormBuilder,
  private activatedRoute:ActivatedRoute,
  private router:Router,
  private toastrService:ToastrService,
  private authService:AuthService,
  ){}
  createTableUpdateForm(){
    this.authService.isRoleAuthenticated("Admin")
    this.tableUpdateForm=this.formBuilder.group({
      id:[this.table.id,Validators.required],
      tableName:[this.table.tableName,Validators.required],
      floorName:["",Validators.required],
      seaterOfTableName:["",Validators.required],     
    })
    
    
  }
  getTableById(){
    this.tableService.getById(this.id).subscribe(response=>{
         this.table=response.data;     
         this.createTableUpdateForm();
         
    this.getAllFloor();
    this.getAllSeaterOfTable();
    })
  }
  getAllFloor(){
    this.floorService.getAll().subscribe(response=>{
      this.floors=response.data
    })
  }
  getAllSeaterOfTable(){
    this.seaterOfTableService.getAll().subscribe(response=>{
      this.seaterOfTables=response.data
    })
  }
 
  update(){
    if(this.tableUpdateForm.valid){
      let tableModel:Table=Object.assign({},this.tableUpdateForm.value);
      tableModel.floorId=Number(this.floors.find(t=>t.floorName==this.tableUpdateForm.get('floorName')?.value)?.id);
      tableModel.SeaterOfTableId=Number(this.seaterOfTables.find(t=>t.seaterOfTableName==this.tableUpdateForm.get('seaterOfTableName')?.value)?.id);
      tableModel.tableStatusId=this.table.tableStatusId;
      this.tableService.update(tableModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")},
        responseError=>{
          this.toastrService.error(responseError.error,"Başarısız");
        });
        setTimeout(()=>{                          
          this.router.navigate(['admin/tableList'])
      }, 2000);   
    }
    else{
      this.toastrService.error('Formu eksiksiz giriniz','Başarısız');
    
  }
}
}
