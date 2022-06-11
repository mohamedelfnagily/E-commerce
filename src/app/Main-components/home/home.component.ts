import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProdService } from './../../Services/prod.service';
import { ImagePipe } from 'src/app/Pipes/image.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //this variable will carry the stringified list of objects retrieved from the behaviour subject
  stringContainer:any= [];
  //this array will carry the products
  products:any[] = [];
  //this variable carries the number of products
  productsNumber:number = 0;
  //this array will carry the simple products
  simpleProducts:any[]=[];
  //this variable carries the number of simple products
  simpleProductsNumber:number = 0;
  //this array will carry the complex products
  complexProducts:any[] = [];
  //this variable carries the number of complex products
  complexProductsNumber:number = 0;
  constructor(private _HttpClient:HttpClient , private _ProdService:ProdService) { }
  ngOnInit(): void {
    //here subscribing on the behaviour subject and retrieving the data which was passed to it while logging in
    //so by this we retrieved the cached data without more than one request
    this._ProdService.products.subscribe(
      ()=>{
        //getting the stringified list of objects
        this.stringContainer = this._ProdService.products.getValue();
        this.products = JSON.parse(this.stringContainer);
        this.productsNumber = this.products.length;
        this.productClassification(this.products);

      }
    );
  }

  //this method is responsible for the classification of the products each category into its list
  //and assigning the length of each list to the vaiable carrying the number which will ppear in the side bar
  productClassification(prods:any[])
  {
    prods.forEach((a)=>{
      if(a.category == 'simple')
      {
        this.simpleProducts.push(a);
      }
      else
      {
        this.complexProducts.push(a);
      }
      
    })
    this.complexProductsNumber = this.complexProducts.length;
    this.simpleProductsNumber = this.simpleProducts.length;
  }
 //this method is responsible for viewing the simple products only when the user choose it
  filterSimpleProducts()
  {
    this.products = this.simpleProducts;
  }
   //this method is responsible for viewing the complex products only when the user choose it
  filterComplexProducts()
  {
    this.products = this.complexProducts;
  }
   //this method is responsible for viewing All the products only when the user choose it
  filterAllProducts()
  {
    this.products = JSON.parse(this.stringContainer);
  }


  //this method is responsible for fetching the data then cache it and update the UI.
  syncAllProducts()
  {
    localStorage.removeItem('products');
    this._ProdService.getProducts().subscribe(
      (response)=>{
        localStorage.setItem('products' , JSON.stringify(response));
        this._ProdService.setProducts();
      }
    );
  }


}
