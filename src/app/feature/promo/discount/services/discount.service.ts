import { Injectable } from '@angular/core';
import {LandaService} from "../../../../core/services/landa.service";

@Injectable({
  providedIn: 'root'
})

export class DiscountService {

  constructor(private landaService: LandaService) { }

  getDiscount(arrParameter: any = {}) {
    return this.landaService.DataGet('/v1/discounts', arrParameter);
  }

  createDiscount(payload: any) {
    return this.landaService.DataPost('/v1/discounts', payload);
  }

  deleteDiscount(id: string) {
    return this.landaService.DataDelete('/v1/discounts/' + id);
  }
}
