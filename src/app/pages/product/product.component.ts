import { Store } from '@ngrx/store';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HeaderComponent } from '../../layout/header/header.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardProductComponent } from '../../shared/components/card-product/card-product.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import * as ProductActions from '../../store/product/product.action';
import {
  selectProduct,
  selectProductLoading,
} from '../../store/product/product.selector';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import {
  NzDrawerModule,
  NzDrawerRef,
  NzDrawerService,
} from 'ng-zorro-antd/drawer';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { CategoryService } from '../../core/services/category.service';
import { map } from 'rxjs';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    NzIconModule,
    TranslateModule,
    CardProductComponent,
    NzButtonModule,
    LoaderComponent,
    NzDrawerModule,
    NzModalModule,
    NzSkeletonModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.less',
})
export class ProductComponent implements OnInit {
  products$;
  loading$;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private drawerService: NzDrawerService,
    private modalService: NzModalService,
  ) {
    this.products$ = this.store.select(selectProduct);
    this.loading$ = this.store.select(selectProductLoading);
  }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDrawerCreateProduct(): void {
    this.drawerService.create({
      nzTitle: 'Create product',
      nzPlacement: 'right',
      nzWidth: 375,
      nzContent: AddProduct,
    });
  }

  onFilter(): void {
    this.drawerService.create({
      nzTitle: 'Filter product',
      nzPlacement: 'top',
      nzHeight: 600,
    });
  }

  onScanCodeProduct(): void {
    this.modalService.create({
      nzTitle: 'Scan code product',
      nzContent: '',
      nzFooter: null,
      nzMaskClosable: false,
    });
  }
}

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzInputNumberModule,
    NzIconModule,
  ],
  templateUrl: './add-product/add-product.component.html',
  styleUrl: './add-product/add-product.component.less',
})
class AddProduct {
  form: FormGroup;
  categoryService = inject(CategoryService);
  store = inject(Store);

  categories$ = this.categoryService
    .getCategories()
    .pipe(map((res) => res.data));

  statusList: { value: number; label: string }[] = [
    { value: 1, label: 'Active' },
    { value: 0, label: 'Inactive' },
  ];

  constructor(
    private fb: FormBuilder,
    private drawerRef: NzDrawerRef,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      categoryId: [null, Validators.required],
      active: [1],
      stock: [0],
      price: [0],
      description: [''],
    });
  }

  onCancel() {
    this.drawerRef.close();
  }

  submit() {
    if (this.form.invalid) return;

    const payload = {
      ...this.form.value,
    };

    this.store.dispatch(ProductActions.addProduct({ model: payload }));
    this.drawerRef.close();
  }
}
