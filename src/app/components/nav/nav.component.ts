import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  private isExpanded: boolean = false;
  private clickCount: number = 0;
  private navigationEnd!: Subscription;

  userPic?: string;
  userName?: string;

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.userPic = 'assets/images/user.png';
    this.userName = 'Derp_fp';

    this.navigationEnd = this.route.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const activeElements = document.getElementsByClassName('active');

      if (activeElements.length) {
        const elem1 = activeElements[0];
        const elem2 = activeElements[1];

        this.hide(elem1, elem2);
      }
    });
  }

  closeMenu(e: any, button: string, target: string, excepTarget: string) {
    const btn = document.querySelector(button);
    const t = document.querySelector(target);
    const exT = document.querySelector(excepTarget);

    if (e.target !== exT && !e.target.closest(excepTarget)) this.hide(btn, t);
  }

  toggleNav(btn: string, t: string) {
    const clicked = document.querySelector(btn);
    const expanded = document.querySelector(t);

    if (clicked?.classList.contains('active')) {
      this.hide(clicked, expanded);
      return;
    }

    const activeElements = document.getElementsByClassName('active');

    if (activeElements.length) {
      const elem1 = activeElements[0];
      const elem2 = activeElements[1];

      this.hide(elem1, elem2);
    }

    this.show(clicked, expanded);
    this.updateRemover(clicked, expanded, btn, t);
  }

  show(clicked: Element | null, expanded: Element | null) {
    clicked?.classList.add('active');
    expanded?.classList.add('active');
    expanded?.setAttribute('data-expanded', 'true');

    this.isExpanded = true;
    document.body.classList.add('lock');
  }

  hide(clicked: Element | null, expanded: Element | null) {
    clicked?.classList.remove('active');
    expanded?.classList.remove('active');
    expanded?.setAttribute('data-expanded', 'false');

    this.isExpanded = false;
    document.body.classList.remove('lock');
  }

  private updateRemover(clicked: Element | null, expanded: Element | null, btn: string, t: string) {
    window.onclick = (e: any) => {
      if (!this.isExpanded) return;

      this.clickCount = 1;

      if (this.clickCount < 1) return;

      let button = e.target !== clicked && !e.target.closest(btn);
      let target = e.target !== expanded && !e.target.closest(t);

      // console.log(button, target);

      if (!(button && target)) return;

      this.clickCount = 0;
      this.hide(clicked, expanded);
    }
  }

  ngOnDestroy(): void {
    this.navigationEnd.unsubscribe();
  }
}
