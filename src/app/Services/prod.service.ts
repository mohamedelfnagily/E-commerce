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
    if(localStorage.getItem('products') != null)
    {
      this.setProducts();
    }
  }

  getProducts():Observable<any>
  {
    return this._HttpClient.get('https://captello.firebaseio.com/products.json');   
  }
  setProducts()
  {
    let prodsString = JSON.stringify(localStorage.getItem('products'))
    let prods =  JSON.parse(prodsString);
    this.products.next(prods);
  }
  
  getProductDetails(id:string):Observable<any>{
    return this._HttpClient.get(`https://captello.firebaseio.com/products/${id}.json`);
  }
 
}
