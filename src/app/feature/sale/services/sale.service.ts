import { Injectable } from '@angular/core';
import {LandaService} from "../../../core/services/landa.service";

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private landaService: LandaService) {
  }

  getSale(arrParameter = {}) {
    return this.landaService.DataGet('/v1/sale', arrParameter);
  }

  createSale(payload) {
    return this.landaService.DataPost('/v1/sale', payload);
  }
}
