import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FloorService } from 'src/app/services/floor.service';

@Component({
  selector: 'app-floor-add',
  templateUrl: './floor-add.component.html',
  styleUrls: ['./floor-add.component.css']
})
export class FloorAddComponent implements OnInit{
  floorAddForm:FormGroup;
  ngOnInit(): void {
    this.createFloorAddForm();

  }
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,    
    private floorService:FloorService,
    private toastrService:ToastrService,
    private authService:AuthService,
  ){}

  createFloorAddForm(){
    this.authService.isRoleAuthenticated("Admin")
    this.floorAddForm=this.formBuilder.group({
      floorName:['',Validators.required],
    });
  }
  add(){
    if(this.floorAddForm.valid)
    {
      console.log("ok");
      let floorModel=Object.assign({},this.floorAddForm.value);
      this.floorService.add(floorModel).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı");
       setTimeout(()=>{                          
        this.router.navigate(['admin/floorList'])
    }, 2000);  
      },responseError=>{
        this.toastrService.error(responseError.error,responseError.error);
      })
    }
    else{
      this.toastrService.error('Formu eksiksiz giriniz','Başarısız');
    }
     
  }
}
