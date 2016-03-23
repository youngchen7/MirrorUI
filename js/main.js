// Main JS for managing the widget framework ///////////////////////////////////
// Variables
var FLAG_DEBUG = true;
var FLAG_RESIZE_CELL = false;
var grid_margin_height;
var grid_margin_width;
var grid_cell_height;
var grid_cell_width;
var grid_columns;
var grid_rows;
var if_info = []; // List of objects {element: HTMLelement, x: , y: , width: , height: }
// Functions
function print(msg) // Print (if debug is enabled)
{
  if(FLAG_DEBUG)
  {
    console.log(msg);
  }
}

function get_canvas_ctx()
{
  return $("#bg_canvas").get(0).getContext("2d");
}

function add_iframe(source, x, y, width, height)
{
  var new_iframe = document.createElement("iframe");
  if_info.push({"element": new_iframe, "x": x, "y": y, "width": width, "height": height})
  new_iframe.style.position = "absolute";
  new_iframe.frameborder = "0";
  new_iframe.src = source;
  document.body.appendChild(new_iframe);
}

function draw_iframes()
{
  if_info.forEach(function(i){
    i.element.style.left = grid_to_global_x(i.x) + "px";
    i.element.style.top = grid_to_global_y(i.y) + "px";
    i.element.style.width = i.width*grid_cell_width + "px";
    i.element.style.height = i.height*grid_cell_height + "px";
  });

}

function calculate_grid() // Calculate grid
{
  if(FLAG_RESIZE_CELL)  // Calculate cell size from columns/rows
  {
    console.log("Not yet implemented!");
  }
  else // Calculate columns/rows from cell size
  {
    grid_columns = Math.floor(window.innerWidth/grid_cell_width);
    grid_rows = Math.floor(window.innerHeight/grid_cell_height);
    grid_margin_width = (window.innerWidth%grid_cell_width)/2;
    grid_margin_height = (window.innerHeight%grid_cell_height)/2;
  }
}

function set_cell_square(length) // Set desired cell height and width
{
  grid_cell_height = length;
  grid_cell_width = length;
}

function grid_to_global_x(x)
{
  return grid_margin_width + x*grid_cell_width;
}

function grid_to_global_y(y)
{
  return grid_margin_height + y*grid_cell_height;
}

function draw_grid() // Draw the grid onto the svg background
{
  var ctx = get_canvas_ctx();
  // Resize the canvas
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  // Clear the canvas, recalculate and redraw the grid.
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 2;
  ctx.strokeRect(grid_margin_width, grid_margin_height, grid_cell_width*grid_columns, grid_cell_height*grid_rows);
  // For each cell
  for(var row = 0; row < grid_rows; row++)
  {
    for(var col = 0; col < grid_columns; col++)
    {
      ctx.strokeRect(grid_to_global_x(col),  grid_to_global_y(row), grid_cell_width, grid_cell_height);

    }
  }
}

// Window resize handler - Recalculates grid ///////////////////////////////////
$( window ).resize(function() {
  print("Resized - Available resolution: " + window.innerWidth + " x " + window.innerHeight);
  calculate_grid();
  draw_grid();
  draw_iframes();
});


// MAIN BEGIN //////////////////////////////////////////////////////////////////
$(document).ready(function()
{
  print("Resolution: " + window.screen.width + " x " + window.screen.height);
  print("Available resolution: " + window.innerWidth + " x " + window.innerHeight);

  // Default values
  set_cell_square(100);
  add_iframe("http://gizmodo.com/", 0, 0, 2, 2);
  // Initial draw
  calculate_grid();
  draw_grid();
  draw_iframes();
});
