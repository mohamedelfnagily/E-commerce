import { Component, OnInit , OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdService } from 'src/app/Services/prod.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private _ActivatedRoute:ActivatedRoute , private _ProdService:ProdService) { }
  //this variable carries the id of the selected product
  productId:string = '';
  //this object carries the product object 
  product:any = {};
  ngOnInit(): void {
    //accessing the url in order to get the id sent from the home page when clicking on the product
    this.productId = this._ActivatedRoute.snapshot.params['id'];

    //http request in order to get the product details by sending the product id to the method
    this._ProdService.getProductDetails(this.productId).subscribe(
      (response)=>{this.product = response}
    );
  }


}
