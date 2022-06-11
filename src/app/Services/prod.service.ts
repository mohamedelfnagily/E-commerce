import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ProdService {
  products = new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient) { 
    //this condition prevent the new request when refreshing the page as it pass the data from the local storage to the behaviour subject

    if(localStorage.getItem('products') != null)
    {
      this.setProducts();
    }
  }

  //this method is responsible for getting the product list
  getProducts():Observable<any>
  {
    return this._HttpClient.get('https://captello.firebaseio.com/products.json');   
  }

  //this method is responsible for getting the product list storred in the local storage and parse it
  //then it pass its value to the behaviour subject
  setProducts()
  {
    let prodsString = JSON.stringify(localStorage.getItem('products'))
    let prods =  JSON.parse(prodsString);
    this.products.next(prods);
  }
  
  //this method is responsible for getting the selected product details by passing to it the product id
  getProductDetails(id:string):Observable<any>{
    return this._HttpClient.get(`https://captello.firebaseio.com/products/${id}.json`);
  }
 
}
