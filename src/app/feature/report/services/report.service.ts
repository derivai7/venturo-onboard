import { Injectable } from '@angular/core';
import {LandaService} from "../../../core/services/landa.service";

@Injectable({
  providedIn: 'root'
})

export class ReportService {

  constructor(private landaService: LandaService) { }

  getSalePromo(arrParameter = {}) {
    return this.landaService.DataGet('/v1/report/sale-promo', arrParameter);
  }

  getSaleTransaction(arrParameter = {}) {
    return this.landaService.DataGet('/v1/report/sale-transaction', arrParameter);
  }

  getSaleMenu(arrParameter = {}) {
    return this.landaService.DataGet('/v1/report/sale-menu', arrParameter);
  }

  getSaleCustomer(arrParameter = {}) {
    return this.landaService.DataGet('/v1/report/sale-customer', arrParameter);
  }

  getSaleDetail(id: string, date: string) {
    return this.landaService.DataGet(`/v1/report/sale-customer/${id}/${date}`);
  }
}
