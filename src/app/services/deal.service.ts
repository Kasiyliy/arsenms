import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../shared/models/user';
import {Deal} from '../shared/models/deal';
import {DealTypes} from '../shared/models/deal-types';

@Injectable({
    providedIn: 'root'
})
export class DealService {

    fullUrl = environment.apiUrl + '/api';

    constructor(private http: HttpClient) {
    }

    public purchase(deal: Deal) {
        deal.type = DealTypes.PURCHASE;
        return this.http.post<any>(this.fullUrl + '/deal', deal);
    }

    public sendCash(deal: Deal) {
        deal.type = DealTypes.SEND_CASH;
        return this.http.post<any>(this.fullUrl + '/deal', deal);
    }

    public getMyTransactions(id: number) {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('id', id + '');
        return this.http.get<any>(this.fullUrl + '/deals/user', {params: httpParams});
    }
}
