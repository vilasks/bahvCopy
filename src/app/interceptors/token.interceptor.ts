import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http'
import { Observable, ObservableInput, catchError, finalize,tap, throwError } from 'rxjs'
import { Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { error } from 'jquery'

@Injectable()
class TokenInterceptor implements HttpInterceptor{

    constructor(private router:Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let cookieList = document.cookie.split(";")
        let cookie = ""
        for(let i=0; i<cookieList.length; i++){
            if(cookieList[i].includes("token")){
                cookie = cookieList[i]
                break 
            }
        }
        

        let request = req.clone({
            setHeaders:{
                "Authorization":`Bearer ${cookie.split("=")[1]}`
            }
        })
        return next.handle(request)
            .pipe(
                tap(
                    {
                        next: (event) => {
                            if(event instanceof HttpResponse){
                                console.log(event.headers.getAll("authorization"))
                                // console.log(event.headers.get("authorization"))
                                document.cookie = `token=${event.headers.get("authorization")?.split(" ")[1]}`
                            }
                            if(event instanceof HttpResponse){
                                if(event.status===401){
                                    console.log("its 401")
                                    this.router.navigateByUrl("/signin")
                                }
                            }
                        },
                    }
                )
            ).pipe(
                catchError((err)=>{
                    if(err.status === 401){
                        this.router.navigateByUrl("/signin")
                    }
                    return throwError(err)
                })
            )
    }
}

export default TokenInterceptor