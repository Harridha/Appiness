import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'userForm';
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    let currentState = this.activatedRoute.snapshot.url ? this.activatedRoute.snapshot.url : 'login';
    this.router.navigateByUrl('/' + currentState);
  }
}
