import { SettingsService } from './../../services/settings.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: ``
})
export class AccountSettingsComponent implements OnInit {

  public constructor(private settingsService :SettingsService) { }

  ngOnInit(): void {
    this.settingsService.selectCurrentTheme();
  }

  public changeTheme(theme: string): void {
    this.settingsService.changeTheme(theme);
  }

}
