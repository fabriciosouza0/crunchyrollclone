import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'app/services/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'details-general',
  templateUrl: './details-general.component.html',
  styleUrls: ['./details-general.component.css']
})
export class DetailsGeneralComponent implements OnInit {
  @Input() mediaType!: string;
  @Input() details$!: Observable<any>;
  mediaId!: number;

  constructor(private route: ActivatedRoute, private toastService: ToastService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.mediaId = params['id'];
    });
  }

  copyLink() {
    navigator.clipboard.writeText(window.location.href)
    this.toastService.show('Link copiado para área de transferência!', { classname: 'main-color text-light', delay: 2500 });
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }
}
