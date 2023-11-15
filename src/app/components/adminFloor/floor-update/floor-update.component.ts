import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Floor } from 'src/app/models/floor';
import { AuthService } from 'src/app/services/auth.service';
import { FloorService } from 'src/app/services/floor.service';

@Component({
  selector: 'app-floor-update',
  templateUrl: './floor-update.component.html',
  styleUrls: ['./floor-update.component.css']
})
export class FloorUpdateComponent implements OnInit {
  ngOnInit(): void {
    this.authService.isRoleAuthenticated("Admin")
    this.activatedRoute.params.subscribe(params=>{
      this.id=(params["id"]);
      this.getFloorById();
      
      })
  }
  floorUpdateForm:FormGroup;
  floor:Floor;
  id:number;
  constructor(
    private floorService:FloorService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private toastrService:ToastrService,
    private authService:AuthService,
  ){}

  createFloorUpdateForm(){
    this.floorUpdateForm=this.formBuilder.group({
      id:[this.floor.id,Validators.required],
      floorName:[this.floor.floorName,Validators.required],
    })
  }
  getFloorById(){
    this.floorService.getById(this.id).subscribe(response=>{
         this.floor=response.data;
         this.createFloorUpdateForm();
    })
  }
  update(){
    if(this.floorUpdateForm.valid){
      let floorModel=Object.assign({},this.floorUpdateForm.value);
      console.log(floorModel)
      this.floorService.update(floorModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")},
        responseError=>{
          this.toastrService.error(responseError.error,"Başarısız");
        });   
        setTimeout(()=>{                          
          this.router.navigate(['admin/floorList'])
      }, 2000);   
    }
    else{
      this.toastrService.error('Formu eksiksiz giriniz','Başarısız');
    
  }
}

}
