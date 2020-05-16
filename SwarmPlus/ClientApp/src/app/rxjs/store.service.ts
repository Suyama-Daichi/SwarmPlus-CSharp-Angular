import { BehaviorSubject } from 'rxjs';
import { Photo } from '../model/UserInfo.type';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    _userIcon$ = new BehaviorSubject<Photo>(null);
    constructor() { }
}
