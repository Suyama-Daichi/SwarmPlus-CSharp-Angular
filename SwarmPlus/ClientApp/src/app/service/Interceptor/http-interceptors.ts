import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private _snackBar: MatSnackBar, private httpClient: HttpClient) { }

    // SnackBarの処理
    openSnackBar(message: string) {
        this._snackBar.open(message);
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const newReq = req.clone(
            {
                headers:
                    req.headers
                        .set('Authorization', `bearer ` + localStorage.getItem('token'))
                        .set('Accept-Language', 'ja')
            }
        );
        // cloneされてヘッダーを付与したリクエストを次の処理に引き渡す
        return next.handle(newReq).pipe(
            // tapオペレータでレスポンスの流れを傍受する
            tap(resp => {
                // リクエスト成功時のログ出力など
            },
                () => {
                    // エラー時の共通処理やログ出力
                    this.openSnackBar('[Error]The Request failed');
                }
            ),
        );
    }
}
