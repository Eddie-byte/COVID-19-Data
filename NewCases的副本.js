class NewCases {
  constructor(x,y) {
    // Creates a new object. This constructor takes
    // two arguments that x and y of active casee.
    this.x = x;
    this.y = y;
    
    // Print it column by column.
    // Get the lat/long of each  newcases.
    for (let row of covidGlobal.rows){
      // 'Country_ID' of the row to get.
      let country = row.get ('Country_ID');
      
      // Declare an array with latitude and longitude.
      let latlon = countries[country]; 
      
      // The latitude and longitude in csv and json cannot all match
      // Only draw them if the position exists.
      if (latlon) {
        let lat = latlon[0];
        let lon = latlon[1];
        
        // Find newcases in the covidGlobal table.
        let newCount = row.get('New cases');
        // Take the square root of active cases.
        let diameter = sqrt(newCount);
        data.push({lat, lon, newCount, diameter});   
      } 
    }
  }
  
  //Create a function to display new cases.
  display () {
     
    // Loop over the array and update each circle.
    for(let country of data){
      
      // Every Frame, get the canvas position for the latitude and 
      // longitude of country.
      const pix = covidMap.latLngToPixel(country.lat,country.lon);
      
      // Get the size of New Cases Circle and map it.
      const newCount = sqrt(country.newCount); 
      let diameter = sqrt(newCount) * covidMap.zoom();
      
      fill(25, 25, 112, 100);
      
      // Calculate the sine value of frameCount to add animation 
      // to the confirmed circle.
      circle(pix.x, pix.y, diameter * sin (frameCount * 0.01));
    }
  } 
}
        