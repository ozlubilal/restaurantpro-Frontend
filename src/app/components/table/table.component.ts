import { Component, Input, OnInit } from '@angular/core';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']  
})


export class TableComponent implements OnInit {
 

  constructor(
    private tableService:TableService,
  ){}
  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.tableService.getAll().subscribe(response=>{
      response.data.forEach(element => {
        console.log(element.tableName);
      });
    })
  }
}