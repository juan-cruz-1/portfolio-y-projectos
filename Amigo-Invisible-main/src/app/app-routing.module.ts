import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'eventos',
    loadChildren: () => import('./pages/evento/evento.module').then( m => m.EventoPageModule)
  },
  {
    path: 'nuevo-evento',
    loadChildren: () => import('./pages/nuevo-evento/nuevo-evento.module').then( m => m.NuevoEventoPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
