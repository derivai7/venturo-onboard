import { Injectable } from '@angular/core';
import {LandaService} from "../../../core/services/landa.service";

@Injectable({
  providedIn: 'root'
})
export class PromoService {

  constructor(private landaService: LandaService) {
  }

  getPromo(arrParameter = {}) {
    return this.landaService.DataGet('/v1/promo', arrParameter);
  }

  getPromoById(userId) {
    return this.landaService.DataGet('/v1/promo/' + userId);
  }

  createPromo(payload) {
    return this.landaService.DataPost('/v1/promo', payload);
  }

  updatePromo(payload) {
    return this.landaService.DataPut('/v1/promo', payload);
  }

  deletePromo(userId) {
    return this.landaService.DataDelete('/v1/promo/' + userId);
  }
}
