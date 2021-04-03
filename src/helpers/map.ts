// // @ts-nocheck

// class MapCustom {
//   mapElement: HTMLElement;

//   geocoder: google.maps.Geocoder;

//   constructor(mapElement: HTMLElement) {
//     this.mapElement = mapElement;
//     this.geocoder = new google.maps.Geocoder();
//   }

//   init() {
//     this.showMap();
//   }

//   /** Init map */
//   showMap() {
//     const position = { lat: 28.5355, lng: 77.3910 };
//     const center = position;
//     const zoom = Number(this.mapElement.getAttribute('data-mapcustom-zoomlevel')) || 4;
//     // eslint-disable-next-line no-mixed-operators
//     const mapTypeControl = (this.mapElement.getAttribute('data-mapcustom-typecontrol') === 'true') && true || false;

//     const options = {
//       zoom,
//       center,
//       mapTypeControl,
//     };

//     const map = new google.maps.Map(this.mapElement, options);

//     this.addMarker(position, map);
//     this.geocodeAddress(this.geocoder, map);
//   }

//   // eslint-disable-next-line class-methods-use-this
//   /** Add default marker to map */
//   addMarker(pos: any, mapInstance: any) {
//     const position = pos;
//     const map = mapInstance;
//     const animation = (this.mapElement.getAttribute('data-mapcustom-zoom-animate') === 'true')
//       ? google.maps.Animation.BOUNCE
//       : undefined;

//     const marker = new google.maps.Marker({
//       position,
//       map,
//       animation,
//     });

//     /** Add event click marker to show infomation if exist data-mapcustom-infowindow or data-mapcustom-infowindow !== '' */
//     if (this.mapElement.getAttribute('data-mapcustom-infowindow') !== '') {
//       const infowindow = new google.maps.InfoWindow({ content: (this.mapElement.getAttribute('data-mapcustom-infowindow')) || undefined });

//       marker.addListener('click', () => {
//         infowindow.open(map, marker);
//       });
//     }
//   }

//   /**
//    * Get position from address => convert to position => make Maker for map
//    * @param geocoder - geocoder - google.maps.Geocoder
//    * @param resultsMap - map -
//    */
//   geocodeAddress(geocoder: google.maps.Geocoder, resultsMap: google.maps.Map) {
//     const address = this.mapElement.getAttribute('data-mapcustom-address') || undefined;

//     geocoder.geocode({ address }, (results, status) => {
//       if (status === 'OK') {
//         resultsMap.setCenter(results[0].geometry.location);
//         this.addMarker(results[0].geometry.location, resultsMap);
//       } else {
//         alert(`The API Key is not valid or geocode was not successful for the following reason: ${status}. Please check again.`);
//       }
//     });
//   }
// }

// // Attach your callback function to the `window` object
// // eslint-disable-next-line
// (window as any).initMap = function () {
//   const listMap = qsa<HTMLElement>('.sc-map');
//   listMap.forEach((el) => {
//     const newmap = new MapCustom(el);
//     newmap.init();
//   });
// };

// /** Get API */
// const API_KEY = qs<HTMLElement>('.sc-map-container')?.getAttribute('data-api-key') || '';
// if (API_KEY && API_KEY !== '') {
//   /** Create the script tag, set the appropriate attributes */
//   const script = document.createElement('script');
//   script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;
//   script.defer = true;
//   script.async = true;
//   document.head.appendChild(script);
// }


// // {% case __PDSETTINGS__.layout %}
// // {% when 'layout_1' %}
// // {%- assign layout_left = 'sc-col-lg-6' -%}
// // {%- assign layout_right = 'sc-col-lg-6' -%}
// // {% when 'layout_2' %}
// // {%- assign layout_left = 'sc-col-lg-5' -%}
// // {%- assign layout_right = 'sc-col-lg-7' -%}
// // {% when 'layout_3' %}
// // {%- assign layout_left = 'sc-col-lg-7' -%}
// // {%- assign layout_right = 'sc-col-lg-5' -%}
// // {% endcase %}

// // <div class="sc-container">
// //   <div class="sc-row sc-align-items-center{% if __PDSETTINGS__.reverse %} sc-flex-row-reverse{% endif %}">
// //     <!-- Map Section-->
// //     <div class="{{layout_left}}">
// //       <div class="sc-contact-02__map-wraper sc-map-container" data-api-key={{__PDSETTINGS__.api_key}}>
// //         <div class="sc-map"
// //         data-mapcustom-zoomlevel="{{__PDSETTINGS__.zoom_level}}"
// //         data-mapcustom-zoom-animate="{{__PDSETTINGS__.animate_marker}}"
// //         data-mapcustom-typecontrol="{{__PDSETTINGS__.type_control}}"
// //         data-mapcustom-infowindow="{{__PDSETTINGS__.info_window}}"
// //         data-mapcustom-address="{{__PDSETTINGS__.main_address}}">
// //         </div>
// //       </div>
// //     </div>

// //     <!-- Contact Section  -->
// //     <div class="{{layout_right}}">
// //       _HEADER_CONTENT_
// //       <div class="sc-contact-02__item-wraper">
// //         {% for block in __SECTION__.blocks %}

// //         <div class="{{grid_item_width}}">
// //           <div class="sc-contact-02__item">
// //             <h4 class="sc-contact-02__title">{{block.settings.heading}}</h4>
// //             <div class="sc-contact-02__address">{{block.settings.address}}</div>
// //             <div class="sc-contact-02__hotline">{{block.settings.hotline}}</div>
// //           </div>
// //         </div>

// //         {% endfor %}
// //       </div>
// //     </div>
// //   </div>
// // </div>


// // <div class="sc-container-fluid">
// //   <div class="sc-row sc-align-items-stretch{% if __PDSETTINGS__.reverse %} sc-flex-row-reverse{% endif %}">
// //     <!-- Map Section-->
// //     <div class="sc-col-md-6 sc-col-lg-8" style="padding: 0;">
// //       <div class="sc-contact-04__map-wraper sc-map-container" data-api-key={{__PDSETTINGS__.api_key}}>
// //         <div class="sc-map" data-mapcustom-zoomlevel="{{__PDSETTINGS__.zoom_level}}"
// //           data-mapcustom-zoom-animate="{{__PDSETTINGS__.animate_marker}}"
// //           data-mapcustom-typecontrol="{{__PDSETTINGS__.type_control}}"
// //           data-mapcustom-infowindow="{{__PDSETTINGS__.info_window}}"
// //           data-mapcustom-address="{{__PDSETTINGS__.main_address}}">
// //         </div>
// //       </div>
// //     </div>

// //     <!-- Contact Section  -->
// //     <div class="sc-col-md-6 sc-col-lg-4 sc-contact-04__contact-section">
// //       _HEADER_CONTENT_
// //       <div class="sc-contact-04__item-wraper">
// //         <div class="sc-contact-04__content">{{__SECTIONSETTINGS__.content}}</div>
// //       </div>
// //     </div>
// //   </div>
// // </div>
