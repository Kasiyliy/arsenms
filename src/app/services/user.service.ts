import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../shared/models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    fullUrl = environment.apiUrl + '/api';

    constructor(private http: HttpClient) {
    }

    public getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.fullUrl);
    }

    public currentUser(): Observable<any> {
        return this.http.get<any>(this.fullUrl + '/details', {});
    }

    public getById(id: number): Observable<User> {
        return this.http.get<User>(this.fullUrl + `/${id}`);
    }

    public save(user: User){
        return this.http.post<User>(this.fullUrl + '/register', user);
    }

    public delete(user: User) {
        return this.http.delete(this.fullUrl + `/${user.id}`);
    }

    public update(user: User) {
        return this.http.put(this.fullUrl + `/${user.id}`, user);
    }
}
