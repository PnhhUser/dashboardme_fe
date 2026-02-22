import { Component } from '@angular/core';
import { HeaderComponent } from '../../../layout/header/header.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { CommonModule, DecimalPipe } from '@angular/common';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-create-orders',
  imports: [
    HeaderComponent,
    NzIconModule,
    NzDrawerModule,
    DecimalPipe,
    NzDatePickerModule,
    CommonModule,
  ],
  templateUrl: './create-orders.component.html',
  styleUrl: './create-orders.component.less',
})
export class CreateOrdersComponent {
  title = 'Create Purchase Order';

  constructor(private drawerService: NzDrawerService) {}

  onBack() {
    // Implement navigation logic to go back to the previous page
    window.history.back();
  }

  suppliers = [
    { id: 1, name: 'ABC Company', phone: '0909xxxx' },
    { id: 2, name: 'XYZ Trading', phone: '0988xxxx' },
  ];

  selectedSupplier: any;
  supplierDrawerVisible = false;

  selectedProducts: any[] = [];

  openSupplierDrawer() {
    this.supplierDrawerVisible = true;
  }

  selectSupplier(s: any) {
    this.selectedSupplier = s;
    this.supplierDrawerVisible = false;
  }

  removeProduct(index: number) {
    this.selectedProducts.splice(index, 1);
  }

  increaseQty(i: number) {
    this.selectedProducts[i].qty++;
  }

  decreaseQty(i: number) {
    if (this.selectedProducts[i].qty > 1) {
      this.selectedProducts[i].qty--;
    }
  }

  get subtotal() {
    return this.selectedProducts.reduce((sum, p) => sum + p.price * p.qty, 0);
  }

  openProductDrawer() {}
}
