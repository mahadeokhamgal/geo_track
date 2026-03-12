import {
  Component,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import * as L from 'leaflet';
import { LocationTimeline } from '../location-timeline';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
  iconUrl: 'assets/leaflet/marker-icon.png',
  shadowUrl: 'assets/leaflet/marker-shadow.png'
});

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.html',
  styleUrl: './map.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Map implements AfterViewInit, OnChanges {

  map!: L.Map;

  @Input() timeline: LocationTimeline[] | undefined;
  @Input() name: string | undefined;

  private polyline?: L.Polyline;
  private markers: L.Marker[] = [];
  private movingMarker?: L.Marker;


  private animationFrame?: number;

  ngAfterViewInit() {
    this.initializeMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['timeline'] && this.map && this.timeline?.length) {
      this.renderTimeline();
    }
  }

  private initializeMap() {
    const initialLat = this.timeline?.length ? this.timeline[0].latitude : 18.5204;
    const initialLng = this.timeline?.length ? this.timeline[0].longitude : 73.8567;
    this.map = L.map('map').setView([initialLat, initialLng], 13);

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: '&copy; OpenStreetMap contributors' }
    ).addTo(this.map);
    if (this.timeline?.length) {
      this.renderTimeline();
    }
  }

  private renderTimeline() {

  if (!this.timeline || !this.map) return;

  if (this.animationFrame) {
    cancelAnimationFrame(this.animationFrame);
  }

  const latlngs: L.LatLngExpression[] = this.timeline.map(point => [
    Number(point.latitude),
    Number(point.longitude)
  ]);

  if (this.polyline) {
    this.map.removeLayer(this.polyline);
  }

  this.markers.forEach(marker => this.map.removeLayer(marker));
  this.markers = [];

  this.polyline = L.polyline(latlngs, {
    color: 'blue',
    weight: 4
  }).addTo(this.map);

  this.map.fitBounds(this.polyline.getBounds());

  this.timeline.forEach((point) => {

        const marker = L.marker([
      Number(point.latitude),
      Number(point.longitude)
    ])
    .addTo(this.map)
    .bindPopup(`
      <b>User:</b> ${this.name ?? 'User'} <br>
      <b>Latitude:</b> ${point.latitude} <br>
      <b>Longitude:</b> ${point.longitude} <br>
      <b>Time:</b> ${point.timestamp}
    `);

    marker.on('mouseover', () => marker.openPopup());
    marker.on('mouseout', () => marker.closePopup());


    this.markers.push(marker);

  });

  this.animateMovementSmooth();
}


  private interpolatePoints(
    start: L.LatLngExpression,
    end: L.LatLngExpression,
    steps: number
  ) {

  const points: L.LatLngExpression[] = [];

  const [lat1, lng1] = start as [number, number];
  const [lat2, lng2] = end as [number, number];

  for (let i = 0; i <= steps; i++) {

    const lat = lat1 + (lat2 - lat1) * (i / steps);
    const lng = lng1 + (lng2 - lng1) * (i / steps);

    points.push([lat, lng]);

  }

  return points;
  }
  private animateMovementSmooth() {

  if (!this.timeline || this.timeline.length < 2) return;

  const route: L.LatLngExpression[] = [];

  for (let i = 0; i < this.timeline.length - 1; i++) {

    const start: L.LatLngExpression = [
      Number(this.timeline[i].latitude),
      Number(this.timeline[i].longitude)
    ];

    const end: L.LatLngExpression = [
      Number(this.timeline[i + 1].latitude),
      Number(this.timeline[i + 1].longitude)
    ];

    const segment = this.interpolatePoints(start, end, 100);

    route.push(...segment);
  }

  let index = 0;
  const move = () => {

    const latlng = route[index];
    const lat = (latlng as any)[0];
    const lng = (latlng as any)[1];

    const timestamp =
      this.timeline && index < this.timeline.length
        ? this.timeline[index]?.timestamp
        : 'Live';

    if (!this.movingMarker) {

      this.movingMarker = L.marker(latlng)
        .addTo(this.map)
        .bindPopup(this.createPopupContent(lat, lng, timestamp))
        .openPopup();   // 🔴 important

    } else {

      this.movingMarker.setLatLng(latlng);

      const popup = this.createPopupContent(lat, lng, timestamp);

      this.movingMarker.setPopupContent(popup);

    }

    this.map.panTo(latlng, { animate: true });

    index++;

    if (index < route.length) {
      this.animationFrame = requestAnimationFrame(move);
    }

  };

  move();
  }

  private createPopupContent(lat: number, lng: number, timestamp?: string) {
  return `
    <b>User:</b> ${this.name ?? 'User'} <br>
    <b>Latitude:</b> ${lat.toFixed(4)} <br>
    <b>Longitude:</b> ${lng.toFixed(4)} <br>
    <b>Time:</b> ${timestamp ?? 'Live'}
  `;
}
}
