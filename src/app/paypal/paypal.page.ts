import { Component } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';

@Component({
  selector: 'app-paypal',
  templateUrl: 'paypal.page.html',
  styleUrls: ['paypal.page.scss'],
})
export class PaypalPage {
  constructor(private payPal: PayPal) { }
  totale = '33.33';
  currency = 'EUR';
  moneta = '€';

  pagaConPaypal() {
    this.payPal.init({
      PayPalEnvironmentProduction: '[CLIENT_ID]',
      PayPalEnvironmentSandbox: '[CLIENT_ID]'
    }).then(() => {
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
      })).then(() => {
        const payment = new PayPalPayment(this.totale, this.currency, 'Descrizione', 'vendita');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log(res);
          // Risposta tipo
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Errore durante la transazione o chiusura della finestra
        });
      }, () => {
        // Configurazione errata
      });
    }, () => {
      // Altro
      console.log('Per il corretto funzionamento, è necessario inserire le chiavi CLIENT corrette!');
    });
  }
}
