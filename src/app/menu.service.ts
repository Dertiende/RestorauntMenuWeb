import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Menu} from "./menu";


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {
  }

  public getMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiServerUrl}/restaurant/menu`);
  }

  public getMenuById(menuId: number): Observable<Menu> {
    return this.http.get<Menu>(`${this.apiServerUrl}/restaurant/menu/${menuId}`)
  }

  public addMenu(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(`${this.apiServerUrl}/restaurant/menu/add`, menu);
  }

  public updateMenu(menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${this.apiServerUrl}/restaurant/menu/update`, menu);
  }

  public deleteMenu(menuId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/restaurant/menu/delete/${menuId}`);
  }
}
