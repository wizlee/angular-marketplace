import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from "rxjs/operators";

@Component({
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.hero$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => this.service.getProduct(params.get("id")))
    // );
  }
}
