import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { ORIGIN_URL } from '@nguniversal/aspnetcore-engine/tokens';
import { IUser } from '../models/User';

@Injectable()
export class UserService {
  private baseUrl: string;

  constructor(private http: HttpClient, private injector: Injector) {
    this.baseUrl = this.injector.get(ORIGIN_URL);
  }

  getUsers() {
    return this.http.get<IUser[]>(`${this.baseUrl}/api/users`);
  }

  getUser(user: IUser) {
    return this.http.get<IUser>(`${this.baseUrl}/api/users/` + user.id);
  }

  deleteUser(user: IUser) {
    return this.http.delete<IUser>(`${this.baseUrl}/api/users/` + user.id);
  }

  updateUser(user: IUser) {
    return this.http.put<IUser>(`${this.baseUrl}/api/users/` + user.id, user);
  }

  addUser(newUserName: string) {
    return this.http.post<IUser>(`${this.baseUrl}/api/users`, {
      name: newUserName
    });
  }
}
