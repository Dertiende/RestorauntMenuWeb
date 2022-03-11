import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Dish} from "./dish";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {
  }

  public getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${this.apiServerUrl}/restaurant/dishes`);
  }

  public getDishById(dishId: number): Observable<Dish> {
    return this.http.get<Dish>(`${this.apiServerUrl}/restaurant/dishes/${dishId}`)
  }

  public getDishByMenuId(menuId: number): Observable<Dish> {
    return this.http.get<Dish>(`${this.apiServerUrl}/restaurant/dishes/searchByMenu/${menuId}`)
  }

  public addDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(`${this.apiServerUrl}/restaurant/dishes/add`, dish);
  }

  public updateDish(dish: Dish): Observable<Dish> {
    return this.http.put<Dish>(`${this.apiServerUrl}/restaurant/dishes/update`, dish);
  }

  public deleteDish(dishId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/restaurant/dishes/delete/${dishId}`);
  }

}
