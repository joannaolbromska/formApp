import { Component, OnInit } from '@angular/core';
import { Payment } from '../model/payment';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-discount-form',
    templateUrl: './discount-form.component.html',
    styleUrls: ['./discount-form.component.css']
})
export class DiscountFormComponent implements OnInit {
    isDiscount = false;
    isApplied: boolean;
    isValid: boolean;
    payment: any;
    apply: string;
    alertText: string;
    processing: boolean;
    submitting: boolean;

    constructor(private http: HttpClient) {}

    ngOnInit() {
      this.setDefaultData();
    }

    private setDefaultData(){
      this.apply = 'Apply discount';
      this.payment = new Payment();
      this.isValid = false;
      this.isApplied = false;
      this.processing = false;
      this.submitting = false;
      this.alertText = '';
    }

    submit() {
        this.submitting = true;
        this.http.post('api/pay', { body: this.payment })
        .subscribe(data => {
          if(data) {
            this.submitting = false;
            this.setDefaultData();
          }
        })
    }

    private checkDiscountCode() {
        this.apply = 'Processing...';
        this.processing = true;
        this.http.get(`api/discount/${this.payment.discountCode}`)
            .subscribe(data => {
                if (data != null) {
                    this.isValid = true;
                    this.payment.discount = data;
                    this.payment.currentPrice = this.payment.currentPrice - (this.payment.discount * 0.01 * this.payment.currentPrice);
                    this.alertText = `${data}% off discount was applied. Your cart was updated.`;
                    this.apply = 'Cancel discount';
                    this.isApplied = true;
                    this.processing = false;
                } else {
                    this.alertText = 'This discount code is invalid';
                    this.apply = 'Apply discount';
                    this.payment = new Payment();
                    this.isValid = false;
                    this.processing = false;
                }
            })
    }
}
