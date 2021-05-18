import { Injectable } from '@angular/core';
import { Facemask } from "./ProductDetail";
import MockAPI from "./facemasks.json";

@Injectable({
  providedIn: "root",
})
export class GetProductDetailService {
  constructor() {}

  getAllFacemask(): Facemask[] {
    return MockAPI.facemasks;
  }

  getFacemaskDetail(id: number): Facemask {
    return MockAPI.facemasks[id];
  }
}
