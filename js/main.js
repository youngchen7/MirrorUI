// Main JS for managing the widget framework ///////////////////////////////////
// Variables
var FLAG_DEBUG = true;
var width_margin;
var height_margin;
var grid_cell_height;
var grid_cell_width;
var grid_columns;
var grid_rows;
// Functions
function print(msg) // Print (if debug is enabled)
{
  if(FLAG_DEBUG)
  {
    console.log(msg);
  }
}

function calculate_cell() // Recalculate cell size (keeps columns and rows)
{

}

function calculate_grid() // Recalculate grid ( keeps cell size)
{

}

function set_cell_square(length) // Set desired cell height and width
{
  grid_cell_height = length;
  grid_cell_width = length;
}

function generate_grid()
{

}

// Window resize handler - Recalculates grid ///////////////////////////////////
$( window ).resize(function() {
print("Resized - Available resolution: " + window.innerWidth + " x " + window.innerHeight);
});


// MAIN BEGIN //////////////////////////////////////////////////////////////////
print("Resolution: " + window.screen.width + " x " + window.screen.height);
print("Available resolution: " + window.innerWidth + " x " + window.innerHeight);

// TODO generate grid via absolute positioning (add code to handler so resizing is will regenerate the grid)

// TODO add iframes to grid (can just be random websites to test)

// TODO add iframe IDs that are dependent on their position - easy get/set/delete/move
