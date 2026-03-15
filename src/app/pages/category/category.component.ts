import {
  Component,
  Inject,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HeaderComponent } from '../../layout/header/header.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  CardCategoryComponent,
  ICardCategory,
} from '../../shared/components/card-category/card-category.component';
import { Store } from '@ngrx/store';
import * as CategoryActions from '../../store/category/category.actions';
import {
  selectCategory,
  selectCategoryLoading,
} from '../../store/category/category.selectors';
import { Observable } from 'rxjs';
import { ICategory } from '../../core/models/category.model';
import {
  NzDrawerModule,
  NzDrawerRef,
  NzDrawerService,
} from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  NZ_MODAL_DATA,
  NzModalModule,
  NzModalRef,
  NzModalService,
} from 'ng-zorro-antd/modal';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    NzIconModule,
    TranslateModule,
    CardCategoryComponent,
    NzDrawerModule,
    NzButtonModule,
    NzModalModule,
    TranslateModule,
    LoaderComponent,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.less',
})
export class CategoryComponent implements OnInit {
  @ViewChild('remove', { static: true })
  removeActionTpl!: TemplateRef<any>;

  @ViewChild('update', { static: true })
  updateActionTpl!: TemplateRef<{}>;

  private drawerRef?: NzDrawerRef;

  categories$: Observable<ICategory[]>;
  categoriesLoading$;
  selectedCategory!: ICardCategory;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private drawerService: NzDrawerService,
    private modalService: NzModalService,
    private translate: TranslateService,
  ) {
    this.categories$ = this.store.select(selectCategory);
    this.categoriesLoading$ = this.store.select(selectCategoryLoading);
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.store.dispatch(CategoryActions.getCategories());
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  addCategory(): void {
    const modal = this.modalService.create({
      nzTitle: this.translate.instant('data.category.modal.add.title'),
      nzWidth: 500,
      nzContent: ModalAddCategory,
      nzFooter: null,
      nzMaskClosable: false,
      nzWrapClassName: 'add-category-modal',
    });

    modal.afterClose.subscribe((result) => {
      if (!result?.updated) return;

      this.store.dispatch(
        CategoryActions.addCategory({
          category: result.data,
        }),
      );
    });
  }

  updateCategory(card: ICardCategory): void {
    this.drawerRef?.close();

    const modal = this.modalService.create({
      nzTitle: this.translate.instant('data.category.modal.edit.title'),
      nzContent: ModalEditCategory,
      nzWidth: 500,
      nzData: card,
      nzFooter: null,
      nzMaskClosable: false,
      nzWrapClassName: 'edit-category-modal',
    });

    modal.afterClose.subscribe((result) => {
      if (!result?.updated) return;

      this.store.dispatch(
        CategoryActions.updateCategory({
          category: {
            id: card.id,
            ...result.data,
          },
        }),
      );
    });
  }

  removeCategory(card: ICardCategory): void {
    this.drawerRef?.close();

    this.modalService.confirm({
      nzTitle: this.translate.instant('data.category.modal.remove.title'),
      nzContent: this.translate.instant('data.category.modal.remove.content', {
        name: card.name,
      }),
      nzOkText: 'Xóa',
      nzCancelText: 'Hủy',
      nzOkDanger: true,

      nzOnOk: () => {
        this.store.dispatch(
          CategoryActions.removeCategory({
            id: card.id,
          }),
        );
      },
    });
  }

  detailCategory(card: ICardCategory) {
    this.selectedCategory = card;

    this.drawerRef = this.drawerService.create({
      nzTitle: card.name,
      nzClosable: false,
      nzPlacement: 'right',
      nzWidth: 300,
      nzContent: DetailCategory,
      nzFooter: this.updateActionTpl,
      nzContentParams: {
        card,
      },
      nzExtra: this.removeActionTpl,
    });
  }
}

@Component({
  selector: 'app-detail-category',
  standalone: true,
  imports: [CommonModule, NzButtonModule, TranslateModule],
  template: `
    <ul type="none" style="padding: 0;">
      <li>{{ card.description }}</li>
      <br />
      <li>
        {{ 'data.category.datetime.createdAt' | translate }}
        <br />
        <span style="font-weight: bold;">{{
          card.createdAt | date: 'dd/MM/yyyy HH:mm:ss'
        }}</span>
      </li>
      <br />
      <li>
        @if (card.updatedAt) {
          {{ 'data.category.datetime.lastUpdated' | translate }}
          <br />
          <span style="font-weight: bold;">{{
            card.updatedAt | date: 'dd/MM/yyyy HH:mm:ss'
          }}</span>
        }
      </li>
    </ul>
  `,
})
class DetailCategory {
  @Input() card!: ICardCategory;
}

@Component({
  selector: 'app-modal-category-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    TranslateModule,
  ],
  template: `
    <form nz-form [formGroup]="form" class="modal-form">
      <nz-form-item>
        <nz-form-label nzRequired>{{
          'data.category.modal.edit.inputName' | translate
        }}</nz-form-label>
        <nz-form-control nzErrorTip="Vui lòng nhập tên">
          <input nz-input formControlName="name" />
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label>{{
          'data.category.modal.edit.inputDescription' | translate
        }}</nz-form-label>
        <nz-form-control>
          <textarea nz-input rows="3" formControlName="description"></textarea>
        </nz-form-control>
      </nz-form-item>

      <div class="modal-footer">
        <button nz-button (click)="close()">
          {{ 'data.category.button.cancel' | translate }}
        </button>

        <button
          nz-button
          nzType="primary"
          [disabled]="form.invalid"
          (click)="save()"
        >
          {{ 'data.category.button.save' | translate }}
        </button>
      </div>
    </form>
  `,
  styles: [
    `
      .modal-footer {
        text-align: right;
        margin-top: 24px;
      }

      .modal-footer button + button {
        margin-left: 8px;
      }
    `,
  ],
})
class ModalEditCategory {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public card: ICardCategory,
  ) {
    this.form = this.fb.group({
      name: [card.name, Validators.required],
      description: [card.description],
    });
  }

  close() {
    this.modalRef.close();
  }

  save() {
    if (this.form.invalid) return;

    const value = this.form.value;

    this.modalRef.close({
      updated: true,
      data: value,
    });
  }
}

@Component({
  selector: 'app-modal-add-category',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    TranslateModule,
  ],
  template: ` <form nz-form [formGroup]="form" class="modal-form">
    <nz-form-item>
      <nz-form-label nzRequired>{{
        'data.category.modal.add.inputName' | translate
      }}</nz-form-label>
      <nz-form-control nzErrorTip="Vui lòng nhập tên">
        <input nz-input formControlName="name" />
      </nz-form-control>
    </nz-form-item>

    <nz-form-item>
      <nz-form-label>{{
        'data.category.modal.add.inputDescription' | translate
      }}</nz-form-label>
      <nz-form-control>
        <textarea nz-input rows="3" formControlName="description"></textarea>
      </nz-form-control>
    </nz-form-item>

    <div class="modal-footer">
      <button nz-button (click)="close()">
        {{ 'data.category.button.cancel' | translate }}
      </button>

      <button
        nz-button
        nzType="primary"
        [disabled]="form.invalid"
        (click)="save()"
      >
        {{ 'data.category.button.save' | translate }}
      </button>
    </div>
  </form>`,
  styles: [
    `
      .modal-footer {
        text-align: right;
        margin-top: 24px;
      }

      .modal-footer button + button {
        margin-left: 8px;
      }
    `,
  ],
})
class ModalAddCategory {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  close() {
    this.modalRef.close();
  }

  save() {
    if (this.form.invalid) return;

    const value = this.form.value;

    this.modalRef.close({
      updated: true,
      data: value,
    });
  }
}
