import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container{
      height: 100%;
      width: 100%;
    }

    .row{
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      position: fixed;
      z-index: 999;
      width: 400px;
    }
  `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMap!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 13;
  center: [number, number]= [-7.865880, 42.334103]

  constructor() { }


  ngOnDestroy(): void {
    this.mapa.off('zoom',()=>{});
    this.mapa.off('zoomend',()=>{});
    this.mapa.off('move',()=>{});
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel // starting zoom
    });

    this.mapa.on('zoom', (ev)=> {
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', (ev)=> {
      if(this.mapa.getZoom()>18){
        this.mapa.zoomTo(18);
      }
    });

    this.mapa.on('move', (event)=>{
      const target = event.target;
      const {lng ,lat} = target.getCenter();
      this.center = [lng,lat];
    });


  }

  zoomOut(){
    this.mapa.zoomOut();
  }

  zoomIn(){
    this.mapa.zoomIn();
  }

  zoomCambio(valor: string){
    this.mapa.zoomTo(Number(valor));
  }

}
