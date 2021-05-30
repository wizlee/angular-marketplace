import { Injectable } from '@angular/core';

import { Facemask } from "./product-detail";
import MockAPI from "./facemasks.json";
import { Metadata } from "./product-metadata";

const PRODUCT_METADATA: string = "product";

@Injectable({
  providedIn: "root",
})
export class GetProductDetailService {
  constructor() {
    // ============================
    // This is a workaround for demonstrating seller adding goods.
    // ============================
    //
    // Below is a sample item for facemasks.json:
    // {
    //   "title": "Dummy data for illustrating what data is provided in this mock product backend. Any array item in facemasks object MUST PROVIDE all these fields.",
    //   "shop": "NoSuchShopExist",
    //   "seller": "SellerNotFound",
    //   "price": "99999",
    //   "rating": 5,
    //   "ratingCount": "99,999",
    //   "isBestSeller": false,
    //   "hasDiscount": false,
    //   "discountedPrice": "",
    //   "discountPercent": "",
    //   "isFreeShipping": false,
    //   "image": "",
    //   "thumbnail": "",
    //   "isVisible": false
    // },
    //
    // The initial state of all the products are loaded from facemasks.json into the browser localstorage.
    // Then, the app will refer to the localstorage to determine if a specific product is added for sale.
    if (window.localStorage[PRODUCT_METADATA]) {
      // always remove so that newly added product in facemasks.json will be added into the metadata
      window.localStorage.removeItem(PRODUCT_METADATA);
    }
    this.initProductMetadataLocalStorage();
  }

  private initProductMetadataLocalStorage(): void {
    let facemaskMetadata: Metadata[] = [];
    MockAPI.facemasks.forEach((facemask, index) => {
      facemaskMetadata.push({
        productId: index,
        isProductAdded: facemask.isVisible,
      });
    });
    window.localStorage[PRODUCT_METADATA] = JSON.stringify(facemaskMetadata);
  }

  putFacemaskOnSale(id: number): void {
    if (window.localStorage[PRODUCT_METADATA]) {
      let facemaskMetadata: Metadata[] = JSON.parse(
        window.localStorage[PRODUCT_METADATA]
      );
      if (id < facemaskMetadata.length) {
        facemaskMetadata[id].isProductAdded = true;
        window.localStorage[PRODUCT_METADATA] =
          JSON.stringify(facemaskMetadata);
      }
    }
  }

  getOnSaleFacemasks(): Facemask[] {
    return MockAPI.facemasks.filter((facemask, index) => {
      if (window.localStorage[PRODUCT_METADATA]) {
        let facemaskMetadata: Metadata[] = JSON.parse(
          window.localStorage[PRODUCT_METADATA]
        );
        return facemaskMetadata[index].isProductAdded;
      } else {
        console.warn("Product metadata not in localstorage");
        this.initProductMetadataLocalStorage();
        return facemask.isVisible;
      }
    });
  }

  getNotOnSaleFacemasks(): Facemask[] {
    return MockAPI.facemasks.filter((facemask, index) => {
      if (window.localStorage[PRODUCT_METADATA]) {
        let facemaskMetadata: Metadata[] = JSON.parse(
          window.localStorage[PRODUCT_METADATA]
        );
        return !facemaskMetadata[index].isProductAdded;
      } else {
        console.warn("Product metadata not in localstorage");
        this.initProductMetadataLocalStorage();
        return !facemask.isVisible;
      }
    });
  }

  getFacemaskProductIdForNotOnSale(index: number): number {
    let id: number = -1;
    if (window.localStorage[PRODUCT_METADATA]) {
      const facemaskMetadata: Metadata[] = JSON.parse(
        window.localStorage[PRODUCT_METADATA]
      );

      for (let i = 0; i < facemaskMetadata.length; i++) {
        if (!facemaskMetadata[i].isProductAdded) id++;
        if (id >= index) return i;
      }
    }
    return id;
  }

  getFacemaskProductIdForOnSale(index: number): number {
    let id: number = -1;
    if (window.localStorage[PRODUCT_METADATA]) {
      const facemaskMetadata: Metadata[] = JSON.parse(
        window.localStorage[PRODUCT_METADATA]
      );

      for (let i = 0; i < facemaskMetadata.length; i++) {
        if (facemaskMetadata[i].isProductAdded) id++;
        if (id >= index) return i;
      }
    }
    return id;
  }

  getFacemaskDetail(id: number): Facemask {
    return MockAPI.facemasks[id];
  }

  getFacemaskCount(): number {
    return MockAPI.facemasks.length;
  }
}
