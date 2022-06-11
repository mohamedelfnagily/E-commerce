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
  stringContainer:any= [];
  products:any[] = [];
  productsNumber:number = 0;
  simpleProducts:any[]=[];
  simpleProductsNumber:number = 0;
  complexProducts:any[] = [];
  complexProductsNumber:number = 0;
  constructor(private _HttpClient:HttpClient , private _ProdService:ProdService) { }
  ngOnInit(): void {
    this._ProdService.products.subscribe(
      ()=>{
        this.stringContainer = this._ProdService.products.getValue();
        this.products = JSON.parse(this.stringContainer);
        this.productsNumber = this.products.length;
        this.productClassification(this.products);

      }
    );
  }

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

  filterSimpleProducts()
  {
    this.products = this.simpleProducts;
  }
  filterComplexProducts()
  {
    this.products = this.complexProducts;
  }
  filterAllProducts()
  {
    this.products = JSON.parse(this.stringContainer);
  }

}
