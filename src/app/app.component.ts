import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMAGES, ICONS } from './utils';
import { crocSlots } from './services/act.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  title = 'croco';

  constructor(private crocSlots: crocSlots) {

  }

  public IMAGES = IMAGES;
  public ICONS = ICONS;

  ngOnInit(): void {

    this.iGetProviders();

    this.iGetCategories();

  }

  // list of providers
  public providers: Array<any> = [];
  public selectedProvider: any = [];
  public SUB_providerId: Subscription = new Subscription;
  public iGetProviders(url: string = '', deviceType?: any,): void {
    this.SUB_providerId = this.crocSlots.providerId(deviceType, url).subscribe((res) => {
      //this.providers = [];
      !url ? this.providers = res.data : '';
      if (url && res?.data?.games) {
        this.selectedProvider = res?.data;
      }
    })
  }

  // list of categories
  public categories: Array<any> = [];
  public selectedCategory: any = [];
  public SUB_slotCategories: Subscription = new Subscription;
  public iGetCategories(cat?: any): void {
    if (this.categories.length != 0 && cat) {
      let arr: any = this.categories.filter((par) => {
        return par.name == cat;
      })
      this.selectedProvider = arr[0];
      console.log(arr[0])
      return;
    }
    this.SUB_slotCategories = this.crocSlots.slotCategories({}).subscribe((res) => {
      !cat || this.categories.length == 0 ? this.categories = res.data : '';
      this.iGetCategories('პოპულარული / ვები');
    })
  }

  ngOnDestroy(): void {
    this.SUB_providerId.unsubscribe();
    this.SUB_slotCategories.unsubscribe();
  }

}