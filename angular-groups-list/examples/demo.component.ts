import { Component } from '@angular/core';

@Component({
  selector: 'app-demo',
  template: `
    <div class="demo-container">
      <h1>Dante Groups List - Angular Demo</h1>
      
      <h2>List Mode (Default)</h2>
      <div class="demo-section">
        <dante-groups-app mode="list"></dante-groups-app>
      </div>
      
      <h2>Overview Mode with Attributes</h2>
      <div class="demo-section">
        <!-- Example of overview mode with data attributes for filtering -->
        <div 
          #overviewElement
          class="dante-groups-overview"
          dante-level="A1"
          dante-lector="rossi"
          dante-city="warszawa">
          <dante-groups-app 
            mode="overview" 
            [rootElement]="overviewElement">
          </dante-groups-app>
        </div>
      </div>
      
      <h2>Landing Page Mode</h2>
      <div class="demo-section">
        <div 
          #landingElement
          class="dante-groups-overview"
          dante-lp="true"
          dante-hide-ind="true"
          dante-level="B1">
          <dante-groups-app 
            mode="overview" 
            [rootElement]="landingElement">
          </dante-groups-app>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      padding: 20px;
      font-family: "Plus Jakarta Sans", sans-serif;
    }
    
    .demo-section {
      margin: 30px 0;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    
    h1, h2 {
      color: var(--dante-black, #353f4f);
    }
    
    h1 {
      text-align: center;
      margin-bottom: 40px;
    }
    
    h2 {
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid var(--dante-dark-brown, #6f2b2c);
    }
  `]
})
export class DemoComponent { }