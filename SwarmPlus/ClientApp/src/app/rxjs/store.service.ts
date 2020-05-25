import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '../model/UserInfo.type';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    _userInfo$ = new BehaviorSubject<UserInfo>(null);
    constructor() { }
}
