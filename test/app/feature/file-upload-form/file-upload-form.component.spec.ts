import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadFormComponent } from '../../../../src/app/feature/file-upload-form/file-upload-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('FileUploadFormComponent', () => {
  let component: FileUploadFormComponent;
  let fixture: ComponentFixture<FileUploadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploadFormComponent ],
      imports: [ ReactiveFormsModule, FormsModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
