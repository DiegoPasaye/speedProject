import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsWiki } from './maps-wiki';

describe('MapsWiki', () => {
  let component: MapsWiki;
  let fixture: ComponentFixture<MapsWiki>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapsWiki]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapsWiki);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
