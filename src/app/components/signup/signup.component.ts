import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators,ValidatorFn,AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { ToastrService } from 'ngx-toastr'
import { Observable, catchError, debounce, debounceTime, interval, map, of } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private userService:UserServiceService,private toast:ToastrService) { }

  inProgess = false;
  otpProgress = false;
  showOtpForm = false;
  showSuccess = false;
  password:string = '';
  forDebounce:Observable<ValidationErrors|null> = new Observable();
  signup = this.formBuilder.group({
    userName: new FormControl('', 
      {
        validators: [Validators.required, Validators.pattern(/[a-zA-Z0-9_]$/)],
        asyncValidators: [validateUserName(this.userService)],
        updateOn: "change"
      },
    ),
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirm_password: new FormControl('', [Validators.required,this.validateConfirmPassword(this.password)])
  })

  verifyOtp = this.formBuilder.group({
    otp: new FormControl('', [Validators.required]),
    newsletter: new FormControl(true)
  })

  ngOnInit(): void {
    this.signup.controls.password.valueChanges.subscribe(
      (data:string|null)=>{
        if(data!=null){
          console.log(data)
          console.log(this.password)
          this.password = data;
        }
      }
    )
  }

  submit(){
    if(this.signup.valid){
      this.inProgess = true
      this.userService.signUp(this.signup.value).subscribe(
        (data:any)=>{
          if(data.status == 1){
            this.toast.success("Account Created Successfully", "Success")
          }else{
            this.toast.error(data.msg,"Error")
          }
          this.inProgess = false;
        },
        (err)=>{
          console.log(err)
          this.inProgess = false;
        }
      )
    }
  }

  get f(){
    return this.signup.controls
  }

  getOtp(){
    if(this.signup.valid){
      this.inProgess = true
      this.userService.getOtp(this.signup.value).subscribe(
        (data:any)=>{
          if(data.status == 1){
            this.showOtpForm = true
            this.toast.success(data.msg,"Success")
          }else{
            this.toast.error(data.msg, "Error")
          }
          this.inProgess = false;
        },
        (err)=>{
          console.log(err)
          this.inProgess = false;
          this.toast.error(err.error.msg,"Error")
        }
      )
    }else{
      this.signup.markAllAsTouched()
    }
  }

  VerifyOtp(){
    if(this.verifyOtp.valid){
      this.otpProgress = true
      let data = {...this.signup.value,...this.verifyOtp.value}
      this.userService.verifyOtp(data).subscribe(
        (data:any)=>{
          if(data.status === 1){
            this.showOtpForm = false;
            this.showSuccess = true;
            this.toast.success(data.msg,"Success")
          }else{
            this.toast.error(data.msg,"Error")
          }
          this.otpProgress = false;
        },
        (err)=>{
          console.log(err)
          this.toast.error(err.error.msg,"Error")
          this.otpProgress = false
        }
      )
    }else{
      this.verifyOtp.markAllAsTouched()
    }
  }

  validateConfirmPassword(password:string):ValidatorFn{
    return (control:AbstractControl):ValidationErrors|null => {
      if(control.value === this.password){
        return null
      }
      return {same: true}
    }
  }

}

function validateUserName(userService:UserServiceService,): AsyncValidatorFn{
  return (control:AbstractControl):Observable<ValidationErrors|null> => {
    if(control.value){
      return userService.userNameAvailablity(control.value).pipe(
        map((data:any)=>{
          if(data.status === 1 && data.available){
            return null
          }
          return  {available: true}
        }),
        catchError((err:any)=>{
          return of({available: true})
        })
      )
    }
    return of({available:true})
  }
}
