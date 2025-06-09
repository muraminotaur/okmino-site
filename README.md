# okmino-site

the site branches into different disciplines of art/projects with each having its own page. there are some files for personal information and alternate addresses.
there will eventually be a blog section on the site, but its design is still being worked on.
the main font is `IBM 3270 (Regular)`, a lovely monospaced font. this design decision may (partially) change for the blog portion. possibly take inspiration from [system24](https://github.com/refact0r/system24/tree/main), and other TUI design.

#### p5.js
the `sketch.js` file works by dividing the screen into equal sized cells, and tracking where the mouse currently is on the screen. the mouse is tracked through cells, not pixel coordinate. when a cell is selected, neighboring cells will be put into an array and randomly chosen to be drawn darker. these cells will fade over time. clicking and holding the mouse will prevent the fade and increase the neighbor selection size. the code is decently documented and readable.

### future additions
- [ ] way to automatically reduce images to a specific size/dimension size.
- [x] added click functionality in the p5.js script
- [ ] integrate a blog section