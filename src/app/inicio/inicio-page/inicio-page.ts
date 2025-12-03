import { Component } from '@angular/core';
import { Header } from '../components/header/header';
import { Leaderboard } from '../components/leaderboard/leaderboard';
import { Requirements } from '../components/requirements/requirements';
import { GeneralInfo } from '../components/general-info/general-info';
import { Footer } from '../components/footer/footer';
import { NavBar } from '../components/nav-bar/nav-bar';
import { MobileAppPage } from '../components/mobile-app/mobile-app';

@Component({
  selector: 'app-inicio-page',
  imports: [Header, Leaderboard, Requirements, GeneralInfo, Footer, NavBar, MobileAppPage],
  templateUrl: './inicio-page.html',
  styleUrl: './inicio-page.css'
})
export class InicioPage {

}
