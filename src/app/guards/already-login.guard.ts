import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'

@Injectable()
class AlreadyAuth implements CanActivate{

    constructor(private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let cookie = document.cookie.split(";")
        for(let i=0; i<cookie.length; i++){
            if(cookie[i].includes("token")){
                let value = cookie[i].split("=")
                if(value[1].trim().length > 1){
                    this.router.navigateByUrl("/")
                    return false
                }
            }
        }
        return true 
    }
}

export default AlreadyAuth