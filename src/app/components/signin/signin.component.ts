import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { RouterStateSnapshot,Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { ToastrService} from 'ngx-toastr'
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder, 
    private userServices:UserServiceService,
    private router:Router,
    private toastr:ToastrService
    ) { }

  signIn = this.formBuilder.group({
    id: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  inProgess = false;

  ngOnInit(): void {
  }

  submit(){
    if(this.signIn.valid){
      this.inProgess = true
      this.userServices.signIn(this.signIn.value).subscribe(
        (data:any)=>{
          if(data.status == 1){
            document.cookie = `token=${data.msg}`
            this.router.navigateByUrl("")
          }else{
            this.toastr.error(data.msg||"Incorrect Credintials","Error")
          }
          this.inProgess = false;
        },
        (err)=>{
          this.inProgess = false;
          this.toastr.error(err.error.msg||"Incorrect Credintials","Error")
        }
      )
    }else{
      this.signIn.markAllAsTouched()
    }
  }

  get f(){
    return this.signIn.controls
  }

}
