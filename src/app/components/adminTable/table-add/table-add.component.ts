import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Floor } from 'src/app/models/floor';
import { SeaterOfTable } from 'src/app/models/seaterOfTable';
import { Table } from 'src/app/models/table';
import { AuthService } from 'src/app/services/auth.service';
import { FloorService } from 'src/app/services/floor.service';
import { SeaterOfTableService } from 'src/app/services/seater-of-table.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-table-add',
  templateUrl: './table-add.component.html',
  styleUrls: ['./table-add.component.css']
})
export class TableAddComponent implements OnInit{
  tableAddForm:FormGroup;
  seaterOfTables:SeaterOfTable[];
  floors:Floor[];
  ngOnInit(): void {
    this.authService.isRoleAuthenticated("Admin")
    this.createTableAddForm();    

  }
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,    
    private tableService:TableService,
    private floorService:FloorService,
    private seaterOfTableService:SeaterOfTableService,
    private toastrService:ToastrService,
    private authService:AuthService
    
  ){}

  createTableAddForm(){
    this.tableAddForm=this.formBuilder.group({
      tableName:['',Validators.required],
      floorName:['',Validators.required],
      seaterOfTableName:['',Validators.required],
    });
    this.getAllFloor();
    this.getAllSeaterOfTables();
  }
  getAllFloor(){
    this.floorService.getAll().subscribe(response=>{
      this.floors=response.data;
    })
  }
  getAllSeaterOfTables(){
    this.seaterOfTableService.getAll().subscribe(response=>{
      this.seaterOfTables=response.data;
    })
  }
  add(){
    if(this.tableAddForm.valid)
    {
      console.log("ok");
      let tableModel:Table=Object.assign({},this.tableAddForm.value);
      tableModel.floorId=Number(this.floors.find(f=>f.floorName==this.tableAddForm.get('floorName')?.value)?.id);
      tableModel.SeaterOfTableId=Number(this.seaterOfTables.find(s=>s.seaterOfTableName==this.tableAddForm.get('seaterOfTableName')?.value)?.id);
      this.tableService.add(tableModel).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı");
       setTimeout(()=>{                          
        this.router.navigate(['admin/tableList'])
    }, 2000);  
      },responseError=>{
        this.toastrService.error(responseError.error,"Başarısız");
      })
    }
    else{
      this.toastrService.error("Formu eksiksiz doldurunuz");
    }
     
  }
}
