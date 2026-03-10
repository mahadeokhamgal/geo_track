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

  private polyline?: L.Polyline;
  private markers: L.Marker[] = [];

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
    const latlngs: L.LatLngExpression[] = this.timeline.map(point => [
      point.latitude,
      point.longitude
    ]);

    // Remove previous path
    if (this.polyline) {
      this.map.removeLayer(this.polyline);
    }

    // Remove old markers
    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.markers = [];

    // Draw new polyline
    this.polyline = L.polyline(latlngs, {
      color: 'blue',
      weight: 4
    }).addTo(this.map);

    this.map.fitBounds(this.polyline.getBounds());

    // Add markers
    latlngs.forEach((latlng, index) => {
      const marker = L.marker(latlng)
        .addTo(this.map)
        .bindPopup(`Point ${index + 1}`);
      this.markers.push(marker);
    });
  }
}