import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Floor } from 'src/app/models/floor';
import { AuthService } from 'src/app/services/auth.service';
import { FloorService } from 'src/app/services/floor.service';

@Component({
  selector: 'app-floor-list',
  templateUrl: './floor-list.component.html',
  styleUrls: ['./floor-list.component.css']
})
export class FloorListComponent implements OnInit {
  ngOnInit(): void {
    this.authService.isRoleAuthenticated("Admin")
    this.getAllFloor();
  }
  
 floors:Floor[];
  constructor(
    private floorService:FloorService,
    private toastrService:ToastrService,
    private authService:AuthService,
  ){}

getAllFloor(){
  this.floorService.getAll().subscribe(response=>{
    this.floors=response.data;
  })
}
delete(floor:Floor){
  this.floorService.delete(floor).subscribe(response=>{
    this.toastrService.success("silme başarılı")
    this.getAllFloor();
  },responseError=>{
    this.toastrService.error(responseError.error,"Başarısız");
  })
}
}