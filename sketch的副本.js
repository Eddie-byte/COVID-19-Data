/* The sketch is for an online news website to design an interactive 
 * simulation of an upcoming feature article on data journalism. 
 * The sketch is loaded with global June 3, 2021 COVID-19 WHO Healthy
 * data, including confirmed cases, death cases, recovered cases, active 
 * cases, and new cases within 24 hours.  The Sketch visualize the 
 * COVID-19 data, users can select different data by select element.
 * Paiwenkai Peng, n10314458
 * Map plug-in from : https://mappa.js.org/docs/simple-map.html
 * - I used the map plugin as the map function of the sketch.
 */

// Create a variable to hold map.
let covidMap;
// Create a variable to hold canvas.
let canvas;
// Create a new Mappa instance using Leaflet.
let mappa = new Mappa('Leaflet');

// Create a variable to hold the table of globalcoivd.csv
let covidGlobal;
// Create a variable to hold the table of countries.json
let countries;

// Declare an array with latitude and longitude.
let data = [];

// Create a veriable to hold different type of cases.
let confirmedPeople;
let deathsPeople;
let recoveredPeople;
let activePeople;
let newcasesPeople;

// Create a veriable to hold the seclection
let sel;

// Put all map options in a single object.
// Set the initial position of the map.
const option = {
  lat: 10,
  lng: 103,
  zoom: 1.5,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

function preload() {
  
  // Load covid-19 data table and has a header specifying 
  // the columns labels
  covidGlobal = loadTable ('globalcovid.csv', 'header'); 
  
  // Load the json file with country code and country latitude 
  // and longitude. 
  // Make covidGlobal be able to find the latitude and 
  // longitude of the country in countries.json.
  countries = loadJSON ('countries.json');
}


function setup(){
  
  // Create new cases with different cases.
  confirmedPeople = new Confirmed();
  deathsPeople = new Deaths();
  recoveredPeople = new Recovered();
  activePeople = new Active();
  newcasesPeople = new NewCases();
  
  // Set the size of the map to 700*400.
  canvas = createCanvas(700,400); 
  // Create a tile map with the options declared.
  covidMap = mappa.tileMap(option); 
  // Overlay the canvas over the tile map.
  covidMap.overlay(canvas);
  
  // Create a drop-down menu element in the DOM.
  textAlign(CENTER);
  sel = createSelect();
  // Position the selection button below the canvas.
  sel.position(5,410);
  
  //Create selection setting options.
  sel.option('Confirmed Cases - Cumulative total');
  sel.option('Deaths - Cumulative total');
  sel.option('Recovered - Cumulative total');
  sel.option('Active - Cumulative total')
  sel.option('Cases - last 24 hours');
  // Set the initial option.
  sel.selected('Confirmed Cases - Cumulative total');
  sel.changed(selectEvent);
}

/** Created a selection that allows users to 
  * choose different cases.
  */
function selectEvent(){
  let item = sel.value();
  if (item == 'Confirmed Cases - Cumulative total') {
    confirmedPeople.display();
  } else if (item == 'Deaths - Cumulative total') {
    deathsPeople.display();
  } else if (item == 'Recovered - Cumulative total') {
    recoveredPeople.display();
  } else if (item == 'Active - Cumulative total') {
    activePeople.display();
  } else if (item == 'Cases - last 24 hours') {
    newcasesPeople.display();
  }
}


function draw(){ 
  // Clear the previous canvas on every frame.
  clear(); 
  
  // When the user changes the option, () will 
  // call this function to update the background.
  selectEvent();
}