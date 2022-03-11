import {Component, OnInit} from '@angular/core';
import {Dish} from "./dish";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {DishService} from "./dish.service";
import {MenuService} from "./menu.service";
import {Menu} from "./menu";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'fst';
  public dishId: number | undefined;
  public dishes: Dish[] | undefined;
  public dishName: string;
  public dishPortion: string;
  public dishCuisine:string;
  public dishAbout: string;
  public dishValue: number | undefined;
  public dishMenuId: number | undefined;
  public menus: Menu[] | undefined;
  public menuName: string;
  public menuTime: string;
  public menuId: number | undefined;


  constructor(private dishService: DishService, private menuService: MenuService) {
    this.dishName = '';
    this.dishPortion = '';
    this.dishCuisine = '';
    this.dishAbout = '';
    this.menuName = '';
    this.menuTime = '';
  }

  ngOnInit() {
    this.getDishes();
    this.getMenus();

  }

  public isMenuValid(): boolean{
    return (this.menuName !== '' &&
           this.menuTime !== '')
  }

  public isDishValid(): boolean{
    return (this.dishName !== '' &&
      this.dishPortion !== '' &&
      this.dishCuisine !== '' &&
      this.dishAbout !== '' &&
      (this.dishValue !== undefined && this.dishValue > 0) &&
      (this.dishMenuId !== undefined && this.dishMenuId >= 0));

  }

  public clearMenu(): void {
    this.menuName = '';
    this.menuTime = '';
    this.menuId = undefined;
  }

  public clearDish(): void{
    this.dishName = '';
    this.dishPortion = '';
    this.dishCuisine = '';
    this.dishAbout = '';
    this.dishValue = undefined;
    this.dishMenuId = undefined;
    this.dishId = undefined;
  }

  public addMenu():void{
    this.menuService.addMenu(<Menu>{
      name: this.menuName,
      time: this.menuTime
    }).subscribe(()=>{
      this.getMenus();
      this.getCounts();
      this.clearMenu();
    },(error: HttpErrorResponse)=>{
      alert("Failed adding menu")
      console.log(error.message)
    })
  }

  public getMenuById():void{
    if (this.menuId !== undefined){
      this.menuService.getMenuById(this.menuId).subscribe((response:Menu)=>{
        this.menuName = response.name;
        this.menuTime = response.time;
      },(error:HttpErrorResponse) => {
        alert("Failed getting menu");
        console.log(error.message);
      })
    }
    else{
      alert("Select Id");
      console.log("Getting with menuId undefined");
    }
  }

  public updateMenu(): void{
    if (this.menuId !== undefined){
      this.menuService.updateMenu(<Menu>{
        id: this.menuId,
        name: this.menuName,
        time: this.menuTime
      }).subscribe(()=>{
        this.getMenus();
        this.clearMenu();
      }, (error: HttpErrorResponse) => {
        alert("Failed update menu");
        console.log(error.message);
      })
    }
    else{
      alert("Select Id");
      console.log("Updating with menuId undefined");
    }
  }

  public deleteMenu(): void{
    if (this.menuId !== undefined){
      let dishId:number[] = [];
      let dishes: Observable<Dish> = this.dishService.getDishByMenuId(this.menuId);
      dishes?.forEach((dish:Dish)=>{
        dishId.push(dish.menu)
      })
      dishId.forEach((id:number)=>{
        this.dishService.deleteDish(id).subscribe(()=>{},(error: HttpErrorResponse) => {
          console.log(error.message);
        })
      })

      this.menuService.deleteMenu(this.menuId).subscribe(()=>{
        this.getDishes();
        this.getMenus();
        this.clearMenu();
      } ,(error:HttpErrorResponse)=>{
        alert("Failed to remove menu");
        console.log(error.message);
      })
    }
    else{
      alert("Select Id");
      console.log("Deleting with menuId undefined");
    }
  }

  public deleteDish(): void{
    if (this.dishId !== undefined){
      this.dishService.deleteDish(this.dishId).subscribe(()=>{
        this.getDishes();
      } ,(error:HttpErrorResponse)=>{
        alert("Failed to remove dish");
        console.log(error.message);
      })
    }
    else{
      alert("Select Id");
      console.log("Deleting with dishId undefined");
    }
  }

  public getDishById(): void{
    if (this.dishId !== undefined){
      this.dishService.getDishById(this.dishId).subscribe((response : Dish)=>{
        this.dishName = response.name;
        this.dishPortion = response.portion;
        this.dishCuisine = response.cuisine;
        this.dishAbout = response.about;
        this.dishValue = response.value;
        this.dishMenuId = response.menu;
      }, (error:HttpErrorResponse) => {
        alert("Failed getting dish");
        console.log(error.message);
      })
    }
    else{
      alert("Select Id");
      console.log("Getting with dishId undefined");
    }
  }

  public addDish(): void{
    this.dishService.addDish(<Dish>{
      name: this.dishName,
      portion: this.dishPortion,
      cuisine: this.dishCuisine,
      about: this.dishAbout,
      value: this.dishValue,
      menu: this.dishMenuId
    }).subscribe(()=>{
        this.getDishes();
      },
      (error: HttpErrorResponse)=>{
      alert("Failed adding dish")
        console.log(error.message)
    })
    this.clearDish();
  }

  public updateDish(): void{
    if (this.dishId !== undefined){
      this.dishService.updateDish(<Dish>{
        id: this.dishId,
        name: this.dishName,
        portion: this.dishPortion,
        cuisine: this.dishCuisine,
        about: this.dishAbout,
        value: this.dishValue,
        menu: this.dishMenuId
      }).subscribe(()=>{
          this.getDishes();
          this.clearDish();
        },
        (error: HttpErrorResponse)=>{
          alert("Failed update dish");
          console.log(error.message);
        })
    }
    else{
      alert("Select Id");
      console.log("Updating with dishId undefined");
    }
  }

  public getDishes(): void {
    this.dishService.getDishes().subscribe((response:Dish[])=>{
      this.dishes = response;
    }, (error: HttpErrorResponse)=>{
      alert(error.message);
    })
  }
  public getMenus(): void {
    this.menuService.getMenus().subscribe((response:Menu[])=>{
      this.menus = response;
      this.getCounts()
    }, (error: HttpErrorResponse)=>{
      alert("Failed getting menus")
      console.log(error.message);
    })
  }


  public getCounts(): void {
    this.menus?.forEach((menu: Menu)=>{
      menu.count = 0;
      this.dishes?.forEach((dish: Dish)=>{
        if (dish.menu === menu.id){
          // @ts-ignore
          menu.count +=1;
        }
      })
    })
  }
}
