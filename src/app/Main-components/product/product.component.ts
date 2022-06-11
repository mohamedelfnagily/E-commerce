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
  productId:string = '';
  product:any = {};
  ngOnInit(): void {
    this.productId = this._ActivatedRoute.snapshot.params['id'];
    this._ProdService.getProductDetails(this.productId).subscribe(
      (response)=>{this.product = response}
    );
  }


}
